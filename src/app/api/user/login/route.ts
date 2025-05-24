import prisma from "@/lib/PrismClient";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import {createSession} from "@/lib/sessions"

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) return NextResponse.json({ message: "invalid input data." }, { status: 400 })

        const findUser = await prisma.users.findFirst({
            where: {
                email: email
            }
        })

        if (!findUser) return NextResponse.json({ message: "invalid input data." }, { status: 400 })

        if (password === findUser.password && email === findUser.email) {
            await createSession(findUser.id)
            return NextResponse.json({ message: "logedin successfully" }, { status: 200 })
        }else{
            return NextResponse.json({ message: "invalid input data." }, { status: 400 })
        }


    } catch (error) {
        const message =
            error instanceof PrismaClientRustPanicError || error instanceof Error
                ? error.message
                : "An unknown error occurred.";

        return NextResponse.json({ message }, { status: 500 });
    }
}