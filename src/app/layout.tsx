import type { Metadata } from "next";
// We swap out 'Inter' for a chunky system UI font handled in CSS, 
// but we'll import Space Grotesk for that Web1/Comic feel
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ['400', '700' ] });

export const metadata: Metadata = {
  title: "$RUB | The Girl in the Green Hat",
  description: "ROB x RUB - Robinhood Chain. Same hat. Same Sherwood spirit.",
  icons: { icon: "/rub.jpg", apple: "/rub.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}