import React from "react";
import FilterSelectRt from "../common/filter-select-rt";
import FilterYear from "../common/filter-year";
import IncomeTable from "./income-table";
import ButtonModalAddIncome from "./button-modal-add-income";

type Income = {};
const IncomeContainer = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-[100vw]">
      <div className="flex gap-2">
        <FilterSelectRt />
        <FilterYear />
        <ButtonModalAddIncome />
      </div>
      <IncomeTable />
    </div>
  );
};

export default IncomeContainer;
