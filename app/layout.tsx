import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";
import "swapr-ui/styles.css";

import { Providers } from "@/providers";
import { Navbar, Footer } from "@/app/components/ui";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Presagio 👁️",
  description: "Template for kickstarting dapps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
