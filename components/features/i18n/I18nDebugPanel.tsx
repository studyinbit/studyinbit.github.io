"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  LOCALE_COOKIE_KEY,
  LOCALE_PROMPT_SEEN_KEY,
  LOCALE_PROMPT_TRIGGER_KEY,
  LOCALE_STORAGE_KEY,
  LOCALE_SWITCH_NUDGE_KEY,
} from "@/lib/i18n/config";

export function I18nDebugPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const {
    locale,
    source,
    requestShowLanguagePrompt,
    requestShowLanguageNudge,
    setLocale,
  } = useLocale();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed left-4 bottom-4 z-[90] w-[280px] rounded-2xl glass border border-border p-3 shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          I18n Debug
        </p>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => setIsOpen(false)}
          aria-label="Close i18n debug panel"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
      <p className="text-xs text-foreground mb-2">
        locale: <span className="font-semibold">{locale}</span> ({source})
      </p>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Button size="sm" variant="outline" onClick={requestShowLanguagePrompt}>
          Show Picker
        </Button>
        <Button size="sm" variant="outline" onClick={requestShowLanguageNudge}>
          Show Nudge
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Button size="sm" variant="ghost" onClick={() => setLocale("id")}>
          Force ID
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setLocale("en")}>
          Force EN
        </Button>
      </div>
      <Button
        size="sm"
        variant="destructive"
        className="w-full"
        onClick={() => {
          window.localStorage.removeItem(LOCALE_STORAGE_KEY);
          window.localStorage.removeItem(LOCALE_PROMPT_SEEN_KEY);
          window.sessionStorage.removeItem(LOCALE_PROMPT_TRIGGER_KEY);
          window.sessionStorage.removeItem(LOCALE_SWITCH_NUDGE_KEY);
          document.cookie = `${encodeURIComponent(LOCALE_COOKIE_KEY)}=; path=/; max-age=0; samesite=lax`;
        }}
      >
        Reset i18n storage
      </Button>
    </div>
  );
}
