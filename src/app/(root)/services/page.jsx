import ServicesCard from '../../../Components/Elements/ServicesCard'
import prisma from '@/lib/PrismClient'
import HeadearsLikeBlogs from '@/Components/Elements/HeadearsLikeBlogs'

async function Servicepage() {
    const services = await prisma.services.findMany({
        take: 10,
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <HeadearsLikeBlogs header='Our services' desc='npm install framer-motion react-intersection-observer
'>
            {
                services.length > 0 ?
                    <div className='flex flex-wrap gap-5 justify-center mt-5'>
                        {
                            services.map((item, index) => (<ServicesCard key={index} item={item} />))
                        }
                    </div> : <div className='w-full h-[90dvh] flex items-center justify-center'>
                        <h1 className='text-4xl text-black font-sans'>Services not found</h1>
                    </div>
            }
        </HeadearsLikeBlogs>
    )
}

export default Servicepage

// <div className='flex flex-col items-center py-5 px-2 bg-[#eee]'>
//     <HeaderTextBoxBlack text={"our Services"} hr color={true} />
// {
//     services.length > 0 ?
//         <div className='flex flex-wrap gap-5 justify-center mt-5'>
//             {
//                 services.map((item, index) => (<ServicesCard key={index} item={item} />))
//             }
//         </div>: <div className='w-full h-[90dvh] flex items-center justify-center'>
//         <h1 className='text-4xl text-black font-sans'>Services not found</h1>
//     </div>
// }
// </div>