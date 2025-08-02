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

const rawData = [
  { rtIName: "09", month: "January", total: 50000 },
  { rtIName: "10", month: "January", total: 60000 },
  { rtIName: "11", month: "January", total: 70000 },
  { rtIName: "09", month: "February", total: 50000 },
  { rtIName: "10", month: "February", total: 60000 },
  { rtIName: "11", month: "February", total: 70000 },
  { rtIName: "09", month: "March", total: 50000 },
  { rtIName: "10", month: "March", total: 60000 },
  { rtIName: "11", month: "March", total: 70000 },
  { rtIName: "09", month: "April", total: 50000 },
  { rtIName: "10", month: "April", total: 60000 },
  { rtIName: "11", month: "April", total: 70000 },
  { rtIName: "09", month: "May", total: 50000 },
  { rtIName: "10", month: "May", total: 60000 },
  { rtIName: "11", month: "May", total: 70000 },
  { rtIName: "09", month: "June", total: 50000 },
  { rtIName: "10", month: "June", total: 60000 },
  { rtIName: "11", month: "June", total: 70000 },
  { rtIName: "09", month: "Jully", total: 50000 },
  { rtIName: "10", month: "Jully", total: 60000 },
  { rtIName: "11", month: "Jully", total: 70000 },
  { rtIName: "09", month: "August", total: 50000 },
  { rtIName: "10", month: "August", total: 60000 },
  { rtIName: "11", month: "August", total: 70000 },
  { rtIName: "09", month: "September", total: 55000 },
  { rtIName: "10", month: "September", total: 65000 },
  { rtIName: "11", month: "September", total: 75000 },
  { rtIName: "09", month: "October", total: 55000 },
  { rtIName: "10", month: "October", total: 65000 },
  { rtIName: "11", month: "October", total: 75000 },
  { rtIName: "09", month: "November", total: 55000 },
  { rtIName: "10", month: "November", total: 65000 },
  { rtIName: "11", month: "November", total: 75000 },
  { rtIName: "09", month: "Desember", total: 55000 },
  { rtIName: "10", month: "Desember", total: 65000 },
  { rtIName: "11", month: "Desember", total: 75000 },
];
const transformedData = Object.values(
  rawData.reduce((acc, { month, rtIName, total }) => {
    acc[month] = acc[month] || { month };
    acc[month][rtIName] = total;
    return acc;
  }, {})
);

const colors = ["#fe6c00", "#3f51b5", "#4caf50"];
const BarChartIncome = () => {
  const rtNames = Object.keys(transformedData[0]).filter(
    (key) => key !== "month"
  );
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 300, sm: 400 },
        backgroundColor: "#ffffff20",
        borderRadius: 2,
        p: "8px",
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

      <ResponsiveContainer
        width="100%"
        height="100%"
        // style={{ backgroundColor: "red" }}
      >
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          barGap={0}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: "#fff" }} />
          <YAxis
            tick={{ fill: "#fff" }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${value / 1000000}M`;
              if (value >= 1000) return `${value / 1000}k`;
              return value;
            }}
          />
          <Tooltip cursor="transparent" content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {rtNames.map((rt, index) => (
            <Bar
              key={rt}
              dataKey={rt}
              fill={colors[index % colors.length]}
              activeBar={{ fill: colors[index % colors.length] }}
              name={`RT ${rt}`}
            />
          ))}
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
