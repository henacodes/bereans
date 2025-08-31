import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bereans",
  description: "Bereans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="grid grid-rows-[auto_1fr] h-svh     ">
            {/*  <div
                className="fixed inset-0 -z-10 h-full w-full 
  bg-[radial-gradient(rgba(229,231,235,0.1)_1px,transparent_1px)] 
  [background-size:16px_16px]"
              ></div> */}

            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
