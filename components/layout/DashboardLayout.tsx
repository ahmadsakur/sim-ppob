import React from "react";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
