import React from "react";
import Navbar from "./Navbar";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import AuthModal from "../AuthModal";
import jwtDecode from "jwt-decode";
import { logout } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { token: reduxToken } = useAuth();

  useEffect(() => {
    const checkToken = () => {
      const token = reduxToken || sessionStorage.getItem("token");
      if (token) {
        const decoded: any = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
        dispatch(logout());
      }
    };
    checkToken();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 min-h-screen pb-24">
      <Navbar />
      <main className="pb-24 h-full">
        {isLoggedIn ? (
          <div>{children}</div>
        ) : (
          <div className="grid place-items-center w-full h-full">
            <h1 className="text-2xl font-medium">You are not logged in</h1>
            <p>or maybe your token is expired :/</p>
            <button
              onClick={() => router.push("/login")}
              className="text-[#ff4d00] font-bold text-sm pt-8 px-4 py-2"
            >
              Login
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardLayout;
