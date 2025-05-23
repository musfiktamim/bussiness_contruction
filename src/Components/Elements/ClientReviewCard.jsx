import Image from "next/image";
import manAvatar from "../../../public/images/man-avatar.avif";
import { months } from "@/lib/ConstSlider";

export function ClientReviewCard1({ t }) {
  return (
    <div className="bg-white rounded-xl w-[45%] shadow-md p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.03] group">
      {/* Review text */}
      <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-800 transition-colors">
        {t.review}
      </p>

      {/* Footer: Avatar, Name, Date */}
      <div className="flex items-center space-x-4">
        <Image
          src={manAvatar}
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover transition duration-300 group-hover:grayscale-0 grayscale"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-base group-hover:text-amber-600 transition-colors">{t.name}</h4>
          <div className="text-xs text-gray-500">
            <p>
              {t?.createdAt.getDate()} {months[t?.createdAt.getMonth()]} {t?.createdAt.getFullYear()}
            </p>
            <p>
              {t?.createdAt.getHours() % 12 || 12}:{String(t?.createdAt.getMinutes()).padStart(2, "0")}{" "}
              {t?.createdAt.getHours() >= 12 ? "PM" : "AM"}
            </p>
          </div>
          <div className="flex text-yellow-400 text-sm">
            {"★".repeat(t.rate)}{"☆".repeat(5 - t.rate)}
          </div>
        </div>
      </div>
    </div>
  );
}


export function ClientReviewCard2({ t }) {
  return (
    <div className="bg-white rounded-xl my-5 shadow-md p-6 flex flex-col justify-between 
                    min-w-[280px] sm:min-w-[320px] max-w-[350px] snap-start 
                    transition-all duration-300 hover:shadow-xl hover:scale-[1.03] group">
      
      {/* Review Text */}
      <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-800 transition-colors">
        {t.review?.toString().slice(0,100)}
      </p>

      {/* Footer: Avatar & Info */}
      <div className="flex items-center space-x-4 mt-auto">
        <Image
          src={manAvatar}
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition duration-300"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-base group-hover:text-amber-600 transition-colors">{t.name}</h4>
          <div className="text-xs text-gray-500 flex gap-2 flex-wrap">
            <p>
              {(t?.createdAt.getHours() % 12 || 12)}:{String(t?.createdAt.getMinutes()).padStart(2, "0")}{" "}
              {t?.createdAt.getHours() >= 12 ? "pm" : "am"}
            </p>
            <p>
              {t?.createdAt.getDate()} {months[t?.createdAt.getMonth()]} {t?.createdAt.getFullYear()}
            </p>
          </div>
          <div className="flex text-yellow-400 text-sm">
            {"★".repeat(t.rate)}{"☆".repeat(5 - t.rate)}
          </div>
        </div>
      </div>
    </div>
  );
}

