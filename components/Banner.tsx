import React from "react";
import { BannerType
 } from "@/types/api/content";
const Banner = ({ data }: { data: BannerType }) => {
  return (
    <div className="inline-block snap-start">
      <div
        className="w-72 h-32 max-w-xs overflow-hidden transition-shadow duration-300 ease-in-out bg-black rounded-lg shadow-md hover:shadow-xl"
        style={{
          backgroundImage: `url(${data.banner_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default Banner;
