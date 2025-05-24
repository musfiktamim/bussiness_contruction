import HomeBox from "@/Components/HomeBox"
import ServicesBox from "@/Components/ServicesBox"
import AboutBox from "@/Components/AboutBox"
import ProjectBox from "@/Components/ProjectBox"
import ContactBox from "@/Components/ContactBox"
import BlogBox from "@/Components/BlogBox"
import ClientReviewsBox from "../../Components/ClientReviewsBox"

import prisma from "@/lib/PrismClient"

async function Homepage() {

  const reviews = await prisma.reviews.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    }
  })

  const services = await prisma.services.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc"
    },
    where: {
      published: true
    }
  })

  const projects = await prisma.projects.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc"
    },
    where: {
      published: true
    }
  })

  const blogs = await prisma.blogs.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      published: true
    }
  })
  console.log(blogs);
  return (
    <div className="mt-2 flex flex-col">
      <HomeBox />

      {/* About Section */}
      <div className="lg:w-[90%] lg:m-auto w-full px-2">
        <AboutBox />
      </div>

      {/* Services Section */}
      {services.length > 0 && (
        <div className="lg:px-[10%] bg-gradient-to-br from-[#f9f9f9] to-[#e0e0e0] p-5 transition-all duration-500 hover:bg-[#f3f3f3]">
          <ServicesBox services={services} />
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="lg:px-[10%] bg-gradient-to-b from-gray-900 to-[#2b2b2b] text-white p-5 transition-all duration-500">
          <ProjectBox projects={projects} />
        </div>
      )}
      {
        blogs.length > 0 &&
        <div className="lg:px-[10%] bg-white border-t border-gray-200 shadow-inner p-5 transition-all duration-500">
          <BlogBox blogs={blogs} />
        </div>
      }
      {/* Blog Section */}

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="lg:px-[10%] bg-gradient-to-tr from-[#f1f1f1] to-[#eaeaea] p-5 hover:bg-[#f5f5f5] transition-colors duration-500">
          <ClientReviewsBox reviews={reviews} />
        </div>
      )}

      {/* Contact Section */}
      <div className="lg:px-[10%] bg-gradient-to-br from-white to-[#f9f9f9] p-5 hover:shadow-xl transition-shadow duration-500">
        <ContactBox />
      </div>
    </div>
  )
}

export default Homepage
