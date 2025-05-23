import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/PrismClient";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";

type ReviewBody = {
  name: string;
  email: string;
  review: string;
  rate: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ReviewBody;
    const { name, email, review, rate } = body;

    if (!name || !email || !review || typeof rate !== "number") {
      return NextResponse.json(
        { message: "Invalid input data." },
        { status: 400 }
      );
    }

    const createdReview = await prisma.reviews.create({
      data: {
        name,
        email,
        review,
        rate,
      },
    });

    if (!createdReview?.id) {
      return NextResponse.json(
        { message: "Failed to save review. Ensure data is valid." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully created" },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof PrismaClientRustPanicError || error instanceof Error
        ? error.message
        : "An unknown error occurred.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
