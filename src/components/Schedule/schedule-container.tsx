import React, { Fragment } from "react";
import ScheduleCard from "./schedule-card";
import { Badge } from "@/components/ui/badge";

const ScheduleContainer = () => {
  return (
    <>
      {Schedule.map((data, i) => (
        <Fragment key={i}>
          <Badge className="bg-green-600 font-bold my-1 md:my-3">
            {data.rt}
          </Badge>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
            {data.time.map((data, i) => (
              <ScheduleCard members={data.members} week={data.week} key={i} />
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default ScheduleContainer;

const Schedule = [
  {
    rt: "RT 09",
    time: [
      {
        week: 1,
        members: [
          {
            name: "Asri",
          },
          {
            name: "Haris",
          },
          {
            name: "Fajar",
          },
        ],
      },
      {
        week: 2,
        members: [
          {
            name: "Asri",
          },
          {
            name: "Haris",
          },
          {
            name: "Fajar",
          },
        ],
      },
      {
        week: 3,
        members: [
          {
            name: "Asri",
          },
          {
            name: "Haris",
          },
          {
            name: "Fajar",
          },
        ],
      },
      {
        week: 4,
        members: [
          {
            name: "Asri",
          },
          {
            name: "Haris",
          },
          {
            name: "Fajar",
          },
        ],
      },
    ],
  },
  {
    rt: "RT 10",
    time: [
      {
        week: 1,
        members: [
          {
            name: "Endar",
          },
          {
            name: "Apin",
          },
        ],
      },
      {
        week: 2,
        members: [
          {
            name: "Angger",
          },
          {
            name: "Dias",
          },
        ],
      },
      {
        week: 3,
        members: [
          {
            name: "Yosua",
          },
          {
            name: "Rasyid",
          },
        ],
      },
      {
        week: 4,
        members: [
          {
            name: "Endar",
          },
          {
            name: "Angger",
          },
        ],
      },
    ],
  },
  {
    rt: "RT 11",
    time: [
      {
        week: 1,
        members: [
          {
            name: "Andika",
          },
          {
            name: "Risal",
          },
        ],
      },
      {
        week: 2,
        members: [
          {
            name: "Andika",
          },
          {
            name: "Risal",
          },
        ],
      },
      {
        week: 3,
        members: [
          {
            name: "Pras",
          },
          {
            name: "Aji",
          },
        ],
      },
      {
        week: 4,
        members: [
          {
            name: "Pras",
          },
          {
            name: "Aji",
          },
        ],
      },
    ],
  },
];
