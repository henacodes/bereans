"use client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@web/utils/trpc";
import Features from "@web/components/features";
import MinimalHero from "@web/components/hero";
import { CoolBackground } from "@web/components/background";

export default function Home() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

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
