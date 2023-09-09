import DashboardLayout from "@/components/layout/DashboardLayout";
import { formatCurrency } from "@/utils/string";
import Image from "next/image";
import React, { useState } from "react";

const TopupPage = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const balanceData = 1000000;

  const handleBalanceChange = (e: any) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleFastInput = (amount: number) => {
    setAmount(amount);
  };

  const fastInput = [10000, 20000, 50000, 100000, 250000, 500000];
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
        <p className="mt-4 text-lg">Selamat datang,</p>
        <h2 className="text-2xl font-bold">Ahmad Sakur</h2>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="flex flex-col items-center w-full md:w-2/3 gap-4">
          <input
            type="number"
            min={0}
            max={1000000}
            name="ammount"
            id="ammount"
            placeholder="masukkan nominal topup"
            value={amount}
            onChange={handleBalanceChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder:text-gray-400 w-full"
          />
          <button
            type="submit"
            className="bg-[#ff4d00] text-white rounded-md py-2 w-full"
          >
            Topup
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {fastInput.map((item) => (
            <button
              key={item}
              value={item}
              className={`text-sm  border rounded-sm py-2 px-4 ${
                amount === item
                  ? "bg-[#ff4d00] text-white border-[#ff4d00]"
                  : "bg-white text-gray-500 border-gray-200"
              } `}
              onClick={() => handleFastInput(item)} // Pass the selected item to the handler
            >
              {`Rp. ${formatCurrency(item)}`}
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TopupPage;
