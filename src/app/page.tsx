"use client";

import { useState } from "react";
import Title from "@/components/Title";
import SearchBar from "@/components/SearchBar";
import LoadCards from "@/components/LoadCards";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Title />
      <SearchBar onSearch={handleSearch} />
      <LoadCards searchTerm={searchTerm} />
      <Footer />
    </>
  );
}