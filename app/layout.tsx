import type { Metadata } from "next";
import { Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackgroundEffects } from "@/components/layout/background-effects";
import { MouseSpotlight } from "@/components/layout/mouse-spotlight";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Neon Archive",
    template: "%s | Neon Archive",
  },
  description:
    "A personal technical archive exploring interfaces, systems, and ideas.",
  metadataBase: new URL("https://neonarchive.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${firaCode.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-text-primary">
        <BackgroundEffects />
        <MouseSpotlight />
        <div className="noise-overlay" />
        <SiteHeader />
        <main className="relative z-10 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
