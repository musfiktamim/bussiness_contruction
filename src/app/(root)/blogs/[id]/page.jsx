import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/PrismClient';
import { ArrowLeft } from 'lucide-react';

export default async function BlogPost({ params }) {
  const post = await prisma.blogs.findUnique({
    where: {
      id: params.id,
      published: true,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/blogs"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>
      </div>

      <article className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-800 prose-img:rounded-xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500">
            <time dateTime={post.createdAt.toISOString()} className="text-sm">
              {post.createdAt.toLocaleDateString()}
            </time>
          </div>
        </header>

        <div className="relative aspect-[16/9] w-full rounded-2xl bg-gray-100 overflow-hidden mb-10">
          <img
            src={post.image?.url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
