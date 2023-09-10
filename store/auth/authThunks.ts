// auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "@/services/api-service";

export const loginUser: any = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await AuthService.login(credentials);
      const { data } = response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchUser: any = createAsyncThunk(
  "auth/fetchUser",
  async (token: string, { dispatch }) => {
    try {
      const response = await AuthService.getProfile({ token });
      const { data } = response.data;
      // dispatch(setProfile(data));
      return data;
    } catch (error) {
      return error;
    }
  }
);
