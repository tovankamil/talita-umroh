import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import RecentJoinPopup from "@/components/RecentJoinPopup";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display", // keeping variable name to avoid refactoring all css variables
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talita Umroh - Biro Perjalanan Umroh Terpercaya & Amanah",
  description: "Talita Umroh menyediakan paket perjalanan ibadah umroh dan haji plus yang amanah, terpercaya, dengan pelayanan terbaik untuk kenyamanan ibadah Anda di Tanah Suci.",
  keywords: "umroh, biro umroh, travel umroh, talita umroh, umroh terpercaya, umroh amanah, paket umroh murah, haji plus",
  openGraph: {
    title: "Talita Umroh - Biro Perjalanan Umroh Terpercaya & Amanah",
    description: "Talita Umroh menyediakan paket perjalanan ibadah umroh dan haji plus yang amanah, terpercaya, dengan pelayanan terbaik.",
    url: "https://talita-umroh.com/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <RecentJoinPopup />
      </body>
    </html>
  );
}
