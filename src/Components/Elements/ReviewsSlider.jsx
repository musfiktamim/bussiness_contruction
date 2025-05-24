"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ClientReviewCard2 } from "./ClientReviewCard";

function ReviewsSlider({reviews}) {
  return (
    <div className="w-full px-4 py-10 ">
      <Swiper
        // modules={[ Autoplay]}
        loop
        autoplay
        spaceBetween={30}
        slidesPerView={1}
        // autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          58: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((t, idx) => (
          <SwiperSlide key={idx} className="cursor-grab">
            <ClientReviewCard2 t={t} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ReviewsSlider
