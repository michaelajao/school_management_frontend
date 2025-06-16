"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  IdCard, 
  Eye, 
  RefreshCw, 
  Copy, 
  Check, 
  Info,
  Lightbulb,
  Settings
} from 'lucide-react';
import type { StudentIdConfig } from '@/lib/api/settings';
import { SettingsApiService } from '@/lib/api/settings';
import { StudentIdGenerator } from '@/lib/utils/studentIdGenerator';

interface StudentIdSettingsProps {
  settings: StudentIdConfig;
  onChange: (settings: StudentIdConfig) => void;
}

export default function StudentIdSettings({ settings, onChange }: StudentIdSettingsProps) {
  const [examples, setExamples] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

  // Update examples when settings change
  useEffect(() => {
    generatePreview();
  }, [settings]);

  const generatePreview = async () => {
    try {
      setIsGeneratingPreview(true);
      
      // Generate examples using the utility
      const generator = new StudentIdGenerator({ config: settings });
      const generatedExamples = generator.generateExamples(5);
      
      setExamples(generatedExamples);
      
      // Update settings with examples
      onChange({
        ...settings,
        examples: generatedExamples
      });
    } catch (error) {
      console.error('Failed to generate preview:', error);
      setExamples(['Error generating preview']);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const handleSettingChange = (field: keyof StudentIdConfig, value: any) => {
    const newSettings = {
      ...settings,
      [field]: value,
    };
    onChange(newSettings);
  };

  const handlePatternSelect = (templatePattern: string) => {
    handleSettingChange('pattern', templatePattern);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const patternTemplates = SettingsApiService.getPatternTemplates();

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IdCard className="w-5 h-5" />
            Student ID Configuration
          </CardTitle>
          <CardDescription>
            Configure how student IDs are generated for your school
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Format Type */}
          <div className="space-y-3">
            <Label>ID Generation Format</Label>
            <Select
              value={settings.format}
              onValueChange={(value: 'auto' | 'custom') => handleSettingChange('format', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatic (Recommended)</SelectItem>
                <SelectItem value="custom">Custom Pattern</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Automatic format uses predefined templates, while custom allows full pattern control
            </p>
          </div>

          <Separator />

          {/* Pattern Selection */}
          {settings.format === 'auto' && (
            <div className="space-y-3">
              <Label>Pattern Template</Label>
              <div className="grid gap-3">
                {patternTemplates.map((template, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      settings.pattern === template.pattern
                        ? 'border-[#1B5B5E] bg-[#1B5B5E]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePatternSelect(template.pattern)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {template.example}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Pattern */}
          {settings.format === 'custom' && (
            <div className="space-y-3">
              <Label htmlFor="custom-pattern">Custom Pattern</Label>
              <Input
                id="custom-pattern"
                placeholder="e.g., {PREFIX}-{YEAR}-{SEQUENCE}"
                value={settings.pattern}
                onChange={(e) => handleSettingChange('pattern', e.target.value)}
                className="font-mono"
              />
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Available placeholders:</p>
                    <ul className="space-y-1">
                      <li><code>{'{PREFIX}'}</code> - School prefix</li>
                      <li><code>{'{YEAR}'}</code> - Full year (2024)</li>
                      <li><code>{'{YEAR_SHORT}'}</code> - Short year (24)</li>
                      <li><code>{'{SEQUENCE}'}</code> - Sequential number</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Basic Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prefix */}
            <div className="space-y-2">
              <Label htmlFor="prefix">School Prefix</Label>
              <Input
                id="prefix"
                placeholder="e.g., SMS, OHS"
                value={settings.prefix}
                onChange={(e) => handleSettingChange('prefix', e.target.value.toUpperCase())}
                maxLength={10}
                className="font-mono"
              />
              <p className="text-sm text-gray-500">
                Short code identifying your school
              </p>
            </div>

            {/* Sequence Length */}
            <div className="space-y-2">
              <Label htmlFor="sequence-length">Sequence Length</Label>
              <Select
                value={settings.sequenceLength.toString()}
                onValueChange={(value) => handleSettingChange('sequenceLength', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 digits (001-999)</SelectItem>
                  <SelectItem value="4">4 digits (0001-9999)</SelectItem>
                  <SelectItem value="5">5 digits (00001-99999)</SelectItem>
                  <SelectItem value="6">6 digits (000001-999999)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Year Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Include Year in ID</Label>
                <p className="text-sm text-gray-500">
                  Whether to include the enrollment year in student IDs
                </p>
              </div>
              <Switch
                checked={settings.includeYear}
                onCheckedChange={(checked) => handleSettingChange('includeYear', checked)}
              />
            </div>

            {settings.includeYear && (
              <div className="ml-6 space-y-3">
                <div className="space-y-2">
                  <Label>Year Format</Label>
                  <Select
                    value={settings.yearFormat}
                    onValueChange={(value: 'full' | 'short') => handleSettingChange('yearFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Year (2024)</SelectItem>
                      <SelectItem value="short">Short Year (24)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Advanced Settings */}
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Starting Number */}
            <div className="space-y-2">
              <Label htmlFor="starting-number">Starting Number</Label>
              <Input
                id="starting-number"
                type="number"
                min="1"
                max="999999"
                value={settings.startingNumber}
                onChange={(e) => handleSettingChange('startingNumber', parseInt(e.target.value) || 1)}
              />
              <p className="text-sm text-gray-500">
                First sequence number to use
              </p>
            </div>

            {/* Case Format */}
            <div className="space-y-2">
              <Label>Case Format</Label>
              <Select
                value={settings.caseFormat}
                onValueChange={(value: 'upper' | 'lower' | 'mixed') => handleSettingChange('caseFormat', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upper">UPPERCASE</SelectItem>
                  <SelectItem value="lower">lowercase</SelectItem>
                  <SelectItem value="mixed">Mixed Case</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Separator */}
          <div className="space-y-2">
            <Label htmlFor="separator">Custom Separator (Optional)</Label>
            <Input
              id="separator"
              placeholder="e.g., -, _, ."
              value={settings.separator || ''}
              onChange={(e) => handleSettingChange('separator', e.target.value)}
              maxLength={3}
              className="font-mono"
            />
            <p className="text-sm text-gray-500">
              Character to separate ID components (leave empty for none)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Live Preview
          </CardTitle>
          <CardDescription>
            See how your student IDs will look with the current settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Generated with current settings:
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={generatePreview}
              disabled={isGeneratingPreview}
            >
              {isGeneratingPreview ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>

          <div className="grid gap-2">
            {examples.map((example, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <code className="font-mono text-lg font-semibold text-[#1B5B5E]">
                  {example}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(example, index)}
                  className="ml-2"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Pattern Info */}
          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Current Pattern:</p>
                <code className="font-mono">{settings.pattern}</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Migration Notice */}
      {examples.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Settings className="w-5 h-5" />
              Migration Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-700">
              Changing the student ID format will affect all new students. Existing student IDs will remain unchanged unless you choose to migrate them. A migration tool will be available after saving these settings.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}