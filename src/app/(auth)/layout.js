"use client";
import React from "react";
import { Box } from "@mui/material";
import ParticleBackground from "../components/particle-background";
// import DynamicTitle from "@/components/common/dynamic-title";

const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      {/* <DynamicTitle /> */}
      <ParticleBackground />
      {children}
    </Box>
  );
};

export default AuthLayout;
