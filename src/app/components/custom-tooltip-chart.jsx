import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 1.5,
          bgcolor: "#00000080",
          borderRadius: "12px",
          backdropFilter: "blur(5px)",
          border: "1px solid white",
          color: "#fff",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: "8px" }}>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box key={index} display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: entry.color || "#000",
                borderRadius: "50%",
              }}
            />
            <Typography variant="body2" sx={{ color: "#fff" }}>
              {entry.name}: <strong>{entry.value}</strong>
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }

  return null;
};

export default CustomTooltip;
