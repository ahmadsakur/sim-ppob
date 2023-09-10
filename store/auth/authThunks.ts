// auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "@/services/api-service";
import { updateProfileType } from "@/types/api/auth";
import { setProfile } from "./authSlice";

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

export const updateUser: any = createAsyncThunk(
  "auth/updateUser",
  async (
    {
      updatePayload,
      token,
    }: { updatePayload: updateProfileType; token: string },
    { dispatch }
  ) => {
    try {
      const response = await AuthService.updateProfile(updatePayload, token);
      const { data: responseData } = response.data;
      return responseData;
      dispatch(setProfile(responseData.payload));
    } catch (error) {
      return error;
    }
  }
);
