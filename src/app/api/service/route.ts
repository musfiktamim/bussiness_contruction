"use server";

import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloydinaryConfig";
import prisma from "@/lib/PrismClient";

export async function POST(request: Request) {
  try {
    const { title, description, preview } = await request.json();

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

    const project = await prisma.services.create({
      data: {
        title,
        description,
        image: picture.secure_url, // ✅ Only store URL
      },
    });

    return NextResponse.json(
      { message: "Blog saved successfully", project },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello world!" }, { status: 200 });
}

export async function PATCH(request: Request) {
  try {
    const { id, title, description, preview, publish } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Service ID is required" },
        { status: 400 }
      );
    }

    const updatedData = {} as Record<string, unknown>;


    if (title) updatedData.title = title;
    if (description) updatedData.description = description;
    if (typeof publish !== "undefined") {
      updatedData.published = Boolean(publish);
    }

    if (preview) {
      const uploaded = await cloudinary.uploader.upload(preview, {
        resource_type: "image",
        format: "webp",
      });
      updatedData.image = uploaded.secure_url;
    }

    const updatedBlog = await prisma.services.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(
      {
        message: "Service updated successfully",
        blog: updatedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
}
