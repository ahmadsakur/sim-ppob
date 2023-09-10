import { BannerType, ServiceType } from "@/types/api/content";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContentState {
  banners: BannerType[];
  services: ServiceType[];
}

const initialState: ContentState = {
  banners: [],
  services: [],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setBanners: (state, action: PayloadAction<BannerType[]>) => {
      state.banners = action.payload;
    },
    setServices: (state, action: PayloadAction<ServiceType[]>) => {
      state.services = action.payload;
    },
  },
});

export const { setBanners, setServices } = contentSlice.actions;
export default contentSlice.reducer;
