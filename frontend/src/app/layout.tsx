
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

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Talita Umroh - Biro Perjalanan Umroh Terpercaya & Amanah",
  description: "Talita Umroh menyediakan paket perjalanan ibadah umroh dan haji plus yang amanah, terpercaya, dengan pelayanan terbaik untuk kenyamanan ibadah Anda di Tanah Suci.",
  keywords: "umroh, biro umroh, travel umroh, talita umroh, umroh terpercaya, umroh amanah, paket umroh murah, haji plus",
  authors: [{ name: "Talita Umroh" }],
  creator: "Talita Umroh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://talita-umroh.com/",
  },
  openGraph: {
    title: "Talita Umroh - Biro Perjalanan Umroh Terpercaya & Amanah",
    description: "Talita Umroh menyediakan paket perjalanan ibadah umroh dan haji plus yang amanah, terpercaya, dengan pelayanan terbaik.",
    url: "https://talita-umroh.com/",
    type: "website",
    locale: "id_ID",
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
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://upload.wikimedia.org" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <RecentJoinPopup />
      </body>
    </html>
  );
}
