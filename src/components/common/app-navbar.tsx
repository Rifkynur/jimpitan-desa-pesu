"use client";
import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";

const AppNavbar = () => {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/": "Halaman utama",
    "/income": "Pemasukan",
    "/expense": "Pengeluaran",
    "/schedule": "Jadwal Pengambilan",
    "/member": "Daftar Warga",
    "/report": "Laporan",
    "/user": "Petugas",
    "/login": "Login",
  };

  const title = titles[pathname] ?? "dashboard";

  return (
    <div className="w-full flex justify-between items-center mb-4 lg:mb-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      <img src={"logo.png"} className="size-12 md:size-10" alt="Logo" />
      {/* <p>name/logout</p> */}
    </div>
  );
};

export default AppNavbar;
