"use client";

import Title from "@/components/Title";
import SearchBar from "@/components/SearchBar";
import LoadCards from "@/components/LoadCards"; 
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Title />
      <SearchBar />
      <LoadCards />
      <Footer />
    </>
  );
}