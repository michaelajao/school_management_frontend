/**
 * Centralized error handling for the application
 * Provides consistent error responses and logging
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND_ERROR');
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super('Too many requests', 429, 'RATE_LIMIT_ERROR', { retryAfter });
    this.name = 'RateLimitError';
  }
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof AppError) {
    return {
      error: error.code || 'API_ERROR',
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    // Known Error type but not our custom error
    return {
      error: 'UNKNOWN_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred'
        : error.message,
      statusCode: 500,
    };
  }

  // Unknown error type
  return {
    error: 'INTERNAL_ERROR',
    message: 'An internal server error occurred',
    statusCode: 500,
  };
}

/**
 * Create error response for API routes
 */
export function createErrorResponse(error: unknown, fallbackMessage = 'An error occurred') {
  const errorInfo = handleApiError(error);
  
  return Response.json(
    {
      success: false,
      error: errorInfo.error,
      message: errorInfo.message,
      ...(errorInfo.details && { details: errorInfo.details }),
    },
    { status: errorInfo.statusCode }
  );
}

/**
 * Log errors with context for debugging
 */
export function logError(error: unknown, context?: Record<string, any>) {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
    } : error,
    context,
  };

  console.error('Application Error:', JSON.stringify(errorInfo, null, 2));

  // In production, you might want to send this to a logging service
  // like Sentry, LogRocket, or CloudWatch
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry.captureException(error, { extra: context });
  }
}
