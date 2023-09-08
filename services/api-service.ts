import axios from "axios";
import {
  loginCredentialsType,
  registerCredentialsType,
} from "@/types/api/auth";

const apiClient = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.app",
});

export const AuthService = {
  login: (credentials: loginCredentialsType) => {
    return apiClient.post("/login", credentials);
  },
  register: (credentials: registerCredentialsType) => {
    return apiClient.post("/register", credentials);
  },
  getProfile: ({ token }: { token: string }) => {
    return apiClient.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const ContentService = {
  getBanners: ({ token }: { token: string }) => {
    return apiClient.get("/banner", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getServices: ({ token }: { token: string }) => {
    return apiClient.get("/services", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const TransactionService = {
  getBalance: ({ token }: { token: string }) => {
    return apiClient.get("/balance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
