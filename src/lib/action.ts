"use server";
import { redirect } from "next/navigation";
import prisma from "./PrismClient"
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";



export async function addReviews(prevstat: any, formData: FormData) {
    try {
        const name:string = formData.get("name") as string;
        const email:string = formData.get("email") as string;
        const review:string = formData.get("review") as string;
        const rate = Number(formData.get("rate"));

        const reviews = await prisma.reviews.create({
            data: {
                email,
                review,
                rate,
                name
            }

        })
        if (!reviews.id) {
            return { message: "enter valid data or unqiue email" };
        }


    } catch (error: unknown) {
        if (error instanceof PrismaClientRustPanicError) {
            return { message: error.message };
        }
        if (error instanceof Error) {
            return { message: error.message };
        }
        return { message: "An unknown error occurred." };
    }
    return redirect("/client_reviews");
}


export async function addBlogs(prevstat: any, formData: FormData) {
    try {
        const title = formData.get("title");
        const excerpt = formData.get("excerpt");
        const content = formData.get("content");
        const image = formData.get("image");

        // const imageUploaded = await cloudinary.uploader.upload(image) 


    } catch (error: unknown) {
        if (error instanceof PrismaClientRustPanicError) {
            return { message: error.message };
        }
        if (error instanceof Error) {
            return { message: error.message };
        }
        return { message: "An unknown error occurred." };
    }
}