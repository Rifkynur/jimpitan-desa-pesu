"use client";
import React, { useEffect, useState } from "react";
import FilterYear from "../common/filter-year";
import FilterSelectRt from "../common/filter-select-rt";
import { BarChartComponent } from "./bar-chart-component";
import { PieChartComponnet } from "./pie-chart-component";

const ChartContainer = () => {
  const [selectedRt, setSelectedRt] = useState("");
  return (
    <>
      <div className="flex items-center gap-2">
        <FilterYear />
        <FilterSelectRt selectedRt={selectedRt} setSelectedRt={setSelectedRt} />
      </div>
      <div className=" grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-4">
        <BarChartComponent />
        <PieChartComponnet />
      </div>
    </>
  );
};

export default ChartContainer;
