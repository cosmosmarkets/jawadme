import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jawad Jalal — Designer & Founder",
  description:
    "Jawad Jalal. Designer and founder building the good-looking. 3D artist, marketer, and founder making things that look good and actually work.",
  openGraph: {
    title: "Jawad Jalal — Designer & Founder",
    description:
      "Designer and founder building the good-looking. 3D artist, marketer, and founder making things that look good and actually work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
