import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeTable from "./income-table";
import TableTotalIncome from "./table-total";
import { GetIncomeResponse } from "@/types/income-type";

type TableIncomeProps = {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dataDetailIcome: GetIncomeResponse;
  loading: boolean;
  onSuccess: () => void;
};

const TabIncomeTable = ({
  page,
  totalPage,
  setPage,
  dataDetailIcome,
  loading,
  onSuccess,
}: TableIncomeProps) => {
  return (
    <Tabs defaultValue="account">
      <TabsList className="bg-card-background border border-clr-pumpkin">
        <TabsTrigger value="account" className="text-clr-silver-v1">
          Detail
        </TabsTrigger>
        <TabsTrigger value="password" className="text-clr-silver-v1">
          Total
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <IncomeTable
          page={page}
          totalPage={totalPage}
          setPage={setPage}
          dataDetailIncome={dataDetailIcome}
          loading={loading}
          onSuccess={onSuccess}
        />
      </TabsContent>
      <TabsContent value="password">
        <TableTotalIncome />
      </TabsContent>
    </Tabs>
  );
};

export default TabIncomeTable;
