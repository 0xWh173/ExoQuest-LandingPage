import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LegalModalProvider } from "@/shared/components/legal/LegalModalContext";
import { ToasterProvider } from "@/shared/components/ui/ToasterProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ExoQuest — Explore. Exploit. Conquer.",
    template: "%s | ExoQuest",
  },
  description:
    "ExoQuest is a next-generation CTF and cybersecurity platform with hands-on challenges, competitions, and team play.",
  applicationName: "ExoQuest",
  keywords: ["CTF", "Capture The Flag", "cybersecurity", "competitions", "ethical hacking"],
  authors: [{ name: "ExoQuest Team" }],
  creator: "ExoQuest",
  publisher: "ExoQuest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ExoQuest",
    title: "ExoQuest — Explore. Exploit. Conquer.",
    description: "Hands-on cybersecurity challenges and team competitions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExoQuest — Explore. Exploit. Conquer.",
    description: "Hands-on cybersecurity challenges and team competitions.",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#08090d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <LegalModalProvider>
          {children}
        </LegalModalProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
