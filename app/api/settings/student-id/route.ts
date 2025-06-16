import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Get the backend URL from environment
const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://schoolmanagementbackend-production-be10.up.railway.app'
  : 'http://localhost:4000';

export async function POST(request: NextRequest) {
  return handleRequest('POST', request, 'generate');
}

export async function GET(request: NextRequest) {
  return handleRequest('GET', request, 'preview');
}

async function handleRequest(method: string, request: NextRequest, action: string) {
  try {
    // For testing purposes, provide mock data instead of hitting the backend
    // TODO: Replace with actual backend calls when endpoints are implemented
    
    if (method === 'POST' && action === 'generate') {
      const body = await request.json();
      
      // Generate a mock student ID
      const currentYear = new Date().getFullYear();
      const sequence = Math.floor(Math.random() * 999) + 1;
      const paddedSequence = sequence.toString().padStart(3, '0');
      const studentId = `SMS${currentYear}${paddedSequence}`;
      
      return NextResponse.json({
        success: true,
        data: {
          studentId,
          pattern: 'SMS{YEAR}{SEQUENCE}',
          generatedAt: new Date().toISOString()
        }
      }, { status: 200 });
    }
    
    if (method === 'GET' && action === 'preview') {
      // Return preview of student IDs based on configuration
      const searchParams = new URL(request.url).searchParams;
      const prefix = searchParams.get('prefix') || 'SMS';
      const includeYear = searchParams.get('includeYear') === 'true';
      const separator = searchParams.get('separator') || '';
      const sequenceLength = parseInt(searchParams.get('sequenceLength') || '3');
      const caseFormat = searchParams.get('caseFormat') || 'upper';
      
      const year = includeYear ? new Date().getFullYear() : '';
      
      const examples = [];
      for (let i = 1; i <= 3; i++) {
        const sequence = i.toString().padStart(sequenceLength, '0');
        const id = `${prefix}${year}${separator}${sequence}`;
        examples.push(caseFormat === 'lower' ? id.toLowerCase() : id.toUpperCase());
      }
      
      return NextResponse.json({
        success: true,
        data: {
          examples,
          pattern: `${prefix}${year ? '{YEAR}' : ''}${separator}{SEQUENCE}`,
          previewedAt: new Date().toISOString()
        }
      }, { status: 200 });
    }
    
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    
  } catch (error) {
    console.error('Student ID API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}