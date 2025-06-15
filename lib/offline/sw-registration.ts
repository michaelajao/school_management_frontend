// Service Worker Registration and Management
export class ServiceWorkerManager {
  private static instance: ServiceWorkerManager;
  private registration: ServiceWorkerRegistration | null = null;
  private updateAvailable = false;
  private waitingWorker: ServiceWorker | null = null;

  static getInstance(): ServiceWorkerManager {
    if (!ServiceWorkerManager.instance) {
      ServiceWorkerManager.instance = new ServiceWorkerManager();
    }
    return ServiceWorkerManager.instance;
  }

  async register(): Promise<boolean> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('❌ Service Worker not supported');
      return false;
    }

    try {
      console.log('🔄 Registering Service Worker...');
      
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('✅ Service Worker registered:', this.registration.scope);

      // Set up update detection
      this.setupUpdateDetection();

      // Set up message handling
      this.setupMessageHandling();

      // Check for existing service worker
      if (this.registration.waiting) {
        this.waitingWorker = this.registration.waiting;
        this.updateAvailable = true;
        this.notifyUpdateAvailable();
      }

      return true;
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
      return false;
    }
  }

  private setupUpdateDetection() {
    if (!this.registration) return;

    this.registration.addEventListener('updatefound', () => {
      console.log('🔄 Service Worker update found');
      
      const newWorker = this.registration!.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New update available
            this.waitingWorker = newWorker;
            this.updateAvailable = true;
            this.notifyUpdateAvailable();
          }
        });
      }
    });

    // Listen for the controlling service worker changing
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('🔄 Service Worker controller changed');
      window.location.reload();
    });
  }

  private setupMessageHandling() {
    navigator.serviceWorker.addEventListener('message', (event) => {
      const { type, payload } = event.data;

      switch (type) {
        case 'CACHE_UPDATED':
          console.log('📦 Cache updated:', payload);
          break;
        case 'SYNC_COMPLETE':
          console.log('🔄 Background sync complete:', payload);
          this.dispatchCustomEvent('sw:sync-complete', payload);
          break;
        case 'OFFLINE_READY':
          console.log('📴 App ready for offline use');
          this.dispatchCustomEvent('sw:offline-ready');
          break;
        default:
          console.log('📨 Service Worker message:', event.data);
      }
    });
  }

  private notifyUpdateAvailable() {
    console.log('🆕 App update available');
    this.dispatchCustomEvent('sw:update-available');
  }

  private dispatchCustomEvent(eventName: string, detail?: any) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
  }

  async activateUpdate(): Promise<boolean> {
    if (!this.waitingWorker) {
      console.log('❌ No waiting service worker to activate');
      return false;
    }

    try {
      // Tell the waiting service worker to skip waiting
      this.waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      
      this.updateAvailable = false;
      this.waitingWorker = null;
      
      console.log('✅ Service Worker update activated');
      return true;
    } catch (error) {
      console.error('❌ Failed to activate update:', error);
      return false;
    }
  }

  async unregister(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const result = await this.registration.unregister();
      console.log('🗑️ Service Worker unregistered');
      return result;
    } catch (error) {
      console.error('❌ Failed to unregister Service Worker:', error);
      return false;
    }
  }

  async checkForUpdates(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      await this.registration.update();
      console.log('🔄 Checked for Service Worker updates');
      return true;
    } catch (error) {
      console.error('❌ Failed to check for updates:', error);
      return false;
    }
  }

  async cacheUrls(urls: string[]): Promise<boolean> {
    if (!this.registration || !this.registration.active) {
      return false;
    }

    try {
      this.registration.active.postMessage({
        type: 'CACHE_URLS',
        payload: urls
      });
      
      console.log('📦 Requested caching of URLs:', urls.length);
      return true;
    } catch (error) {
      console.error('❌ Failed to cache URLs:', error);
      return false;
    }
  }

  async triggerBackgroundSync(tag: string = 'sms-background-sync'): Promise<boolean> {
    if (!this.registration || !('sync' in window.ServiceWorkerRegistration.prototype)) {
      console.log('❌ Background Sync not supported');
      return false;
    }

    try {
      await this.registration.sync.register(tag);
      console.log('🔄 Background sync triggered:', tag);
      return true;
    } catch (error) {
      console.error('❌ Failed to trigger background sync:', error);
      return false;
    }
  }

  getStatus() {
    return {
      isSupported: 'serviceWorker' in navigator,
      isRegistered: !!this.registration,
      updateAvailable: this.updateAvailable,
      hasWaitingWorker: !!this.waitingWorker,
      scope: this.registration?.scope,
      state: this.registration?.active?.state
    };
  }

  async requestPersistentStorage(): Promise<boolean> {
    if (!('storage' in navigator) || !('persist' in navigator.storage)) {
      console.log('❌ Persistent storage not supported');
      return false;
    }

    try {
      const granted = await navigator.storage.persist();
      console.log(granted ? '✅ Persistent storage granted' : '❌ Persistent storage denied');
      return granted;
    } catch (error) {
      console.error('❌ Failed to request persistent storage:', error);
      return false;
    }
  }

  async getStorageEstimate() {
    if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
      return null;
    }

    try {
      const estimate = await navigator.storage.estimate();
      return {
        quota: estimate.quota || 0,
        usage: estimate.usage || 0,
        usagePercentage: estimate.quota ? (estimate.usage! / estimate.quota) * 100 : 0
      };
    } catch (error) {
      console.error('❌ Failed to get storage estimate:', error);
      return null;
    }
  }
}

// Utility functions for PWA detection and installation
export class PWAManager {
  private deferredPrompt: any = null;
  private isInstallable = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupInstallPrompt();
    }
  }

  private setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      
      // Store the event so it can be triggered later
      this.deferredPrompt = event;
      this.isInstallable = true;
      
      console.log('📱 App install prompt available');
      
      // Notify the app that it can be installed
      window.dispatchEvent(new CustomEvent('pwa:installable'));
    });

    window.addEventListener('appinstalled', () => {
      console.log('✅ App was installed');
      this.deferredPrompt = null;
      this.isInstallable = false;
      
      // Notify the app that it was installed
      window.dispatchEvent(new CustomEvent('pwa:installed'));
    });
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.log('❌ No install prompt available');
      return false;
    }

    try {
      // Show the install prompt
      this.deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      
      console.log(`📱 Install prompt outcome: ${outcome}`);
      
      // Reset the deferred prompt
      this.deferredPrompt = null;
      this.isInstallable = false;
      
      return outcome === 'accepted';
    } catch (error) {
      console.error('❌ Failed to show install prompt:', error);
      return false;
    }
  }

  isStandalone(): boolean {
    if (typeof window === 'undefined') return false;
    
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
  }

  getInstallStatus() {
    return {
      isInstallable: this.isInstallable,
      isStandalone: this.isStandalone(),
      hasPrompt: !!this.deferredPrompt,
      platform: this.getPlatform()
    };
  }

  private getPlatform(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    if (/android/.test(userAgent)) return 'android';
    if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
    if (/windows/.test(userAgent)) return 'windows';
    if (/macintosh|mac os x/.test(userAgent)) return 'macos';
    if (/linux/.test(userAgent)) return 'linux';
    
    return 'unknown';
  }
}

// Export singleton instances
export const swManager = ServiceWorkerManager.getInstance();
export const pwaManager = new PWAManager();