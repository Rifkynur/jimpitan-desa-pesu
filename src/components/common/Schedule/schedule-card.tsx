import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const ScheduleCard = () => {
  return (
    <Card className="bg-card-background text-white border-clr-pumpkin px-2">
      <CardHeader className="bg-clr-pumpkin p-1 text-center font-bold uppercase">
        <CardTitle>Minggu 1</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-center flex flex-col gap-2">
          <li>Wawan</li>
          <li>Haris</li>
          <li>Fajar</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
