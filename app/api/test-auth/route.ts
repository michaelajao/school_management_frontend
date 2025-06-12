import { NextRequest, NextResponse } from 'next/server';

// Simple test endpoint to verify backend connectivity
const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://schoolmanagementbackend-production-be10.up.railway.app'
  : 'http://localhost:4000';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing backend connection...');
    
    // Test basic connectivity
    const healthCheck = await fetch(`${BACKEND_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Health check status:', healthCheck.status);
    const healthData = await healthCheck.text();
    console.log('Health check response:', healthData);

    return NextResponse.json({
      success: true,
      backendUrl: BACKEND_URL,
      healthCheckStatus: healthCheck.status,
      healthResponse: healthData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Backend connection test failed:', error);
    return NextResponse.json(
      { 
        error: 'Backend connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        backendUrl: BACKEND_URL
      },
      { status: 500 }
    );
  }
}