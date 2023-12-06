import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "How long is my TBR",
  description: "Find how long your TBR really is",
  metadataBase: new URL("https://how-long-is-my-tbr.itzami.com/"),
  openGraph: {
    title: "How long is my TBR",
    description: "Find how long your TBR really is",
  },
  twitter: {
    card: "summary_large_image",
    title: "How long is my TBR",
    description: "Find how long your TBR really is",
    creator: "@HeyItzaMi",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
