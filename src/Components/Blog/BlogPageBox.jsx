import React from 'react'
import BlogCard from './Blogcard'

function BlogPageBox({blogPosts}) {
    return (
        <div className="max-w-6xl mx-auto px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (<BlogCard key={index} item={post} />))}
        </div>
    )
}

export default BlogPageBox
