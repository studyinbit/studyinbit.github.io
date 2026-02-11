import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { LanguageNudge } from "@/components/i18n/LanguageNudge";
import { LanguagePickerPrompt } from "@/components/i18n/LanguagePickerPrompt";
import { I18nDebugPanel } from "@/components/i18n/I18nDebugPanel";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

// Body font - Plus Jakarta Sans
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Hero font - Syne (Replacing Clash Display)
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BIT Recruitment - Beijing Institute of Technology",
  description: "Join Beijing Institute of Technology - One of China's top engineering universities. Explore programs, scholarships, and campus life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE} className={`${jakarta.variable} ${syne.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <LocaleProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <LanguageNudge />
          <LanguagePickerPrompt />
          <I18nDebugPanel />
        </LocaleProvider>
      </body>
    </html>
  );
}
