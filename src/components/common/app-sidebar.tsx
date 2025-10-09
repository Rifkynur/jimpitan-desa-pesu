"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarLinks } from "./sidebar-links";

export function AppSidebar() {
  const { setOpen, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setOpenMobile(false);
    }
  }, [pathname]);
  return (
    <Sidebar className=" border-clr-pumpkin z-50 ">
      <SidebarContent className="bg-[#2c2520] text-white">
        <SidebarGroup className="mt-5">
          <SidebarGroupContent>
            <SidebarLinks />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
