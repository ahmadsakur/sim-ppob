import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import React from "react";
import { MdEdit } from "react-icons/md";

const AccountPage = () => {
  return (
    <DashboardLayout>
      <div className="w-full md:w-1/2 py-8 mx-auto">
        <div className="flex flex-col items-center">
          <div className="py-4 mx-auto flex flex-col items-center justify-center gap-4">
            <div className="aspect-square relative w-24">
              <Image
                fill={true}
                src="/assets/images/profile.png"
                alt="Profile Picture"
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 cursor-pointer">
                <MdEdit />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Ahmad Sakur</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-gray-200 rounded-sm px-4 py-2 w-full"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="first-name">
              Nama Depan
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              className="border border-gray-200 rounded-sm px-4 py-2 w-full"
              placeholder="first-name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="last-name">
              Nama Belakang
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              className="border border-gray-200 rounded-sm px-4 py-2 w-full"
              placeholder="last-name"
            />
          </div>
          <div className="w-full bg-white text-[#ff4d00] text-sm font-bold rounded-sm text-center py-2 border border-[#ff4d00]">
            Edit Profil
          </div>
          <div className="w-full bg-[#ff4d00] text-white text-sm font-bold rounded-sm text-center py-2">
            Logout
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountPage;
