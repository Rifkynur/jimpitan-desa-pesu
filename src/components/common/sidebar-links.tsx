"use client";
import { useEffect, useState } from "react";
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
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuthStore } from "@/store/auth-store";
import { useLogout } from "@/hooks/use-logout";

export function SidebarLinks() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore();

  const logout = useLogout();

  type LinkItem = {
    href?: string;
    label: string;
    icon: React.ComponentType<any>;
    onClick?: () => void;
  };

  const links: LinkItem[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/income", label: "Pemasukan", icon: DollarSign },
    { href: "/expense", label: "Pengeluaran", icon: Wallet },
    { href: "/schedule", label: "Jadwal", icon: CalendarDays },
    { href: "/member", label: "Warga", icon: Users },
    // { href: "/report", label: "Report", icon: ClipboardCheck },
    { href: "/user", label: "Petugas", icon: UserRound },
  ];

  const authLink: LinkItem = isLoggedIn
    ? { label: "Logout", icon: LogIn, onClick: logout }
    : { href: "/login", label: "Login", icon: LogIn };

  return (
    <SidebarMenu className="gap-3">
      {links.concat(authLink).map((link) => (
        <SidebarMenuItem key={link.label}>
          <SidebarMenuButton asChild>
            {link.onClick ? (
              <button
                onClick={link.onClick}
                className={clsx(
                  "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:!bg-orange-600 hover:!text-clr-silver",
                  pathname === link.href ? "bg-clr-pumpkin" : ""
                )}
              >
                <link.icon className="h-4 w-4" />
                <span className="font-bold">{link.label}</span>
              </button>
            ) : (
              <Link
                href={link.href!}
                className={clsx(
                  "flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:!bg-orange-600 hover:!text-clr-silver",
                  pathname === link.href ? "bg-clr-pumpkin" : ""
                )}
              >
                <link.icon className="h-4 w-4" />
                <span className="font-bold">{link.label}</span>
              </Link>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
