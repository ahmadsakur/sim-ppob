import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import FeatureIcon from "@/components/Service";
import Banner from "@/components/Banner";
import {
  AuthService,
  ContentService,
  TransactionService,
} from "@/services/api-service";
import {
  ServicesType,
  BannersType,
  ProfileResponseType,
  BalanceResponseType,
} from "@/types/api/content";
import { useState } from "react";
import { formatCurrency } from "@/utils/string";

type DashboardProps = {
  services: ServicesType;
  banners: BannersType;
  profile: ProfileResponseType;
  balance: BalanceResponseType;
};

const Dashboard = ({ services, banners, profile, balance }: DashboardProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);
  const servicesData = services.data;
  const bannersData = banners.data;
  const profileData = profile.data;
  const { balance: balanceData } = balance.data;

  return (
    <DashboardLayout>
      <div className="py-8 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col items-start w-full md:w-1/2">
          <div className="aspect-square">
            <Image
              src={profileData?.profile_image || "/assets/images/user.png"}
              width={50}
              height={50}
              alt="Profile Picture"
            />
          </div>
          <p className="mt-4 text-lg">Selamat datang,</p>
          <h2 className="text-2xl font-bold">{`${
            profileData?.first_name || ""
          } ${profileData?.last_name || ""}`}</h2>
        </div>
        <div
          className="rounded-xl p-4 relative text-white aspect-[4.16/1] bg-cover bg-center bg-no-repeat w-full md:w-[600px] bg-blue-600"
          style={{
            backgroundImage: "url('/assets/images/balance-bg.png')",
          }}
        >
          <p>Saldo anda</p>
          <div className="flex py-4 text-2xl font-bold">
            <p>Rp.</p>
            <p className="ml-2">
              {isBalanceVisible ? formatCurrency(balanceData) : "••••••••"}
            </p>
          </div>
          <p
            className="text-xs text-gray-200 cursor-pointer"
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
          >
            {isBalanceVisible ? "Sembunyikan" : "Lihat Saldo"}
          </p>
        </div>
      </div>
      <div className="py-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 w-full items-start justify-start gap-4">
        {servicesData.map((service, index) => (
          <FeatureIcon key={index} data={service} />
        ))}
      </div>
      <div>
        <p className="text-black font-bold text-sm mt-8">
          Temukan Promo Menarik
        </p>
        <div className="flex overflow-x-scroll hide-scroll-bar container-snap snap-x mt-4">
          <div className="flex w-full flex-nowrap gap-x-3">
            {bannersData.map((item, index) => (
              <Banner key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vaXJjb2RlQGdtYWlsLmNvbSIsIm1lbWJlckNvZGUiOiJMTUFXR0M2NiIsImlhdCI6MTY5NDIwNTY2MCwiZXhwIjoxNjk0MjQ4ODYwfQ.2vsObDEsoaHD6RKvK6qpvyy8gTfVwUW0WYykmZznwkY";

  try {
    const { data: services } = await ContentService.getServices({ token });
    const { data: banners } = await ContentService.getBanners({ token });
    const { data: profile } = await AuthService.getProfile({ token });
    const { data: balance } = await TransactionService.getBalance({ token });

    return {
      props: {
        services,
        banners,
        profile,
        balance,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        services: null,
        banners: null,
        profile: null,
      },
    };
  }
}
