import React from 'react'
import {OurServices} from "@/lib/ConstSlider"
import { HeaderTextBoxWhite } from '../../../Components/Elements/HeaderTextBox'
import ProjectsCard from '../../../Components/Elements/ProjectsCard'
import prisma from '@/lib/PrismClient'
import HeadearsLikeBlogs from '@/Components/Elements/HeadearsLikeBlogs'

async function ProjectsPage() {
    const projects = await prisma.projects.findMany({
        take: 12,
        orderBy: {
            createdAt: "desc"
        },
        // where:{
        //     published:true
        // }
    })
    return (
        <HeadearsLikeBlogs header='Our Latest Projects' desc='Explore our latest blogs on design, development, and innovation.'>
            <div className='flex mt-5 justify-center flex-wrap gap-y-5 gap-x-2'>
                {
                    projects.map((item) => <ProjectsCard item={item} key={item.id} />)
                }
            </div>
        </HeadearsLikeBlogs>
    )
}

export default ProjectsPage;