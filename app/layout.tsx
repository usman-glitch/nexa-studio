import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nexastudioofficial.com"),
  title: "NEXA Studio | Digital Design Agency",
  description: "High-end digital branding and web development solutions for the modern era.",
  // ADDED: Explicit icon mapping for Search Engines
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png' },
    ],
  },
  openGraph: {
    images: ['/opengraph-image.png'], 
  },
  verification: {
    google: 'IRzcAqTsQSO-uLw3DrM7IWbUsLl_j3gCxgJCVW354Ck', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-[#050505]">
        <Navbar />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}