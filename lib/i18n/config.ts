export const LOCALES = ["id", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export type LocaleMeta = {
  code: Locale;
  label: string;
  shortLabel: string;
  flagSrc: string;
  enabled: boolean;
};

export const DEFAULT_LOCALE: Locale = "id";

export const LOCALE_META: readonly LocaleMeta[] = [
  {
    code: "id",
    label: "Indonesia",
    shortLabel: "ID",
    flagSrc: "/images/flags/id.svg",
    enabled: true,
  },
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
    flagSrc: "/images/flags/en-us.svg",
    enabled: true,
  },
] as const;

export const LOCALE_STORAGE_KEY = "bit.locale";
export const LOCALE_COOKIE_KEY = "bit_locale";
export const LOCALE_PROMPT_SEEN_KEY = "bit.locale_prompt_seen";
export const LOCALE_PROMPT_TRIGGER_KEY = "bit.locale_prompt_trigger";
export const LOCALE_SWITCH_NUDGE_KEY = "bit.locale_switch_nudge";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getLocaleMeta(locale: Locale): LocaleMeta {
  const entry = LOCALE_META.find((item) => item.code === locale);
  if (!entry) {
    return LOCALE_META.find((item) => item.code === DEFAULT_LOCALE) as LocaleMeta;
  }

  return entry;
}
