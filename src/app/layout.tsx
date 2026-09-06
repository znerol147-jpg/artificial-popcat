import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artificial Nyancat ($NYANCAT) | Loop Forever",
  description: "The classic Pop-Tart Cat upgraded with glowing green AI eyes and an endless rainbow drive.",
  icons: {
    icon: "/nyancat.jpg", // Setting the favicon directly to your image
    apple: "/nyancat.jpg",
  },
  openGraph: {
    title: "Artificial Nyancat ($NYANCAT)",
    description: "Dogs had their run. Frogs had theirs. The sky belongs to $NYANCAT.",
    url: "https://artificialnyancat.com", // Placeholder
    siteName: "Artificial Nyancat",
    images: [
      {
        url: "/nyancat.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Nyancat ($NYANCAT)",
    description: "Loop forever. Fly forever.",
    images: ["/nyancat.jpg"],
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