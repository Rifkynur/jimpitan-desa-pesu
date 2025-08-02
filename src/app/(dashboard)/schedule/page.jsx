import React from "react";
import ScheduleList from "./schedule-list";
const Page = () => {
  return (
    <>
      {jimpitanSchedule.map((data, i) => {
        return <ScheduleList title={data.title} key={i} datas={data.datas} />;
      })}
    </>
  );
};

export default Page;

const jimpitanSchedule = [
  {
    title: "rt09",
    datas: [
      {
        week: 1,
        members: [
          {
            name: "Wawan",
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
            name: "Erik",
          },
          {
            name: "Bagus",
          },
          {
            name: "Adit",
          },
        ],
      },
      {
        week: 3,
        members: [
          {
            name: "Erik",
          },
          {
            name: "Bagus",
          },
          {
            name: "Adit",
          },
        ],
      },
      {
        week: 4,
        members: [
          {
            name: "Erik",
          },
          {
            name: "Bagus",
          },
          {
            name: "Adit",
          },
        ],
      },
    ],
  },
  {
    title: "rt10",
    datas: [
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
            name: "Ari",
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
            name: "Dias",
          },
          {
            name: "Dias",
          },
        ],
      },
    ],
  },
  {
    title: "rt11",
    datas: [
      {
        week: 1,
        members: [
          {
            name: "Aji",
          },
          {
            name: "Pras",
          },
        ],
      },
      {
        week: 2,
        members: [
          {
            name: "Rizal",
          },
          {
            name: "Andika",
          },
        ],
      },
      {
        week: 3,
        members: [
          {
            name: "Aji",
          },
          {
            name: "Pras",
          },
        ],
      },
      {
        week: 4,
        members: [
          {
            name: "Rizal",
          },
          {
            name: "Andika",
          },
        ],
      },
    ],
  },
];
