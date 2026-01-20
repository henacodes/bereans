"use client";
import Features from "@/components/features";
import MinimalHero from "@/components/hero";
import { CoolBackground } from "@/components/background";

export default function Home() {
  return (
    <div className=" z-0 relative ">
      <CoolBackground />
      <MinimalHero />
      <div className="px-32">
        <Features />
      </div>
    </div>
  );
}
