import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // Adjust this import if needed
import { error } from "console";

export async function POST(request: Request) {
  try {
    const body = await request.json(); 
    const { email, password, username } = body;

    
    if (!email || !password || !username) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

   
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error : true , message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json({ error: false , message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: true , message: "Internal server error" }, { status: 500 });
  }
}
