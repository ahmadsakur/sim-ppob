import TopupModal from "@/components/TopupModal";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { formatCurrency } from "@/utils/string";
import Image from "next/image";
import React, { useState } from "react";
import { BiAlarm, BiCoin } from "react-icons/bi";

const TopupPage = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [amount, setAmount] = useState<any>(null);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });
  const fastInput = [10000, 20000, 50000, 100000, 250000, 500000];
  const balanceData = 1000000;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleBalanceChange = (e: any) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleFastInput = (amount: number) => {
    setAmount(amount);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const validateInput = (amount: number) => {
    if (!amount) {
      setIsError({
        status: true,
        message: "Nominal topup tidak boleh kosong",
      });
      return false;
    } else if (amount < 10000) {
      setIsError({
        status: true,
        message: "Minimal topup adalah Rp. 10.000",
      });
      return false;
    } else if (amount > 1000000) {
      setIsError({
        status: true,
        message: "Maksimal topup adalah Rp. 1.000.000",
      });
      return false;
    } else {
      setIsError({
        status: false,
        message: "",
      });
      return true;
    }
  };

  const handleTopUp = () => {
    const isValidated = validateInput(amount);
    if (isValidated) {
      setIsModalVisible(true);
    } else {
      inputRef.current?.focus();
    }
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
        <p className="mt-4 text-lg">Selamat datang,</p>
        <h2 className="text-2xl font-bold">Ahmad Sakur</h2>
      </div>
      <div className="flex flex-col md:flex-row items-stretch gap-4">
        <div className="flex flex-col items-center w-full md:w-2/3 gap-4">
          <div className="flex flex-col gap-2 w-full relative">
            <div className="relative w-full">
              <div
                className={`absolute inset-y-0 left-2 flex items-center pl-2 ${
                  isError.status === true ? "text-red-500" : "text-gray-500"
                }`}
              >
                <BiCoin />
              </div>
              <input
                ref={inputRef}
                type="number"
                min={0}
                max={1000000}
                name="ammount"
                id="ammount"
                placeholder="masukkan nominal topup"
                value={amount}
                onChange={handleBalanceChange}
                className={`border-2 rounded-sm px-4 py-2 focus:outline-none pl-10 w-full placeholder:text-gray-500 placeholder:text-sm ${
                  isError.status === true ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
            {isError.status && (
              <div className="text-red-500 text-sm font-medium">
                {isError.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#ff4d00] text-white rounded-sm py-2 w-full disabled:bg-gray-400"
            onClick={handleTopUp}
            disabled={amount < 1}
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
      {isModalVisible && (
        <TopupModal
          isOpen={isModalVisible}
          onClose={handleCloseModal}
          amount={amount}
        />
      )}
    </DashboardLayout>
  );
};

export default TopupPage;
