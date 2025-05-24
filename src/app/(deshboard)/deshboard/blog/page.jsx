import HeadearsLikeBlogs from '@/Components/Elements/HeadearsLikeBlogs'
import { Button } from '@/Components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Edit, Eye } from 'lucide-react'
import prisma from '@/lib/PrismClient'
import { notFound } from 'next/navigation'

const PAGE_SIZE = 10


async function Blogpage({ searchParams }) {
  const page = parseInt(searchParams.page || '1', 10)
  if (page < 1) return notFound()

  const skip = (page - 1) * PAGE_SIZE

  const [blogs, total] = await Promise.all([
    prisma.blogs.findMany({
      skip,
      take: PAGE_SIZE,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.blogs.count(),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <HeadearsLikeBlogs header='Blog' desc='our best Blogs'>
      <div className='flex justify-between my-6'>
        <h1 className='text-2xl font-bold'>Blogs</h1>
        <Button className='text-lg' variant={'link'}>
          <Link href={'/deshboard/blog/new'}>Create</Link>
        </Button>
      </div>

      <Table className='mt-5 -z-50'>
        <TableCaption>A list of your Blogs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Id</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className='lg:flex hidden self-center'>Content</TableHead>
            <TableHead>Publish</TableHead>
            <TableHead className='text-start'>Link</TableHead>
            <TableHead className='text-start'>Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length > 0 &&
            blogs.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{skip + index + 1}</TableCell>
                <TableCell>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={40}
                    height={40}
                    className='w-10 h-10 object-cover'
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className='lg:flex hidden'>{item.content.slice(0, 80)}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit h-fit capitalize py-1 px-2 rounded-md text-white ${
                      item.published ? 'bg-green-300' : 'bg-red-300'
                    }`}
                  >
                    {item.published ? 'Published' : 'Unpublish'}
                  </p>
                </TableCell>
                <TableCell className='text-right'>
                  <Link href={`/deshboard/blog/${item.id}`}>
                    <Eye className='self-end' />
                  </Link>
                </TableCell>
                <TableCell className='text-right'>
                  <Link href={`/deshboard/blog/${item.id}/edit`}>
                    <Edit />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className='flex justify-center gap-4 mt-8'>
        <Button variant='outline' disabled={page <= 1}>
          <Link href={`?page=${page - 1}`}>Previous</Link>
        </Button>
        <span className='text-sm pt-2'>
          Page {page} of {totalPages}
        </span>
        <Button variant='outline' disabled={page >= totalPages}>
          <Link href={`?page=${page + 1}`}>Next</Link>
        </Button>
      </div>
    </HeadearsLikeBlogs>
  )
}

export default Blogpage
