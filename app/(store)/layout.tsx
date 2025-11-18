import type { Metadata } from "next";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "../globals.css";
import { dark } from '@clerk/themes'
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className="flex flex-col min-h-screen"
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
