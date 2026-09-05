import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARTIFICIAL POPCAT ($POPCAT) | The AI Upgraded Meme",
  description: "ARTIFICIAL POPCAT is what happens when the internet's most iconic screaming cat gets upgraded with AI and dropped into the Robinhood ecosystem.",
  openGraph: {
    title: "ARTIFICIAL POPCAT ($POPCAT)",
    description: "Neon green eyes. Zero fear. Maximum memes. Built for the Robinhood launch meta.",
    url: "https://artificialpopcat.com", // Placeholder
    siteName: "Artificial Popcat",
    images: [
      {
        url: "/popcat.jpg", // Ensure image is in public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTIFICIAL POPCAT ($POPCAT)",
    description: "It doesn't meow. It pumps.",
    images: ["/popcat.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}