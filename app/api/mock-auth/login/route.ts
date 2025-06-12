import { NextRequest, NextResponse } from 'next/server';

// Mock authentication endpoint for testing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Mock login attempt:', { email, password: '***' });

    // Mock user data based on email domain for testing
    const mockUsers = {
      'admin@school.com': {
        id: '1',
        email: 'admin@school.com',
        firstName: 'John',
        lastName: 'Admin',
        role: 'SCHOOL_ADMIN',
        schoolId: 'school-1',
        isActive: true
      },
      'teacher@school.com': {
        id: '2',
        email: 'teacher@school.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'CLASS_TEACHER',
        schoolId: 'school-1',
        isActive: true
      },
      'assistant@school.com': {
        id: '3',
        email: 'assistant@school.com',
        firstName: 'Mike',
        lastName: 'Assistant',
        role: 'ASSISTANT_ADMIN',
        schoolId: 'school-1',
        isActive: true
      },
      'student@school.com': {
        id: '4',
        email: 'student@school.com',
        firstName: 'Alex',
        lastName: 'Student',
        role: 'STUDENT',
        schoolId: 'school-1',
        isActive: true
      },
      'parent@school.com': {
        id: '5',
        email: 'parent@school.com',
        firstName: 'Jane',
        lastName: 'Parent',
        role: 'PARENT',
        schoolId: 'school-1',
        isActive: true
      }
    };

    // Simple validation (any password for demo)
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = mockUsers[email as keyof typeof mockUsers];
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate mock tokens
    const accessToken = `mock-access-token-${Date.now()}`;
    const refreshToken = `mock-refresh-token-${Date.now()}`;

    console.log('Mock login successful for:', user.email, 'Role:', user.role);

    // Return the same format as the real backend
    return NextResponse.json({
      accessToken,
      refreshToken,
      user
    });

  } catch (error) {
    console.error('Mock login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}