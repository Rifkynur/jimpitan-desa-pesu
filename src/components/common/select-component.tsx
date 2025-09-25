"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export type Option = {
  value: any;
  label: string;
};

type SearchableSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function SelectComponent({
  options,
  value,
  onChange,
  placeholder = "Pilih opsi...",
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="border-clr-pumpkin bg-clr-primary hover:bg-[#ffffff70]"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[150px] md:w-[200px] justify-between", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-[200px] p-0 border border-clr-pumpkin "}>
        <Command className="bg-clr-primary border-clr-pumpkin text-white">
          <CommandInput placeholder="Cari..." />
          <CommandList>
            <CommandEmpty>Tidak ditemukan</CommandEmpty>
            <CommandGroup className="text-white">
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => {
                    onChange(opt?.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      opt.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
