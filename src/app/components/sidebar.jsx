"use client";
import React from "react";
import {
  Stack,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import {
  FaUser,
  FaHome,
  FaList,
  FaWallet,
  FaCoins,
  FaChartPie,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "../store/sidebarStore";

const menuItems = [
  { label: "Dasboard", icon: <FaHome />, to: "/dashboard" },
  { label: "Jadwal", icon: <FaList />, to: "/schedule" },
  { label: "Pemasukan", icon: <FaWallet />, to: "/pemasukan" },
  { label: "Pengeluaran", icon: <FaCoins />, to: "/pengeluaran" },
  { label: "Rekapitulasi", icon: <FaChartPie />, to: "/rekapitulasi" },
  { label: "Login", icon: <FaUser />, to: "/login" },
];

const Sidebar = () => {
  const { isOpen } = useSidebarStore();
  const pathname = usePathname();
  return (
    <Stack
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#1e1611",
        boxShadow: "0 0 5px #1e1611",
        minHeight: "100vh",
        // height: "100%",
        transition: ".2s all ease",
        [theme.breakpoints.down("sm")]: {
          padding: "20px",
          maxWidth: "200px",
          position: "absolute",
          left: isOpen ? "0" : "-100%",
          zIndex: 5,
        },
        [theme.breakpoints.up("md")]: {
          position: "relative",
          padding: "20px",
          maxWidth: "200px",
        },
      })}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = pathname === item.to;

          return (
            <ListItemButton
              key={item.to}
              component={Link}
              href={item.to}
              sx={(theme) => ({
                color: "#fff",
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: isActive ? "#fe6c00" : "transparent",
                "&:hover": {
                  backgroundColor: "#e55d00 ",
                },
              })}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Stack>
  );
};

export default Sidebar;
