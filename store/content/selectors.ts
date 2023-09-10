import { createSelector } from "@reduxjs/toolkit";
import { ContentState } from "./contentSlice";

const selectContentState = (state: { content: ContentState }) => state.content;

export const selectBanners = createSelector(
  selectContentState,
  (content) => content.banners
);

export const selectServices = createSelector(
  selectContentState,
  (content) => content.services
);
