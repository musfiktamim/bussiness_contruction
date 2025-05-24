// app/api/homepage-data/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismClient";

export async function GET() {
  try {
    const [reviews, services, projects, blogs] = await Promise.all([
      prisma.reviews.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
      prisma.services.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        where: { published: true },
      }),
      prisma.projects.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        where: { published: true },
      }),
      prisma.blogs.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        where: { published: true },
      }),
    ]);

    return NextResponse.json({
      reviews,
      services,
      projects,
      blogs,
    });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
