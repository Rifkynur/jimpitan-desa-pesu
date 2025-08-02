"use client";
import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const ScheduleCard = ({ week, members }) => {
  const data = ["Menu", "Pesanan", "Laporan"];

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        bgcolor: "#1e1611",
        borderRadius: "16px",
        [theme.breakpoints.down("sm")]: {
          padding: "10px",
        },
        [theme.breakpoints.up("md")]: {
          padding: "16px",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          bgcolor: "#473b33",
          borderRadius: "12px",
          textAlign: "center",
          [theme.breakpoints.down("sm")]: {
            padding: "10px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "12px",
          },
        })}
      >
        <Typography
          sx={(theme) => ({
            fontWeight: "700",
            [theme.breakpoints.down("sm")]: {},
            [theme.breakpoints.up("md")]: {},
          })}
        >
          Minggu {week}
        </Typography>
      </Box>
      <List>
        {members.map((text, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={text.name}
              sx={{
                textAlign: "center",
                textTransform: "capitalize",
                fontWeight: "600",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ScheduleCard;
