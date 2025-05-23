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

async function Servicepage() {
  const services = await prisma.services.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <HeadearsLikeBlogs header='Service' desc='our best services'>

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
          {services.length > 0 &&
            services.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index}</TableCell>
                <TableCell>
                  <img src={item.image?.url} alt={item.title} className='w-10 h-10' />
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
            ))
          }
        </TableBody>
      </Table>
    </HeadearsLikeBlogs>
  )
}

export default Servicepage
