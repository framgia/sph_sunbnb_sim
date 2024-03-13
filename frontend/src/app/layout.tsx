import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Providers from "./providers";
import NavbarBottom from "./components/navbar/NavbarBottom";
import Navbar from "./components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SunBnB",
  description: `An application that aims to replicate and enhance the user experience provided by Airbnb, 
    focusing on ease of use, reliability, and a wide range of offerings.`,
  icons: { icon: "/logo.svg" }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="m-auto mb-8 mt-5 w-full max-w-[1024px] flex-1 px-6">
              {children}
            </main>
            <NavbarBottom />
          </div>
        </Providers>
      </body>
    </html>
  );
}
