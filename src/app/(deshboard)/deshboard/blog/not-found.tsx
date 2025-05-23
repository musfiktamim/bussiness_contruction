import Image from 'next/image'
import NotImage from "../../../../../public/notfound.svg"
 
export default function BlogNotFound() {
  return (
    <div className='w-full h-[100%] cursor-grab'>
        <Image 
            src={NotImage}
            alt='Not Fund Image'
            fill
            className='object-bottom'
        />
    </div>
  )
}