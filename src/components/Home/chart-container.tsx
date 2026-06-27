"use client";
import React, { useState, useEffect } from "react";
import FilterYear from "../common/filter-year";
import FilterSelectRt from "../common/filter-select-rt";
import { BarChartComponent } from "./bar-chart-component";
import { PieChartComponent } from "./pie-chart-component";
import { useFetchApi } from "@/hooks/use-fetch-api";
import SpinnerLoader from "../common/spiner-loading";
import { useQuery } from "@tanstack/react-query";

const ChartContainer = () => {
  const [selectedRt, setSelectedRt] = useState<string | number>("");
  const [selectedYear, setSelectedYear] = useState<string | number>(
    new Date().getFullYear(),
  );
  const { sendRequest, loading } = useFetchApi();

  // Set default selectedRt ke RT '09
  const { data: rt09Data } = useQuery({
    queryKey: ["rt-09"],
    queryFn: async () => {
      const res = await sendRequest({
        url: "rt",
        params: { name: "09" },
      });
      return { allRt: res.allRt };
    },
  });

  useEffect(() => {
    if (rt09Data?.allRt && rt09Data.allRt.length > 0 && !selectedRt) {
      setSelectedRt(rt09Data.allRt[0].id);
    }
  }, [rt09Data, selectedRt]);

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
    enabled: !!selectedRt,
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
    enabled: !!selectedRt,
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
      {!selectedRt ? (
        <SpinnerLoader />
      ) : loading ? (
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
