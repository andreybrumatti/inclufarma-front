import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ProviderGoogle } from "@/providers/provider-google";
import { ProviderSession } from "@/providers/provider-session";

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
          <ProviderGoogle>
            {children}</ProviderGoogle>
        </ProviderSession>
      </body>
    </html>
  );
}
