import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RUB ($RUB) | The Girl in the Green Hat",
  description: "Meet RUB. The girl counterpart of ROB. The same Sherwood spirit, built for the Robinhood Chain.",
  icons: {
    icon: "/rub.jpg", // Pointing directly to your new image
    apple: "/rub.jpg",
  },
  openGraph: {
    title: "RUB ($RUB) | Robinhood Chain",
    description: "Robin trades memes on Robinhood, stays on Robinhood, uses USDG. Be like Robin. Meet RUB.",
    url: "https://rub-robinhood.com", // Placeholder
    siteName: "RUB",
    images: [
      {
        url: "/rub.jpg",
        width: 1200,
        height: 1200,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUB ($RUB) | The Girl in the Green Hat",
    description: "Bill is on Solana. Ben is on BNB. Robinhood needs its own guy, and girl.",
    images: ["/rub.jpg"],
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