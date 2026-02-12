"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_KEY,
  LOCALE_META,
  LOCALE_PROMPT_SEEN_KEY,
  LOCALE_PROMPT_TRIGGER_KEY,
  LOCALE_STORAGE_KEY,
  LOCALE_SWITCH_NUDGE_KEY,
  type Locale,
  isLocale,
} from "@/lib/i18n/config";
import { localizePath, stripLocale } from "@/lib/i18n/path-utils";
import { resolveLocale, type LocaleSource } from "@/lib/i18n/resolve-locale";
import { enMessages, type Messages } from "@/lib/i18n/messages/en";
import { idMessages } from "@/lib/i18n/messages/id";

type LocaleContextValue = {
  locale: Locale;
  source: LocaleSource;
  browserUnsupported: boolean;
  messages: Messages;
  locales: typeof LOCALE_META;
  switcherOpenRequest: number;
  nudgeOpenRequest: number;
  showLanguagePrompt: boolean;
  setLocale: (nextLocale: Locale) => void;
  requestOpenSwitcher: () => void;
  requestShowLanguagePrompt: () => void;
  requestShowLanguageNudge: () => void;
  dismissLanguagePrompt: () => void;
  acceptCurrentLanguage: () => void;
};

const MESSAGE_REGISTRY: Record<Locale, Messages> = {
  en: enMessages,
  id: idMessages,
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const encodedName = `${encodeURIComponent(name)}=`;
  const value = document.cookie
    .split("; ")
    .find((part) => part.startsWith(encodedName))
    ?.slice(encodedName.length);

  return value ? decodeURIComponent(value) : null;
}

function writeCookie(name: string, value: string): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}

function readSavedLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  let localStorageValue: string | null = null;
  try {
    localStorageValue = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  } catch {
    localStorageValue = null;
  }

  if (localStorageValue && isLocale(localStorageValue)) {
    return localStorageValue;
  }

  const cookieValue = readCookie(LOCALE_COOKIE_KEY);
  if (cookieValue && isLocale(cookieValue)) {
    return cookieValue;
  }

  return null;
}

function writeSavedLocale(locale: Locale): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable in strict browser modes.
  }
  writeCookie(LOCALE_COOKIE_KEY, locale);
}

function readPromptSeen(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    return window.localStorage.getItem(LOCALE_PROMPT_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function writePromptSeen(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(LOCALE_PROMPT_SEEN_KEY, "1");
  } catch {
    // Ignore storage failures and continue with in-memory state.
  }

  try {
    window.sessionStorage.removeItem(LOCALE_PROMPT_TRIGGER_KEY);
  } catch {
    // Session storage can also be restricted.
  }
}

function consumePromptTrigger(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  let shouldPrompt = false;
  try {
    shouldPrompt = window.sessionStorage.getItem(LOCALE_PROMPT_TRIGGER_KEY) === "1";
    if (shouldPrompt) {
      window.sessionStorage.removeItem(LOCALE_PROMPT_TRIGGER_KEY);
    }
  } catch {
    shouldPrompt = false;
  }

  return shouldPrompt;
}

function readSessionStorageItem(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionStorageItem(key: string, value: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Session storage may be unavailable in restricted/private modes.
  }
}

function shouldSkipLocaleRedirect(pathname: string): boolean {
  return pathname === "/_not-found" || pathname === "/404";
}

function readCurrentUrlSuffix(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.search}${window.location.hash}`;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [source, setSource] = useState<LocaleSource>("fallback");
  const [browserUnsupported, setBrowserUnsupported] = useState(false);
  const [showLanguagePrompt, setShowLanguagePrompt] = useState(false);
  const [switcherOpenRequest, setSwitcherOpenRequest] = useState(0);
  const [nudgeOpenRequest, setNudgeOpenRequest] = useState(0);

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      const { cleanPath } = stripLocale(pathname);
      const target = localizePath(cleanPath, nextLocale);

      writeSavedLocale(nextLocale);
      writePromptSeen();

      setLocaleState(nextLocale);
      setSource("saved");
      setBrowserUnsupported(false);
      setShowLanguagePrompt(false);

      if (typeof document !== "undefined") {
        document.documentElement.lang = nextLocale;
      }

      if (target !== pathname) {
        router.replace(`${target}${readCurrentUrlSuffix()}`);
      }
    },
    [pathname, router]
  );

  const requestOpenSwitcher = useCallback(() => {
    setSwitcherOpenRequest((prev) => prev + 1);
  }, []);

  const requestShowLanguagePrompt = useCallback(() => {
    setShowLanguagePrompt(true);
  }, []);

  const requestShowLanguageNudge = useCallback(() => {
    setNudgeOpenRequest((prev) => prev + 1);
  }, []);

  const dismissLanguagePrompt = useCallback(() => {
    writeSavedLocale(locale);
    writePromptSeen();
    setSource("saved");
    setBrowserUnsupported(false);
    setShowLanguagePrompt(false);
  }, [locale]);

  const acceptCurrentLanguage = useCallback(() => {
    writeSavedLocale(locale);
    writePromptSeen();

    setSource("saved");
    setBrowserUnsupported(false);
    setShowLanguagePrompt(false);

    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  // useEffect is required to reconcile client-only locale preference with the current URL.
  useEffect(() => {
    const { localeInPath, cleanPath } = stripLocale(pathname);

    if (shouldSkipLocaleRedirect(cleanPath)) {
      return;
    }

    const savedLocale = readSavedLocale();
    const browserLocales = typeof navigator !== "undefined" ? navigator.languages : [];
    const resolved = resolveLocale({
      savedLocale,
      browserLocales,
    });
    const savedLocaleValid = savedLocale;
    const activeLocale = localeInPath ?? resolved.locale;
    const promptedByBootstrap = consumePromptTrigger();
    const browserUnsupportedActive =
      promptedByBootstrap || (!localeInPath && resolved.browserUnsupported);

    if (typeof document !== "undefined") {
      document.documentElement.lang = activeLocale;
    }

    const shouldShowPrompt =
      !readPromptSeen() &&
      (promptedByBootstrap ||
        (!localeInPath && resolved.browserUnsupported && resolved.source !== "saved"));
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      setLocaleState(activeLocale);
      setSource(localeInPath ? "url" : resolved.source);
      setBrowserUnsupported(browserUnsupportedActive);
      setShowLanguagePrompt(shouldShowPrompt);
    });

    if (!localeInPath) {
      const target = localizePath(cleanPath, resolved.locale);
      if (target !== pathname) {
        router.replace(`${target}${readCurrentUrlSuffix()}`);
      }
    } else if (savedLocaleValid && localeInPath !== savedLocaleValid) {
      const nudgeSeenKey = `${LOCALE_SWITCH_NUDGE_KEY}.seen.${localeInPath}.${savedLocaleValid}`;
      if (readSessionStorageItem(nudgeSeenKey) === "1") {
        return () => {
          cancelled = true;
        };
      }

      writeSessionStorageItem(nudgeSeenKey, "1");
      writeSessionStorageItem(
        LOCALE_SWITCH_NUDGE_KEY,
        JSON.stringify({ from: localeInPath, to: savedLocaleValid })
      );
      const timer = window.setTimeout(() => {
        setNudgeOpenRequest((prev) => prev + 1);
      }, 0);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  const messages = useMemo(() => {
    const selected = MESSAGE_REGISTRY[locale];

    if (!selected) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Missing messages for locale '${locale}', falling back to '${DEFAULT_LOCALE}'.`);
      }

      return MESSAGE_REGISTRY[DEFAULT_LOCALE];
    }

    return selected;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      source,
      browserUnsupported,
      messages,
      locales: LOCALE_META,
      switcherOpenRequest,
      nudgeOpenRequest,
      showLanguagePrompt,
      setLocale,
      requestOpenSwitcher,
      requestShowLanguagePrompt,
      requestShowLanguageNudge,
      dismissLanguagePrompt,
      acceptCurrentLanguage,
    }),
    [
      acceptCurrentLanguage,
      browserUnsupported,
      dismissLanguagePrompt,
      locale,
      messages,
      nudgeOpenRequest,
      requestOpenSwitcher,
      requestShowLanguageNudge,
      requestShowLanguagePrompt,
      setLocale,
      showLanguagePrompt,
      source,
      switcherOpenRequest,
    ]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider.");
  }

  return context;
}
