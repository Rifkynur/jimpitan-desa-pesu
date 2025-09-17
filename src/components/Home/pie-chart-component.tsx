"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label list";

const chartData = [
  { rt: "Rt 09", income: 275000, fill: "var(--chart-1)" },
  { rt: "Rt 10", income: 200000, fill: "var(--chart-2)" },
  { rt: "Rt 11", income: 187000, fill: "var(--chart-3)" },
];

const chartConfig = {
  income: {
    label: "Pemasukan : Rp.",
  },
  "Rt 09": {
    label: "Rt 09",
    color: "var(--chart-1)",
  },
  "Rt 10": {
    label: "Rt 10",
    color: "var(--chart-2)",
  },
  "Rt 11": {
    label: "Rt 11",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PieChartComponnet() {
  return (
    <Card className="flex flex-col bg-card-background border-clr-pumpkin  lg:col-span-4">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[850px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="income" hideLabel />}
            />
            <Pie data={chartData} dataKey="income">
              <LabelList
                dataKey="rt"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-clr-silver-v1 text-lg">
          Total Pemasukan per Rt
        </div>
      </CardFooter>
    </Card>
  );
}
