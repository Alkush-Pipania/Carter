import { authOption } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import axios from 'axios';
import prisma from '@/lib/prisma';

const allowedOrigins = ['http://localhost:5173', 'http://your-production-domain.com'];

function setCORSHeaders(origin: string | null) {
  if (origin && allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
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
    headers: {
      ...setCORSHeaders(origin),
    },
  });
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin');

  try {
    const session = await getServerSession(authOption);
    if (!session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          signInUrl: `${process.env.NEXTAUTH_URL}/signin`,
        },
        {
          status: 401,
          headers: setCORSHeaders(origin),
        }
      );
    }

    const { folderId, url } = await req.json();
    const userId = session.user.id;

    // const res = await axios.post('https://gemini.alkush.workers.dev/getdata', {
    //   prompt: url
    // });
    // const { title, description } = res.data.data;

    let imageURl = 'no image';
    let title = 'No title';
    let description = 'No description';
    try {
      const [geminiResponse, apiResponse] = await Promise.all([
        axios.post('https://gemini.alkush.workers.dev/getdata', {
            prompt: url
           }),
        axios.get(`${process.env.Image_API_RETRIVE_URL}=${url}`)
      ]);
      
       title = geminiResponse.data.data.title ;
       description = geminiResponse.data.data.description ;
      imageURl = apiResponse.data.image || "no image";
    } catch (e) {
      console.log("error while fetching image url ", e);
    }

    const baseLinkData = {
      links: url,
      imgurl: imageURl,
      title,
      description,
      user: { connect: { id: parseInt(userId, 10) } },
    };

    const link = await prisma.linkform.create({
      data: folderId !== '#global'
        ? { ...baseLinkData, folder: { connect: { id: parseInt(folderId, 10) } } }
        : baseLinkData,
    });

    return NextResponse.json(
      { error: false, data: link, message: 'Link created successfully' },
      { status: 200, headers: setCORSHeaders(origin) }
    );
  } catch (error) {
    console.error('Error in AddLinkDb:', error);
    return NextResponse.json(
      { error: true, message: 'Failed to create link' },
      { status: 500, headers: setCORSHeaders(origin) }
    );
  }
}
