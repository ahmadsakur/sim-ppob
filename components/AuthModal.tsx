import { logout } from "@/store/auth/authSlice";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleLogoutConfirm = () => {
    dispatch(logout());
    router.push("/login");
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-start md:items-center p-8 sm:p-0 z-10"
      id="modal"
    >
      <div className="w-full md:w-1/2 lg:w-1/5 p-8 bg-white rounded-md">
        <div className="flex flex-col items-center">
          <h1>Do you want to log out ?</h1>
          <button
            onClick={handleLogoutConfirm}
            className="text-[#ff4d00] font-bold text-sm pt-8"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 font-bold text-sm pt-8"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
