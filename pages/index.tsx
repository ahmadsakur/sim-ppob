import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "@/store/auth/authSlice";
import BalanceBanner from "@/components/BalanceBanner";
import Profile from "@/components/Profile";
import { fetchUser } from "@/store/auth/authThunks";
import { getBalance } from "@/store/transaction/transactionThunks";
import { getBanners, getServices } from "@/store/content/contentThunks";
import FeatureIcon from "@/components/Service";
import Banner from "@/components/Banner";
const Dashboard = () => {
  const [profileData, setProfileData] = useState<User>();
  const [balanceData, setBalanceData] = useState(0);
  const [servicesData, setServicesData] = useState([]);
  const [bannersData, setBannersData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
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
        setServicesData(res.payload);
      }
    };

    const getBannerCall = async () => {
      const res = await dispatch(getBanners(token));
      if (res.payload) {
        setBannersData(res.payload);
      }
    };



    getProfile();
    getBalanceCall();
    getServicesCall();
    getBannerCall();

    
  }, []);

  return (
    <DashboardLayout>
      <div className="py-8 flex flex-col md:flex-row justify-between items-start gap-8">
        <Profile profileData={profileData} />
        <BalanceBanner balanceData={balanceData} />
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
