import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Get the backend URL from environment (server-side only)
const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://schoolmanagementbackend-production-be10.up.railway.app'
  : 'http://localhost:4000';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('GET', request, params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('POST', request, params.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('PUT', request, params.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('DELETE', request, params.path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest('PATCH', request, params.path);
}

async function handleRequest(
  method: string,
  request: NextRequest,
  pathSegments: string[]
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    
    // Build the backend URL
    const backendPath = pathSegments.join('/');
    const backendUrl = `${BACKEND_URL}/${backendPath}`;
    
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
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}