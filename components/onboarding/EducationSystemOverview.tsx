'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  BarChart,
  Globe,
  CheckCircle2
} from 'lucide-react';

import { 
  EducationSystem, 
  educationSystemHelpers
} from '@/lib/api/education-systems';

interface EducationSystemOverviewProps {
  system: EducationSystem;
  showDetails?: boolean;
  className?: string;
}

export default function EducationSystemOverview({
  system,
  showDetails = true,
  className = ""
}: EducationSystemOverviewProps) {
  const gradeLevelsByStage = educationSystemHelpers.getGradeLevelsByStage(system.gradeLevels || []);
  const subjectsByCategory = educationSystemHelpers.getSubjectAreasByCategory(system.subjectAreas || []);
  const totalAssessmentWeight = educationSystemHelpers.getTotalAssessmentWeight(system.assessmentTypes || []);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {system.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {system.description || educationSystemHelpers.getSystemDescription(system)}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="outline">{system.code}</Badge>
            <Badge variant="secondary">{system.country}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <GraduationCap className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{system.gradeLevels?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Grade Levels</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{system.subjectAreas?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Subject Areas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{system.termsPerYear}</p>
              <p className="text-xs text-muted-foreground">Terms/Year</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
            <BarChart className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{system.passMarkPercentage}%</p>
              <p className="text-xs text-muted-foreground">Pass Mark</p>
            </div>
          </div>
        </div>

        {showDetails && (
          <>
            <Separator />

            {/* Grade Levels by Stage */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Grade Levels by Stage
              </h3>
              <div className="space-y-3">
                {Object.entries(gradeLevelsByStage).map(([stage, levels]) => (
                  <div key={stage}>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      {stage} ({levels.length} levels)
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {levels.map((level) => (
                        <Badge 
                          key={level.id} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {level.displayName}
                          {level.isPromotionLevel && (
                            <CheckCircle2 className="h-3 w-3 ml-1" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Subject Areas */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Subject Areas
              </h3>
              <div className="space-y-3">
                {Object.entries(subjectsByCategory).map(([category, subjects]) => (
                  <div key={category}>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">
                      {category} ({subjects.length} subjects)
                    </h4>
                    <div className="flex flex-wrap gap-1">
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
            </div>

            <Separator />

            {/* Assessment Information */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Assessment & Calendar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Assessment Types */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    Assessment Types
                  </h4>
                  <div className="space-y-2">
                    {system.assessmentTypes?.map((assessment) => (
                      <div key={assessment.id} className="flex justify-between items-center text-sm">
                        <span className="text-xs">{assessment.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {assessment.weight ? `${assessment.weight}%` : 'No weight'}
                        </Badge>
                      </div>
                    ))}
                    {totalAssessmentWeight > 0 && (
                      <div className="flex justify-between items-center text-sm font-medium pt-2 border-t">
                        <span className="text-xs">Total Weight</span>
                        <Badge variant={totalAssessmentWeight === 100 ? "default" : "destructive"} className="text-xs">
                          {totalAssessmentWeight}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Academic Calendar */}
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    Academic Calendar
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-xs">Terms per Year</span>
                      <span className="text-xs font-medium">{system.termsPerYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs">Pass Mark</span>
                      <span className="text-xs font-medium">{system.passMarkPercentage}%</span>
                    </div>
                    {system.termNames && system.termNames.length > 0 && (
                      <div>
                        <span className="text-xs text-muted-foreground">Term Names:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {system.termNames.map((name, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}