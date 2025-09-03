import React from "react";
import { SidebarTrigger } from "../ui/sidebar";

const AppNavbar = () => {
  return (
    <div className="w-full flex justify-between items-center mb-4 lg:mb-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>
      <img src={"logo.png"} className="size-12 md:size-10" alt="Logo" />
      {/* <p>name/logout</p> */}
    </div>
  );
};

export default AppNavbar;
