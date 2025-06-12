import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock profile endpoint for testing
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    console.log('Mock profile request with token:', token.value);

    // Extract user info from token (in real scenario, this would decode JWT)
    // For demo, we'll extract timestamp and determine user
    const mockUser = {
      id: '1',
      email: 'admin@school.com',
      firstName: 'John',
      lastName: 'Admin',
      role: 'SCHOOL_ADMIN',
      schoolId: 'school-1',
      isActive: true,
      emailVerified: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: new Date().toISOString()
    };

    console.log('Mock profile response:', mockUser);

    return NextResponse.json(mockUser);

  } catch (error) {
    console.error('Mock profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}