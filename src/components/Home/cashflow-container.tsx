import React from "react";
import CashflowCard from "./cashflow-card";
import { Wallet, DollarSign } from "lucide-react";
import { PieChartComponnet } from "./pie-chart-component";
import { BarChartComponent } from "./bar-chart-component";

const CashflowContainer = () => {
  return (
    <>
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
      <div className="mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-12 lg:gap-4">
        <BarChartComponent />
        <PieChartComponnet />
      </div>
    </>
  );
};

export default CashflowContainer;
