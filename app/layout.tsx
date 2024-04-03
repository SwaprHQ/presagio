import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "swapr-ui/styles.css";
import "./globals.css";

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
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.className} bg-surface-surface-bg`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
