"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
const SearchInput = ({
  value,
  onChange,
  placeholder = "Cari...",
}: SearchInputProps) => {
  return (
    <div className="relative max-w-sm ">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        className="pl-8"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
