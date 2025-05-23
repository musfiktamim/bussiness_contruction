import HeadearsLikeBlogs from '@/Components/Elements/HeadearsLikeBlogs'
import { Button } from '@/Components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table'

import BlogImage from "../../../../../public/images/blog-1.jpg"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Edit, Eye } from 'lucide-react'
import prisma from '@/lib/PrismClient'

async function Blogpage() {
  const blogs = await prisma.blogs.findMany({
    take:10,
    orderBy:{
      createdAt:"desc"
    }
  })
  return (
    <HeadearsLikeBlogs header='Blog' desc='our best Blogs'>

      <div className="flex justify-between my-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button className="text-lg" variant={"link"}>
          <Link href={"/deshboard/blog/new"}>Create</Link>
        </Button>
      </div>


      <Table className="mt-5 -z-50">
        <TableCaption>A list of your Blogs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className='lg:flex hidden self-center' >Content</TableHead>
            <TableHead>Publish</TableHead>
            <TableHead className="text-start">Link</TableHead>
            <TableHead className="text-start">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            blogs.length > 0 &&
            blogs.map((item, index: number) => <TableRow key={index}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>
                <Image src={item.image} alt={item.title} width={40} height={40} className='w-10 h-10' />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell className='lg:flex hidden'>{item.content.slice(0, 80)}</TableCell>
              <TableCell>
                <p className={`w-fit h-fit capitalize py-1 px-2 rounded-md text-white ${item.published ? "bg-green-300" : "bg-red-300"} `}>
                  {item.published ? "Published" : "Unpublish"}
                </p>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/deshboard/blog/${item.id}`}>
                  <Eye className='self-end' />
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/deshboard/blog/${item.id}/edit`}>
                  <Edit />
                </Link>
              </TableCell>
            </TableRow>)
          }
        </TableBody>
      </Table>
    </HeadearsLikeBlogs>
  )
}

export default Blogpage
