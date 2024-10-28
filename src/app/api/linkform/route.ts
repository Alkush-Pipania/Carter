import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const { secret_Id } = await req.json(); // Parse JSON from the request body

  if (!secret_Id) {
    return NextResponse.json({ message: 'secret_Id is required.' }, { status: 400 });
  }

  try {
    const linkform = await prisma.linkform.findUnique({
      where: { secret_Id },
    });

    if (!linkform) {
      return NextResponse.json({ message: 'Linkform not found.' }, { status: 404 });
    }

    const updatedLinkform = await prisma.linkform.update({
      where: { secret_Id },
      data: {
        tobefind: !linkform.tobefind,
      },
    });

    return NextResponse.json(updatedLinkform, { status: 200 });
  } catch (error) {
    console.error('Error toggling linkform:', error);
    return NextResponse.json({ error: 'Error toggling linkform.' }, { status: 500 });
  }
}

// Add a default export for other methods, if needed
export async function GET() {
  // Handle GET requests if required
  return NextResponse.json({ message: 'GET method is not allowed on this endpoint.' }, { status: 405 });
}

