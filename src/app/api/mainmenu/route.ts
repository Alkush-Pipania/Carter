import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';

export async function GET(req : Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        secretkey: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error getting secretkey:', error);
    return NextResponse.json({ error: 'Error getting secretkey.' }, { status: 500 });
  }
}
