

import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ProviderSession } from "@/providers/provider-session";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Lato({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Projeto de e-commerce com Next.js e Java",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
          <ProviderSession>
              {children}
              <Toaster />
          </ProviderSession>
      </body>
    </html>
  );
}
