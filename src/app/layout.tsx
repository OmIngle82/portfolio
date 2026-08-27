import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/canvas/Stars";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-omingle82s-projects.vercel.app"),
  title: "Om Ingle | On a Journey Through Tech",
  description: "Architecting intelligence and engineering impact through robust backend architecture and AI-driven solutions.",
  openGraph: {
    title: "Om Ingle | On a Journey Through Tech",
    description: "Architecting intelligence and engineering impact through robust backend architecture and AI-driven solutions.",
    url: "https://portfolio-omingle82s-projects.vercel.app/",
    siteName: "Om Ingle Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Ingle | On a Journey Through Tech",
    description: "Architecting intelligence and engineering impact through robust backend architecture and AI-driven solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#030014] text-white overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200">
        <StarsCanvas />
        <main className="relative z-10 w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
