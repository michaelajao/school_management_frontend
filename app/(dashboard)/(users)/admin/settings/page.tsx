"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  School, 
  IdCard, 
  Bell, 
  Shield, 
  Database,
  Save,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

// Import setting components
import SchoolInfoSettings from '@/components/admin/settings/SchoolInfoSettings';
import StudentIdSettings from '@/components/admin/settings/StudentIdSettings';
import AcademicSettings from '@/components/admin/settings/AcademicSettings';
import NotificationSettings from '@/components/admin/settings/NotificationSettings';
import SecuritySettings from '@/components/admin/settings/SecuritySettings';
import DataManagementSettings from '@/components/admin/settings/DataManagementSettings';

// Import API service
import { SettingsApiService, type SchoolSettings } from '@/lib/api/settings';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SchoolSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('school-info');
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await SettingsApiService.getSettings();
      
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        // If no settings exist, create default settings
        const defaultSettings = SettingsApiService.getDefaultSettings();
        setSettings(defaultSettings as SchoolSettings);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load school settings. Using default configuration.',
        variant: 'destructive',
      });
      
      // Load default settings on error
      const defaultSettings = SettingsApiService.getDefaultSettings();
      setSettings(defaultSettings as SchoolSettings);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings || !hasChanges) return;

    try {
      setSaving(true);
      const response = await SettingsApiService.updateSettings(settings);
      
      if (response.success) {
        setSettings(response.data);
        setHasChanges(false);
        toast({
          title: 'Success',
          description: 'Settings saved successfully.',
        });
      } else {
        throw new Error(response.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSettingsChange = (newSettings: Partial<SchoolSettings>) => {
    if (!settings) return;
    
    setSettings({ ...settings, ...newSettings });
    setHasChanges(true);
  };

  const exportSettings = () => {
    if (!settings) return;
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `school-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Success',
      description: 'Settings exported successfully.',
    });
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setSettings(imported);
        setHasChanges(true);
        toast({
          title: 'Success',
          description: 'Settings imported successfully.',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Invalid settings file format.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading settings...</span>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Failed to load settings</h2>
          <Button onClick={loadSettings}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-6 h-6 text-[#1B5B5E]" />
                <h1 className="text-2xl font-bold text-gray-900">School Settings</h1>
                {hasChanges && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Unsaved Changes
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">
                Configure your school's information, student ID format, and system preferences
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
                id="import-settings"
              />
              
              <Button
                variant="outline"
                onClick={exportSettings}
                className="hidden sm:flex"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <Button
                variant="outline"
                onClick={() => document.getElementById('import-settings')?.click()}
                className="hidden sm:flex"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              
              <Button
                onClick={saveSettings}
                disabled={!hasChanges || saving}
                className="bg-[#1B5B5E] hover:bg-[#134345]"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <Card>
            <CardContent className="p-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <TabsTrigger value="school-info" className="flex items-center gap-2">
                  <School className="w-4 h-4" />
                  <span className="hidden sm:inline">School Info</span>
                </TabsTrigger>
                <TabsTrigger value="student-id" className="flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  <span className="hidden sm:inline">Student ID</span>
                </TabsTrigger>
                <TabsTrigger value="academic" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Academic</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span className="hidden sm:inline">Data</span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {/* Tab Content */}
          <TabsContent value="school-info">
            <SchoolInfoSettings
              settings={settings.schoolInfo}
              onChange={(schoolInfo) => handleSettingsChange({ schoolInfo })}
            />
          </TabsContent>

          <TabsContent value="student-id">
            <StudentIdSettings
              settings={settings.studentIdConfig}
              onChange={(studentIdConfig) => handleSettingsChange({ studentIdConfig })}
            />
          </TabsContent>

          <TabsContent value="academic">
            <AcademicSettings
              settings={settings.academicSettings}
              onChange={(academicSettings) => handleSettingsChange({ academicSettings })}
            />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSettings
              settings={settings.notificationSettings}
              onChange={(notificationSettings) => handleSettingsChange({ notificationSettings })}
            />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings
              settings={settings.securitySettings}
              onChange={(securitySettings) => handleSettingsChange({ securitySettings })}
            />
          </TabsContent>

          <TabsContent value="data">
            <DataManagementSettings
              onExport={exportSettings}
              onImport={() => document.getElementById('import-settings')?.click()}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Save Button */}
      {hasChanges && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden">
          <Button
            onClick={saveSettings}
            disabled={saving}
            className="w-full bg-[#1B5B5E] hover:bg-[#134345]"
            size="lg"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}