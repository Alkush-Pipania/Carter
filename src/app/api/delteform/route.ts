import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const { secret_Id } = await req.json();

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

    const deleteLinkform = await prisma.linkform.delete({
      where: { secret_Id },
    });

    return NextResponse.json(deleteLinkform, { status: 200 });
  } catch (error) {
    console.error('Error deleting linkform:', error);
    return NextResponse.json({ error: 'Error deleting the linkform' }, { status: 500 });
  }
}
