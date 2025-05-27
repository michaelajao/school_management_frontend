// Export API client
export { apiClient } from './client';
export type { ApiError, ApiResponse } from './client';

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
