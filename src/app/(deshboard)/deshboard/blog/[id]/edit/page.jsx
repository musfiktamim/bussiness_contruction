import BlogEditBox from '@/Components/Blog/BlogEditBox';
import prisma from '@/lib/PrismClient'
import { notFound } from 'next/navigation'
import React from 'react'

async function BlogEditPage({params}) {
    const blogs = await prisma.blogs.findUnique({
        where:{
            id:params.id
        }
    }) 
    if(!blogs) notFound();
  return (
    <div>
        <BlogEditBox item={blogs} />
    </div>
  )
}

export default BlogEditPage
