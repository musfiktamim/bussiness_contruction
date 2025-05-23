"use client"
import React from 'react'
import { Detailes } from '../lib/ConstSlider'
import { HeaderTextBoxBlack } from './Elements/HeaderTextBox'

function AboutBox() {
  function handleClick() {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }

  return (
    <div className='flex py-10 flex-col gap-10'>
      <div id='about' className="transition-opacity duration-700 ease-in-out opacity-100">
        <HeaderTextBoxBlack text={"About Us"} />
      </div>

      <div className='flex flex-col items-center gap-8 lg:px-3 lg:flex-row w-full h-auto'>
        <div className='w-full h-auto lg:w-1/2 transition-transform duration-700 hover:scale-105'>
          <video
            muted
            autoPlay
            loop
            className='aspect-video rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-500'
          >
            <source
              src='https://res.cloudinary.com/dnrqpptic/video/upload/v1747888379/otopi0laalmmjrcqbtdy.mp4'
              type="video/mp4"
            />
          </video>
        </div>

        <div className='w-full flex flex-col gap-5 lg:w-1/2'>
          <h1 className='lg:text-4xl font-bold leading-[1.3] uppercase transition-transform duration-500 hover:translate-y-[-2px]'>
            We will provide you the best work which you dreamt for!
          </h1>
          <p className='text-base font-sans leading-7 text-gray-500 font-[400] transition-colors duration-300 hover:text-gray-700'>
            Hard workers persevere in large and small ways to the benefit of their personal and professional communities. Persistence is continued, extended effort toward a goal or outcome, regardless of challenges or obstacles.
          </p>
          <button
            onClick={handleClick}
            className='w-fit px-4 py-3 text-lg bg-black text-white hover:bg-amber-400 transition-all duration-500 ease-in-out hover:text-black rounded-md shadow-md hover:shadow-lg active:scale-95'
          >
            Read More
          </button>
        </div>
      </div>

      <div className='w-full flex flex-wrap gap-4 justify-center'>
        {Detailes.map((item, index) => (
          <div
            key={index}
            className='min-w-[250px] grow flex flex-col gap-2 justify-center items-center h-[150px] bg-[#eee] rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500'
          >
            <h1 className='text-4xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-amber-500'>{item.number}</h1>
            <p className='text-gray-500'>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutBox
