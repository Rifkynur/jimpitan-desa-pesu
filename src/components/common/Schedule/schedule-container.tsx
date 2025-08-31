import React from "react";
import ScheduleCard from "./schedule-card";
import { Badge } from "@/components/ui/badge";

const ScheduleContainer = () => {
  return (
    <>
      <Badge className="bg-green-600 mb-1 md:mb-3">Rt 09</Badge>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
      </div>
    </>
  );
};

export default ScheduleContainer;

const Schedule = [
  {
    rt: "RT 09",
    members: [],
  },
];
