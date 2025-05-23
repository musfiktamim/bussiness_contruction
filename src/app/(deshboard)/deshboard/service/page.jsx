import HeadearsLikeBlogs from '@/Components/Elements/HeadearsLikeBlogs'
import prisma from '@/lib/PrismClient'
import React from 'react'
import { Button } from "@/Components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"
import Link from 'next/link'
import { Edit, Eye } from 'lucide-react'
import { notFound } from 'next/navigation'

const PAGE_SIZE = 10

async function Servicepage({ searchParams }) {
  const page = parseInt(searchParams.page || "1", 10)
  if (page < 1) return notFound()

  const skip = (page - 1) * PAGE_SIZE

  const [services, total] = await Promise.all([
    prisma.services.findMany({
      skip,
      take: PAGE_SIZE,
      orderBy: {
        createdAt: "desc"
      }
    }),
    prisma.services.count()
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <HeadearsLikeBlogs header='Service' desc={`Showing ${skip + 1} to ${Math.min(skip + PAGE_SIZE, total)} of ${total}`}>
      <div className="flex justify-between my-6">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button className="text-lg" variant={"link"}>
          <Link href={"/deshboard/service/new"}>Create</Link>
        </Button>
      </div>

      <Table className="mt-5 -z-50">
        <TableCaption>A list of your Services</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className='lg:flex hidden w-[300px] break-words'>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-start">View</TableHead>
            <TableHead className="text-start">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{skip + index + 1}</TableCell>
              <TableCell>
                <img src={item.image} alt={item.title} className='w-10 h-10 object-cover' />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className='lg:flex hidden'>{item.description.slice(0, 80)}</TableCell>
              <TableCell>
                <p className={`w-fit h-fit capitalize py-1 px-2 rounded-md text-white ${item.published ? "bg-green-300" : "bg-red-300"}`}>
                  {item.published ? "Published" : "Unpublish"}
                </p>
              </TableCell>
              <TableCell>
                <Link href={`/deshboard/service/${item.id}`}>
                  <Eye />
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/deshboard/service/${item.id}/edit`}>
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
  )
}

export default Servicepage
