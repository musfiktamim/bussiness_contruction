import ServiceBoxEdit from '@/Components/Service/ServiceBoxEdit'
import prisma from '@/lib/PrismClient'
import { notFound } from 'next/navigation'
import React from 'react'




async function ServiceEditpage({params}) {
  const service = await prisma.services.findUnique({
    where:{
      id:params.id
    }
  })
  if(!service) notFound();
  return (
    <div>
      <ServiceBoxEdit item={service} />
    </div>
  )
}

export default ServiceEditpage
