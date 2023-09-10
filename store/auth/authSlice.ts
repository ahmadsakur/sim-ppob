// auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
}

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
