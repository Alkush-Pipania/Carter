import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  
  const { searchParams } = new URL(req.url);
  const secretkey = searchParams.get('secretkey');

  if (!secretkey) {
    return NextResponse.json({ message: 'secretKey is required.' }, { status: 400 });
  }
  
  try{
    const userWithLinkforms = await prisma.user.findUnique({
      where: { secretkey: secretkey },
      select: {
        linkform: {
          where: {
            tobefind: true,
          },
        },
      },
    });

    if (!userWithLinkforms) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }
  
    return NextResponse.json(userWithLinkforms);
  } catch(error : any){
    console.error('Error retrieving user with linkforms:', error); // Enhanced logging
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}

