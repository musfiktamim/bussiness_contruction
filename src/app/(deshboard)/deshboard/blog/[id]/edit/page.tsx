import BlogEditBox from '@/Components/Blog/BlogEditBox'
import ServiceBoxEdit from '@/Components/Service/ServiceBoxEdit'
import prisma from '@/lib/PrismClient'
import { notFound } from 'next/navigation'
import React from 'react'

async function ServiceEditpage({params}:{params:{id:string}}) {
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

export default ServiceEditpage
