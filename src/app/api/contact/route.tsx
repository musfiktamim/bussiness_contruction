import prisma from "@/lib/PrismClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { name,phone,email,message } = await request.json();

        if (!name || !phone || !email || !message) {
            return NextResponse.json(
                { message: "Please fill all fields" },
                { status: 400 }
            );
        }

        const contact = await prisma.contacts.create({
            data: {
                name:name,
                email:email,
                phone:phone,
                message:message,
            },
        });



        return NextResponse.json(
            { message: "Contact sended successfully", contact: contact },
            { status: 201 }
        );
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