import Profile from "@/components/Profile";
import ServiceModal from "@/components/ServiceModal";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ContentService, TransactionService } from "@/services/api-service";
import { User } from "@/store/auth/authSlice";
import { fetchUser } from "@/store/auth/authThunks";
import { getServices } from "@/store/content/contentThunks";
import { getBalance } from "@/store/transaction/transactionThunks";
import { ServiceType } from "@/types/api/content";
import { formatCurrency } from "@/utils/string";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const ServicePaymentPage = () => {
  // get slug from router
  const router = useRouter();

  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<User>();
  const [servicesData, setServicesData] = useState<any>();
  const [balanceData, setBalanceData] = useState<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const slug = router.query.slug || window.location.pathname.split("/").pop();
    const getProfile = async () => {
      const res = await dispatch(fetchUser(token));
      if (res.payload) {
        setProfileData(res.payload);
      }
    };
    const getBalanceCall = async () => {
      const res = await dispatch(getBalance(token));
      if (res.payload) {
        setBalanceData(res.payload.balance);
      }
    };

    const getServicesCall = async () => {
      const res = await dispatch(getServices(token));
      if (res.payload) {
        const selectedService = res.payload.find(
          (service: ServiceType) => service.service_code === slug
        );
        setServicesData(selectedService);
      }
    };

    getProfile();
    getBalanceCall();
    getServicesCall();
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <DashboardLayout>
      <div className="py-8 flex flex-col md:flex-row justify-between items-start gap-8">
        <Profile profileData={profileData} />
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
      {servicesData && (
        <div>
          <div className="py-4">
            <p className="text-lg">Pembayaran</p>
            <div className="flex gap-2 items-center my-2">
              <div className="aspect-square">
                <Image
                  src={servicesData.service_icon}
                  width={30}
                  height={30}
                  alt={servicesData.service_name}
                />
              </div>
              <p className="text-xl font-bold">{servicesData.service_name}</p>
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
              value={`Rp.${formatCurrency(servicesData.service_tariff)}`}
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
        </div>
      )}
      {isModalVisible && (
        <ServiceModal
          isOpen={isModalVisible}
          onClose={handleCloseModal}
          data={servicesData}
        />
      )}
    </DashboardLayout>
  );
};

export default ServicePaymentPage;
