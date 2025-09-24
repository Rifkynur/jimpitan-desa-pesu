"use client";
import React, { useEffect, useState } from "react";
import { useFetchApi } from "@/hooks/use-fetch-api";
import CashflowCard from "./cashflow-card";
import { DollarSign, Wallet, Scale } from "lucide-react";
import { alldata } from "@/types/home-type";

const CashflowCardContainer = () => {
  const { sendRequest, loading } = useFetchApi();
  const [allData, setAllData] = useState<alldata[]>();

  useEffect(() => {
    const fetchData = async () => {
      const getData = await sendRequest({ url: "/allData" });
      const coloredData = [
        {
          title: "Pemasukan",
          amount: getData.data.totalIncome,
          color: "blue",
          icon: <Wallet className="size-12 text-clr-jet" />,
        },
        {
          title: "Pengeluaran",
          amount: getData.data.totalExpense,
          color: "red",
          icon: <DollarSign className="size-12 text-clr-jet" />,
        },
        {
          title: "Dana",
          amount: getData.data.totalDana,
          color: "green",
          icon: <Scale className="size-12 text-clr-jet" />,
        },
      ];
      console.log(coloredData);

      setAllData(coloredData);
    };
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {allData?.map((data, i) => {
        return (
          <CashflowCard
            key={i}
            color={data.color}
            icon={data.icon}
            title="Pemasukan"
            amount={data.amount}
          />
        );
      })}
    </div>
  );
};

export default CashflowCardContainer;
