/**
 * Education Systems API service
 * Provides functions to interact with the global education systems backend
 */

import { apiClient } from './client';

// Types for Education System data structures
export interface GradeLevel {
  id: string;
  name: string;
  displayName: string;
  code: string;
  level: number;
  stage: string;
  typicalAgeMin?: number;
  typicalAgeMax?: number;
  isPromotionLevel: boolean;
  hasStreamSelection: boolean;
}

export interface SubjectArea {
  id: string;
  name: string;
  code: string;
  category?: string;
  isRequired: boolean;
  description?: string;
}

export interface AssessmentType {
  id: string;
  name: string;
  code: string;
  weight?: number;
  description?: string;
}

export interface EducationSystem {
  id: string;
  name: string;
  code: string;
  country: string;
  description?: string;
  isActive: boolean;
  termsPerYear: number;
  termNames: string[];
  gradingScale: Record<string, any>;
  passMarkPercentage: number;
  gradeLevels: GradeLevel[];
  subjectAreas: SubjectArea[];
  assessmentTypes: AssessmentType[];
  _count?: {
    schools: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Education System API functions
export const educationSystemsApi = {
  /**
   * Get all education systems
   */
  async getAll(): Promise<EducationSystem[]> {
    const response = await apiClient.get('/education-systems');
    return response.data;
  },

  /**
   * Get education systems by country
   */
  async getByCountry(country: string): Promise<EducationSystem[]> {
    const response = await apiClient.get(`/education-systems/by-country/${encodeURIComponent(country)}`);
    return response.data;
  },

  /**
   * Get a single education system by ID
   */
  async getById(id: string): Promise<EducationSystem> {
    const response = await apiClient.get(`/education-systems/${id}`);
    return response.data;
  },

  /**
   * Get education system by code
   */
  async getByCode(code: string): Promise<EducationSystem> {
    const response = await apiClient.get(`/education-systems/by-code/${encodeURIComponent(code)}`);
    return response.data;
  },

  /**
   * Get grade levels for a specific education system
   */
  async getGradeLevels(systemId: string): Promise<GradeLevel[]> {
    const response = await apiClient.get(`/education-systems/${systemId}/grade-levels`);
    return response.data;
  },

  /**
   * Get subject areas for a specific education system
   */
  async getSubjectAreas(systemId: string): Promise<SubjectArea[]> {
    const response = await apiClient.get(`/education-systems/${systemId}/subject-areas`);
    return response.data;
  },

  /**
   * Get assessment types for a specific education system
   */
  async getAssessmentTypes(systemId: string): Promise<AssessmentType[]> {
    const response = await apiClient.get(`/education-systems/${systemId}/assessment-types`);
    return response.data;
  },

  /**
   * Get available countries with education systems
   */
  async getAvailableCountries(): Promise<string[]> {
    const systems = await this.getAll();
    const countries = [...new Set(systems.map(system => system.country))];
    return countries.sort();
  },

  /**
   * Search education systems by name or country
   */
  async search(query: string): Promise<EducationSystem[]> {
    const systems = await this.getAll();
    const searchTerm = query.toLowerCase();
    
    return systems.filter(system => 
      system.name.toLowerCase().includes(searchTerm) ||
      system.country.toLowerCase().includes(searchTerm) ||
      system.code.toLowerCase().includes(searchTerm)
    );
  },

  /**
   * Get education systems grouped by country
   */
  async getGroupedByCountry(): Promise<Record<string, EducationSystem[]>> {
    const systems = await this.getAll();
    const grouped: Record<string, EducationSystem[]> = {};
    
    systems.forEach(system => {
      if (!grouped[system.country]) {
        grouped[system.country] = [];
      }
      grouped[system.country].push(system);
    });
    
    return grouped;
  },

  // Admin functions (require super admin permissions)
  admin: {
    /**
     * Create a new education system (Super Admin only)
     */
    async create(data: Partial<EducationSystem>): Promise<EducationSystem> {
      const response = await apiClient.post('/education-systems', data);
      return response.data;
    },

    /**
     * Update an education system (Super Admin only)
     */
    async update(id: string, data: Partial<EducationSystem>): Promise<EducationSystem> {
      const response = await apiClient.patch(`/education-systems/${id}`, data);
      return response.data;
    },

    /**
     * Activate an education system (Super Admin only)
     */
    async activate(id: string): Promise<EducationSystem> {
      const response = await apiClient.patch(`/education-systems/${id}/activate`);
      return response.data;
    },

    /**
     * Deactivate an education system (Super Admin only)
     */
    async deactivate(id: string): Promise<EducationSystem> {
      const response = await apiClient.patch(`/education-systems/${id}/deactivate`);
      return response.data;
    },
  }
};

// Export types for use in components
export type {
  EducationSystem,
  GradeLevel,
  SubjectArea,
  AssessmentType
};

// Helper functions for UI components
export const educationSystemHelpers = {
  /**
   * Get a human-readable description for an education system
   */
  getSystemDescription(system: EducationSystem): string {
    const gradeCount = system.gradeLevels?.length || 0;
    const termText = system.termsPerYear === 1 ? 'term' : 'terms';
    
    return `${system.country} education system with ${gradeCount} grade levels and ${system.termsPerYear} ${termText} per year.`;
  },

  /**
   * Get grade levels organized by stage
   */
  getGradeLevelsByStage(gradeLevels: GradeLevel[]): Record<string, GradeLevel[]> {
    const stages: Record<string, GradeLevel[]> = {};
    
    gradeLevels.forEach(level => {
      if (!stages[level.stage]) {
        stages[level.stage] = [];
      }
      stages[level.stage].push(level);
    });
    
    // Sort grade levels within each stage by level number
    Object.keys(stages).forEach(stage => {
      stages[stage].sort((a, b) => a.level - b.level);
    });
    
    return stages;
  },

  /**
   * Get the appropriate grade level display name with age range
   */
  getGradeLevelDisplayWithAge(gradeLevel: GradeLevel): string {
    const ageRange = gradeLevel.typicalAgeMin && gradeLevel.typicalAgeMax 
      ? ` (Ages ${gradeLevel.typicalAgeMin}-${gradeLevel.typicalAgeMax})`
      : '';
    
    return `${gradeLevel.displayName} - ${gradeLevel.name}${ageRange}`;
  },

  /**
   * Check if a grade level supports multiple class sections
   */
  supportsMultipleSections(gradeLevel: GradeLevel): boolean {
    // All grade levels can have multiple sections (1A, 1B, etc.)
    return true;
  },

  /**
   * Get subject areas grouped by category
   */
  getSubjectAreasByCategory(subjectAreas: SubjectArea[]): Record<string, SubjectArea[]> {
    const categories: Record<string, SubjectArea[]> = {};
    
    subjectAreas.forEach(area => {
      const category = area.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(area);
    });
    
    return categories;
  },

  /**
   * Calculate total assessment weight
   */
  getTotalAssessmentWeight(assessmentTypes: AssessmentType[]): number {
    return assessmentTypes.reduce((total, type) => total + (type.weight || 0), 0);
  },

  /**
   * Format grading scale for display
   */
  formatGradingScale(gradingScale: Record<string, any>): string {
    const grades = Object.keys(gradingScale).sort();
    return grades.map(grade => {
      const info = gradingScale[grade];
      return `${grade}: ${info.min}-${info.max}% (${info.description})`;
    }).join(', ');
  }
};