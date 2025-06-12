/**
 * Simple rate limiter for API routes
 * Prevents abuse and ensures fair usage
 */

interface RateLimitConfig {
  limit: number;      // Number of requests allowed
  window: number;     // Time window in milliseconds
}

// In-memory store for rate limiting (use Redis in production)
const requests = new Map<string, number[]>();

export function rateLimit(
  identifier: string, 
  config: RateLimitConfig = { limit: 10, window: 60000 }
): { success: boolean; reset: number; remaining: number } {
  const now = Date.now();
  const { limit, window } = config;
  
  // Get existing requests for this identifier
  const userRequests = requests.get(identifier) || [];
  
  // Clean old requests outside the window
  const validRequests = userRequests.filter(time => now - time < window);
  
  // Check if limit exceeded
  if (validRequests.length >= limit) {
    const oldestRequest = Math.min(...validRequests);
    const reset = oldestRequest + window;
    
    return {
      success: false,
      reset,
      remaining: 0,
    };
  }
  
  // Add current request
  validRequests.push(now);
  requests.set(identifier, validRequests);
  
  return {
    success: true,
    reset: now + window,
    remaining: limit - validRequests.length,
  };
}

/**
 * Get client identifier for rate limiting
 * Uses IP address or user ID if available
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  // Fallback to 'unknown' if no IP found
  return 'unknown';
}

/**
 * Rate limit response headers
 */
export function getRateLimitHeaders(result: ReturnType<typeof rateLimit>) {
  return {
    'X-RateLimit-Limit': result.reset.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
}
