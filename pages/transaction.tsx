import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import React from "react";
import { formatCurrency } from "@/utils/string";
import TransactionCard from "@/components/TransactionCard";

const TransactionPage = () => {
  const [isBalanceVisible, setIsBalanceVisible] =
    React.useState<boolean>(false);
  const balanceData = 1000000;
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
        <p className="mt-4 text-lg font-bold">Semua Transaksi</p>
        <div className="flex flex-col gap-4 w-full py-4">
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </div>
        <p className="text-center text-[#ff4d00] font-bold cursor-pointer">Show More</p>
      </div>
    </DashboardLayout>
  );
};

export default TransactionPage;
