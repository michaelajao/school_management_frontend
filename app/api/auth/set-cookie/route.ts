import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { name, value, options } = await request.json();

    if (!name || !value) {
      return NextResponse.json(
        { error: 'Cookie name and value are required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    
    // Set secure cookie with provided options
    cookieStore.set(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: options?.sameSite || 'strict',
      maxAge: options?.maxAge || 60 * 60 * 2, // Default 2 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting secure cookie:', error);
    return NextResponse.json(
      { error: 'Failed to set cookie' },
      { status: 500 }
    );
  }
}