import type { Metadata } from "next";
import { Libre_Baskerville, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayoutContent from "@/components/ClientLayoutContent";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Kunjung Admin",
  description: "Kunjung admin dashboard for villa & reservation management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased bg-[#FAF8F3] text-[#1E1E1E]">
        {children}
      </body>
    </html>
  );
}
