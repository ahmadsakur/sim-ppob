import React from "react";
export type BannerType = {
  source: string;
  redirecturl?: string;
};
const Banner = ({ source }: { source: string }) => {
  return (
    <div className="inline-block snap-start">
      <div
        className="w-72 h-32 max-w-xs overflow-hidden transition-shadow duration-300 ease-in-out bg-black rounded-lg shadow-md hover:shadow-xl"
        style={{
          backgroundImage: `url(${source})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default Banner;
