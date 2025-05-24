'use client';

import { useEffect, useState, useCallback } from 'react';
import ProjectsCard from '@/Components/Elements/ProjectsCard';
import HeadearsLikeBlogs from '@/Components/Elements/HeadearsLikeBlogs';

const TAKE = 6;

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedPages, setFetchedPages] = useState(new Set());

  const fetchProjects = useCallback(async (pageToFetch) => {
    if (fetchedPages.has(pageToFetch)) return;

    setLoading(true);
    const res = await fetch(`/api/project?page=${pageToFetch}&take=${TAKE}`);
    const newProjects = await res.json();

    setFetchedPages((prev) => new Set(prev).add(pageToFetch));

    if (newProjects.length === 0) {
      setHasMore(false);
    } else {
      setProjects((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const unique = newProjects.filter((p) => !existingIds.has(p.id));
        return [...prev, ...unique];
      });
    }

    setLoading(false);
  }, [fetchedPages]);

  useEffect(() => {
    fetchProjects(page);
  }, [page, fetchProjects]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <HeadearsLikeBlogs
      header="Our Latest Projects"
      desc="Explore our latest blogs on design, development, and innovation."
    >
      <div className="flex mt-5 justify-center flex-wrap gap-y-5 gap-x-2">
        {projects.map((item) => (
          <ProjectsCard item={item} key={item.id} />
        ))}
      </div>
      {loading && <p className="text-center my-4">Loading more projects...</p>}
      {!hasMore && <p className="text-center my-4">No more projects to load.</p>}
    </HeadearsLikeBlogs>
  );
}
