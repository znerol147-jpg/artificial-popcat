import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kermitcoin ($KERMIT) | A Brighter Portfolio",
  description: "Same frog. Different mission. Robinhood's true mascot brings the Sherwood spirit to the blockchain.",
  icons: {
    icon: "/kermit.png",
    apple: "/kermit.png",
  },
  openGraph: {
    title: "Kermitcoin ($KERMIT)",
    description: "Financial freedom looks good on you. Join the community that believes.",
    url: "https://kermitcoin-placeholder.com", 
    siteName: "Kermitcoin",
    images: [
      {
        url: "/image_5da32b.jpg", // Using the meme grid as the OG image
        width: 1200,
        height: 1200,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kermitcoin ($KERMIT)",
    description: "Dip? Good... More $KERMIT.",
    images: ["/image_5da32b.jpg"],
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