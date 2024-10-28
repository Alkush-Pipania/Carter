import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url, title, description, userId } = body;

  if (!url || !title || !userId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const parsedUserId = parseInt(userId);
  let image = "no image"; 

  try {
    const apidata = await axios.get(`https://api.linkpreview.net/?key=786cc48397499081c3c434f87e4b9e52&q=${url}`);
    image = apidata.data.image || "no image"; 

   
    const newLink = await prisma.linkform.create({
      data: {
        links: url,
        imgurl: image,
        title: title || apidata.data.title,
        description: description || apidata.data.description,
        user: {
          connect: { id: parsedUserId },
        },
      },
    });

    return NextResponse.json({ message: 'Link added successfully', newLink }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching image or creating link:', error);

    
    const newLink = await prisma.linkform.create({
      data: {
        links: url,
        imgurl: "no image",
        title: title || "No title available",
        description: description || "No description available",
        user: {
          connect: { id: parsedUserId },
        },
      },
    });

    return NextResponse.json({ message: 'Link added successfully with fallback data', newLink }, { status: 200 });
  }
}
