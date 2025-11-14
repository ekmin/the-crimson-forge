import type { Metadata } from "next";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "../globals.css";
import { dark } from '@clerk/themes'
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "The Crimson Forge",
  description: "Forge your power",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic appearance={{
        theme: dark,
      }}>
    <html lang="en">
      <body
        className="flex flex-col min-h-screen"
      >
        <Navbar />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
