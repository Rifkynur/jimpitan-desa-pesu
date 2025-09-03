"use client";
import React from "react";
import { DataTable } from "../common/table-component";
import { PaginationComponent } from "../common/pagination-component";
import { Badge } from "../ui/badge";

type Member = {
  id: number;
  name: string;
  rt: string;
  status: string;
};

const dummyData: Member[] = [
  { id: 1, name: "Waluyo", rt: "Rt 09", status: "active" },
  { id: 2, name: "Hardino", rt: "Rt 09", status: "active" },
  { id: 3, name: "Wahyuni", rt: "Rt 09", status: "inactive" },
];
const column = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "rt",
    label: "RT",
  },
  {
    key: "status",
    label: "Status",
    render: (row: any) =>
      row.status === "active" ? (
        <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      ) : (
        <Badge className="bg-red-500 hover:bg-red-600">Inactive</Badge>
      ),
  },
];

const MemberTable = () => {
  return (
    <div>
      <DataTable
        data={dummyData}
        columns={column}
        showActions
        onEdit={(user) => alert(`Edit ${user.name}`)}
        onDelete={(user) => alert(`Delete ${user.name}`)}
      />
      <PaginationComponent />
    </div>
  );
};

export default MemberTable;
