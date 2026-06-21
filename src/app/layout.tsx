import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jawad | Designer & Builder",
  description:
    "About Jawad. Designer and builder behind Jawad Designs, Weldroblox and Acquiblox.",
  openGraph: {
    title: "Jawad | Designer & Builder",
    description:
      "About Jawad. Designer and builder behind Jawad Designs, Weldroblox and Acquiblox.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
