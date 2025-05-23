import React, { ReactNode } from 'react'

function HeadearsLikeBlogs({ children,header,desc }: { children: ReactNode,header:string,desc:string }) {
    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    {header}
                </h1>
                <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                    {desc}
                </p>
            </div>
            <div className='px-2'>
                {children}
            </div>
        </div>
    )
}

export default HeadearsLikeBlogs
