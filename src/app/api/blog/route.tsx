"use server";
import cloudinary from "@/lib/cloydinaryConfig";
import prisma from "@/lib/PrismClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, description, preview } = await request.json();
        if (title && description && preview) {
            const picture = await cloudinary.uploader.upload(preview);
            const blogs = await prisma.blogs.create({
                data: {
                    title,
                    content: description,
                    image: picture.secure_url,
                },
            });

            return NextResponse.json({ message: "Blog saved Successfully" });
        } else {
            return NextResponse.json({ message: "Please fill all Fields" });
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
    }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const skip = (page - 1) * limit;

    const blogs = await prisma.blogs.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc', // newest first
      },
    });

    const total = await prisma.blogs.count();

    return NextResponse.json({
      data: blogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Unknown error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
    try {
        const { id, title, description, preview,publish } = await request.json();
        if (!id) {
            return NextResponse.json({ message: "Blog ID is required" });
        }

        let updatedData: any = {};


        if (title) updatedData.title = title;
        if (description) updatedData.content = description;
        if(publish!==null) updatedData.published = Boolean(publish);

        if (preview) {
            const uploaded = await cloudinary.uploader.upload(preview);
            updatedData.image = uploaded;
        }

        const updatedBlog = await prisma.blogs.update({
            where: { id },
            data: updatedData,
        });

        return NextResponse.json({
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        }
    }
}
