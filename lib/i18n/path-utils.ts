import { type Locale, isLocale } from "@/lib/i18n/config";

export type StrippedPath = {
  localeInPath: Locale | null;
  cleanPath: string;
};

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "") {
    return "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (withLeadingSlash !== "/" && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1);
  }

  return withLeadingSlash;
}

export function stripLocale(pathname: string): StrippedPath {
  const normalized = normalizePathname(pathname);

  if (normalized === "/") {
    return {
      localeInPath: null,
      cleanPath: "/",
    };
  }

  const segments = normalized.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  if (first && isLocale(first)) {
    return {
      localeInPath: first,
      cleanPath: rest.length > 0 ? `/${rest.join("/")}` : "/",
    };
  }

  return {
    localeInPath: null,
    cleanPath: normalized,
  };
}

export function localizePath(pathname: string, locale: Locale): string {
  const { cleanPath } = stripLocale(pathname);

  if (cleanPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${cleanPath}`;
}

export function isInternalHref(href: string): boolean {
  return href.startsWith("/");
}
