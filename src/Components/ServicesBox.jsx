import React from 'react'
import { OurServices } from '../lib/ConstSlider'
import ServicesCard from './Elements/ServicesCard'
import Link from 'next/link'
import { HeaderTextBoxBlack } from './Elements/HeaderTextBox'
import { Button } from './ui/button'

function ServicesBox({services}) {
    return (
        <div className='py-5'>
            <div id='services' className='flex justify-between'>
                <HeaderTextBoxBlack text={"Our Services"} />
                <Button variant={"link"}>
                    <Link href={"/services"}>See More</Link>
                </Button>
            </div>
            <div className='flex flex-wrap gap-5 justify-center mt-5'>
                {
                    services.map((item, index) => (<ServicesCard key={index} item={item} />))
                }
            </div>
        </div>
    )
}

export default ServicesBox
