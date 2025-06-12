'use client';

import { useEffect, useState } from 'react';
import { config } from '@/lib/config';
import api from '@/lib/api';

interface HealthStatus {
  status: 'checking' | 'connected' | 'disconnected';
  backendInfo?: {
    version?: string;
    environment?: string;
    timestamp?: string;
  };
  error?: string;
}

export function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({ status: 'checking' });
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {    const checkBackendHealth = async () => {
      try {
        setHealthStatus({ status: 'checking' });
        
        // Test with our backend health endpoint
        const response = await api.get('/', { timeout: 5000 });
        
        setHealthStatus({
          status: 'connected',
          backendInfo: {
            version: response.data?.version || '1.0.0',
            environment: config.environment,
            timestamp: new Date().toISOString(),
          }
        });
      } catch (error: any) {
        console.error('Backend health check failed:', error);
        
        setHealthStatus({
          status: 'disconnected',
          error: error.message || 'Connection failed'
        });
      }
    };

    // Initial check
    checkBackendHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkBackendHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  // Don't show in production
  if (config.environment === 'production') return null;

  const getStatusColor = () => {
    switch (healthStatus.status) {
      case 'connected': return 'bg-green-100 text-green-800 border-green-200';
      case 'disconnected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusIcon = () => {
    switch (healthStatus.status) {
      case 'connected': return '🟢';
      case 'disconnected': return '🔴';
      default: return '🟡';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isMinimized ? (
        // Minimized view - just a small circle
        <button
          onClick={() => setIsMinimized(false)}
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border ${getStatusColor()}`}
          title="Show backend status"
        >
          <span className="text-xs">{getStatusIcon()}</span>
        </button>
      ) : (
        // Full view
        <div className={`p-3 rounded-lg border text-sm font-medium shadow-lg max-w-xs ${getStatusColor()}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{getStatusIcon()}</span>
              <span className="font-semibold">Backend: {healthStatus.status}</span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-xs opacity-50 hover:opacity-100 ml-2"
              title="Minimize"
            >
              ✕
            </button>
          </div>
          
          {healthStatus.backendInfo && (
            <div className="text-xs mt-2 space-y-1">
              <div>Environment: {healthStatus.backendInfo.environment}</div>
              <div>Version: {healthStatus.backendInfo.version}</div>
              <div>Last Check: {new Date(healthStatus.backendInfo.timestamp || '').toLocaleTimeString()}</div>
            </div>
          )}
          
          {healthStatus.error && (
            <div className="text-xs mt-2 opacity-75">
              Error: {healthStatus.error}
            </div>
          )}
          
          <div className="text-xs mt-2 opacity-75">
            API: {config.apiUrl}
          </div>
        </div>
      )}
    </div>
  );
}
