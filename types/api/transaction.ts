export type TransactionType = {
  invoice_number: string;
  transaction_type: "PAYMENT" | "TOPUP";
  description: string;
  total_amount: number;
  created_on: string;
};
