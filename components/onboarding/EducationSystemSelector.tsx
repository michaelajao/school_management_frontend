'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Globe, 
  ChevronDown, 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter
} from 'lucide-react';

import { 
  educationSystemsApi, 
  educationSystemHelpers,
  EducationSystem, 
  GradeLevel, 
  SubjectArea 
} from '@/lib/api/education-systems';

interface EducationSystemSelectorProps {
  selectedSystem?: EducationSystem | null;
  onSystemSelect: (system: EducationSystem) => void;
  onNext?: () => void;
  showNextButton?: boolean;
}

export default function EducationSystemSelector({
  selectedSystem,
  onSystemSelect,
  onNext,
  showNextButton = true
}: EducationSystemSelectorProps) {
  const [systems, setSystems] = useState<EducationSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [expandedSystem, setExpandedSystem] = useState<string | null>(null);

  // Load education systems
  useEffect(() => {
    loadEducationSystems();
  }, []);

  const loadEducationSystems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await educationSystemsApi.getAll();
      setSystems(data);
      
      // If no system is selected and we have systems, auto-select the first one
      if (!selectedSystem && data.length > 0) {
        onSystemSelect(data[0]);
      }
    } catch (err) {
      setError('Failed to load education systems. Please try again.');
      console.error('Error loading education systems:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter systems based on search and country
  const filteredSystems = systems.filter(system => {
    const matchesSearch = searchQuery === '' || 
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = selectedCountry === 'all' || system.country === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  // Get unique countries
  const countries = [...new Set(systems.map(s => s.country))].sort();

  const handleSystemSelect = (system: EducationSystem) => {
    onSystemSelect(system);
    setExpandedSystem(system.id === expandedSystem ? null : system.id);
  };

  const toggleSystemDetails = (systemId: string) => {
    setExpandedSystem(expandedSystem === systemId ? null : systemId);
  };

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            Choose Your Education System
          </CardTitle>
          <CardDescription>
            Select the education system that matches your school's curriculum and grading structure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-6 w-6" />
            Error Loading Education Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex gap-4">
            <Button onClick={loadEducationSystems} variant="outline">
              Try Again
            </Button>
            {showNextButton && onNext && (
              <Button onClick={onNext} className="flex-1">
                Continue Without Education System
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            You can set up your education system later from the admin dashboard.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-6 w-6" />
          Choose Your Education System
        </CardTitle>
        <CardDescription>
          Select the education system that best matches your school's curriculum, grading structure, and academic calendar.
          This will configure grade levels, subjects, and assessment methods for your school.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search Education Systems</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name, country, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="w-full sm:w-48">
            <Label htmlFor="country-filter">Filter by Country</Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredSystems.length} education system{filteredSystems.length !== 1 ? 's' : ''} found
          </p>
          {selectedSystem && (
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {selectedSystem.name} selected
            </Badge>
          )}
        </div>

        {/* Education Systems List */}
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {filteredSystems.map((system) => {
              const isSelected = selectedSystem?.id === system.id;
              const isExpanded = expandedSystem === system.id;
              const gradeLevelsByStage = educationSystemHelpers.getGradeLevelsByStage(system.gradeLevels || []);
              
              return (
                <Card 
                  key={system.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                  }`}
                  onClick={() => handleSystemSelect(system)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{system.name}</h3>
                          <Badge variant="secondary">{system.code}</Badge>
                          <Badge variant="outline">{system.country}</Badge>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {system.description || educationSystemHelpers.getSystemDescription(system)}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            <span>{system.gradeLevels?.length || 0} Grade Levels</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{system.subjectAreas?.length || 0} Subject Areas</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{system.termsPerYear} Terms/Year</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSystemDetails(system.id);
                        }}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Expanded Details */}
                    <Collapsible open={isExpanded}>
                      <CollapsibleContent className="mt-4">
                        <Separator className="mb-4" />
                        
                        <Tabs defaultValue="grades" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="grades">Grade Levels</TabsTrigger>
                            <TabsTrigger value="subjects">Subjects</TabsTrigger>
                            <TabsTrigger value="assessment">Assessment</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="grades" className="mt-4">
                            <div className="space-y-4">
                              {Object.entries(gradeLevelsByStage).map(([stage, levels]) => (
                                <div key={stage}>
                                  <h4 className="font-medium text-sm mb-2">{stage}</h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {levels.map((level) => (
                                      <Badge key={level.id} variant="outline" className="justify-start text-xs">
                                        {level.displayName} - {level.name}
                                        {level.typicalAgeMin && level.typicalAgeMax && (
                                          <span className="ml-1 text-muted-foreground">
                                            ({level.typicalAgeMin}-{level.typicalAgeMax}y)
                                          </span>
                                        )}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="subjects" className="mt-4">
                            <div className="space-y-3">
                              {educationSystemHelpers.getSubjectAreasByCategory(system.subjectAreas || [])
                                && Object.entries(educationSystemHelpers.getSubjectAreasByCategory(system.subjectAreas || []))
                                  .map(([category, subjects]) => (
                                <div key={category}>
                                  <h4 className="font-medium text-sm mb-2">{category} Subjects</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {subjects.map((subject) => (
                                      <Badge 
                                        key={subject.id} 
                                        variant={subject.isRequired ? "default" : "secondary"}
                                        className="text-xs"
                                      >
                                        {subject.name}
                                        {subject.isRequired && " (Required)"}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="assessment" className="mt-4">
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-sm mb-2">Assessment Types</h4>
                                <div className="space-y-2">
                                  {system.assessmentTypes?.map((assessment) => (
                                    <div key={assessment.id} className="flex justify-between items-center text-sm">
                                      <span>{assessment.name}</span>
                                      <Badge variant="outline">
                                        {assessment.weight ? `${assessment.weight}%` : 'No weight'}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-sm mb-2">Academic Calendar</h4>
                                <div className="text-sm space-y-1">
                                  <p><strong>Terms per Year:</strong> {system.termsPerYear}</p>
                                  <p><strong>Term Names:</strong> {(system.termNames || []).join(', ')}</p>
                                  <p><strong>Pass Mark:</strong> {system.passMarkPercentage}%</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>

        {/* No Results */}
        {filteredSystems.length === 0 && (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Education Systems Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or country filter.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Next Button */}
        {showNextButton && selectedSystem && (
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onNext} size="lg">
              Continue with {selectedSystem.name}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}