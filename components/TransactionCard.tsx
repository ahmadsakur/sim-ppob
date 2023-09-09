import React from "react";
import { formatCurrency, formatDate } from "@/utils/string";

const TransactionCard = () => {
  const renderTransactionType = (type: "TOPUP" | "PAYMENT", amount: number) => {
    if (type === "TOPUP") {
      return (
        <div className="text-emerald-400 text-2xl font-bold pb-2">
          + Rp.{formatCurrency(amount)}
        </div>
      );
    }
    return (
      <div className="text-red-500 text-2xl font-bold pb-2">
        - Rp.{formatCurrency(amount)}
      </div>
    );
  };

  const date = "2023-09-08T18:00:45.044Z";
  return (
    <div className="w-full rounded-md py-4 px-4 md:px-6 border">
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start">
          {renderTransactionType("TOPUP", 100000)}
          <p className="text-xs text-gray-400">{formatDate(date)}</p>
        </div>
        <p className="text-xs text-gray-950">Topup Saldo</p>
      </div>
    </div>
  );
};

export default TransactionCard;
