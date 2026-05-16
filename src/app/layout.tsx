import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Second Brain OS — Your Digital Command Center",
  description:
    "A unified digital workspace to track habits, manage projects, save resources, and monitor lifestyle metrics. Built for creators, entrepreneurs, and students.",
  keywords: [
    "productivity",
    "habit tracker",
    "project management",
    "second brain",
    "digital workspace",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#16161F",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#FFFFFF",
            },
          }}
        />
      </body>
    </html>
  );
}
