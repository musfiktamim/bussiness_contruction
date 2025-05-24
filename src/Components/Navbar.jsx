"use client";
import Link from 'next/link'
import {  useState } from 'react'
import { LocationEditIcon, Mail, MenuIcon, Phone, WalletCards, X } from 'lucide-react'
import { links } from '../lib/ConstSlider';


function Navbar() {
    const [hash,setHash] = useState("")
    console.log(hash);
    const [show, setShow] = useState({
        showMenu: false,
        showInfo:false
    })

    function handleAllCancel(){
        setShow({
            showInfo:false,
            showMenu:false
        })
    }
    


    return (
        <header className='flex items-center justify-between sticky top-0 z-[1000] left-0 w-full h-20 bg-background shadow-lg px-2 md:px-3 lg:px-20'>
            <Link href={"/"} className='text-2xl'>
                Exper<span className='text-amber-300'>ience</span>
                <br />
                <p className='text-xs'>Construction NYC</p>
            </Link>
            <div>
                <div className={`fixed top-20 z-20 shadow-2xl border-t border-gray-200 h-full w-[300px] ${show.showMenu ? "right-0" : "right-[-100%]"} pt-5 bg-background text-foreground flex flex-col items-end gap-3 text-right  md:p-0 md:border-0 transition-all md:static md:w-fit md:flex md:flex-row md:shadow-none md:gap-2 px-2`}>
                    {
                        links.map((item, index) => (
                            <Link key={index} onClick={() => {
                                setShow((prev) => ({ ...prev, showMenu: false }));
                                // setHash(links);
                            }} className={`text-lg hover:text-white px-4 w-full py-2 rounded-md text-center hover:bg-gray-400 bg-gray-200 font-semibold md:bg-transparent md:px-2 md:py-2 transition-all md:text-xl md:hover:bg-gray-400 ${hash == item.link ? "text-amber-200":null} `} href={item.link}>{item.name}</Link>
                        ))
                    }
                </div>
            </div>
            <div className='flex gap-2'>
                <WalletCards className='cursor-pointer' onClick={()=>(setShow((prev)=>({...prev,showInfo:true})))} />
                <div className='md:hidden flex cursor-pointer'>
                    {
                        show.showMenu ? <X onClick={() => setShow((prev) => ({ ...prev, showMenu: false }))} /> :
                            <MenuIcon onClick={() => setShow((prev) => ({ ...prev, showMenu: true }))} />
                    }
                </div>
            </div>
            <div className={`fixed z-20 border-t bg-background border-gray-300 transition-all shadow-2xl top-20 ${show.showInfo?"right-0": "right-[-100%]"} h-full w-[300px]  overflow-y-auto px-3 flex flex-col gap-10 py-32`}>
                    <div className='flex flex-col items-center'>
                        <Phone className='w-10 h-10 text-white rounded-md bg-gray-400 p-2' />
                        <h1 className='mt-3 font-bold text-xl'>Phone Number</h1>
                        <p className='text-gray-400 mt-1 text-sm'>01855241666</p>
                        <p className='text-gray-400 mt-1 text-sm'>01855241666</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Mail className='w-10 h-10 text-white rounded-md bg-gray-400 p-2' />
                        <h1 className='mt-3 font-bold text-xl'>Mail</h1>
                        <p className='text-gray-400 mt-1 text-sm'>musfiktamim@gmail.com</p>
                        <p className='text-gray-400 mt-1 text-sm'>musfiktamim2@gmail.com</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <LocationEditIcon className='w-10 h-10 text-white rounded-md bg-gray-400 p-2' />
                        <h1 className='mt-3 font-bold text-xl'>Address</h1>
                        <p className='text-gray-400 mt-1 text-sm'>Feni Bangladesh</p>
                        <p className='text-gray-400 mt-1 text-sm'>Feni</p>
                    </div>
            </div>

            {
                show.showInfo || show.showMenu ?
                    <div onClick={handleAllCancel} onScroll={handleAllCancel} className='fixed inset-0 z-10 bg-gray-200 backdrop-blur-2xl opacity-10'>

                    </div> :null
            }
            
        </header>
    )
}

export default Navbar


