import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma"; // Adjust this import if needed
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadImageToCloudinary(base64Image: string) {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'carter_profiles',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json(); 
    const { email, password, username, image } = body;

    
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

    // Upload image to Cloudinary if provided
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    // Create the user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        image: imageUrl, 
      },
    });

    return NextResponse.json({ error: false , message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: true , message: "Internal server error" }, { status: 500 });
  }
}
