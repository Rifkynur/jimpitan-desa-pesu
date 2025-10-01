"use client";
import React, { useState } from "react";
import SearchInput from "../common/search-input";

type SearchInputProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
const SearchComponent = ({ search, setSearch }: SearchInputProps) => {
  return (
    <SearchInput
      placeholder="Cari Petugas..."
      onChange={setSearch}
      value={search}
    />
  );
};

export default SearchComponent;
