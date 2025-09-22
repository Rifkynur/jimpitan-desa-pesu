import React from "react";
import TableExpense from "./table-expense";
import FilterYear from "../common/filter-year";
import TableExpenseContainer from "./table-expense-container";
import ButtonModalAddExpense from "./button-modal-add-expense";

const ExpenseContainer = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex gap-2">
        <FilterYear />
        <ButtonModalAddExpense />
      </div>
      <TableExpenseContainer />
    </div>
  );
};

export default ExpenseContainer;
