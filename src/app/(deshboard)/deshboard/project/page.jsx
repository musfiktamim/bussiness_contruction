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

async function Projectpage() {
  const projects = await prisma.projects.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <HeadearsLikeBlogs header="Our Projects" desc="Showing 20 20">
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
          {projects.length > 0 &&
            projects.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index}</TableCell>
                <TableCell>
                  {item.image ? (
                    <img
                      loading="lazy"
                      src={item.image.url}
                      alt={item.title}
                      className="w-20 h-20"
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
                    } `}
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
    </HeadearsLikeBlogs>
  );
}

export default Projectpage;
