import axios from "axios";
import {
  loginCredentialsType,
  registerCredentialsType,
  updateProfileType,
} from "@/types/api/auth";

const apiClient = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.app",
});

export const AuthService = {
  login: (credentials: loginCredentialsType) => {
    return apiClient.post("/login", credentials);
  },
  register: (credentials: registerCredentialsType) => {
    return apiClient.post("/registration", credentials);
  },
  getProfile: ({ token }: { token: string }) => {
    return apiClient.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProfile: (data:updateProfileType, token:string) => {
    return apiClient.put("/profile/update", data, {
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
  createTransaction: (code: string, token: string) => {
    return apiClient.post(
      "/transaction",
      {
        service_code: code,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  topUpBalance: (amount: number, token: string) => {
    return apiClient.post(
      "/topup",
      {
        top_up_amount: amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getTransaction: ({ token, offset }: { token: string; offset: number }) => {
    return apiClient.get("/transaction/history", {
      params: {
        offset,
        limit: 5,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
