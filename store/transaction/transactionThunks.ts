import { createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionService } from "@/services/api-service";

export const getBalance: any = createAsyncThunk(
  "auth/loginUser",
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
