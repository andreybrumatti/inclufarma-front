"use client";

import SectionsMedicamentos from "@/components/SectionsMedicamentos";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VLibras from "@djpfs/react-vlibras";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center w-full">
        <VLibras forceOnload={true} />
        <HeroSection />
        <SectionsMedicamentos />
      </main>
    </>
  );
}
