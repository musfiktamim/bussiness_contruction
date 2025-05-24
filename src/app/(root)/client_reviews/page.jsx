'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClientReviewCard1 } from '../../../Components/Elements/ClientReviewCard';

const TAKE = 10;

export default function ClientReviewList() {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedPages, setFetchedPages] = useState(new Set());

  const fetchReviews = useCallback(async (pageToFetch) => {
    // Prevent fetching same page again
    if (fetchedPages.has(pageToFetch)) return;

    setLoading(true);
    const res = await fetch(`/api/reviews?page=${pageToFetch}&take=${TAKE}`);
    const newReviews = await res.json();

    // Update set to track fetched pages
    setFetchedPages((prev) => new Set(prev).add(pageToFetch));

    // Stop if nothing more to load
    if (!Array.isArray(newReviews) || newReviews.length === 0) {
      setHasMore(false);
    } else {
      setReviews((prev) => {
        const ids = new Set(prev.map((r) => r.id)); // Filter by unique review IDs
        const uniqueNew = newReviews.filter((r) => !ids.has(r.id));
        return [...prev, ...uniqueNew];
      });
    }
    setLoading(false);
  }, [fetchedPages]);

  useEffect(() => {
    fetchReviews(page);
  }, [page, fetchReviews]);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, hasMore]);

  return (
    <>
      <div className='w-full px-2 flex gap-y-5 justify-evenly mt-5 flex-wrap'>
        {reviews.map((item) => (
          <ClientReviewCard1 t={item} key={item.id} />
        ))}
      </div>

      {loading && <p className='text-center mt-5'>Loading more reviews...</p>}
      {!hasMore && <p className='text-center mt-5'>No more reviews to load.</p>}
    </>
  );
}
