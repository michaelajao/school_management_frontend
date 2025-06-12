import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIdentifier, getRateLimitHeaders } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimitResult = rateLimit(clientId, { limit: 5, window: 300000 }); // 5 requests per 5 minutes
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: rateLimitResult.reset
      },
      { 
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  }

  try {
    const body = await request.json();
    console.log('=== API Route Debug ===');
    console.log('Received request body:', JSON.stringify(body, null, 2));
    
    // First, get the education system for the country
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';
    console.log('Backend URL:', backendUrl);
    
    let educationSystem = null;
    
    try {
      console.log('Attempting to get education system for country:', body.country);
      const educationSystemUrl = `${backendUrl}/education-systems/by-country/${encodeURIComponent(body.country)}`;
      console.log('Education system URL:', educationSystemUrl);
      
      const educationSystemResponse = await fetch(educationSystemUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (educationSystemResponse.ok) {
        const educationSystems = await educationSystemResponse.json();
        console.log('Education systems found:', educationSystems.length);
        
        if (educationSystems && educationSystems.length > 0) {
          educationSystem = educationSystems[0]; // Use the first education system
          console.log('Using education system:', educationSystem.id);
        }
      } else {
        console.log('Education systems endpoint not available, proceeding without education system');
      }
    } catch (educationSystemError) {
      console.log('Education systems endpoint error (will proceed without):', educationSystemError.message);
    }
    
    // Create school data with optional education system
    const schoolData = {
      name: body.schoolName,
      alias: body.schoolAlias,
      country: body.country,
      website: body.website || undefined,
      ...(educationSystem && { educationSystemId: educationSystem.id })
    };
    
    console.log('Creating school with data:', JSON.stringify(schoolData, null, 2));
    const schoolResponse = await fetch(`${backendUrl}/auth/schools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schoolData),
    });
    
    if (!schoolResponse.ok) {
      const schoolError = await schoolResponse.json();
      console.log('School creation failed:', schoolError);
      return NextResponse.json(
        { message: schoolError.message || 'Failed to create school' },
        { status: schoolResponse.status }
      );
    }
    
    const school = await schoolResponse.json();
    console.log('School created successfully:', school.id);
    
    // Now create the admin user - only send fields expected by CreateSchoolAdminDto
    const adminData = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      schoolId: school.id,
      phoneNumber: body.phone || undefined // Include phone if provided
    };
    
    console.log('Creating admin with data:', JSON.stringify(adminData, null, 2));
    const adminResponse = await fetch(`${backendUrl}/auth/create-school-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });

    console.log('Admin creation response status:', adminResponse.status);
    
    if (!adminResponse.ok) {
      const adminError = await adminResponse.json();
      console.log('Admin creation failed:', adminError);
      return NextResponse.json(
        { message: adminError.message || 'Failed to create admin user' },
        { status: adminResponse.status }
      );
    }
    
    const adminResult = await adminResponse.json();
    console.log('Admin created successfully:', adminResult.user.id);

    // Store phone number in the result (even though backend doesn't save it yet)
    // This keeps the phone data available for future use
    const result = {
      user: {
        ...adminResult.user,
        phoneNumber: body.phone // Add phone to the response
      },
      school: school,
      message: 'School and admin account created successfully',
      note: 'Phone number is stored in local context but not yet saved to backend'
    };

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('=== API Route Error ===');
    console.error('Error occurred:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown',
    });
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { message: 'Cannot connect to backend server. Please ensure the backend is running on port 4000.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 