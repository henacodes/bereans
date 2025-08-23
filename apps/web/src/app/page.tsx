"use client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import Features from "@/components/features";
import MinimalHero from "@/components/hero";

export default function Home() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  return (
    <div>
      <MinimalHero />
      <Features />
    </div>
  );
}
