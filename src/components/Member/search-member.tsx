"use client";
import React, { useState } from "react";
import SearchInput from "../common/search-input";

const SearchMember = () => {
  const [search, setSearch] = useState("");
  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder="cari warga..."
    />
  );
};

export default SearchMember;
