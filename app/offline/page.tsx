"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Database
} from "lucide-react";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [pendingSync, setPendingSync] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Check for pending sync items
    checkPendingSync();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const checkPendingSync = async () => {
    try {
      if ('indexedDB' in window) {
        const request = indexedDB.open('SMSSyncQueue', 1);
        request.onsuccess = () => {
          const db = request.result;
          if (db.objectStoreNames.contains('syncQueue')) {
            const transaction = db.transaction(['syncQueue'], 'readonly');
            const store = transaction.objectStore('syncQueue');
            const countRequest = store.count();
            
            countRequest.onsuccess = () => {
              setPendingSync(countRequest.result);
            };
          }
        };
      }
    } catch (error) {
      console.error('Failed to check pending sync:', error);
    }
  };

  const handleRetry = () => {
    if (isOnline) {
      window.location.reload();
    } else {
      // Try to trigger sync when back online
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
          // Background sync is experimental, check if it exists
          if ('sync' in registration) {
            return (registration as any).sync.register('sms-background-sync');
          }
        });
      }
    }
  };

  const goToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Offline Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <WifiOff className="w-8 h-8 text-slate-600" />
            </div>
            <CardTitle className="text-xl text-slate-800">
              You&apos;re Offline
            </CardTitle>
            <CardDescription className="text-slate-600">
              No internet connection detected. Some features may be limited.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Connection Status */}
            <Alert className={isOnline ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                )}
                <AlertDescription className={isOnline ? "text-green-800" : "text-orange-800"}>
                  {isOnline ? "Connection restored!" : "Connection unavailable"}
                </AlertDescription>
              </div>
            </Alert>

            {/* Pending Sync Information */}
            {pendingSync > 0 && (
              <Alert className="border-blue-200 bg-blue-50">
                <Database className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  {pendingSync} item{pendingSync !== 1 ? 's' : ''} will sync when online
                </AlertDescription>
              </Alert>
            )}

            {/* Last Sync Time */}
            {lastSync && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>Last synced: {lastSync.toLocaleTimeString()}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <Button 
                onClick={handleRetry}
                className="w-full bg-[#1B5B5E] hover:bg-[#134345]"
                disabled={!isOnline}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {isOnline ? "Reload Page" : "Retry Connection"}
              </Button>
              
              <Button 
                onClick={goToDashboard}
                variant="outline"
                className="w-full"
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Offline Features Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">
              Available Offline
            </CardTitle>
            <CardDescription>
              These features work without internet
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓
                </Badge>
                <span className="text-sm text-slate-700">View Cached Data</span>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓
                </Badge>
                <span className="text-sm text-slate-700">Mark Attendance</span>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓
                </Badge>
                <span className="text-sm text-slate-700">Enter Grades</span>
              </div>
              
              <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓
                </Badge>
                <span className="text-sm text-slate-700">View Reports</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-800">
                📱 <strong>Tip:</strong> Changes made offline will automatically sync when you&apos;re back online.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Connection Tips */}
        <div className="text-center text-sm text-slate-500 space-y-1">
          <p>Try checking your wifi or mobile data connection</p>
          <p>The app will automatically reconnect when available</p>
        </div>
      </div>
    </div>
  );
}