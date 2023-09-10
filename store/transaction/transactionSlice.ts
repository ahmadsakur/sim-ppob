import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionType } from "@/types/api/transaction";

export interface TransactionState {
  transactions: TransactionType[];
  balance: number;
}

const initialState: TransactionState = {
  transactions: [],
  balance: 0,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<TransactionType[]>) => {
      state.transactions = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const { setTransactions, setBalance } = transactionSlice.actions;
export default transactionSlice.reducer;
