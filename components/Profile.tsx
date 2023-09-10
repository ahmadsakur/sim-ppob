import { User } from "@/store/auth/authSlice";
import Image from "next/image";
import React from "react";

const Profile = ({ profileData }: { profileData: User | undefined }) => {
  return (
    <div className="flex flex-col items-start w-full md:w-1/2">
      <div className="aspect-square">
        <Image
          src={"/assets/images/profile.png"}
          width={50}
          height={50}
          alt="Profile Picture"
        />
      </div>
      <p className="mt-4 text-lg">Selamat datang,</p>
      <h2 className="text-2xl font-bold">{`${profileData?.first_name || ""} ${
        profileData?.last_name || ""
      }`}</h2>
    </div>
  );
};

export default Profile;
