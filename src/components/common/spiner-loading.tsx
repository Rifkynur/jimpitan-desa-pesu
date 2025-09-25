"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const SpinnerLoader = () => {
  return (
    <div className=" w-full mt-6 md:mt-10">
      <div className="loader mx-auto"></div>
    </div>
  );
};

export default SpinnerLoader;
