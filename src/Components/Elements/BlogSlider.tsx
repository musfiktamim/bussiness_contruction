"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BlogCard from "../Blog/Blogcard";

interface BlogPost {
  title: string;
  excerpt: string;
  image:string;
  createdAt: Date;
  id: string;
}

interface BlogCardSliderProps {
  posts: BlogPost[];
}

export default function BlogCardSlider({ posts }: BlogCardSliderProps) {
  return (
    <div className="w-full px-4 py-12 md:py-16">
      <Swiper
        // modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="group"
      >
        {posts.map((post, index) => (
          <SwiperSlide key={index} className="cursor-grab">
            <BlogCard
              item={post}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
