import Image from 'next/image';
import React from 'react'

type service = {
  id: string;
  title: string;
  description: string;
  image:string;
}


function ServicesCard({ item }:{item:service}) {
  return (
    <div
      className='w-[250px] gap-3 px-6 bg-white h-auto rounded-xl grayscale hover:grayscale-0 hover:scale-[1.01] hover:shadow-xl transition-all duration-500 ease-in-out grow flex flex-col items-center py-10 group border border-gray-200 hover:border-[#A26652]'
    >
      <div className="w-20  transition-transform duration-500  h-20 group-hover:-translate-y-[10px] relative">
        <Image
          src={item.image}
          alt={item.title}
          fill
        />
        <div className='absolute inset-0 blur-md opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-amber-400 rounded-full' />
      </div>

      <h1 className='font-bold text-center text-lg lg:text-2xl transition-colors duration-300 group-hover:text-[#A26652]'>
        {item.title}
      </h1>
      <p className='text-sm text-center text-gray-500 transition-opacity duration-500 group-hover:opacity-80'>
        {item.description}
      </p>
    </div>
  )
}

export default ServicesCard
