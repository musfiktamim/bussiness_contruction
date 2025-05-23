import React from 'react';
import { notFound } from 'next/navigation';
import BlogEditBox from '@/Components/Blog/BlogEditBox';
import prisma from '@/lib/PrismClient';

type BlogEditPageProps = {
  params: {
    id: string;
  };
};

const BlogEditPage = async ({ params }: BlogEditPageProps) => {
  const blog = await prisma.blogs.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <BlogEditBox item={blog} />
    </div>
  );
};

export default BlogEditPage;
