import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-toggle";
import { Header } from "@/components/shared/header";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pronovo — AI Pronunciation Assessment",
  description:
    "Upload your English audio recording and receive detailed pronunciation feedback with phoneme-level analysis, powered by Azure Speech AI and Gemini.",
  keywords: [
    "pronunciation",
    "assessment",
    "English",
    "speech",
    "AI",
    "phoneme",
  ],
  authors: [{ name: "Arnav" }],
  openGraph: {
    title: "Pronovo — AI Pronunciation Assessment",
    description:
      "Get detailed pronunciation feedback with phoneme-level analysis in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <TooltipProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
