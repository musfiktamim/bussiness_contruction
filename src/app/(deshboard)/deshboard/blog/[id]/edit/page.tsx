import { notFound } from 'next/navigation'
import prisma from '@/lib/PrismClient'
import BlogEditBox from '@/Components/Blog/BlogEditBox'

export default async function BlogEditpage({ params }:{params:{id:string}}) {
  const { id } = params

  const blog = await prisma.blogs.findUnique({
    where: { id },
  })

  if (!blog) {
    return notFound()
  }

  return (
    <div>
      <BlogEditBox item={blog} />
    </div>
  )
}
