import { ServiceType } from "@/types/api/content";
import Image from "next/image";
import React from "react";

const Service = ({ data }: { data: ServiceType }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full cursor-pointer">
      <div className="aspect-square">
        <Image
          width={50}
          height={50}
          src={data.service_icon}
          alt={data.service_name}
        />
      </div>
      <p className="text-xs font-medium text-center">{data.service_name}</p>
    </div>
  );
};

export default Service;
