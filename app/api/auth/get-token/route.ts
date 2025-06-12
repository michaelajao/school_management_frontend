import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    
    if (!token) {
      return NextResponse.json({ token: null }, { status: 200 });
    }
    
    return NextResponse.json({ token: token.value }, { status: 200 });
  } catch (error) {
    console.error('Error getting token:', error);
    return NextResponse.json({ error: 'Failed to get token' }, { status: 500 });
  }
}