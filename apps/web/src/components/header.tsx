"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { defaultTranslation } from "@/data/bible";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: `/bible/${defaultTranslation}/1/1`, label: "Read Bible" },
    { to: "/questions", label: "Forum" },
    { to: "/dashboard", label: "Dashboard" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* LEFT SIDE: Mobile Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar (Sheet) */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger>
                <div className="rounded-xl ">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </div>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] rounded-r-2xl border-r-white/10 bg-background/95 backdrop-blur-xl"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="font-playfair italic font-bold text-2xl text-primary">
                    Bereans
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-4 mt-8">
                  {links.map(({ to, label }) => (
                    <Link
                      key={to}
                      href={to}
                      onClick={() => setIsOpen(false)} // Close sidebar on click
                      className={cn(
                        "text-lg font-medium px-4 py-3 rounded-xl transition-all",
                        pathname === to
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-playfair italic font-bold text-xl tracking-tighter text-primary">
              Bereans
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 ml-4">
            {links.map(({ to, label }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  href={to}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary rounded-full px-3 py-1",
                    isActive
                      ? "text-foreground bg-white/5"
                      : "text-muted-foreground",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT SIDE: Actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="hidden xs:block h-4 w-[1px] bg-border mx-1" />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
