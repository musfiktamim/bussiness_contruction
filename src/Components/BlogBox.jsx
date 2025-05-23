import React from 'react'
import { HeaderTextBoxBlack } from './Elements/HeaderTextBox'
import Link from 'next/link'
import { Button } from './ui/button'
import BlogCardSlider from "@/Components/Elements/BlogSlider";
// import BlogCard from './Elements/Blogcard'
import blogpic1 from "../../public/images/blog-1.jpg"
import blogpic2 from "../../public/images/blog-2.jpg"

function BlogBox({blogs}) {

    return (
        <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto" id='blogs'>
                <h2 className="text-2xl font-bold mb-6 text-center">Latest from our Blog</h2>
                <BlogCardSlider posts={blogs} />
            </div>
            <div className='w-full flex justify-center'>
                <Link href={"/blogs"}>
                    <Button className='px-3 py-4 text-center cursor-pointer'>See More</Button>
                </Link>
            </div>
        </section>


    )
}

export default BlogBox
