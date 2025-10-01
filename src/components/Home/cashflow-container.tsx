import React from "react";
import CashflowCardContainer from "./cashflow-card-container";
import ChartContainer from "./chart-container";

const CashflowContainer = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <CashflowCardContainer />
      <ChartContainer />
    </div>
  );
};

export default CashflowContainer;
