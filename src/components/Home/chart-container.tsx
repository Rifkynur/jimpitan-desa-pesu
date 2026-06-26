"use client";
import React, { useState } from "react";
import FilterYear from "../common/filter-year";
import FilterSelectRt from "../common/filter-select-rt";
import { BarChartComponent } from "./bar-chart-component";
import { PieChartComponent } from "./pie-chart-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import SpinnerLoader from "../common/spiner-loading";
import { useQuery } from "@tanstack/react-query";

const ChartContainer = () => {
  const [selectedRt, setSelectedRt] = useState<string | number>(
    "ca0b28f2-edd1-4738-8afc-5f612e649d98",
  );
  const [selectedYear, setSelectedYear] = useState<string | number>(
    new Date().getFullYear(),
  );
  const { sendRequest, loading } = useFetchApi();

  const { data: barcharData, isLoading: loadingBarChart } = useQuery({
    queryKey: ["bar-chart", selectedYear, selectedRt],
    queryFn: async () => {
      const res = await sendRequest({
        url: "totalIncomeMonthlyPerRtPeryearPerRt",
        params: {
          year: selectedYear && selectedYear,
          rtId: selectedRt && selectedRt,
        },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 30,
  });

  const { data: piechartData } = useQuery({
    queryKey: ["pie-chart", selectedRt, selectedYear],
    queryFn: async () => {
      const res = await sendRequest({
        url: "incomePerMonth",
        params: { year: selectedYear && selectedYear },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 30,
  });

  return (
    <>
      <div className="flex items-center gap-2">
        <FilterYear setYear={setSelectedYear} year={selectedYear} isChart />
        <FilterSelectRt
          selectedRt={selectedRt}
          setSelectedRt={setSelectedRt}
          isChart
        />
      </div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className=" grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-4">
          <BarChartComponent data={barcharData} loading={loadingBarChart} />
          <PieChartComponent data={piechartData} />
        </div>
      )}
    </>
  );
};

export default ChartContainer;
