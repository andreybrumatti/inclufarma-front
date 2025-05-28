"use client";

import CardCategorias from "@/components/SectionsMedicamentos";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <Header />
      <HeroSection />
      <CardCategorias />
    </main>
  );
}
