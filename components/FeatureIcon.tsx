import Image from "next/image";
import React from "react";

export type FeatureIconType = {
  icon: string;
  title: string;
  redirecturl?: string;
};
const FeatureIcon = (props: FeatureIconType) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full cursor-pointer">
      <div className="aspect-square">
        <Image width={50} height={50} src={props.icon} alt={props.title} />
      </div>
      <p className="text-xs font-medium text-center">{props.title}</p>
    </div>
  );
};

export default FeatureIcon;
