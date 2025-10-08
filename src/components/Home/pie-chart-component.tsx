"use client";
import { LabelList, Pie, PieChart } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { CustomTooltip } from "./custom-tooltip";
import { PieChartType } from "@/types/pie-chart-type";

export const description = "A pie chart with a label list";

type PieChartComponnetProps = {
  data: PieChartType[];
};

export function PieChartComponent({ data }: PieChartComponnetProps) {
  const chartData = data.map((dat, i) => ({
    rt: `Rt ${dat.rt}`,
    income: dat.total,
    fill: `var(--chart-${i + 1})`,
  }));
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
  return (
    <Card className="flex flex-col bg-card-background border-clr-pumpkin  lg:col-span-4">
      <CardContent className="flex-1 pb-0">
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[850px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
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
        ) : (
          <p className="text-clr-silver text-center py-8">
            Data Tidak Tersedia
          </p>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-clr-silver-v1 text-lg">
          Total Pemasukan per Rt
        </div>
      </CardFooter>
    </Card>
  );
}
