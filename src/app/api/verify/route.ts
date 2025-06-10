import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import config from "next/config";
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { auth } from "@/auth"
import { headers } from 'next/headers';

config()

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export async function OPTIONS() {
  return new Response('', {
    headers: {
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}

export async function GET() {
  try {
    console.log('🔍 Verify endpoint called');
    const headersList = headers();
    console.log('📋 Request headers:', {
      origin: headersList.get('origin'),
      referer: headersList.get('referer'),
      userAgent: headersList.get('user-agent')
    });

    const session = await auth();
    console.log('🔑 Session status:', { exists: !!session, hasUser: !!session?.user });

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const email = session.user?.email;


    const user = await db.query.users.findFirst({
      where: (users) => eq(users.email, email)
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create the JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email,
        username: user.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '3d' }
    );

    // Prepare the response with the token and ID
    const responseData = { token, id: user.id };
    console.log('✅ Authentication successful! User ID:', user.id, '(token length:', token.length, 'chars)');

    const response = NextResponse.json(responseData);

    // Add CORS headers to allow access from extensions and other domains
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log('🔗 CORS headers added to response');

    return response;
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
} 