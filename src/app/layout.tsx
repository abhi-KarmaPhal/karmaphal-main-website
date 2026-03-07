import type { Metadata } from "next";
import { Cinzel, Gotu, Fira_Code } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700", "900"],
});

const gotu = Gotu({
  subsets: ["latin"],
  variable: "--font-gotu",
  weight: ["400"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Karmaphal | The Sovereign Monolith",
  description: "Private Digital House. Architectural Sovereignty.",
};

import CustomCursor from "@/components/CustomCursor";
import CursorGlow from "@/components/CursorGlow";
import DivineTorch from "@/components/DivineTorch";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${gotu.variable} ${firaCode.variable}`}>
      <body className="bg-obsidian antialiased">
        <CustomCursor />
        <CursorGlow />
        <DivineTorch />
        <main>{children}</main>
      </body>
    </html>
  );
}
