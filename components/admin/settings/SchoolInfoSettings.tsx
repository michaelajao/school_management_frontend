"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Upload, Image as ImageIcon, X, School, Phone, Mail, Globe } from 'lucide-react';
import type { SchoolInfo } from '@/lib/api/settings';

interface SchoolInfoSettingsProps {
  settings: SchoolInfo;
  onChange: (settings: SchoolInfo) => void;
}

export default function SchoolInfoSettings({ settings, onChange }: SchoolInfoSettingsProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo || null);

  const handleInputChange = (field: keyof SchoolInfo, value: string | number) => {
    onChange({
      ...settings,
      [field]: value,
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setLogoPreview(result);
      handleInputChange('logo', result);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    handleInputChange('logo', '');
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="w-5 h-5" />
            Basic Information
          </CardTitle>
          <CardDescription>
            Configure your school's basic information and identity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* School Logo */}
          <div className="space-y-4">
            <Label>School Logo</Label>
            <div className="flex items-start gap-4">
              {logoPreview ? (
                <div className="relative">
                  <img
                    src={logoPreview}
                    alt="School Logo"
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                    onClick={removeLogo}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1 space-y-2">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Recommended: Square image, max 2MB (PNG, JPG, or SVG)
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* School Name and Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="school-name">School Name *</Label>
              <Input
                id="school-name"
                placeholder="Enter school name"
                value={settings.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school-code">School Code</Label>
              <Input
                id="school-code"
                placeholder="e.g., SMS, OHS"
                value={settings.schoolCode || ''}
                onChange={(e) => handleInputChange('schoolCode', e.target.value)}
                maxLength={10}
              />
              <p className="text-sm text-gray-500">
                Used for student ID generation and official documents
              </p>
            </div>
          </div>

          {/* Principal and Establishment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="principal-name">Principal Name</Label>
              <Input
                id="principal-name"
                placeholder="Enter principal's name"
                value={settings.principalName || ''}
                onChange={(e) => handleInputChange('principalName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="established-year">Established Year</Label>
              <Input
                id="established-year"
                type="number"
                placeholder="e.g., 1995"
                value={settings.establishedYear || ''}
                onChange={(e) => handleInputChange('establishedYear', parseInt(e.target.value) || undefined)}
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact Information
          </CardTitle>
          <CardDescription>
            Contact details for school communication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">School Address *</Label>
            <Textarea
              id="address"
              placeholder="Enter complete school address"
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
              required
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="info@school.edu"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                id="website"
                type="url"
                placeholder="https://www.school.edu"
                value={settings.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            How your school information will appear in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="flex items-start gap-4">
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="School Logo"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {settings.name || 'School Name'}
                </h3>
                {settings.schoolCode && (
                  <Badge variant="outline" className="mt-1">
                    {settings.schoolCode}
                  </Badge>
                )}
                {settings.principalName && (
                  <p className="text-sm text-gray-600 mt-2">
                    Principal: {settings.principalName}
                  </p>
                )}
                {settings.establishedYear && (
                  <p className="text-sm text-gray-600">
                    Established: {settings.establishedYear}
                  </p>
                )}
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-600">
                    📍 {settings.address || 'School Address'}
                  </p>
                  <p className="text-sm text-gray-600">
                    📞 {settings.phone || 'Phone Number'}
                  </p>
                  <p className="text-sm text-gray-600">
                    ✉️ {settings.email || 'Email Address'}
                  </p>
                  {settings.website && (
                    <p className="text-sm text-gray-600">
                      🌐 {settings.website}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}