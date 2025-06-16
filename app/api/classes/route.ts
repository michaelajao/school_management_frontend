import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Get the backend URL from environment
const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://schoolmanagementbackend-production-be10.up.railway.app'
  : 'http://localhost:4000';

export async function GET(request: NextRequest) {
  return handleRequest('GET', request);
}

export async function POST(request: NextRequest) {
  return handleRequest('POST', request);
}

export async function PUT(request: NextRequest) {
  return handleRequest('PUT', request);
}

export async function DELETE(request: NextRequest) {
  return handleRequest('DELETE', request);
}

export async function PATCH(request: NextRequest) {
  return handleRequest('PATCH', request);
}

async function handleRequest(method: string, request: NextRequest) {
  try {
    // For testing purposes, provide mock data instead of hitting the backend
    // TODO: Replace with actual backend calls when endpoints are implemented
    
    if (method === 'GET') {
      // Return mock classes data
      const mockClasses = {
        data: [
          {
            id: '1',
            name: 'Mathematics A',
            section: 'A',
            displayName: 'Grade 9A - Mathematics A',
            academicYear: '2024',
            description: 'Advanced mathematics for grade 9',
            capacity: 30,
            currentEnrollment: 25,
            isActive: true,
            teacher: {
              firstName: 'Sarah',
              lastName: 'Johnson',
              id: '1'
            },
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            name: 'English Language Arts',
            section: 'B',
            displayName: 'Grade 9B - English Language Arts',
            academicYear: '2024',
            description: 'English literature and writing',
            capacity: 28,
            currentEnrollment: 22,
            isActive: true,
            teacher: {
              firstName: 'Michael',
              lastName: 'Chen',
              id: '2'
            },
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z'
          }
        ],
        total: 2,
        page: 1,
        limit: 10
      };
      
      return NextResponse.json(mockClasses, { status: 200 });
    }
    
    if (method === 'POST') {
      // Handle class creation
      const body = await request.json();
      
      // Create mock response for new class
      const newClass = {
        id: String(Date.now()),
        name: body.name,
        section: body.section,
        displayName: `Grade ${body.grade || 'Unknown'}, Section ${body.section} - ${body.name}`,
        academicYear: body.academicYear,
        description: body.description,
        capacity: body.capacity || 30,
        currentEnrollment: 0,
        isActive: true,
        teacher: body.teacherId ? {
          firstName: 'Assigned',
          lastName: 'Teacher',
          id: body.teacherId
        } : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return NextResponse.json({
        success: true,
        message: 'Class created successfully',
        data: newClass
      }, { status: 201 });
    }
    
    if (method === 'PUT' || method === 'PATCH') {
      // Handle class updates
      const body = await request.json();
      
      return NextResponse.json({
        success: true,
        message: 'Class updated successfully',
        data: { ...body, updatedAt: new Date().toISOString() }
      }, { status: 200 });
    }
    
    if (method === 'DELETE') {
      return NextResponse.json({
        success: true,
        message: 'Class deleted successfully'
      }, { status: 200 });
    }
    
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    
  } catch (error) {
    console.error('Classes API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}