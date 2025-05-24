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
      { message: "Service saved successfully", project },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const take = parseInt(searchParams.get('take') || '6');
  const skip = (page - 1) * take;

  const services = await prisma.services.findMany({
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      published: true,
    },
  });

  return NextResponse.json(services);
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

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { message: "Service ID is required" },
        { status: 400 }
      );
    }

    const res = await prisma.services.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json(
      {
        message: "Service deleted successfully",
        deleted:res.id
      },
      { status: 200 }
    );

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
}