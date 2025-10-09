import React from "react";
import { DataTable } from "../common/table-component";
import { dataTotalIncomeType } from "@/types/income-type";
import { PaginationComponent } from "../common/pagination-component";
import { formatDate } from "@/app/utils/date-formatted";

type TableTotalIncomeProps = {
  dataTotalIncome: dataTotalIncomeType[];
  totalIncomePage: number;
  totalIncomeTotalPage: number;
  setTotalIncomePage: React.Dispatch<React.SetStateAction<number>>;
};
const TableTotalIncome = ({
  dataTotalIncome,
  totalIncomePage,
  totalIncomeTotalPage,
  setTotalIncomePage,
}: TableTotalIncomeProps) => {
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
  const dataOptions = dataTotalIncome?.map((data, i) => ({
    id: i.toString(),
    date: formatDate(data.date),
    amount: `Rp.${data.totalIncome.toLocaleString("id-ID")}`,
  }));

  return (
    <>
      <DataTable columns={column} data={dataOptions} />
      <PaginationComponent
        page={totalIncomePage}
        setPage={setTotalIncomePage}
        totalPage={totalIncomeTotalPage}
      />
    </>
  );
};

export default TableTotalIncome;
