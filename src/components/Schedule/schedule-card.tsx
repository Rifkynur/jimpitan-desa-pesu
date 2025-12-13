import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type member = {
  name: string;
};
type ScheduleCardPros = {
  week: number;
  members: member[];
};

const ScheduleCard = ({ week, members }: ScheduleCardPros) => {
  return (
    <Card className="bg-card-background text-white border-clr-pumpkin px-2">
      <CardHeader className="bg-clr-pumpkin p-1 text-center font-bold uppercase rounded-lg flex items-center justify-center">
        <CardTitle className="font-bold py-1">Minggu {week}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-center flex flex-col gap-2">
          {members.map((data, i) => (
            <li key={i} className="font-medium lg:text-lg">
              {data.name}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
