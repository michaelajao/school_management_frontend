import type { StudentIdConfig } from '@/lib/api/settings';

export interface StudentIdGeneratorOptions {
  config: StudentIdConfig;
  existingIds?: string[];
  customYear?: number;
}

export interface GeneratedStudentId {
  id: string;
  sequence: number;
  year: number;
  isUnique: boolean;
  pattern: string;
}

export class StudentIdGenerator {
  private config: StudentIdConfig;
  private existingIds: Set<string>;
  private currentYear: number;

  constructor(options: StudentIdGeneratorOptions) {
    this.config = options.config;
    this.existingIds = new Set(options.existingIds || []);
    this.currentYear = options.customYear || new Date().getFullYear();
  }

  /**
   * Generate a new unique student ID
   */
  generateId(sequence?: number): GeneratedStudentId {
    const year = this.currentYear;
    const yearStr = this.config.yearFormat === 'full' ? year.toString() : year.toString().slice(-2);
    
    // If sequence not provided, find next available
    const finalSequence = sequence || this.findNextSequence();
    const sequenceStr = finalSequence.toString().padStart(this.config.sequenceLength, '0');
    
    // Build ID from pattern
    let id = this.buildIdFromPattern(yearStr, sequenceStr);
    
    // Apply case formatting
    id = this.applyFormatting(id);
    
    // Check uniqueness
    const isUnique = !this.existingIds.has(id);
    
    return {
      id,
      sequence: finalSequence,
      year,
      isUnique,
      pattern: this.config.pattern
    };
  }

  /**
   * Generate multiple IDs in batch
   */
  generateBatch(count: number, startSequence?: number): GeneratedStudentId[] {
    const results: GeneratedStudentId[] = [];
    let currentSequence = startSequence || this.findNextSequence();
    
    for (let i = 0; i < count; i++) {
      const result = this.generateId(currentSequence + i);
      results.push(result);
      
      // Add to existing IDs to prevent duplicates in batch
      if (result.isUnique) {
        this.existingIds.add(result.id);
      }
    }
    
    return results;
  }

  /**
   * Validate an existing student ID against current config
   */
  validateId(studentId: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    try {
      // Check if ID matches current pattern
      const regex = this.createValidationRegex();
      if (!regex.test(studentId)) {
        errors.push('ID does not match current pattern format');
      }
      
      // Check prefix
      if (!studentId.toUpperCase().startsWith(this.config.prefix.toUpperCase())) {
        errors.push(`ID must start with prefix: ${this.config.prefix}`);
      }
      
      // Check uniqueness
      if (this.existingIds.has(studentId)) {
        errors.push('ID already exists');
      }
      
      // Check length constraints
      const expectedLength = this.calculateExpectedLength();
      if (studentId.length !== expectedLength) {
        errors.push(`ID length should be ${expectedLength} characters`);
      }
      
    } catch (error) {
      errors.push('Invalid ID format');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Generate preview examples
   */
  generateExamples(count: number = 5): string[] {
    return this.generateBatch(count).map(result => result.id);
  }

  /**
   * Find next available sequence number
   */
  private findNextSequence(): number {
    let sequence = this.config.startingNumber || 1;
    const yearStr = this.config.yearFormat === 'full' 
      ? this.currentYear.toString() 
      : this.currentYear.toString().slice(-2);
    
    while (true) {
      const sequenceStr = sequence.toString().padStart(this.config.sequenceLength, '0');
      const testId = this.applyFormatting(this.buildIdFromPattern(yearStr, sequenceStr));
      
      if (!this.existingIds.has(testId)) {
        break;
      }
      sequence++;
    }
    
    return sequence;
  }

  /**
   * Build ID from pattern template
   */
  private buildIdFromPattern(yearStr: string, sequenceStr: string): string {
    let id = this.config.pattern;
    
    // Replace pattern placeholders
    id = id.replace(/{PREFIX}/g, this.config.prefix);
    id = id.replace(/{YEAR}/g, this.config.includeYear ? yearStr : '');
    id = id.replace(/{YEAR_SHORT}/g, this.config.includeYear ? yearStr.slice(-2) : '');
    id = id.replace(/{SEQUENCE}/g, sequenceStr);
    
    // Handle separators
    if (this.config.separator) {
      id = id.replace(/([A-Z0-9])([A-Z0-9])/g, `$1${this.config.separator}$2`);
    }
    
    return id;
  }

  /**
   * Apply case formatting
   */
  private applyFormatting(id: string): string {
    switch (this.config.caseFormat) {
      case 'upper':
        return id.toUpperCase();
      case 'lower':
        return id.toLowerCase();
      case 'mixed':
      default:
        return id;
    }
  }

  /**
   * Create regex for validation
   */
  private createValidationRegex(): RegExp {
    const yearStr = this.config.yearFormat === 'full' ? '\\d{4}' : '\\d{2}';
    const sequenceStr = `\\d{${this.config.sequenceLength}}`;
    
    let pattern = this.config.pattern;
    pattern = pattern.replace(/{PREFIX}/g, this.config.prefix);
    pattern = pattern.replace(/{YEAR}/g, this.config.includeYear ? yearStr : '');
    pattern = pattern.replace(/{YEAR_SHORT}/g, this.config.includeYear ? '\\d{2}' : '');
    pattern = pattern.replace(/{SEQUENCE}/g, sequenceStr);
    
    // Escape special regex characters
    pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    return new RegExp(`^${pattern}$`, 'i');
  }

  /**
   * Calculate expected ID length
   */
  private calculateExpectedLength(): number {
    const year = this.currentYear;
    const yearStr = this.config.yearFormat === 'full' ? year.toString() : year.toString().slice(-2);
    const sequenceStr = '1'.padStart(this.config.sequenceLength, '0');
    
    const testId = this.buildIdFromPattern(yearStr, sequenceStr);
    return testId.length;
  }

  /**
   * Extract components from existing ID
   */
  static extractComponents(studentId: string, config: StudentIdConfig): {
    prefix?: string;
    year?: number;
    sequence?: number;
  } | null {
    try {
      const regex = new RegExp(
        config.pattern
          .replace(/{PREFIX}/g, `(${config.prefix})`)
          .replace(/{YEAR}/g, config.includeYear ? '(\\d{4})' : '')
          .replace(/{YEAR_SHORT}/g, config.includeYear ? '(\\d{2})' : '')
          .replace(/{SEQUENCE}/g, '(\\d+)'),
        'i'
      );
      
      const match = studentId.match(regex);
      if (!match) return null;
      
      const components: any = {};
      let groupIndex = 1;
      
      components.prefix = match[groupIndex++];
      
      if (config.includeYear) {
        const yearMatch = match[groupIndex++];
        if (yearMatch) {
          components.year = config.yearFormat === 'full' 
            ? parseInt(yearMatch)
            : parseInt('20' + yearMatch);
        }
      }
      
      const sequenceMatch = match[groupIndex];
      if (sequenceMatch) {
        components.sequence = parseInt(sequenceMatch);
      }
      
      return components;
    } catch {
      return null;
    }
  }

  /**
   * Migrate existing IDs to new format
   */
  static generateMigrationPlan(
    existingIds: string[],
    oldConfig: StudentIdConfig,
    newConfig: StudentIdConfig
  ): Array<{ oldId: string; newId: string; success: boolean; error?: string }> {
    const migrationPlan: Array<{ oldId: string; newId: string; success: boolean; error?: string }> = [];
    const generator = new StudentIdGenerator({ config: newConfig, existingIds: [] });
    
    existingIds.forEach((oldId, index) => {
      try {
        const components = this.extractComponents(oldId, oldConfig);
        if (!components) {
          migrationPlan.push({
            oldId,
            newId: '',
            success: false,
            error: 'Could not extract components from old ID'
          });
          return;
        }
        
        const result = generator.generateId(components.sequence || (index + 1));
        migrationPlan.push({
          oldId,
          newId: result.id,
          success: result.isUnique,
          error: result.isUnique ? undefined : 'Generated ID conflicts with existing ID'
        });
        
        if (result.isUnique) {
          generator.existingIds.add(result.id);
        }
      } catch (error) {
        migrationPlan.push({
          oldId,
          newId: '',
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });
    
    return migrationPlan;
  }
}