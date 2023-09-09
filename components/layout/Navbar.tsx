import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AiOutlineUser,
  AiOutlineHistory,
  AiOutlinePlusCircle,
} from "react-icons/ai";
type NavLinkType = {
  title: string;
  href: string;
  isActive: boolean;
  icon?: React.ReactElement;
};
const Navbar = () => {
  const router = useRouter();
  const navLinks: NavLinkType[] = [
    {
      title: "Top Up",
      href: "/topup",
      isActive: router.pathname === "/topup",
      icon: <AiOutlinePlusCircle className="w-6 h-6"/>,
    },
    {
      title: "Transaction",
      href: "/transaction",
      isActive: router.pathname === "/transaction",
      icon: <AiOutlineHistory className="w-6 h-6"/>,
    },
    {
      title: "Akun",
      href: "/account",
      isActive: router.pathname === "/account",
      icon: <AiOutlineUser className="w-6 h-6"/>,
    },
  ];
  return (
    <div className="py-4 border-b">
      <div className="flex items-center justify-between">
        <Link href={'/'} className="flex items-center gap-2">
          <div className="aspect-square">
            <Image
              src="/assets/icons/main-logo.png"
              width={20}
              height={20}
              alt="SIM PPOB Logo"
            />
          </div>
          <p className="text-sm font-semibold">SIM PPOB</p>
        </Link>
        <div className="items-center gap-12 hidden md:flex">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.title}>
              <p className={`text-sm font-medium ${link.isActive ? 'text-[#ff4d00] font-bold' : 'text-black'}`}>{link.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="fixed md:hidden inset-x-0 bottom-0">
        <div className="flex items-center justify-around bg-white px-4 py-4 shadow-md border-t">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.title}>
              <div
                className={`flex flex-col items-center gap-1 ${
                  link.isActive ? "text-[#ff4d00]" : "text-gray-400"
                }`}
              >
                {link.icon}
                <p className="text-xs">{link.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
