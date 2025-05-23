"use server";

import cloudinary from "@/lib/cloydinaryConfig";
import prisma from "@/lib/PrismClient";
import {  NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, description, preview } = await request.json();

    if (!title || !description || !preview) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    const picture = await cloudinary.uploader.upload(preview);

    const blogs = await prisma.blogs.create({
      data: {
        title,
        content: description,
        image: picture.secure_url,
      },
    });

    return NextResponse.json(
      { message: "Blog saved successfully", blog: blogs },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {

    const blogs = await prisma.blogs.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });


    return NextResponse.json({data:blogs});
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, title, description, preview, publish } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const updatedData: Partial<{
      title: string;
      content: string;
      published: boolean;
      image: string;
    }> = {};

    if (title) updatedData.title = title;
    if (description) updatedData.content = description;
    if (publish !== undefined && publish !== null)
      updatedData.published = Boolean(publish);

    if (preview) {
      const uploaded = await cloudinary.uploader.upload(preview);
      if (uploaded.secure_url) updatedData.image = uploaded.secure_url;
    }

    const updatedBlog = await prisma.blogs.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
