"use server";

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloydinaryConfig";
import prisma from "@/lib/PrismClient";

type ProjectBody = {
  title: string;
  description: string;
  preview: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProjectBody;
    const { title, description, preview } = body;

    if (!title || !description || !preview) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    const picture = await cloudinary.uploader.upload(preview, {
      resource_type: "image",
      format: "webp",
    });

    if (!picture?.secure_url) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 502 }
      );
    }

    const project = await prisma.projects.create({
      data: {
        title,
        description,
        image: picture.secure_url,
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Failed to save blog" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Blog saved successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Hello world!" },
    { status: 200 }
  );
}


export async function PATCH(request: Request) {
  try {
    const { id, title, description, preview, publish } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    const updatedData: Partial<{
      title: string;
      description: string;
      published: boolean;
      image: string;
    }> = {};

    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (publish !== undefined && publish !== null)
      updatedData.published = Boolean(publish);

    if (preview) {
      const uploaded = await cloudinary.uploader.upload(preview);
      if (uploaded.secure_url) updatedData.image = uploaded.secure_url;
    }

    const updatedBlog = await prisma.projects.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json({
      message: "Project updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
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
