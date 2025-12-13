"use client";
import React, { useEffect, useState } from "react";
import { useFetchApi } from "@/hooks/use-fetch-api";
import CashflowCard from "./cashflow-card";
import { DollarSign, Wallet, Scale } from "lucide-react";
import { alldata } from "@/types/home-type";
import CashflowCardSkeleton from "./cashflow-card-skeleton";
import { useQuery } from "@tanstack/react-query";

const CashflowCardContainer = () => {
  const { sendRequest } = useFetchApi();
  const { data: allData, isLoading } = useQuery({
    queryKey: ["cashflow"],
    queryFn: async () => {
      const res = await sendRequest({ url: "allData" });
      const coloredData = [
        {
          title: "Pemasukan",
          amount: res?.data.totalIncome,
          color: "blue",
          icon: <Wallet className="size-12 text-clr-jet" />,
        },
        {
          title: "Pengeluaran",
          amount: res?.data.totalExpense,
          color: "red",
          icon: <DollarSign className="size-12 text-clr-jet" />,
        },
        {
          title: "Dana",
          amount: res?.data.totalDana,
          color: "green",
          icon: <Scale className="size-12 text-clr-jet" />,
        },
      ];
      return coloredData;
    },
    staleTime: 1000 * 60 * 30,
  });
  return (
    <>
      {isLoading ? (
        <CashflowCardSkeleton />
      ) : (
        <div className="grid grid-cols-1  gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {allData?.map((data, i) => {
            return (
              <CashflowCard
                key={i}
                color={data.color}
                icon={data.icon}
                title={data.title}
                amount={data.amount}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default CashflowCardContainer;
