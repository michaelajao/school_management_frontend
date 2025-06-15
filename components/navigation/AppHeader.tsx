"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { usePWA } from "@/components/providers/PWAProvider";
import { MobileNavigation } from "./MobileNavigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Settings, 
  LogOut, 
  User, 
  Wifi, 
  WifiOff, 
  RefreshCw,
  Download,
  Smartphone
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}

export function AppHeader() {
  const { user, logout } = useAuth();
  const { 
    isOnline, 
    syncStatus, 
    isInstallable, 
    isSwUpdateAvailable,
    promptInstall, 
    activateUpdate, 
    triggerSync 
  } = usePWA();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Generate relevant notifications based on sync status and app state
    const newNotifications: Notification[] = [];

    // Offline notifications
    if (!isOnline) {
      newNotifications.push({
        id: 'offline',
        title: 'You\'re offline',
        message: 'Changes will be saved and synced when back online',
        type: 'info',
        timestamp: new Date(),
        read: false,
      });
    }

    // Unsynced data notifications
    if (syncStatus.unsyncedCount > 0) {
      newNotifications.push({
        id: 'unsynced',
        title: `${syncStatus.unsyncedCount} items need syncing`,
        message: 'Your changes will be sent to the server when online',
        type: 'warning',
        timestamp: new Date(),
        read: false,
        action: {
          label: 'Sync Now',
          handler: triggerSync,
        },
      });
    }

    // App update notifications
    if (isSwUpdateAvailable) {
      newNotifications.push({
        id: 'update',
        title: 'App update available',
        message: 'A new version is ready to install',
        type: 'info',
        timestamp: new Date(),
        read: false,
        action: {
          label: 'Update',
          handler: activateUpdate,
        },
      });
    }

    // Install notifications
    if (isInstallable) {
      newNotifications.push({
        id: 'install',
        title: 'Install app',
        message: 'Add this app to your home screen for a better experience',
        type: 'info',
        timestamp: new Date(),
        read: false,
        action: {
          label: 'Install',
          handler: promptInstall,
        },
      });
    }

    setNotifications(newNotifications);
  }, [isOnline, syncStatus, isSwUpdateAvailable, isInstallable, triggerSync, activateUpdate, promptInstall]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  if (!user) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side - Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <MobileNavigation />
          
          <div className="flex items-center gap-2">
            <div className="font-bold text-lg text-[#1B5B5E]">SMS</div>
            <div className="hidden sm:block text-sm text-muted-foreground">
              School Management System
            </div>
          </div>
        </div>

        {/* Center - Connection Status (Mobile) */}
        <div className="flex lg:hidden items-center gap-2">
          {isOnline ? (
            <div className="flex items-center gap-1 text-green-600">
              <Wifi className="h-4 w-4" />
              <span className="text-xs hidden sm:inline">Online</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-600">
              <WifiOff className="h-4 w-4" />
              <span className="text-xs hidden sm:inline">Offline</span>
            </div>
          )}
          
          {syncStatus.unsyncedCount > 0 && (
            <Badge variant="outline" className="text-xs">
              {syncStatus.unsyncedCount}
            </Badge>
          )}
        </div>

        {/* Right side - Actions and User Menu */}
        <div className="flex items-center gap-2">
          {/* Sync Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={triggerSync}
            disabled={syncStatus.syncInProgress}
            className="hidden lg:flex"
          >
            <RefreshCw 
              className={cn(
                "h-4 w-4",
                syncStatus.syncInProgress && "animate-spin"
              )} 
            />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs"
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No notifications
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 border-b border-border last:border-0 cursor-pointer hover:bg-muted/50",
                        !notification.read && "bg-blue-50/50"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-2">
                        <div 
                          className={cn(
                            "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                            notification.type === 'error' && "bg-red-500",
                            notification.type === 'warning' && "bg-yellow-500",
                            notification.type === 'success' && "bg-green-500",
                            notification.type === 'info' && "bg-blue-500"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                          {notification.action && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2 h-6 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                notification.action!.handler();
                              }}
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Install App Button (Desktop) */}
          {isInstallable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={promptInstall}
              className="hidden lg:flex gap-2"
            >
              <Smartphone className="h-4 w-4" />
              <span className="hidden xl:inline">Install</span>
            </Button>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={(user as any).profilePicture} />
                  <AvatarFallback className="bg-[#1B5B5E] text-white text-xs">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge variant="outline" className="w-fit text-xs capitalize">
                    {user.role.replace('_', ' ')}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              {/* Connection Status (Desktop) */}
              <DropdownMenuItem disabled>
                {isOnline ? (
                  <>
                    <Wifi className="mr-2 h-4 w-4 text-green-600" />
                    Online
                  </>
                ) : (
                  <>
                    <WifiOff className="mr-2 h-4 w-4 text-red-600" />
                    Offline
                  </>
                )}
              </DropdownMenuItem>

              {syncStatus.unsyncedCount > 0 && (
                <DropdownMenuItem onClick={triggerSync}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync {syncStatus.unsyncedCount} items
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={logout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}