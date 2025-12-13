"use client";
import { useState } from "react";
import FilterYear from "../common/filter-year";
import TableExpenseContainer from "./table-expense-container";
import ButtonModalAddExpense from "./button-modal-add-expense";
import { useFetchApi } from "@/hooks/use-fetch-api";
import { useAuthStore } from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

const ExpenseContainer = () => {
  const [page, setPage] = useState(1);
  const [year, setYear] = useState<string | number>("all");
  const { isLoggedIn, role } = useAuthStore();
  const { sendRequest } = useFetchApi();

  const { data, isLoading } = useQuery({
    queryKey: ["expense", page, year],
    queryFn: async () => {
      const res = await sendRequest({
        url: "expense",
        params: { page: page && page, year: year && year },
      });
      return res;
    },
    staleTime: 1000 * 60 * 30,
  });

  const totalPage = data?.totalPage ?? 1;

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex gap-2">
        <FilterYear setYear={setYear} year={year} />
        {isLoggedIn && role == "admin" && <ButtonModalAddExpense />}
      </div>
      <TableExpenseContainer
        expense={data}
        loading={isLoading}
        setPage={setPage}
        page={page}
        totalPage={totalPage}
      />
    </div>
  );
};

export default ExpenseContainer;
