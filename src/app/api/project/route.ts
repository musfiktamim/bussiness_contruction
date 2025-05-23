"use server";
import cloudinary from "@/lib/cloydinaryConfig";
import prisma from "@/lib/PrismClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, description, preview } = await request.json();

        if (!title || !description || !preview) {
            return NextResponse.json(
                { message: "Please fill all fields" },
                { status: 400 } // Bad Request
            );
        }

        const picture = await cloudinary.uploader.upload(preview,{
            resource_type:"image",
            format:"webp"
        });

        if (!picture) {
            return NextResponse.json(
                { message: "Image upload failed" },
                { status: 502 } // Bad Gateway
            );
        }

        const project = await prisma.projects.create({
            data: {
                title,
                description,
                image: picture, // assuming you want the image URL
            },
        });

        if (!project) {
            return NextResponse.json(
                { message: "Failed to save blog" },
                { status: 500 } // Internal Server Error
            );
        }

        return NextResponse.json(
            { message: "Blog saved successfully" },
            { status: 201 } // Created
        );
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 } // Internal Server Error
            );
        }

        return NextResponse.json(
            { message: "An unknown error occurred" },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: "Hello world!" },
        { status: 200 } // OK
    );
}
