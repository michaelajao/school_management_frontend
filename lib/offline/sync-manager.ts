import { offlineDB, SyncQueue } from './database';
import { ApiService } from '@/lib/api/base';

export class SyncManager {
  private static instance: SyncManager;
  private syncInProgress = false;
  private retryTimeouts: Map<string, NodeJS.Timeout> = new Map();

  static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }

  private constructor() {
    // Listen for online/offline events
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleOnlineEvent());
      window.addEventListener('offline', () => this.handleOfflineEvent());
    }
  }

  async initialize() {
    // Check if we're online and sync if needed
    if (typeof window !== 'undefined' && navigator.onLine) {
      await this.performSync();
    }
  }

  private async handleOnlineEvent() {
    console.log('🌐 Back online - starting sync');
    await offlineDB.updateAppSettings({ offlineMode: false });
    await this.performSync();
  }

  private async handleOfflineEvent() {
    console.log('📴 Gone offline');
    await offlineDB.updateAppSettings({ offlineMode: true });
    this.syncInProgress = false;
  }

  async performSync(): Promise<{ success: boolean; errors: string[] }> {
    if (this.syncInProgress) {
      console.log('🔄 Sync already in progress');
      return { success: false, errors: ['Sync already in progress'] };
    }

    if (typeof window !== 'undefined' && !navigator.onLine) {
      console.log('📴 Cannot sync - offline');
      return { success: false, errors: ['Device is offline'] };
    }

    this.syncInProgress = true;
    const errors: string[] = [];

    try {
      await offlineDB.updateAppSettings({ 
        syncInProgress: true,
        lastFullSync: Date.now()
      });

      console.log('🔄 Starting full sync...');

      // 1. Sync down: Get latest data from server
      await this.syncDownFromServer();

      // 2. Sync up: Send local changes to server
      await this.syncUpToServer();

      // 3. Process sync queue
      await this.processSyncQueue();

      console.log('✅ Sync completed successfully');
      return { success: true, errors };

    } catch (error) {
      console.error('❌ Sync failed:', error);
      errors.push(error instanceof Error ? error.message : 'Unknown sync error');
      return { success: false, errors };
    } finally {
      this.syncInProgress = false;
      await offlineDB.updateAppSettings({ syncInProgress: false });
    }
  }

  private async syncDownFromServer() {
    try {
      // Sync students
      const studentsResponse = await ApiService.get('/api/students');
      if (studentsResponse.data) {
        await offlineDB.syncStudents(studentsResponse.data);
        console.log('📥 Students synced down');
      }

      // Sync classes
      const classesResponse = await ApiService.get('/api/classes');
      if (classesResponse.data) {
        await offlineDB.classes.clear();
        await offlineDB.classes.bulkAdd(
          classesResponse.data.map((cls: any) => ({
            ...cls,
            lastSync: Date.now()
          }))
        );
        console.log('📥 Classes synced down');
      }

      // Sync subjects
      const subjectsResponse = await ApiService.get('/api/subjects');
      if (subjectsResponse.data) {
        await offlineDB.subjects.clear();
        await offlineDB.subjects.bulkAdd(
          subjectsResponse.data.map((subject: any) => ({
            ...subject,
            lastSync: Date.now()
          }))
        );
        console.log('📥 Subjects synced down');
      }

    } catch (error) {
      console.error('📥 Failed to sync down from server:', error);
      throw error;
    }
  }

  private async syncUpToServer() {
    try {
      const unsyncedData = await offlineDB.getUnsyncedData();
      console.log(`📤 Syncing up ${unsyncedData.total} items`);

      // Sync attendance
      for (const attendance of unsyncedData.attendance) {
        try {
          await ApiService.post('/api/attendance', {
            studentId: attendance.studentId,
            classId: attendance.classId,
            date: attendance.date,
            present: attendance.present,
            status: attendance.status,
            comment: attendance.notes
          });
          
          if (attendance.id) {
            await offlineDB.attendance.update(attendance.id, { synced: true });
          }
        } catch (error) {
          console.error('📤 Failed to sync attendance:', error);
        }
      }

      // Sync grades
      for (const grade of unsyncedData.grades) {
        try {
          await ApiService.post('/api/grades', {
            studentId: grade.studentId,
            subjectId: grade.subject,
            classId: grade.classId,
            score: grade.grade,
            maxScore: grade.maxGrade,
            percentage: (grade.grade / grade.maxGrade) * 100,
            grade: grade.grade,
            comment: grade.notes,
            assessmentName: grade.assignment,
            assessmentDate: grade.date
          });
          
          if (grade.id) {
            await offlineDB.grades.update(grade.id, { synced: true });
          }
        } catch (error) {
          console.error('📤 Failed to sync grade:', error);
        }
      }

      // Sync assignments
      for (const assignment of unsyncedData.assignments) {
        try {
          await ApiService.post('/api/assignments', {
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            subjectId: assignment.subjectId,
            classId: assignment.classId,
            fileUrl: assignment.fileUrl
          });
          
          if (assignment.id) {
            await offlineDB.assignments.update(assignment.id, { synced: true });
          }
        } catch (error) {
          console.error('📤 Failed to sync assignment:', error);
        }
      }

    } catch (error) {
      console.error('📤 Failed to sync up to server:', error);
      throw error;
    }
  }

  private async processSyncQueue() {
    try {
      const queueItems = await offlineDB.syncQueue.orderBy('timestamp').toArray();
      console.log(`🔄 Processing ${queueItems.length} queued items`);

      for (const item of queueItems) {
        try {
          await this.processSyncQueueItem(item);
          await offlineDB.syncQueue.delete(item.id!);
        } catch (error) {
          console.error(`❌ Failed to process queue item ${item.id}:`, error);
          
          // Increment retry count
          const newRetryCount = item.retryCount + 1;
          
          if (newRetryCount >= 3) {
            // Max retries reached, remove from queue
            await offlineDB.syncQueue.delete(item.id!);
            console.log(`🗑️ Removed failed item ${item.id} after ${newRetryCount} retries`);
          } else {
            // Update retry count and schedule for later
            await offlineDB.syncQueue.update(item.id!, {
              retryCount: newRetryCount,
              error: error instanceof Error ? error.message : 'Unknown error'
            });
            
            // Exponential backoff for retries
            const delay = Math.pow(2, newRetryCount) * 1000;
            this.scheduleRetry(item.id!.toString(), delay);
          }
        }
      }

    } catch (error) {
      console.error('🔄 Failed to process sync queue:', error);
      throw error;
    }
  }

  private async processSyncQueueItem(item: SyncQueue) {
    const { type, action, data } = item;

    switch (type) {
      case 'attendance':
        if (action === 'create') {
          await ApiService.post('/api/attendance', data);
        } else if (action === 'update') {
          await ApiService.put(`/api/attendance/${data.id}`, data);
        } else if (action === 'delete') {
          await ApiService.delete(`/api/attendance/${data.id}`);
        }
        break;

      case 'grade':
        if (action === 'create') {
          await ApiService.post('/api/grades', data);
        } else if (action === 'update') {
          await ApiService.put(`/api/grades/${data.id}`, data);
        } else if (action === 'delete') {
          await ApiService.delete(`/api/grades/${data.id}`);
        }
        break;

      case 'assignment':
        if (action === 'create') {
          await ApiService.post('/api/assignments', data);
        } else if (action === 'update') {
          await ApiService.put(`/api/assignments/${data.id}`, data);
        } else if (action === 'delete') {
          await ApiService.delete(`/api/assignments/${data.id}`);
        }
        break;

      default:
        throw new Error(`Unknown sync item type: ${type}`);
    }
  }

  private scheduleRetry(itemId: string, delay: number) {
    // Clear existing timeout
    const existingTimeout = this.retryTimeouts.get(itemId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Schedule new retry
    const timeout = setTimeout(async () => {
      console.log(`🔄 Retrying sync for item ${itemId}`);
      await this.performSync();
      this.retryTimeouts.delete(itemId);
    }, delay);

    this.retryTimeouts.set(itemId, timeout);
  }

  async queueForSync(
    type: 'attendance' | 'grade' | 'assignment' | 'student',
    action: 'create' | 'update' | 'delete',
    data: any,
    originalId?: string
  ) {
    await offlineDB.syncQueue.add({
      type,
      action,
      data,
      originalId,
      timestamp: Date.now(),
      retryCount: 0
    });

    console.log(`📝 Queued ${action} ${type} for sync`);

    // Try to sync immediately if online
    if (typeof window !== 'undefined' && navigator.onLine && !this.syncInProgress) {
      setTimeout(() => this.performSync(), 100);
    }
  }

  async getSyncStatus() {
    const settings = await offlineDB.getAppSettings();
    const unsyncedData = await offlineDB.getUnsyncedData();
    const queueCount = await offlineDB.syncQueue.count();

    return {
      isOnline: typeof window !== 'undefined' ? navigator.onLine : false,
      syncInProgress: settings.syncInProgress,
      lastSync: settings.lastFullSync,
      unsyncedCount: unsyncedData.total,
      queueCount,
      offlineMode: settings.offlineMode
    };
  }

  async forceClearQueue() {
    await offlineDB.syncQueue.clear();
    console.log('🗑️ Sync queue cleared');
  }

  async reset() {
    await offlineDB.clearAllData();
    this.syncInProgress = false;
    this.retryTimeouts.clear();
    console.log('🔄 Sync manager reset');
  }
}

// Export singleton instance
export const syncManager = SyncManager.getInstance();