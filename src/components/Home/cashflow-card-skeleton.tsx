import React from "react";
import { Skeleton } from "../ui/skeleton";

const CashflowCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2  md:gap-4 md:flex-row w-full">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div
            className="bg-card-background w-full border-clr-pumpkin border-2 text-white grid-cols-1 rounded-lg flex items-center justify-center py-8 gap-2 px-2 md:px-4"
            key={i}
          >
            <Skeleton className="rounded-full size-12" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-50 h-4" />
              <Skeleton className="w-60 h-4" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default CashflowCardSkeleton;
