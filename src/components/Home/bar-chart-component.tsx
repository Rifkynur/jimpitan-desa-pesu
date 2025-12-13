'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CustomTooltip } from './custom-tooltip';
import { BarChartType } from '@/types/bar-chart-type';

export const description = 'A bar chart';

type BarChartComponentProps = {
  data: BarChartType[];
  loading: boolean;
};

export function BarChartComponent({ data, loading }: BarChartComponentProps) {
  const chartData = data?.map((dat, i) => ({
    month: dat.month,
    desktop: dat.total,
  }));
  const chartConfig = {
    desktop: {
      label: 'Pemasukan Rp:',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;
  return (
    <Card className="bg-card-background border-clr-pumpkin w-full lg:col-span-8">
      {!loading && chartData?.length > 0 ? (
        <>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
                <ChartTooltip cursor={false} content={<CustomTooltip />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-clr-silver font-medium mx-auto lg:text-lg">Menampilkan total Pemasukan Perbulan</div>
          </CardFooter>
        </>
      ) : (
        <p className="py-8 text-center text-clr-silver font-bold">Data Tidak Tersedia</p>
      )}
    </Card>
  );
}
