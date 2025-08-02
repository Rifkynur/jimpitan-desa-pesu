"use client";
import { Box, Typography, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import CustomTooltip from "@/app/components/custom-tooltip-chart";

const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 200 },
  { name: "Apr", uv: 278 },
  { name: "May", uv: 189 },
  { name: "Jun", uv: 189 },
  { name: "Jul", uv: 189 },
  { name: "Aug", uv: 189 },
  { name: "Sep", uv: 189 },
  { name: "Oct", uv: 189 },
  { name: "Nov", uv: 189 },
  { name: "Des", uv: 189 },
];
const BarChartIncome = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 300, sm: 400 },
        backgroundColor: "#ffffff20",
        borderRadius: 2,
        p: 2,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: "15px",
            mb: "15px",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "20px",
            mb: "24px",
          },
        })}
      >
        Monthly Report
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#fff" }} />
          <YAxis tick={{ fill: "#fff" }} />
          <Tooltip cursor="transparent" content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Bar
            dataKey="uv"
            fill="#fe6c00"
            activeBar={{ fill: "#e55d00" }}
          />{" "}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartIncome;

export const CustomLegend = ({ payload }) => {
  if (!payload || !payload.length) return null;

  return (
    <Box display="flex" gap={2} mt={1} justifyContent="center" pt={"8px"}>
      {payload.map((entry, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 14,
              height: 14,
              backgroundColor: entry.color || "#000",
              borderRadius: "4px",
            }}
          />
          <Typography variant="body2">{entry.value}</Typography>
        </Box>
      ))}
    </Box>
  );
};
