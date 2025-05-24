'use client';

import { useEffect, useState, useCallback } from 'react';
import ServicesCard from '@/Components/Elements/ServicesCard';
import HeadearsLikeBlogs from '@/Components/Elements/HeadearsLikeBlogs';

const TAKE = 6;

export default function Servicepage() {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedPages, setFetchedPages] = useState(new Set());

  const fetchServices = useCallback(async (pageToFetch) => {
    if (fetchedPages.has(pageToFetch)) return;

    setLoading(true);
    const res = await fetch(`/api/service?page=${pageToFetch}&take=${TAKE}`);
    const newServices = await res.json();

    setFetchedPages((prev) => new Set(prev).add(pageToFetch));

    if (newServices.length === 0) {
      setHasMore(false);
    } else {
      setServices((prev) => {
        const existingIds = new Set(prev.map((s) => s.id));
        const unique = newServices.filter((s) => !existingIds.has(s.id));
        return [...prev, ...unique];
      });
    }

    setLoading(false);
  }, [fetchedPages]);

  useEffect(() => {
    fetchServices(page);
  }, [page, fetchServices]);

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
      header="Our Services"
      desc="Explore our professional service offerings."
    >
      {services.length > 0 ? (
        <div className="flex flex-wrap gap-5 justify-center mt-5">
          {services.map((item) => (
            <ServicesCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[90dvh] flex items-center justify-center">
          <h1 className="text-4xl text-black font-sans">Services not found</h1>
        </div>
      )}

      {loading && <p className="text-center my-4">Loading more services...</p>}
      {!hasMore && <p className="text-center my-4">No more services to load.</p>}
    </HeadearsLikeBlogs>
  );
}
