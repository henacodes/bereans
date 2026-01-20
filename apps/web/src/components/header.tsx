"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { cn } from "@/lib/utils"; // Standard shadcn utility

export default function Header() {
  const pathname = usePathname();

  const links = [
    { to: "/", label: "Home" },
    { to: "/bible/ESV/1/1", label: "Read Bible" },
    { to: "/questions", label: "Forum" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-playfair italic font-bold text-xl tracking-tighter text-primary">
              Bereans
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ to, label }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  href={to}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="h-4 w-[1px] bg-border mx-1" />{" "}
            {/* Subtle separator */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
