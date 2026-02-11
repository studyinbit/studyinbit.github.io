import { DEFAULT_LOCALE, type Locale, isLocale } from "@/lib/i18n/config";

export type LocaleSource = "saved" | "browser" | "fallback";

export type ResolveLocaleInput = {
  savedLocale?: string | null;
  browserLocales?: readonly string[];
};

export type ResolveLocaleResult = {
  locale: Locale;
  source: LocaleSource;
  browserUnsupported: boolean;
};

export function mapBrowserLocaleToSupported(tag: string): Locale | null {
  const normalized = tag.trim().toLowerCase();

  if (normalized.startsWith("id")) {
    return "id";
  }

  if (normalized.startsWith("en")) {
    return "en";
  }

  return null;
}

export function resolveLocale(input: ResolveLocaleInput): ResolveLocaleResult {
  if (input.savedLocale && isLocale(input.savedLocale)) {
    return {
      locale: input.savedLocale,
      source: "saved",
      browserUnsupported: false,
    };
  }

  const browserCandidate = (input.browserLocales ?? [])
    .map((value) => mapBrowserLocaleToSupported(value))
    .find((value): value is Locale => value !== null);

  if (browserCandidate) {
    return {
      locale: browserCandidate,
      source: "browser",
      browserUnsupported: false,
    };
  }

  return {
    locale: DEFAULT_LOCALE,
    source: "fallback",
    browserUnsupported: true,
  };
}
