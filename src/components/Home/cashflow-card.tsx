import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

type CashflowCardProps = {
  title?: string;
  amount?: string | number;
  color?: string;
  icon?: ReactNode;
  loading?: boolean;
};

const colorVariants: Record<string, string> = {
  green: 'bg-[#B6F500]',
  red: 'bg-red-500',
  blue: 'bg-[#A1E3F9]',
};
const CashflowCard = ({ title = 'pemasukan', amount = 0, color = 'green', icon = <Scale className="size-12 text-clr-jet" /> }: CashflowCardProps) => {
  return (
    <Card className="bg-card-background border-clr-pumpkin border-2 text-white grid-cols-1">
      <CardContent className="flex items-center justify-between gap-4 w-full">
        <>
          <div className={cn('font-bold size-fit p-2 rounded-full', colorVariants[color] ?? 'bg-gray-500')}>{icon}</div>
          <div className="flex flex-col justify-between h-full w-full">
            <p className="font-bold text-lg">Total {title}</p>
            <div className="w-full h-1 bg-red-50 rounded-2xl"></div>
            <p className="font-semibold">Rp.{amount.toLocaleString('id-ID')}</p>
          </div>
        </>
      </CardContent>
    </Card>
  );
};

export default CashflowCard;
1;
