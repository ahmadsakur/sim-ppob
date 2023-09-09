import { ServiceType } from "@/types/api/content";
import { formatCurrency } from "@/utils/string";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BiCheck, BiX } from "react-icons/bi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ServiceType;
}
const TopupModal = ({ isOpen, onClose, data }: ModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("initial" || "final");
  const [isError, setIsError] = useState<boolean>(true);

  const router = useRouter();

  const handleTopupPayment = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vaXJjb2RlQGdtYWlsLmNvbSIsIm1lbWJlckNvZGUiOiJMTUFXR0M2NiIsImlhdCI6MTY5NDI1NTI0MiwiZXhwIjoxNjk0Mjk4NDQyfQ.RpMEKMuQl_wtf-t6HxX-nTAHrCiHrYCnrZvxP6BGHqw";
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatus("final");
    }, 2000);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-start md:items-center p-8 sm:p-0"
      id="modal"
    >
      <div className="w-full md:w-1/2 lg:w-1/5 aspect-square p-8 bg-white rounded-md">
        {isLoading ? (
          <div className="grid place-items-center w-full h-full">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-orange-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : status === "initial" ? (
          <div className="flex flex-col items-center">
            <Image
              src="/assets/icons/main-logo.png"
              width={50}
              height={50}
              alt="sim ppob logo"
            />
            <p className="text-sm mt-4">Beli {data.service_name} senilai</p>
            <p className="text-left font-bold text-lg">
              {`Rp. ${formatCurrency(data.service_tariff)}`}
            </p>
            <button
              onClick={handleTopupPayment}
              className="text-[#ff4d00] font-bold text-sm py-8"
            >
              Ya, lanjutkan bayar
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 font-bold text-sm"
            >
              Batalkan
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex justify-center items-center p-2 ${
                isError ? "bg-red-500" : "bg-green-400"
              }`}
            >
              {isError ? (
                <BiX className="text-white w-12 h-12" />
              ) : (
                <BiCheck className="text-white w-12 h-12" />
              )}
            </div>
            <p className="text-sm mt-4">
              Pembayaran {data.service_name} senilai
            </p>
            <p className="text-left font-bold text-lg">
              {`Rp. ${formatCurrency(data.service_tariff)}`}
            </p>
            <p className="text-sm mt-4">{isError ? "gagal" : "berhasil"}</p>
            <button
              onClick={() => router.push("/")}
              className="text-[#ff4d00] font-bold text-sm pt-8"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopupModal;
