"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import BlogPageBox from "@/Components/Blog/BlogPageBox";
import HeadearsLikeBlogs from "@/Components/Elements/HeadearsLikeBlogs";

const TAKE = 10;

export default function BlogInfiniteScroll() {
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedPages, setFetchedPages] = useState(new Set());

  const fetchBlogs = useCallback(
    async (pageToFetch) => {
      if (fetchedPages.has(pageToFetch)) return;

      setLoading(true);
      const res = await fetch(`/api/blog?page=${pageToFetch}&take=${TAKE}`);
      const newBlogs = await res.json();

      setFetchedPages((prev) => new Set(prev).add(pageToFetch));

      if (newBlogs.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => {
          const existingIds = new Set(prev.map((b) => b.id));
          const uniqueNewBlogs = newBlogs.filter((b) => !existingIds.has(b.id));
          return [...prev, ...uniqueNewBlogs];
        });
      }

      setLoading(false);
    },
    [fetchedPages]
  );

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs(page);
    }
  }, [page, fetchBlogs, blogs.length]);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading &&
        hasMore
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBlogs(nextPage);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, loading, hasMore, fetchBlogs]);

  return (
    <HeadearsLikeBlogs
      header="Our Latest Insights & Stories"
      desc="Explore our latest blogs on design, development, and innovation."
    >
      <BlogPageBox blogPosts={blogs} />
      {loading && <p className="text-center my-4">Loading more blogs...</p>}
      {!hasMore && <p className="text-center my-4">No more blogs to load.</p>}
    </HeadearsLikeBlogs>
  );
}
