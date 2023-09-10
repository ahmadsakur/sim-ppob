import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionService } from "@/services/api-service";
import { setTransactions } from "./transactionSlice";

export const getBalance: any = createAsyncThunk(
  "transaction/getBalance",
  async (token: string, { dispatch }) => {
    try {
      const response = await TransactionService.getBalance({ token });
      const { data } = response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const topUpBalance: any = createAsyncThunk(
  "transaction/topUpBalance",
  async (
    { amount, token }: { amount: number; token: string },
    { dispatch }
  ) => {
    try {
      const response = await TransactionService.topUpBalance(amount, token);
      const { data } = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const createTransaction: any = createAsyncThunk(
  "transaction/createTransaction",
  async ({ code, token }: { code: string; token: string }, { dispatch }) => {
    try {
      const response = await TransactionService.createTransaction(code, token);
      const { data: responseData } = response.data;
      return responseData;
    } catch (error) {
      // Instead of returning error here, let createAsyncThunk handle it
      throw error; // This will automatically trigger the "rejected" action
    }
  }
);

export const getTransaction: any = createAsyncThunk(
  "transaction/getTransaction",
  async ({ token, offset } : {token:string, offset:number}, { dispatch }) => {
    try {
      const response = await TransactionService.getTransaction({
        token,
        offset
      });
      const { data } = response.data;
      dispatch(setTransactions(data.records))
      return data;
    } catch (error) {
      return error;
    }
  }
);
