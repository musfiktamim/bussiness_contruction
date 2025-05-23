import BlogEditBox from '@/Components/Blog/BlogEditBox';
import prisma from '@/lib/PrismClient'
import { notFound, useParams } from 'next/navigation'
import React from 'react'




async function BlogEditpage() {
  const params = await useParams()
  const blogs = await prisma.blogs.findUnique({
    where:{
      id: String(params.id)
    }
  })
  
  if(!blogs) notFound();

  return (
    <div>
      <BlogEditBox item={blogs} />
    </div>
  )
}

export default BlogEditpage
