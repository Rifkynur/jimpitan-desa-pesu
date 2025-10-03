"use client";
import React, { useEffect, useState } from "react";
import TableExpense from "./table-expense";
import FilterYear from "../common/filter-year";
import TableExpenseContainer from "./table-expense-container";
import ButtonModalAddExpense from "./button-modal-add-expense";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { expense } from "@/types/expense-type";

const ExpenseContainer = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [year, setYear] = useState<string | number>("all");
  const [allExpense, setAllExpense] = useState<expense>({
    status: "",
    data: [],
    page: 1,
    totalPage: 11,
    totalData: 10,
  });
  const { sendRequest, loading } = useFetchApi();

  const getAllExpense = async () => {
    const res = await sendRequest({
      url: "/expense",
      params: { page: page && page, year: year && year },
    });
    setPage(res.page);
    setTotalPage(res.totalPage);
    setAllExpense(res);
  };
  useEffect(() => {
    getAllExpense();
  }, [page, year]);
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex gap-2">
        <FilterYear setYear={setYear} year={year} />
        <ButtonModalAddExpense onSuccess={getAllExpense} />
      </div>
      <TableExpenseContainer
        expense={allExpense}
        onSuccess={getAllExpense}
        loading={loading}
        setPage={setPage}
        page={page}
        totalPage={totalPage}
      />
    </div>
  );
};

export default ExpenseContainer;
