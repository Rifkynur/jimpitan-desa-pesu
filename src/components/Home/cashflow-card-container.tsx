"use client";
import React, { useEffect, useState } from "react";
import { useFetchApi } from "@/hooks/use-fetch-api";
import CashflowCard from "./cashflow-card";
import { DollarSign, Wallet, Scale } from "lucide-react";
import { alldata } from "@/types/home-type";
import CashflowCardSkeleton from "./cashflow-card-skeleton";

const CashflowCardContainer = () => {
  const { sendRequest } = useFetchApi();
  const [allData, setAllData] = useState<alldata[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <CashflowCardSkeleton />
      ) : (
        <div className="grid grid-cols-1  gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
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
      )}
    </>
  );
};

export default CashflowCardContainer;
