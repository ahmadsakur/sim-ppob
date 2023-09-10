// auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "./authSlice";
import { AuthService } from "@/services/api-service";

export const loginUser: any = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await AuthService.login(credentials);
      const { data } = response.data;
      return data;
    } catch (error) {
      return error
    }
  }
);
