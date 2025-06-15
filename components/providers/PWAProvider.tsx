"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { swManager, pwaManager, PWAManager, ServiceWorkerManager } from "@/lib/offline/sw-registration";
import { syncManager, SyncManager } from "@/lib/offline/sync-manager";
import { offlineDB } from "@/lib/offline/database";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface PWAContextType {
  // Service Worker
  swManager: ServiceWorkerManager;
  isSwRegistered: boolean;
  isSwUpdateAvailable: boolean;
  
  // PWA Installation
  pwaManager: PWAManager;
  isInstallable: boolean;
  isStandalone: boolean;
  
  // Offline/Sync
  syncManager: SyncManager;
  isOnline: boolean;
  syncStatus: {
    isOnline: boolean;
    syncInProgress: boolean;
    lastSync?: number;
    unsyncedCount: number;
    queueCount: number;
    offlineMode: boolean;
  };
  
  // Actions
  activateUpdate: () => Promise<void>;
  promptInstall: () => Promise<void>;
  triggerSync: () => Promise<void>;
  clearOfflineData: () => Promise<void>;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export function usePWA() {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
}

interface PWAProviderProps {
  children: ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  // Service Worker state
  const [isSwRegistered, setIsSwRegistered] = useState(false);
  const [isSwUpdateAvailable, setIsSwUpdateAvailable] = useState(false);
  
  // PWA state
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  
  // Online/Offline state
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus, setSyncStatus] = useState({
    isOnline: true,
    syncInProgress: false,
    lastSync: undefined as number | undefined,
    unsyncedCount: 0,
    queueCount: 0,
    offlineMode: false,
  });

  useEffect(() => {
    initializePWA();
    setupEventListeners();
    
    return () => {
      cleanupEventListeners();
    };
  }, []);

  const initializePWA = async () => {
    try {
      // Initialize service worker
      const swRegistered = await swManager.register();
      setIsSwRegistered(swRegistered);
      
      if (swRegistered) {
        console.log('✅ Service Worker registered successfully');
        toast.success('App is ready for offline use!', {
          description: 'You can now use the app even without internet.',
          duration: 3000,
        });
      }
      
      // Initialize sync manager
      await syncManager.initialize();
      
      // Update sync status
      await updateSyncStatus();
      
      // Check PWA install status
      updatePWAStatus();
      
      // Request persistent storage
      await swManager.requestPersistentStorage();
      
    } catch (error) {
      console.error('❌ Failed to initialize PWA:', error);
      toast.error('Failed to initialize offline features', {
        description: 'Some features may not work offline.',
      });
    }
  };

  const setupEventListeners = () => {
    // Online/Offline detection
    const handleOnline = () => {
      setIsOnline(true);
      updateSyncStatus();
      toast.success('Back online!', {
        description: 'Syncing your offline changes...',
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      updateSyncStatus();
      toast.info('You\'re offline', {
        description: 'Changes will be saved and synced when back online.',
        duration: 5000,
      });
    };

    // Service Worker events
    const handleSwUpdateAvailable = () => {
      setIsSwUpdateAvailable(true);
      showUpdateNotification();
    };

    const handleSwOfflineReady = () => {
      toast.success('App cached for offline use!', {
        description: 'You can now use the app without internet.',
      });
    };

    const handleSwSyncComplete = () => {
      updateSyncStatus();
      toast.success('Data synced successfully!');
    };

    // PWA events
    const handlePwaInstallable = () => {
      setIsInstallable(true);
      showInstallPrompt();
    };

    const handlePwaInstalled = () => {
      setIsInstallable(false);
      toast.success('App installed successfully!', {
        description: 'You can now access the app from your home screen.',
      });
    };

    // Add event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      window.addEventListener('sw:update-available', handleSwUpdateAvailable);
      window.addEventListener('sw:offline-ready', handleSwOfflineReady);
      window.addEventListener('sw:sync-complete', handleSwSyncComplete);
      window.addEventListener('pwa:installable', handlePwaInstallable);
      window.addEventListener('pwa:installed', handlePwaInstalled);
    }

    // Store references for cleanup
    (window as any).__pwaEventListeners = {
      handleOnline,
      handleOffline,
      handleSwUpdateAvailable,
      handleSwOfflineReady,
      handleSwSyncComplete,
      handlePwaInstallable,
      handlePwaInstalled,
    };
  };

  const cleanupEventListeners = () => {
    if (typeof window !== 'undefined' && (window as any).__pwaEventListeners) {
      const listeners = (window as any).__pwaEventListeners;
      
      window.removeEventListener('online', listeners.handleOnline);
      window.removeEventListener('offline', listeners.handleOffline);
      window.removeEventListener('sw:update-available', listeners.handleSwUpdateAvailable);
      window.removeEventListener('sw:offline-ready', listeners.handleSwOfflineReady);
      window.removeEventListener('sw:sync-complete', listeners.handleSwSyncComplete);
      window.removeEventListener('pwa:installable', listeners.handlePwaInstallable);
      window.removeEventListener('pwa:installed', listeners.handlePwaInstalled);
      
      delete (window as any).__pwaEventListeners;
    }
  };

  const updateSyncStatus = async () => {
    try {
      const status = await syncManager.getSyncStatus();
      setSyncStatus(status);
    } catch (error) {
      console.error('Failed to update sync status:', error);
    }
  };

  const updatePWAStatus = () => {
    const installStatus = pwaManager.getInstallStatus();
    setIsInstallable(installStatus.isInstallable);
    setIsStandalone(installStatus.isStandalone);
    
    // Update online status
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
    }
  };

  const showUpdateNotification = () => {
    toast('App update available!', {
      description: 'A new version is ready to install.',
      duration: 10000,
      action: {
        label: 'Update',
        onClick: activateUpdate,
      },
    });
  };

  const showInstallPrompt = () => {
    // Only show on mobile or if not standalone
    if (isStandalone) return;
    
    setTimeout(() => {
      toast('Install App', {
        description: 'Add this app to your home screen for a better experience.',
        duration: 8000,
        action: {
          label: 'Install',
          onClick: promptInstall,
        },
      });
    }, 5000); // Wait 5 seconds before showing
  };

  // Action handlers
  const activateUpdate = async () => {
    try {
      await swManager.activateUpdate();
      toast.success('Update installed!', {
        description: 'The app will reload with the latest version.',
      });
    } catch (error) {
      console.error('Failed to activate update:', error);
      toast.error('Failed to install update');
    }
  };

  const promptInstall = async () => {
    try {
      const installed = await pwaManager.promptInstall();
      if (installed) {
        setIsInstallable(false);
      }
    } catch (error) {
      console.error('Failed to prompt install:', error);
      toast.error('Failed to install app');
    }
  };

  const triggerSync = async () => {
    try {
      await syncManager.performSync();
      await updateSyncStatus();
      toast.success('Sync completed!');
    } catch (error) {
      console.error('Failed to trigger sync:', error);
      toast.error('Sync failed', {
        description: 'Please check your connection and try again.',
      });
    }
  };

  const clearOfflineData = async () => {
    try {
      await offlineDB.clearAllData();
      await syncManager.reset();
      await updateSyncStatus();
      toast.success('Offline data cleared!');
    } catch (error) {
      console.error('Failed to clear offline data:', error);
      toast.error('Failed to clear offline data');
    }
  };

  const contextValue: PWAContextType = {
    // Service Worker
    swManager,
    isSwRegistered,
    isSwUpdateAvailable,
    
    // PWA Installation
    pwaManager,
    isInstallable,
    isStandalone,
    
    // Offline/Sync
    syncManager,
    isOnline,
    syncStatus,
    
    // Actions
    activateUpdate,
    promptInstall,
    triggerSync,
    clearOfflineData,
  };

  return (
    <PWAContext.Provider value={contextValue}>
      {children}
    </PWAContext.Provider>
  );
}