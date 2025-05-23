import Image from 'next/image';
// import Image1 from "../../../public/images/project-1.jpg";
import React from 'react';
import { Plus } from 'lucide-react';
// import { CldImage } from "next-cloudinary"
// import { JsonValue } from '@prisma/client/runtime/library';
// import


type ProjectType = {
    id: string;
    title: string;
    image: {
        url:string
    };
    description: string;
};



function ProjectsCard({ item }: { item: ProjectType }) {
    console.log(item?.image)
    return (
        <div className="w-[95%] sm:w-[330px] md:min-w-[330px] relative overflow-hidden group h-[400px] shadow-lg rounded-xl bg-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">

            {/* Background Image */}
            <img
                src={typeof item?.image.url === "string" ? item.image.url : "../../../public/images/project-1.jpg"}
                alt={item?.title || "Project Image"}
                className="w-full h-full object-cover absolute top-0 left-0 z-0 transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:grayscale"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 z-10" />

            {/* Text Slide Up (visible by default on mobile) */}
            <div className="
                absolute bottom-0 w-full z-20
                translate-y-0
                lg:translate-y-full lg:group-hover:translate-y-0
                transition-transform duration-500 ease-in-out
            ">
                <div className="bg-white flex justify-between items-center px-4 py-3">
                    <div className="w-[80%]">
                        <h3 className="text-xl font-bold text-gray-900 uppercase">{item?.title || "Dream Home"}</h3>
                        <p className="text-sm text-gray-600">
                            {
                                item?.description || "Construction, Design"
                            }
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center hover:rotate-90 transition-all duration-300">
                        <Plus className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectsCard;
