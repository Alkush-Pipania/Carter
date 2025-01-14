import { authOption } from "@/lib/auth";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

const allowedOrigins = ['http://localhost:5173', 'http://your-production-domain.com'];

function setCORSHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true', // Important for cookies
    };
  }
  return {};
}

export async function GET(req: Request  ) {
  const origin = req.headers.get('origin');

  try {
    const session = await getServerSession(authOption);

    if (!session) {
      return NextResponse.json(
        { 
          error: "Unauthorized",
          signInUrl: `${process.env.NEXTAUTH_URL}/signin`
        },
        {
          status: 401,
          headers: setCORSHeaders(origin),
        }
      );
    }


    return NextResponse.json(
      {
        authenticated: true,
      },
      {
        status: 200,
        headers: {
          ...setCORSHeaders(origin),
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to check authentication status",
      },
      {
        status: 500,
        headers: setCORSHeaders(origin),
      }
    );
  }
}