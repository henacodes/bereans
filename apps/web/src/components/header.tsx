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
    <div className=" px-32 relative z-10  ">
      <div className="flex flex-row items-center justify-between mt-5 rounded-full    backdrop-blur-lg   py-3    ">
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
        <div className="flex items-center gap-2 relative z-0 ">
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
      <hr />
    </div>
  );
}
