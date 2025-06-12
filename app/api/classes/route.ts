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
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    
    // Build the backend URL
    const backendUrl = `${BACKEND_URL}/classes`;
    
    // Copy search params
    const url = new URL(backendUrl);
    const searchParams = new URL(request.url).searchParams;
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
    
    // Prepare headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add auth token if available
    if (token) {
      headers.Authorization = `Bearer ${token.value}`;
    }
    
    // Prepare request body for POST/PUT/PATCH requests
    let body: string | undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = await request.text();
      } else if (contentType?.includes('multipart/form-data')) {
        // For file uploads, forward the FormData directly
        body = await request.text();
        headers['Content-Type'] = contentType;
      }
    }
    
    // Make the request to the backend
    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
    });
    
    // Get response data
    const responseData = await response.text();
    let parsedData;
    
    try {
      parsedData = JSON.parse(responseData);
    } catch {
      parsedData = responseData;
    }
    
    // Forward the response with appropriate status
    return NextResponse.json(parsedData, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('Classes API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}