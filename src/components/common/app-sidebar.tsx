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
    <Sidebar className="border-pumpkin ">
      <SidebarContent className="bg-[#2c2520] text-clr-silver-v1">
        <SidebarGroup className="mt-5">
          <SidebarGroupContent>
            <SidebarLinks />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
