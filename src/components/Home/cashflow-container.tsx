import React from "react";
import CashflowCard from "./cashflow-card";
import { Wallet, DollarSign } from "lucide-react";

const CashflowContainer = () => {
  return (
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
  );
};

export default CashflowContainer;
