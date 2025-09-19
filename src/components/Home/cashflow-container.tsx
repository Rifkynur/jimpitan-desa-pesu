import React from "react";
import CashflowCard from "./cashflow-card";
import { Wallet, DollarSign } from "lucide-react";
import { PieChartComponnet } from "./pie-chart-component";
import { BarChartComponent } from "./bar-chart-component";
import FilterYear from "../common/filter-year";
import FilterSelectRt from "../common/filter-select-rt";

const CashflowContainer = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        <CashflowCard
          color="blue"
          icon={<DollarSign className="size-12 text-clr-jet" />}
          title="Pemasukan"
        />
        <CashflowCard
          color="red"
          icon={<Wallet className="size-12 text-clr-jet" />}
          title="Pengeluaran"
        />
        <CashflowCard title="Dana" />
      </div>
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
