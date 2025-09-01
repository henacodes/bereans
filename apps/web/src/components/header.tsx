"use client";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { Book, Sparkle } from "lucide-react";

function NavIcon({ icon: Icon }: { icon: React.ElementType }) {
  return <Icon size={15} aria-hidden="true" />;
}

export default function Header() {
  const links = [
    { to: "/bible/ESV/1/1/", label: "Bible", icon: Book },
    { to: "/questions", label: "Questions", icon: Sparkle },
  ];

  return (
    <div className=" px-32 relative z-10 ">
      <div className="flex flex-row items-center justify-between mt-5 rounded-full    backdrop-blur-lg   py-3    ">
        <p className=" text-xl text-secondary dark:text-primary font-bold  ">
          <a href="/">Bereans</a>
        </p>
        <nav className="flex items-center gap-10   text-lg    ">
          {links.map(({ to, label, icon }) => {
            const Icon = icon;
            return (
              <Link
                key={to}
                href={to}
                className=" flex items-center gap-2 hover:text-primary "
              >
                <NavIcon icon={icon} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 relative z-0 ">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
      <hr />
    </div>
  );
}
