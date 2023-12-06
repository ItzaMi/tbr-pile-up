import Head from "next/head";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>How long is my TBR</title>
        <meta
          name="description"
          content="Find how long your TBR really is"
          key="desc"
        />
        <meta property="og:title" content="How long is my TBR" />
        <meta
          property="og:description"
          content="Find how long your TBR really is"
        />
        <meta property="twitter:title" content="How long is my TBR" />
        <meta
          property="twitter:description"
          content="Find how long your TBR really is"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
