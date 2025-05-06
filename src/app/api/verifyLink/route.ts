import { NextResponse } from 'next/server';
import axios from 'axios';

const allowedOrigins = ['http://localhost:5173', 'http://your-production-domain.com', 'http://localhost:3000'];

function setCORSHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true', 
    };
  }
  return {};
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin');
  
  return new NextResponse(null, {
    status: 204,
    headers: setCORSHeaders(origin),
  });
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin');

  try {
    const requestData = await req.json();
    const { url, token } = requestData;

    if (!url) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: "URL is required"
        },
        {
          status: 400,
          headers: setCORSHeaders(origin),
        }
      );
    }

    if (!token) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "Authentication token is required"
        },
        {
          status: 401,
          headers: setCORSHeaders(origin),
        }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND;
    if (!backendUrl) {
      throw new Error("Backend URL is not configured");
    }

    // Make direct API call with authorization header
    const response = await axios({
      method: 'post',
      url: `${backendUrl}/extension/addLink`,
      data: {
        url,
        userId: '1'  // The backend will use the authenticated user from the token
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Link saved successfully with AI folder suggestion",
        data: response.data
      },
      {
        status: 200,
        headers: {
          ...setCORSHeaders(origin),
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to save link",
      },
    );
  }
}