"use client";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const links = [
    { to: "/bible/ESV/1/1/", label: "Home" },
    { to: "/questions", label: "Questions" },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between    py-3    ">
        <p className=" text-xl text-secondary dark:text-primary font-bold  ">
          Bereans
        </p>
        <nav className="flex gap-4 text-lg    ">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} href={to}>
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
      <hr />
    </div>
  );
}
