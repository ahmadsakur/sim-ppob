import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionService } from "@/services/api-service";

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

export const createTransaction :any= createAsyncThunk(
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
