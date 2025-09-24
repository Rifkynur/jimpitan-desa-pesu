import React from "react";
import { PieChartComponnet } from "./pie-chart-component";
import { BarChartComponent } from "./bar-chart-component";
import FilterYear from "../common/filter-year";
import FilterSelectRt from "../common/filter-select-rt";
import CashflowCardContainer from "./cashflow-card-container";

const CashflowContainer = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <CashflowCardContainer />
      <div className="flex items-center gap-2">
        <FilterYear />
        <FilterSelectRt />
      </div>
      <div className=" grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-4">
        <BarChartComponent />
        <PieChartComponnet />
      </div>
    </div>
  );
};

export default CashflowContainer;
