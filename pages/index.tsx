import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import FeatureIcon, { FeatureIconType } from "@/components/FeatureIcon";
import Banner, { BannerType } from "@/components/Banner";

const Dashboard = () => {
  const features: FeatureIconType[] = [
    {
      title: "PBB",
      icon: "/assets/icons/features/pbb.png",
    },
    {
      title: "Listrik",
      icon: "/assets/icons/features/listrik.png",
    },
    {
      title: "Pulsa",
      icon: "/assets/icons/features/pulsa.png",
    },
    {
      title: "PDAM",
      icon: "/assets/icons/features/pdam.png",
    },
    {
      title: "PGN",
      icon: "/assets/icons/features/pgn.png",
    },
    {
      title: "TV Langganan",
      icon: "/assets/icons/features/tv-langganan.png",
    },
    {
      title: "Musik",
      icon: "/assets/icons/features/musik.png",
    },
    {
      title: "Voucher Game",
      icon: "/assets/icons/features/voucher-game.png",
    },
    {
      title: "Voucher Makanan",
      icon: "/assets/icons/features/voucher-makanan.png",
    },
    {
      title: "Kurban",
      icon: "/assets/icons/features/kurban.png",
    },
    {
      title: "Zakat",
      icon: "/assets/icons/features/zakat.png",
    },
    {
      title: "Paket Data",
      icon: "/assets/icons/features/paket-data.png",
    },
  ];

  const banners: BannerType[] = [
    {
      source: "/assets/images/banner/banner-1.png",
      redirecturl: "#",
    },
    {
      source: "/assets/images/banner/banner-2.png",
      redirecturl: "#",
    },
    {
      source: "/assets/images/banner/banner-3.png",
      redirecturl: "#",
    },
    {
      source: "/assets/images/banner/banner-4.png",
      redirecturl: "#",
    },
    {
      source: "/assets/images/banner/banner-5.png",
      redirecturl: "#",
    },
  ];

  return (
    <DashboardLayout>
      <div className="py-8 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col items-start w-full md:w-1/2">
          <div className="aspect-square">
            <Image
              src="/assets/images/profile.png"
              width={50}
              height={50}
              alt="Profile Picture"
            />
          </div>
          <p className="mt-4 text-lg">Selamat datang,</p>
          <h2 className="text-2xl font-bold">Kristanto Wibowo</h2>
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
            <p className="ml-2">1.000.000</p>
          </div>
          <p className="text-xs text-gray-200">Lihat Saldo</p>
        </div>
      </div>
      {/* Feature */}
      <div className="py-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 w-full items-start justify-start gap-4">
        {features.map((feature) => (
          <FeatureIcon key={feature.title} {...feature} />
        ))}
      </div>
      {/* Banner */}
      <p className="text-black font-bold text-sm mt-8">Temukan Promo Menarik</p>
      <div className="flex overflow-x-scroll hide-scroll-bar container-snap snap-x mt-4">
        <div className="flex w-full flex-nowrap gap-x-3">
          {banners.map((item, index) => (
            <Banner key={index} source={item.source} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
