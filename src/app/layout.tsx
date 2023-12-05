import type { Metadata } from "next";
import Head from "next/head";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TBR Pile Up",
  description: "Find how long your TBR really is",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>TBR Pile Up</title>
        <meta
          name="description"
          content="Find how long your TBR really is"
          key="desc"
        />
        <meta property="og:title" content="TBR Pile Up" />
        <meta
          property="og:description"
          content="Find how long your TBR really is"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
