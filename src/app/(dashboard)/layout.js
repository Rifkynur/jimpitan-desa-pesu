"use client";
import { Box, Stack } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Navbar />
      <Stack sx={{ flexDirection: "row", position: "relative" }}>
        <Sidebar />
        {children}
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
