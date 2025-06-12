// Export API client
export { apiClient } from './client';
export type { ApiError, ApiResponse, PaginatedResponse } from './client';

// Export auth API
export { AuthApiService } from './auth';
export type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  RefreshTokenResponse,
} from './auth';

// Export users API
export { UsersApiService } from './users';
export type {
  CreateUserData,
  UpdateUserData,
  UserFilters,
  PaginatedUsers,
} from './users';

// Export students API
export { StudentsApiService } from './students';
export type {
  Student,
  CreateStudentData,
  UpdateStudentData,
  StudentFilters,
  PaginatedStudents,
  StudentStats,
  StudentTransfer,
  StudentPromotion,
} from './students';

// Export staff API
export { StaffApiService } from './staff';
export type {
  Staff,
  CreateStaffData,
  UpdateStaffData,
  StaffFilters,
  PaginatedStaff,
  StaffStats,
} from './staff';

// Export parents API
export { ParentsApiService } from './parents';
export type {
  Parent,
  CreateParentData,
  UpdateParentData,
  ParentFilters,
  PaginatedParents,
  ParentStats,
  ParentChildAssociation,
} from './parents';

// Export grades API
export { GradesApiService } from './grades';
export type {
  Grade,
  CreateGradeData,
  UpdateGradeData,
  GradeFilters,
  PaginatedGrades,
  GradeStats,
  StudentGradeSummary,
  BulkGradeData,
} from './grades';

// Export subjects API
export { SubjectsApiService } from './subjects';
export type {
  Subject,
  CreateSubjectData,
  UpdateSubjectData,
  SubjectFilters,
  PaginatedSubjects,
  SubjectStats,
  SubjectTeacherAssignment,
  SubjectClassAssignment,
} from './subjects';

// Export classes API
export { ClassesApiService } from './classes';
export type {
  Class,
  CreateClassData,
  UpdateClassData,
  ClassFilters,
  PaginatedClasses,
  ClassStudent,
} from './classes';

// Export attendance API
export { AttendanceApiService } from './attendance';
export type {
  AttendanceRecord,
  CreateAttendanceData,
  UpdateAttendanceData,
  BulkAttendanceData,
  AttendanceFilters,
  PaginatedAttendance,
  AttendanceStats,
  ClassAttendanceStats,
} from './attendance';

// Export education systems API
export { educationSystemsApi, educationSystemHelpers } from './education-systems';
export type {
  EducationSystem,
  GradeLevel,
  SubjectArea,
  AssessmentType,
} from './education-systems';
