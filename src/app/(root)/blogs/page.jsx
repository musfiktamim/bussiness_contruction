import BlogPageBox from "@/Components/Blog/BlogPageBox";
import HeadearsLikeBlogs from "@/Components/Elements/HeadearsLikeBlogs";
import prisma from "@/lib/PrismClient";


export default async function BlogPage() {
  const blogs = await prisma.blogs.findMany({
    take:10,
    orderBy:{
      createdAt:"asc"
    }
  }) 
  return (
    <HeadearsLikeBlogs header="Our Latest Insights & Stories" desc="Explore our latest blogs on design, development, and innovation.">
      <BlogPageBox blogPosts={blogs} />
    </HeadearsLikeBlogs>
  );
}