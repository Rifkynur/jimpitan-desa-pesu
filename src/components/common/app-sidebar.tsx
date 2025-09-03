"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { SidebarLinks } from "./sidebar-links";

export function AppSidebar() {
  return (
    <Sidebar className=" border-clr-pumpkin">
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
