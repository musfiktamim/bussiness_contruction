import React, { ReactNode } from 'react'
import DeshboardNavbar from './deshboard/DeshboardComponents/DeshboardNavbar'

function DeshBoardlayout({children}:{children:ReactNode}) {
  return (
    <div className='w-full h-full bg-white'>
        <DeshboardNavbar />
        <div className='w-full h-full'>
            {children}
        </div>
    </div>
  )
}

export default DeshBoardlayout
