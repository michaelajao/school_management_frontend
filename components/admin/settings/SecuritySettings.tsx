"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Shield, Lock, Clock, AlertTriangle } from 'lucide-react';
import type { SecuritySettings } from '@/lib/api/settings';

interface SecuritySettingsProps {
  settings: SecuritySettings;
  onChange: (settings: SecuritySettings) => void;
}

export default function SecuritySettings({ settings, onChange }: SecuritySettingsProps) {
  const handleSettingChange = (field: keyof SecuritySettings, value: any) => {
    onChange({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Password Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Password Policy
          </CardTitle>
          <CardDescription>
            Configure password requirements for all users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password-length">Minimum Password Length</Label>
            <Input
              id="password-length"
              type="number"
              min="6"
              max="32"
              value={settings.passwordMinLength}
              onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value) || 8)}
            />
            <p className="text-sm text-gray-500">
              Minimum number of characters required (6-32)
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Special Characters</Label>
                <p className="text-sm text-gray-500">Require symbols like !@#$%^&*</p>
              </div>
              <Switch
                checked={settings.passwordRequireSpecialChars}
                onCheckedChange={(checked) => handleSettingChange('passwordRequireSpecialChars', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Require Numbers</Label>
                <p className="text-sm text-gray-500">Require at least one number (0-9)</p>
              </div>
              <Switch
                checked={settings.passwordRequireNumbers}
                onCheckedChange={(checked) => handleSettingChange('passwordRequireNumbers', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Require Uppercase Letters</Label>
                <p className="text-sm text-gray-500">Require at least one uppercase letter (A-Z)</p>
              </div>
              <Switch
                checked={settings.passwordRequireUppercase}
                onCheckedChange={(checked) => handleSettingChange('passwordRequireUppercase', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Session Security
          </CardTitle>
          <CardDescription>
            Configure session timeout and authentication settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Session Timeout</Label>
            <Select
              value={settings.sessionTimeout.toString()}
              onValueChange={(value) => handleSettingChange('sessionTimeout', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
                <SelectItem value="240">4 hours</SelectItem>
                <SelectItem value="480">8 hours</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              How long users stay logged in without activity
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">Require 2FA for admin users (recommended)</p>
            </div>
            <Switch
              checked={settings.twoFactorEnabled}
              onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Login Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Login Security
          </CardTitle>
          <CardDescription>
            Configure login attempt limits and lockout policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="login-attempts">Max Login Attempts</Label>
              <Input
                id="login-attempts"
                type="number"
                min="3"
                max="10"
                value={settings.loginAttemptLimit}
                onChange={(e) => handleSettingChange('loginAttemptLimit', parseInt(e.target.value) || 5)}
              />
              <p className="text-sm text-gray-500">
                Number of failed attempts before lockout
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lockout-duration">Lockout Duration</Label>
              <Select
                value={settings.lockoutDuration.toString()}
                onValueChange={(value) => handleSettingChange('lockoutDuration', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="1440">24 hours</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                How long to lock account after failed attempts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Shield className="w-5 h-5" />
            Security Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-green-700">
            <p>✓ Password minimum length: {settings.passwordMinLength} characters</p>
            <p>✓ Special characters: {settings.passwordRequireSpecialChars ? 'Required' : 'Optional'}</p>
            <p>✓ Numbers: {settings.passwordRequireNumbers ? 'Required' : 'Optional'}</p>
            <p>✓ Uppercase letters: {settings.passwordRequireUppercase ? 'Required' : 'Optional'}</p>
            <p>✓ Session timeout: {settings.sessionTimeout} minutes</p>
            <p>✓ Two-factor auth: {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
            <p>✓ Login attempts: {settings.loginAttemptLimit} max attempts</p>
            <p>✓ Lockout duration: {settings.lockoutDuration} minutes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}