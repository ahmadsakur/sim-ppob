import Image from "next/image";
import React from "react";

type FeatureIconType = {
  icon: string;
  title: string;
  redirecturl?: string;
};
const FeatureIcon = (props: FeatureIconType) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="aspect-square">
        <Image width={40} height={40} src={props.icon} alt={props.title} />
      </div>
      <p className="text-sm font-medium">{props.title}</p>
    </div>
  );
};

export default FeatureIcon;
