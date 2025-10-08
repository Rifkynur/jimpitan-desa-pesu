"use client";
import React, { useState, useEffect } from "react";
import FilterSelectRt from "../common/filter-select-rt";
import FilterYear from "../common/filter-year";
import ButtonModalAddIncome from "./button-modal-add-income";
import TabIncomeTable from "./tab-income-table";

type Income = {};
const IncomeContainer = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 max-w-[100vw]">
      <div className="flex gap-2">
        <FilterSelectRt />
        <FilterYear />
        <ButtonModalAddIncome />
      </div>
      <TabIncomeTable />
    </div>
  );
};

export default IncomeContainer;
