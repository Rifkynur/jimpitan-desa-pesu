"use client";
import React from "react";
import ScheduleCard from "./schedule-card";
import { Box, Grid, Typography } from "@mui/material";

const ScheduleList = ({ title, datas }) => {
  return (
    <Box>
      <Box
        sx={(theme) => ({
          backgroundColor: "#fe6c00",
          display: "inline-block",
          width: "fit-content",
          borderRadius: "14px",

          [theme.breakpoints.down("sm")]: {
            padding: "10px",
            my: "16px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "10px",
            my: "16px",
          },
        })}
      >
        <Typography sx={{ textTransform: "uppercase", fontWeight: "600" }}>
          {title}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {datas?.map((data, i) => {
          console.log(data.members);
          return (
            <Grid size={{ xs: 6, md: 3 }} key={i}>
              <ScheduleCard members={data.members} week={data.week} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ScheduleList;
