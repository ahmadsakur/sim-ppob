import { formatCurrency } from "@/utils/string";
import React, { useEffect, useState } from "react";

interface BalanceBannerProps {
  balanceData: number;
}
const BalanceBanner = ({ balanceData }: BalanceBannerProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  return (
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
  );
};

export default BalanceBanner;
