"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { IoMenu } from "react-icons/io5";
import { useSidebarStore } from "../store/sidebarStore";

const Navbar = () => {
  const { toggleSidebar } = useSidebarStore();
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        // borderBottom: "1px solid #473b33",
        bgcolor: "#1e1611",
        // boxShadow: "0 0 5px #1e1611",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        [theme.breakpoints.down("sm")]: {
          gap: "20px",
          padding: "16px",
        },
        [theme.breakpoints.up("md")]: {
          padding: "16px",
        },
      })}
    >
      <Box
        component={IoMenu}
        onClick={toggleSidebar}
        sx={(theme) => ({
          cursor: "pointer",
          [theme.breakpoints.down("sm")]: {
            fontSize: "20px",
          },
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
        })}
      />
      <Box
        component={"img"}
        src={"/logo.png"}
        alt="logo"
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            width: "50px",
          },
          [theme.breakpoints.up("md")]: {
            width: "75px",
            ml: "20px",
          },
        })}
      ></Box>
    </Box>
  );
};

export default Navbar;
