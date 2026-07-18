"use client";
import React, { useState } from "react";
import SearchInput from "../common/search-input";

type SearchInputProps = {
  search: string;
  placeholder: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
const SearchComponent = ({
  search,
  setSearch,
  placeholder,
}: SearchInputProps) => {
  return (
    <SearchInput
      placeholder={placeholder}
      onChange={setSearch}
      value={search}
    />
  );
};

export default SearchComponent;
