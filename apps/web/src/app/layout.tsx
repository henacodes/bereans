import type { Metadata } from "next";

import { Geist, Geist_Mono, Playfair_Display, Lexend } from "next/font/google";

import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
const lexend = Playfair_Display({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bereans",
  description: "bereans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} {${lexend.variable}} antialiased`}
      >
        <Providers>
          <div className="grid grid-rows-[auto_1fr] h-svh font-lexend ">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
