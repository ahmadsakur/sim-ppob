import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import React from "react";
import { formatCurrency } from "@/utils/string";
import TransactionCard from "@/components/TransactionCard";
import { TransactionType } from "@/types/api/transaction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser } from "@/store/auth/authThunks";
import {
  getBalance,
  getTransaction,
} from "@/store/transaction/transactionThunks";
import { User } from "@/store/auth/authSlice";
import Profile from "@/components/Profile";
import BalanceBanner from "@/components/BalanceBanner";
import { selectTransactions } from "@/store/transaction/selectors";

const TransactionPage = () => {
  const [profileData, setProfileData] = useState<User>();
  const [offset, setOffset] = useState(0);
  const [balanceData, setBalanceData] = useState(0);
  const dispatch = useDispatch();

  const TransactionsData = useSelector(selectTransactions);
  // console.log(TransactionsData);

  const AddTransactionData = async () => {
    const token = sessionStorage.getItem("token");
    const res = await dispatch(getTransaction({ token, offset }));
    console.log(res);
    if (res.payload) {
      setOffset((prev) => prev + 5);
    }
  };

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

    const getTransactionsData = async () => {
      const res = await dispatch(getTransaction({ token, offset }));
      if (res.payload) {
        setOffset((prev) => prev + 5);
      }
    };

    getProfile();
    getBalanceCall();
    getTransactionsData();
  }, []);

  return (
    <DashboardLayout>
      <div className="py-8 flex flex-col md:flex-row justify-between items-start gap-8">
        <Profile profileData={profileData} />
        <BalanceBanner balanceData={balanceData} />
      </div>
      <div className="py-4">
        <p className="mt-4 text-lg font-bold">Semua Transaksi</p>
        <div className="flex flex-col gap-4 w-full py-4">
          {TransactionsData.map((transaction, index) => (
            <TransactionCard key={index} data={transaction} />
          ))}
        </div>
        <p
          className="text-center text-[#ff4d00] font-bold cursor-pointer"
          onClick={AddTransactionData}
        >
          Show More
        </p>
      </div>
    </DashboardLayout>
  );
};

export default TransactionPage;
