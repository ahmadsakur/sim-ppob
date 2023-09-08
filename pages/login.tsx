import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen h-full bg-white text-black">
      <div className="flex items-center h-full w-full">
        <div className="bg-white w-full md:w-1/2 h-full mx-auto flex flex-col justify-center items-center min-h-screen px-4 md:px-6 lg:px-8 py-8">
          <div className="flex gap-2 items-center">
            <div className="aspect-square">
              <Image
                src="/assets/icons/main-logo.png"
                width={30}
                height={30}
                alt="SIM-PPOB Logo"
              />
            </div>
            <h1 className="text-2xl font-bold">SIM-PPOB</h1>
          </div>
          <div className="max-w-xl md:max-w-sm text-3xl font-medium text-gray-800 text-center py-8">
            Masuk atau buat akun untuk memulai
          </div>
          <div className="w-full lg:w-2/3 mx-auto">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="masukkan email anda"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="masukkan password anda"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 pt-8">
                <button
                  type="submit"
                  className="bg-[#ff4d00] text-white rounded-md py-2"
                >
                  Masuk
                </button>
              </div>
            </form>
            <p className="text-gray-500 text-sm py-4 text-center mx-auto">
              belum punya akun ? daftar{" "}
              <Link href={"/register"} className="text-[#ff4d00] font-medium">
                di sini.
              </Link>
            </p>
          </div>
        </div>
        <div
          className="bg-[#fff1f0] hidden md:w-1/2 md:block min-h-screen relative bg-top bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/login-illustration.png')",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoginPage;
