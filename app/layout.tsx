import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { LanguageNudge } from "@/components/i18n/LanguageNudge";
import { LanguagePickerPrompt } from "@/components/i18n/LanguagePickerPrompt";
import { I18nDebugPanel } from "@/components/i18n/I18nDebugPanel";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_COOKIE_KEY,
  LOCALE_PROMPT_SEEN_KEY,
  LOCALE_PROMPT_TRIGGER_KEY,
  LOCALE_STORAGE_KEY,
} from "@/lib/i18n/config";

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

const LOCALE_BOOTSTRAP_SCRIPT = `
(() => {
  try {
    const supported = ${JSON.stringify(LOCALES)};
    const defaultLocale = ${JSON.stringify(DEFAULT_LOCALE)};
    const storageKey = ${JSON.stringify(LOCALE_STORAGE_KEY)};
    const cookieKey = ${JSON.stringify(LOCALE_COOKIE_KEY)};
    const promptSeenKey = ${JSON.stringify(LOCALE_PROMPT_SEEN_KEY)};
    const promptTriggerKey = ${JSON.stringify(LOCALE_PROMPT_TRIGGER_KEY)};
    const pathname = window.location.pathname || "/";

    if (pathname === "/404" || pathname === "/_not-found") {
      return;
    }

    const firstSegment = pathname.split("/").filter(Boolean)[0]?.toLowerCase() || "";
    if (supported.includes(firstSegment)) {
      return;
    }

    const parseCookie = (name) => {
      const encodedName = encodeURIComponent(name) + "=";
      const value = document.cookie
        .split("; ")
        .find((part) => part.startsWith(encodedName))
        ?.slice(encodedName.length);
      return value ? decodeURIComponent(value) : null;
    };

    const safeGetLocalStorage = (key) => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    };

    const safeSetSessionStorage = (key, value) => {
      try {
        window.sessionStorage.setItem(key, value);
      } catch {
        // Ignore restricted storage access.
      }
    };

    const readSavedLocale = () => {
      const savedFromStorage = safeGetLocalStorage(storageKey);
      if (savedFromStorage && supported.includes(savedFromStorage)) {
        return savedFromStorage;
      }

      const savedFromCookie = parseCookie(cookieKey);
      if (savedFromCookie && supported.includes(savedFromCookie)) {
        return savedFromCookie;
      }

      return null;
    };

    const mapBrowserLocale = (tag) => {
      if (!tag) {
        return null;
      }

      const normalized = String(tag).trim().toLowerCase();
      if (!normalized) {
        return null;
      }

      const base = normalized.split("-")[0];
      return supported.includes(base) ? base : null;
    };

    let resolvedLocale = readSavedLocale();
    let browserUnsupported = false;

    if (!resolvedLocale) {
      const browserLocales =
        Array.isArray(navigator.languages) && navigator.languages.length > 0
          ? navigator.languages
          : [navigator.language].filter(Boolean);

      for (const locale of browserLocales) {
        const mapped = mapBrowserLocale(locale);
        if (mapped) {
          resolvedLocale = mapped;
          break;
        }
      }

      if (!resolvedLocale) {
        resolvedLocale = defaultLocale;
        browserUnsupported = true;
      }
    }

    if (browserUnsupported && safeGetLocalStorage(promptSeenKey) !== "1") {
      safeSetSessionStorage(promptTriggerKey, "1");
    }

    const cleanPath = pathname === "/" ? "" : pathname;
    const targetPath = "/" + resolvedLocale + cleanPath;
    const targetUrl = targetPath + window.location.search + window.location.hash;
    const currentUrl = pathname + window.location.search + window.location.hash;

    if (targetUrl !== currentUrl) {
      window.location.replace(targetUrl);
    }
  } catch {
    // Fail open to avoid blocking navigation.
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE} className={`${jakarta.variable} ${syne.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased bg-background text-foreground flex flex-col min-h-screen">
        <Script id="bit-locale-bootstrap" strategy="beforeInteractive">
          {LOCALE_BOOTSTRAP_SCRIPT}
        </Script>
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
