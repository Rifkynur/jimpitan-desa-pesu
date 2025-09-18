import React from "react";
import { PaginationComponent } from "../common/pagination-component";
import TableCashflow from "../common/table-cashflow";

const IncomeTable = () => {
  return (
    <div className="flex flex-col">
      <TableCashflow />
      <PaginationComponent />
    </div>
  );
};

export default IncomeTable;
