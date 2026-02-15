import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dock from "@/components/Dock";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SetuAI Hub | Digital India",
  description: "The central bridge connecting citizens to advanced AI assistance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0c0c0c] text-white selection:bg-blue-500/30`}>
        <LanguageProvider>
          {children}
          <Dock />
        </LanguageProvider>
      </body>
    </html>
  );
}
