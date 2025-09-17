"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CustomTooltip } from "./custom-tooltip";

export const description = "A bar chart";

const chartData = [
  { month: "Januari", desktop: 180000 },
  { month: "Februari", desktop: 200000 },
  { month: "Maret", desktop: 230000 },
  { month: "April", desktop: 130000 },
  { month: "Mai", desktop: 190000 },
  { month: "April", desktop: 140000 },
  { month: "Mei", desktop: 210000 },
  { month: "Juni", desktop: 180000 },
  { month: "Juli", desktop: 130000 },
  { month: "Agustus", desktop: 170000 },
  { month: "September", desktop: 200000 },
  { month: "Oktober", desktop: 130000 },
  { month: "November", desktop: 165000 },
  { month: "Desember", desktop: 210000 },
];

const chartConfig = {
  desktop: {
    label: "Pemasukan Rp:",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <Card className="bg-card-background border-clr-pumpkin w-full lg:col-span-8">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-clr-silver font-medium lg:text-lg">
          Menampilkan total Pemasukan Perbulan
        </div>
      </CardFooter>
    </Card>
  );
}
