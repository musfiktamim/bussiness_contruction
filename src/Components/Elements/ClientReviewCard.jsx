import Image from "next/image";
import manAvatar from "../../../public/images/man-avatar.avif";
import { months } from "@/lib/ConstSlider";

export function ClientReviewCard1({ t }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:scale-[1.01] group
                    w-full">
      {/* Review text */}
      <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-800 transition-colors">
        {t.review}
      </p>

      {/* Footer: Avatar, Name, Date */}
      <div className="flex items-center space-x-4">
        <Image
          src={manAvatar}
          alt={t.name}
          width={48}
          height={48}
          className="rounded-full object-cover transition duration-300 group-hover:grayscale-0 grayscale"
        />
        <div className="flex flex-col gap-1 text-xs sm:text-sm">
          <h4 className="font-semibold text-base group-hover:text-[#A26652] transition-colors">{t.name}</h4>
          <div className="text-gray-500 leading-tight">
            <p>
              {new Date(t?.createdAt).getDate()} {months[new Date(t?.createdAt).getMonth()]} {new Date(t?.createdAt).getFullYear()}
            </p>
            <p>
              {new Date(t?.createdAt).getHours() % 12 || 12}:
              {String(new Date(t?.createdAt).getMinutes()).padStart(2, "0")}{" "}
              {new Date(t?.createdAt).getHours() >= 12 ? "PM" : "AM"}
            </p>
          </div>
          <div className="flex text-yellow-400 text-sm sm:text-base">
            {"★".repeat(t.rate)}{"☆".repeat(5 - t.rate)}
          </div>
        </div>
      </div>
    </div>
  );
}


export function ClientReviewCard2({ t }) {
  // Ensure createdAt is a Date object
  const createdAt = t.createdAt instanceof Date ? t.createdAt : new Date(t.createdAt);

  return (
    <div
      className="
        bg-white rounded-xl shadow-md p-6 flex flex-col justify-between
        min-w-[280px]
        my-5
        snap-start
        transition-all duration-300
        hover:shadow-xl hover:scale-[1.03] group
        mx-2
      "
    >
      {/* Review Text */}
      <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-800 transition-colors">
        {t.review?.toString().slice(0, 100)}{t.review?.length > 100 ? "..." : ""}
      </p>

      {/* Footer: Avatar & Info */}
      <div className="flex items-center space-x-4 mt-auto">
        <Image
          src={manAvatar}
          alt={t.name}
          width={48}
          height={48}
          className="rounded-full object-cover grayscale group-hover:grayscale-0 transition duration-300"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-base group-hover:text-[#A26652] transition-colors">{t.name}</h4>
          <div className="text-xs text-gray-500 flex gap-2 flex-wrap">
            <p>
              {(createdAt.getHours() % 12 || 12)}:
              {String(createdAt.getMinutes()).padStart(2, "0")} {createdAt.getHours() >= 12 ? "pm" : "am"}
            </p>
            <p>
              {createdAt.getDate()} {months[createdAt.getMonth()]} {createdAt.getFullYear()}
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