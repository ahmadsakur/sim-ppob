import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContentService } from "@/services/api-service";

export const getBanners: any = createAsyncThunk(
  "content/getBanners",
  async (token: string, { dispatch }) => {
    try {
      const response = await ContentService.getBanners({ token });
      const { data } = response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getServices: any = createAsyncThunk(
  "content/getServices",
  async (token: string, { dispatch }) => {
    try {
      const response = await ContentService.getServices({ token });
      const { data } = response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);
