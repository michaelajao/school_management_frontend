import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Get the backend URL from environment
const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://schoolmanagementbackend-production-be10.up.railway.app'
  : 'http://localhost:4000';

export async function GET(request: NextRequest) {
  return handleRequest('GET', request);
}

export async function PUT(request: NextRequest) {
  return handleRequest('PUT', request);
}

export async function POST(request: NextRequest) {
  return handleRequest('POST', request);
}

async function handleRequest(method: string, request: NextRequest) {
  try {
    // For testing purposes, provide mock data instead of hitting the backend
    // TODO: Replace with actual backend calls when endpoints are implemented
    
    if (method === 'GET') {
      // Return mock settings data
      const mockSettings = {
        success: true,
        data: {
          schoolInfo: {
            name: 'Demo School',
            address: '123 Education St, Learning City, LC 12345',
            phone: '+1 (555) 123-4567',
            email: 'admin@demo-school.edu',
            website: 'https://demo-school.edu',
            logoUrl: '',
            establishedYear: 2000,
            principalName: 'Dr. Jane Smith'
          },
          studentIdConfig: {
            format: 'auto',
            pattern: '{PREFIX}{YEAR}{SEQUENCE}',
            prefix: 'SMS',
            includeYear: true,
            yearFormat: 'full',
            sequenceLength: 3,
            separator: '',
            caseFormat: 'upper',
            startingNumber: 1,
            examples: ['SMS2024001', 'SMS2024002', 'SMS2024003']
          },
          academicSettings: {
            academicYearStart: '2024-08-01',
            academicYearEnd: '2025-07-31',
            termSystem: 'semester',
            gradingScale: 'percentage',
            gradeLevels: ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            subjects: ['Mathematics', 'English Language Arts', 'Science', 'Social Studies', 'Physical Education', 'Art', 'Music'],
            defaultClassCapacity: 30
          },
          notificationSettings: {
            emailEnabled: true,
            smsEnabled: true,
            pushEnabled: true,
            parentNotifications: {
              attendance: true,
              grades: true,
              assignments: true,
              events: true
            },
            teacherNotifications: {
              newStudents: true,
              parentMessages: true,
              systemUpdates: true
            }
          },
          securitySettings: {
            passwordMinLength: 8,
            passwordRequireSpecialChars: true,
            passwordRequireNumbers: true,
            passwordRequireUppercase: true,
            sessionTimeout: 60,
            twoFactorEnabled: false,
            loginAttemptLimit: 5,
            lockoutDuration: 15
          }
        }
      };
      
      return NextResponse.json(mockSettings, { status: 200 });
    }
    
    if (method === 'PUT' || method === 'POST') {
      // Handle settings updates
      const body = await request.json();
      
      // For testing, just return success with the updated data
      return NextResponse.json({
        success: true,
        message: 'Settings updated successfully',
        data: body
      }, { status: 200 });
    }
    
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    
  } catch (error) {
    console.error('Settings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}