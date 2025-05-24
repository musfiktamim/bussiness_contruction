import React from 'react'
import prisma from "../../../../../lib/PrismClient"

async function page({params}) {
  const contact = await prisma.contacts.findUnique({
    where:{
      id:params.id
    }
  })

  if(!contact.seen)
    await prisma.contacts.update({
      data:{
        seen:true
      },
      where:{
        id:contact.id
      }

  })
  
  return (
    <div>
      <div className='px-2 py-3 flex flex-col gap-2 border rounded-md lg:w-[60%] md:w-[70%] w-full m-auto mt-5'>
        <div className='px-2 py-2 bg-[#eee] rounded-md'>
          Name: {contact.name}
        </div> 
        <div className='px-2 py-2 bg-[#eee] rounded-md'>
          Email: {contact.email}
        </div>
        <div className='px-2 py-2 bg-[#eee] rounded-md'>
          Phone: {contact.phone}
        </div>
        <div>
          Message:
          <div className='px-2 py-2 min-h-32 bg-[#eee] rounded-md'>
            {contact.message}
          </div>
        </div>
      </div>

      
      
    </div>
  )
}

export default page
