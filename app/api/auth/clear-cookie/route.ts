import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    const response = NextResponse.json({ success: true });
    
    // Clear cookie by setting it to expire
    response.cookies.set(name, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Error clearing cookie:', error);
    return NextResponse.json({ error: 'Failed to clear cookie' }, { status: 500 });
  }
}