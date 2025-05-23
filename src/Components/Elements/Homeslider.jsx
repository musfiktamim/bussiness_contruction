"use client"
import  { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { sliderData } from '../../lib/ConstSlider'
import "swiper/css";
import "swiper/css/navigation";
import Image from 'next/image';

function Homeslider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  function handleClick() {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
  }

  // Initialize navigation with custom buttons once refs are available
  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000 }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={false}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index} className='cursor-grab'>
            <div className='w-full relative h-[90vh]'>
              <Image src={item.image} alt={item.title} className='w-full z-10 h-full top-0 left-0 absolute object-right object-cover' />

              <div
                className={`bg-gradient-to-r px-2 from-white via-[10%] to-transparent z-20 w-full h-full absolute left-0 top-0 flex flex-col justify-center wrap-break-word gap-3 items-center text-center
                lg:items-baseline lg:text-left lg:w-1/2 lg:pl-32
                transition-all duration-700 ease-out
                ${activeIndex === index ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-5 blur-sm"}`}
              >
                <h1 className='text-5xl lg:text-6xl font-sans uppercase line-clamp-2 font-bold'>{item.title}</h1>
                <p className='text-base text-gray-900 font-light'>{item.detailes}</p>
                <button onClick={handleClick} className='text-xl hover:bg-transparent hover:border-[1px] border hover:text-black transition-colors cursor-pointer bg-black text-white w-fit px-4 py-3 rounded-md '>Get Started</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons at Bottom Center */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6 z-30">
        <button
          ref={prevRef}
          aria-label="Previous Slide"
                    className="bg-white text-black px-3 py-2 rounded-md shadow-lg hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          ref={nextRef}
          aria-label="Next Slide"
          className="bg-white text-black px-3 py-2 rounded-md shadow-lg hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out"
        >
            
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Homeslider;
