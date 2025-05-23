import prisma from '../../../lib/PrismClient'
import { ClientReviewCard1 } from "../../../Components/Elements/ClientReviewCard"
import HeadearsLikeBlogs from "../../../Components/Elements/HeadearsLikeBlogs"


async function ClientReviewpage() {
  const reviews = await prisma.reviews.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc"
    }
  })
  return (
    <HeadearsLikeBlogs header='Latest Reviews' desc='npm install framer-motion react-intersection-observer
'>
      {
        reviews.length > 0 ?
          <div className='w-full flex gap-y-5 justify-evenly mt-5 flex-wrap'>
            {
              reviews.map((item,index) => (<ClientReviewCard1 t={item} key={index} />))
            }
          </div> : <div className='w-full h-[90dvh] flex items-center justify-center'>
            <h1 className='text-4xl text-black font-sans'>Reviews not found</h1>
          </div>
      }
    </HeadearsLikeBlogs>
  )
}

export default ClientReviewpage