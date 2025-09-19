"use client";

import { cn } from "@/lib/utils";

type PayloadItem = {
  name: string;
  value: number | string;
  color?: string;
  payload?: {
    rt?: string;
    [key: string]: any; // biar fleksibel kalau nanti ada field lain
  };
  fill?: string; // tambahan kalau Recharts kirim fill, bisa dipakai sebagai warna
};
type CustomTooltipProps = {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
  formatter?: (value: number | string, name: string) => React.ReactNode;
  className?: string;
};

export function CustomTooltip({
  active,
  payload,
  label,
  formatter,
  className,
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-lg border-clr-pumpkin border-2 bg-[#00000070] p-3 text-popover-foreground shadow-md",
        className
      )}
    >
      {label && (
        <div className="mb-2 text-sm font-medium text-white capitalize">
          {label}
        </div>
      )}
      <ul className="space-y-1">
        {payload.map((entry, index) => {
          // kalau ada payload.rt berarti ini PieChart
          const labelName = entry.payload?.rt || entry.name;
          const value = entry.value;

          return (
            <li key={index} className="flex items-center text-sm">
              {(entry.color || entry.fill) && (
                <span
                  className="mr-2 h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color || entry.fill }}
                />
              )}
              <span className="font-medium text-white">{labelName}:</span>
              <span className="ml-1 text-white">Rp. {value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
