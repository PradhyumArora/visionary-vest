"use client";
// components/SearchBar.tsx
import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    router.push(`/explore?query=${query}`);
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-[30rem]">
      <Input
        className="text-gray-700"
        name="query"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button className="ml-5" type="submit">
        <Search />
      </button>
    </form>
  );
};

export default SearchBar;
