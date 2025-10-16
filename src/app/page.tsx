"use client";

import { useState } from "react";
import Title from "@/components/Title";
import SearchBar from "@/components/SearchBar";
import LoadCards from "@/components/LoadCards";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/theme/Switcher";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <ThemeSwitcher />
      </div>
      <Title />
      <SearchBar onSearch={handleSearch} />
      <LoadCards searchTerm={searchTerm} />
      <Footer />
    </>
  );
}