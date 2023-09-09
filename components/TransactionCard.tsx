import React from "react";
import { formatCurrency, formatDate } from "@/utils/string";
import { TransactionType } from "@/types/api/transaction";

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
const TransactionCard = ({ data }: { data: TransactionType }) => {
  const { transaction_type, total_amount, created_on, description } = data;
  return (
    <div className="w-full rounded-md py-4 px-4 md:px-6 border">
      <div className="flex items-start justify-between">
        <div className="flex flex-col items-start">
          {renderTransactionType(transaction_type, total_amount)}
          <p className="text-xs text-gray-400">{formatDate(created_on)}</p>
        </div>
        <p className="text-xs text-gray-950">{description}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
