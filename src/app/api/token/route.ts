import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import config from "next/config";
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { auth } from "@/auth"

config()

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// Disable caching for this API route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username } = body;
    const session = await auth();
    if(!session || session.user?.email != email){
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!email || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where : (users)=> eq(users.email , email)
    })

    if(!user){
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
        username,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '3d' }
    );

    const response = NextResponse.json({ token, id: user.id });

    // Add cache control headers to prevent caching of auth endpoints
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
} 