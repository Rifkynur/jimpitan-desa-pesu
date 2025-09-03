"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  UserRound,
  CalendarDays,
  Users,
  LogIn,
  Wallet,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function SidebarLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/income", label: "Pemasukan", icon: DollarSign },
    { href: "/expense", label: "Pengeluaran", icon: Wallet },
    { href: "/schedule", label: "Jadwal", icon: CalendarDays },
    { href: "/member", label: "Warga", icon: Users },
    { href: "/user", label: "Petugas", icon: UserRound },
    { href: "/login", label: "Login", icon: LogIn },
  ];

  return (
    <SidebarMenu className="gap-3">
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton asChild>
            <Link
              href={link.href}
              className={clsx(
                "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:!bg-orange-600 hover:!text-clr-silver",
                pathname === link.href ? "bg-clr-pumpkin " : ""
              )}
            >
              <link.icon className="h-4 w-4" />
              <span className="font-bold">{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
