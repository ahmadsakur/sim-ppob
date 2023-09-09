import TopupModal from "@/components/TopupModal";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ContentService, TransactionService } from "@/services/api-service";
import { ServiceType } from "@/types/api/content";
import { formatCurrency } from "@/utils/string";
import Image from "next/image";
import React, { useState } from "react";

const ServicePaymentPage = ({ service }: { service: ServiceType }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const balanceData = 1000000;

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
 
  return (
    <DashboardLayout>
      <div className="py-8 flex flex-col md:flex-row justify-between items-start gap-8">
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
          <h2 className="text-2xl font-bold">Ahmad Sakur</h2>
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
      <div className="py-4">
        <p className="text-lg">Pembayaran</p>
        <div className="flex gap-2 items-center my-2">
          <div className="aspect-square">
            <Image
              src={service.service_icon}
              width={30}
              height={30}
              alt={service.service_name}
            />
          </div>
          <p className="text-xl font-bold">{service.service_name}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          min={0}
          max={1000000}
          name="ammount"
          id="ammount"
          placeholder="masukkan nominal topup"
          value={`Rp.${formatCurrency(service.service_tariff)}`}
          readOnly
          className="border border-gray-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 w-full"
        />
        <button
          type="submit"
          onClick={() => setIsModalVisible(true)}
          className="bg-[#ff4d00] text-white rounded-sm py-3 w-full text-sm font-bold disabled:bg-orange-500"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Bayar"}
        </button>
      </div>
      {isModalVisible && <TopupModal isOpen={isModalVisible} onClose={handleCloseModal} data={service} />}
    </DashboardLayout>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vaXJjb2RlQGdtYWlsLmNvbSIsIm1lbWJlckNvZGUiOiJMTUFXR0M2NiIsImlhdCI6MTY5NDI1NzQ2MSwiZXhwIjoxNjk0MzAwNjYxfQ.UeaYmidOVz0XmrFSRcTn1yejoRMzYy0eAKuF3r2VJXM";
  const { data: services } = await ContentService.getServices({ token });
  const data = services.data.find(
    (service: ServiceType) => service.service_code === slug
  );

  return {
    props: {
      service: data,
    },
  };
}

export default ServicePaymentPage;
