import React from 'react'
import { HeaderTextBoxWhite } from './Elements/HeaderTextBox'
import ProjectsCard from './Elements/ProjectsCard'
import Link from 'next/link'
import { Button } from './ui/button'

function ProjectBox({projects}) {
  return (
    <div className='py-5'>

      <div id='projects' className='flex justify-between'>
        <HeaderTextBoxWhite text='Projects' />
        <Button variant={"link"}>
          <Link className='text-white' href={"/projects"}>See More</Link>
        </Button>
      </div>
      <div className='flex mt-5 justify-center flex-wrap gap-x-1 gap-y-4'>
        {
          projects.map((item,index)=><ProjectsCard key={index} item={item} />)
        }
      </div>
    </div>
  )
}

export default ProjectBox
