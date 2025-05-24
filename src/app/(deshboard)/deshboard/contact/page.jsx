import HeadearsLikeBlogs from "@/Components/Elements/HeadearsLikeBlogs";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import prisma from "@/lib/PrismClient";
import { notFound } from "next/navigation";
import Link from "next/link";

const PAGE_SIZE = 10;

async function Projectpage({ searchParams }) {
    const page = parseInt(searchParams.page || "1", 10);
    if (page < 1) return notFound();

    const skip = (page - 1) * PAGE_SIZE;

    const [projects, total] = await Promise.all([
        prisma.contacts.findMany({
            take: PAGE_SIZE,
            skip,
            orderBy: [
                {seen:"asc"},
                {createdAt:"asc"}
            ],
        }),
        prisma.contacts.count(),
    ]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <HeadearsLikeBlogs header="Contact" desc="">
            <div className="flex justify-between my-6">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Button className="text-lg" variant={"link"}>
                    <Link href={"/deshboard/project/new"}>Create</Link>
                </Button>
            </div>
            <Table className="mt-5">
                <TableCaption>A list of your Projects</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className="text-start">View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.length > 0 &&
                        projects.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{skip + index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.message.slice(0, 70)}</TableCell>
                                <TableCell>
                                    <Button variant={"link"}>
                                        <Link
                                            href={`/deshboard/contact/${item.id}`}
                                            className={`${item.seen ? "text-green-600" : "text-yellow-500"}`}
                                        >
                                            {item.seen ? "readed" : "unread"}
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" disabled={page <= 1}>
                    <Link href={`?page=${page - 1}`}>Previous</Link>
                </Button>
                <span className="text-sm pt-2">
                    Page {page} of {totalPages}
                </span>
                <Button variant="outline" disabled={page >= totalPages}>
                    <Link href={`?page=${page + 1}`}>Next</Link>
                </Button>
            </div>
        </HeadearsLikeBlogs>
    );
}

export default Projectpage;
