"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Using Lucide for a clean spinner
import Features from "@/components/features";
import MinimalHero from "@/components/hero";
import { CoolBackground } from "@/components/background";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      // Using 'as any' to bypass the Typed Routes error we discussed
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  return (
    <div className="z-0 relative min-h-screen">
      <CoolBackground />
      <MinimalHero />
      <div className="px-4 md:px-16 lg:px-32">
        <Features />
      </div>

      {isPending && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-background/80 backdrop-blur-md border p-3 rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-xs font-medium pr-2 text-muted-foreground">
            Verifying session...
          </span>
        </div>
      )}

      {!isPending && session?.user && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-xs font-bold pr-2">
            Taking you to dashboard...
          </span>
        </div>
      )}
    </div>
  );
}
