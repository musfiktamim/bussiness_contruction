import { Calendar } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: {
    url:string
  };
  createdAt: Date;
  id: string;
}

export default function BlogCard({item}:{item:BlogCardProps}) {
  return (
    <div className="flex flex-col h-full mb-5 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:ring-1 hover:ring-blue-200 group">
      
      {/* Image Section */}
      <div className="relative h-56 shrink-0 overflow-hidden">
        <img
          src={item.image.url}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        
        {/* Date badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md bg-white/40 text-gray-800 text-xs font-medium flex items-center gap-1 shadow-sm">
          <Calendar className="w-4 h-4" />
          <span>{item.createdAt.toLocaleDateString()}</span>
        </div>

        {/* Overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Text Section */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-500 transition-colors duration-300">
          {item.title?.slice(0,66)}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {item.excerpt}
        </p>

        {/* Read More CTA always at bottom */}
        <div className="mt-auto">
          <Link
            href={`/blogs/${item.id}`}
            className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline transition-all group-hover:gap-3"
          >
            Read more <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
