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
import { Edit, Eye } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const PAGE_SIZE = 10;


async function Projectpage({ searchParams }) {
  const page = parseInt(searchParams.page || "1", 10);
  if (page < 1) return notFound();

  const skip = (page - 1) * PAGE_SIZE;

  const [projects, total] = await Promise.all([
    prisma.projects.findMany({
      skip,
      take: PAGE_SIZE,
      orderBy: { createdAt: "desc" },
    }),
    prisma.projects.count(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <HeadearsLikeBlogs header="Our Projects" desc={`Showing ${skip + 1} to ${Math.min(skip + PAGE_SIZE, total)} of ${total}`}>
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
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-start">View</TableHead>
            <TableHead className="text-start">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{skip + index + 1}</TableCell>
              <TableCell>
                {item.image ? (
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover"
                  />
                ) : (
                  "null"
                )}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <p
                  className={`w-fit h-fit capitalize py-1 px-2 rounded-md text-white ${
                    item.published ? "bg-green-300" : "bg-red-300"
                  }`}
                >
                  {item.published ? "Published" : "Unpublish"}
                </p>
              </TableCell>
              <TableCell>
                <Link href={`/deshboard/project/${item.id}`}>
                  <Eye />
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/deshboard/project/${item.id}/edit`}>
                  <Edit />
                </Link>
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
