"use client";
import { Box, Stack } from "@mui/material";
import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Container from "../components/container";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Navbar />
      <Stack
        sx={{
          flexDirection: "row",
          position: "relative",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Sidebar />
        <Container>{children}</Container>
      </Stack>
    </Box>
  );
};

export default DashboardLayout;
