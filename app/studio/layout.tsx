import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Crimson Forge Studio",
  description: "Forge your power",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
