"use client";
import React, { useState } from "react";
import SearchInput from "../common/search-input";

const SearchUser = () => {
  const [searchUser, setSearchUser] = useState("");
  return (
    <SearchInput
      placeholder="Cari Petugas..."
      onChange={setSearchUser}
      value={searchUser}
    />
  );
};

export default SearchUser;
