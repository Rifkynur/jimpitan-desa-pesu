import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeTable from "./income-table";
import TableTotalIncome from "./table-total";
import { GetIncomeResponse, TotalIncomeType } from "@/types/income-type";

type TableIncomeProps = {
  page: number;
  totalIncomePage: number;
  totalPage: number;
  totalIncomeTotalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalIncomePage: React.Dispatch<React.SetStateAction<number>>;
  dataDetailIcome: GetIncomeResponse;
  loading: boolean;
  onSuccess: () => void;
  totalDataIncome: TotalIncomeType | null;
};

const TabIncomeTable = ({
  page,
  totalPage,
  totalIncomePage,
  totalIncomeTotalPage,
  setPage,
  dataDetailIcome,
  loading,
  onSuccess,
  setTotalIncomePage,
  totalDataIncome,
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
        {totalDataIncome && (
          <TableTotalIncome
            dataTotalIncome={totalDataIncome.data}
            totalIncomePage={totalIncomePage}
            totalIncomeTotalPage={totalIncomeTotalPage}
            setTotalIncomePage={setTotalIncomePage}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TabIncomeTable;
