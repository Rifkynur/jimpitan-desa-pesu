'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { SelectOption } from '@/types/select-option-type';
import SpinnerLoader from './spiner-loading';

type SearchableSelectProps = {
  options: SelectOption[];
  value: number | string;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
  placeholder?: string;
  className?: string;
  loading?: boolean;
};

export function SelectComponent({ options, value, onChange, placeholder = 'Pilih opsi...', loading, className }: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const filtered = options?.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));

  const selectedOption = options?.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <PopoverTrigger asChild className="border-clr-pumpkin bg-clr-primary hover:bg-[#ffffff70]">
          <Button variant="outline" role="combobox" aria-expanded={open} className={cn('w-[150px] md:w-[200px] justify-between', className)}>
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        {open && (
          <div className="absolute top-12 left-0 right-0 w-[250px] z-50 bg-clr-primary border border-clr-pumpkin rounded-md shadow text-white p-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari..."
              className="w-full p-2 mb-2 rounded-md bg-clr-primary/40 border border-clr-pumpkin text-white placeholder:text-white/60 focus:outline-none"
            />

            {loading ? (
              <SpinnerLoader />
            ) : (
              <div className="max-h-60 overflow-y-auto touch-pan-y">
                {filtered?.length === 0 && <div className="p-2 text-sm opacity-70">Tidak ditemukan</div>}

                {filtered?.map((opt) => (
                  <div
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-mdactive:bg-white/20 capitalize"
                  >
                    <Check className={cn('h-4 w-4', opt.value === value ? 'opacity-100' : 'opacity-0')} />
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Popover>
  );
}
