"use client";
import { Menu, Workflow, X } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'

type deshLinks = {
    name:string,
    link:string
}

const Deshlinks:deshLinks[] = [
    {
        name:"Home",
        link:"/deshboard"
    },
    {
        name:"Service",
        link:"/deshboard/service"
    },
    {
        name:"Project",
        link:"/deshboard/project"
    },
    {
        name:"Blog",
        link:"/deshboard/blog"
    },
    {
        name:"Contact",
        link:"/deshboard/contact"
    },
]


function DeshboardNavbar() {
    const [show,setShow] = useState({
        showMenu:false
    })
  return (
    <div className='w-full sticky z-[100000] top-0 flex px-2 items-center justify-start h-20 bg-white shadow-md'>
        <div className='w-1/2 flex justify-between'>
            <Menu className='cursor-pointer' onClick={()=>setShow((p)=>({...p,showMenu:true}))} />
            <div className='flex items-center justify-center gap-2'>
                <Workflow />
                <h1>Deshboard</h1>
            </div>
        </div>
        {
            show.showMenu &&
            <div onClick={()=>setShow((p)=>({...p,showMenu:false}))} className='fixed top-0 left-0 w-full h-full opacity-30 z-[999] bg-black' />
        }
        <div className={`w-[300px] shadow-2xl text-white h-screen top-0 z-[1000] transition-discrete duration-700 ease-in-out ${ !show.showMenu?"-left-full":"left-0"} fixed bg-blue-400 z-[1000]`}>
            <div className='w-full flex items-center justify-start h-20 px-2'>
                <X className='cursor-pointer' onClick={()=>setShow((p)=>({...p,showMenu:false}))} />
            </div>
            <div className='w-full h-full flex gap-2 flex-col pl-2'>
                <Link className='w-full p-2 bg-white text-black text-sm  rounded-l-md' href={"/deshboard"}>Deshboard</Link>
                {
                    Deshlinks.map((item:deshLinks,index:number)=><Link onClick={()=>setShow((p)=>({...p,showMenu:false}))} key={index} className='w-full p-2 text-white text-lg rounded-l-md' href={item.link}>{item.name}</Link>)
                }
            </div>
        </div>
    </div>
  )
}

export default DeshboardNavbar
