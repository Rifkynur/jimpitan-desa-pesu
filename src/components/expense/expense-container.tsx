"use client";
import React, { useEffect, useState } from "react";
import TableExpense from "./table-expense";
import FilterYear from "../common/filter-year";
import TableExpenseContainer from "./table-expense-container";
import ButtonModalAddExpense from "./button-modal-add-expense";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { expense } from "@/types/expense-type";

const ExpenseContainer = () => {
  const [allExpense, setAllExpense] = useState<expense>({
    status: "",
    data: [],
    page: 1,
    totalPage: 11,
    totalData: 10,
  });
  const { sendRequest, loading } = useFetchApi();

  const getAllExpense = async () => {
    const res = await sendRequest({ url: "/expense" });
    setAllExpense(res);
  };
  useEffect(() => {
    getAllExpense();
  }, []);
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex gap-2">
        <FilterYear />
        <ButtonModalAddExpense />
      </div>
      <TableExpenseContainer
        expense={allExpense}
        onSuccess={getAllExpense}
        loading={loading}
      />
    </div>
  );
};

export default ExpenseContainer;
