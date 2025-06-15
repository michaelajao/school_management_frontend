import Dexie, { Table } from 'dexie';

// Define database schemas for offline storage
export interface OfflineStudent {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  studentId?: string;
  admissionNumber?: string;
  classId?: string;
  className?: string;
  class?: string;
  grade?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED';
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  city?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  enrollmentDate?: string;
  attendanceRate?: number;
  averageGrade?: number;
  totalCredits?: number;
  profilePicture?: string;
  avatar?: string;
  medicalInfo?: string;
  notes?: string;
  synced: boolean;
  lastSync: number;
}

export interface OfflineAttendance {
  id?: number;
  studentId: string;
  classId: string;
  date: string;
  present: boolean;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'SICK';
  subject?: string;
  notes?: string;
  markedById?: string;
  synced: boolean;
  lastSync: number;
}

export interface OfflineGrade {
  id?: number;
  studentId: string;
  subject: string;
  assignment: string;
  grade: number;
  maxGrade: number;
  date: string;
  type: 'QUIZ' | 'EXAM' | 'ASSIGNMENT' | 'PROJECT' | 'PARTICIPATION';
  classId: string;
  teacherId?: string;
  notes?: string;
  synced: boolean;
  lastSync: number;
}

export interface OfflineClass {
  id: string;
  name: string;
  section: string;
  displayName: string;
  gradeLevelId: string;
  capacity: number;
  currentEnrollment: number;
  classTeacherId?: string;
  lastSync: number;
}

export interface OfflineSubject {
  id: string;
  name: string;
  code: string;
  description?: string;
  lastSync: number;
}

export interface OfflineAssignment {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  subjectId: string;
  classId: string;
  createdById: string;
  fileUrl?: string;
  synced: boolean;
  lastSync: number;
}

export interface SyncQueue {
  id?: number;
  type: 'attendance' | 'grade' | 'assignment' | 'student';
  action: 'create' | 'update' | 'delete';
  data: any;
  originalId?: string;
  timestamp: number;
  retryCount: number;
  error?: string;
}

export interface AppSettings {
  id: 'app_settings';
  lastFullSync?: number;
  syncInProgress: boolean;
  offlineMode: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

class SMSOfflineDatabase extends Dexie {
  students!: Table<OfflineStudent>;
  attendance!: Table<OfflineAttendance>;
  grades!: Table<OfflineGrade>;
  classes!: Table<OfflineClass>;
  subjects!: Table<OfflineSubject>;
  assignments!: Table<OfflineAssignment>;
  syncQueue!: Table<SyncQueue>;
  settings!: Table<AppSettings>;

  constructor() {
    super('SMSOfflineDB');
    
    this.version(1).stores({
      students: 'id, firstName, lastName, email, admissionNumber, classId, lastSync',
      attendance: '++id, studentId, classId, date, synced, lastSync',
      grades: '++id, studentId, subjectId, classId, synced, lastSync',
      classes: 'id, name, gradeLevelId, lastSync',
      subjects: 'id, name, code, lastSync',
      assignments: '++id, subjectId, classId, createdById, synced, lastSync',
      syncQueue: '++id, type, timestamp, retryCount',
      settings: 'id'
    });

    // Add hooks for automatic timestamps
    this.attendance.hook('creating', function (primKey, obj, trans) {
      obj.lastSync = Date.now();
      if (obj.synced === undefined) {
        obj.synced = false;
      }
    });

    this.grades.hook('creating', function (primKey, obj, trans) {
      obj.lastSync = Date.now();
      if (obj.synced === undefined) {
        obj.synced = false;
      }
    });

    this.assignments.hook('creating', function (primKey, obj, trans) {
      obj.lastSync = Date.now();
      if (obj.synced === undefined) {
        obj.synced = false;
      }
    });

    this.syncQueue.hook('creating', function (primKey, obj, trans) {
      obj.timestamp = Date.now();
      if (obj.retryCount === undefined) {
        obj.retryCount = 0;
      }
    });
  }

  // Helper methods for data management
  async clearAllData() {
    await this.transaction('rw', [this.students, this.attendance, this.grades, 
      this.classes, this.subjects, this.assignments, this.syncQueue], async () => {
      await this.students.clear();
      await this.attendance.clear();
      await this.grades.clear();
      await this.classes.clear();
      await this.subjects.clear();
      await this.assignments.clear();
      await this.syncQueue.clear();
    });
  }

  async getUnsyncedData() {
    const [attendance, grades, assignments] = await Promise.all([
      this.attendance.where('synced').equals(0).toArray(),
      this.grades.where('synced').equals(0).toArray(),
      this.assignments.where('synced').equals(0).toArray()
    ]);

    return {
      attendance,
      grades,
      assignments,
      total: attendance.length + grades.length + assignments.length
    };
  }

  async markAsSynced(type: 'attendance' | 'grades' | 'assignments', ids: number[]) {
    switch (type) {
      case 'attendance':
        await this.attendance.where('id').anyOf(ids).modify({ synced: true });
        break;
      case 'grades':
        await this.grades.where('id').anyOf(ids).modify({ synced: true });
        break;
      case 'assignments':
        await this.assignments.where('id').anyOf(ids).modify({ synced: true });
        break;
    }
  }

  async getAppSettings(): Promise<AppSettings> {
    let settings = await this.settings.get('app_settings');
    
    if (!settings) {
      settings = {
        id: 'app_settings',
        syncInProgress: false,
        offlineMode: false,
        theme: 'system',
        language: 'en'
      };
      await this.settings.put(settings);
    }
    
    return settings;
  }

  async updateAppSettings(updates: Partial<AppSettings>) {
    await this.settings.update('app_settings', updates);
  }

  // Attendance specific methods
  async saveAttendance(attendance: Omit<OfflineAttendance, 'id' | 'synced' | 'lastSync'>) {
    const id = await this.attendance.add({
      ...attendance,
      synced: false,
      lastSync: Date.now()
    });

    // Add to sync queue
    await this.syncQueue.add({
      type: 'attendance',
      action: 'create',
      data: { ...attendance, id },
      timestamp: Date.now(),
      retryCount: 0
    });

    return id;
  }

  async getAttendanceByClass(classId: string, date?: string) {
    let query = this.attendance.where('classId').equals(classId);
    
    if (date) {
      query = query.and(record => record.date === date);
    }
    
    return await query.toArray();
  }

  async getAttendanceByStudent(studentId: string, startDate?: string, endDate?: string) {
    let query = this.attendance.where('studentId').equals(studentId);
    
    if (startDate && endDate) {
      query = query.and(record => record.date >= startDate && record.date <= endDate);
    }
    
    return await query.toArray();
  }

  // Grades specific methods
  async saveGrade(grade: Omit<OfflineGrade, 'id' | 'synced' | 'lastSync'>) {
    const id = await this.grades.add({
      ...grade,
      synced: false,
      lastSync: Date.now()
    });

    // Add to sync queue
    await this.syncQueue.add({
      type: 'grade',
      action: 'create',
      data: { ...grade, id },
      timestamp: Date.now(),
      retryCount: 0
    });

    return id;
  }

  async getGradesByClass(classId: string, subjectId?: string) {
    let query = this.grades.where('classId').equals(classId);
    
    if (subjectId) {
      query = query.and(grade => grade.subject === subjectId);
    }
    
    return await query.toArray();
  }

  async getGradesByStudent(studentId: string, subjectId?: string) {
    let query = this.grades.where('studentId').equals(studentId);
    
    if (subjectId) {
      query = query.and(grade => grade.subject === subjectId);
    }
    
    return await query.toArray();
  }

  // Students specific methods
  async syncStudents(students: OfflineStudent[]) {
    await this.students.clear();
    await this.students.bulkAdd(students.map(student => ({
      ...student,
      lastSync: Date.now()
    })));
  }

  async getStudentsByClass(classId: string) {
    return await this.students.where('classId').equals(classId).toArray();
  }

  async searchStudents(query: string) {
    const normalizedQuery = query.toLowerCase();
    
    return await this.students.filter(student => 
      Boolean(student.firstName && student.firstName.toLowerCase().includes(normalizedQuery)) ||
      Boolean(student.lastName && student.lastName.toLowerCase().includes(normalizedQuery)) ||
      Boolean(student.email && student.email.toLowerCase().includes(normalizedQuery)) ||
      Boolean(student.admissionNumber && student.admissionNumber.toLowerCase().includes(normalizedQuery))
    ).toArray();
  }
}

// Create and export database instance
export const offlineDB = new SMSOfflineDatabase();