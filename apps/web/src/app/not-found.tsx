import Link from "next/link";
import { MoveLeft, Search, Footprints, BookDashed } from "lucide-react";
import { Button } from "@/components/ui/button";

const SheepIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Body/Wool */}
    <path d="M12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6Z" />
    <path d="M9 7.5c-1-1-2.5-1-3.5 0S4.5 10 5.5 11" />
    <path d="M15 7.5c1-1 2.5-1 3.5 0s1 2.5 0 3.5" />
    {/* Legs */}
    <path d="M10 18v2" />
    <path d="M14 18v2" />
    {/* Face details */}
    <path d="M11 11.5h.01" />
    <path d="M13 11.5h.01" />
    <path d="M11.5 13.5c.3.3.7.3 1 0" />
  </svg>
);

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Icon Section */}
      <div className="relative mb-8">
        {/* Responsive glow effect */}
        <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl animate-pulse dark:bg-primary/10" />

        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-border bg-background shadow-inner">
          <SheepIcon className="h-16 w-16 text-primary animate-bounce" />
        </div>
        <Footprints className="absolute -bottom-2 -right-2 h-8 w-8 text-muted-foreground/40 rotate-12" />
      </div>

      {/* Messaging */}
      <div className="space-y-4">
        <h1 className="font-geist text-4xl font-extrabold tracking-tighter sm:text-6xl text-foreground">
          404: The Lost Sheep
        </h1>

        <div className="space-y-1">
          <h2 className="text-xl font-medium text-primary italic">
            "Seek, and ye shall find..."
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
            (But this page has gone astray)
          </p>
        </div>

        <p className="mx-auto max-w-[500px] text-muted-foreground leading-relaxed">
          The ninety-nine are accounted for, but this specific path leads only
          to the digital wilderness. Even the best of us wander off the narrow
          road sometimes.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button
          asChild
          size="lg"
          className="rounded-xl px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105"
        >
          <Link href="/" className="flex items-center gap-2">
            <MoveLeft className="h-4 w-4" />
            Return to the Fold
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-xl px-8 border-border bg-background/50 backdrop-blur-sm hover:bg-accent"
        >
          <Link href="/bible/rsv/1/1" className="flex items-center gap-2">
            <BookDashed className="h-4 w-4" />
            Stop Scrolling & Read
          </Link>
        </Button>
      </div>

      {/* Footer Pun */}
      <p className="mt-16 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/30">
        Forty days and forty nights of searching won't find this page.
      </p>
    </div>
  );
}
