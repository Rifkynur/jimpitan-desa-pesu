import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeTable from "./income-table";

const TabIncomeTable = () => {
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
        <IncomeTable />
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default TabIncomeTable;
