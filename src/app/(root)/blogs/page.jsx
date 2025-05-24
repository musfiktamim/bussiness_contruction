import { Suspense } from "react";
import BlogInfiniteScroll from "./BlogInfiniteScroll";

export default function BlogsPage() {
  return (
    <Suspense fallback={<p className="text-center mt-5">Loading blogs...</p>}>
      <BlogInfiniteScroll />
    </Suspense>
  );
}
