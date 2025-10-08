import React from "react";
import { DataTable } from "../common/table-component";

const TableTotalIncome = () => {
  const column = [
    {
      key: "date",
      label: "Tanggal",
    },
    {
      key: "amount",
      label: "Total",
    },
  ];
  const dataOptions = [
    {
      id: "1",
      date: "12-12-2025",
      amount: 50000,
    },
  ];
  return <DataTable columns={column} data={dataOptions} />;
};

export default TableTotalIncome;
