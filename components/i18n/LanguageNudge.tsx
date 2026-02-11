"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Languages, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LOCALE_SWITCH_NUDGE_KEY, type Locale, isLocale } from "@/lib/i18n/config";
import { useLocale } from "@/components/i18n/LocaleProvider";

type LocaleSwitchNudgePayload = {
  from: Locale;
  to: Locale;
};

function readNudgePayload(): LocaleSwitchNudgePayload | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(LOCALE_SWITCH_NUDGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as { from?: string; to?: string };
    if (!parsed.from || !parsed.to || !isLocale(parsed.from) || !isLocale(parsed.to)) {
      window.sessionStorage.removeItem(LOCALE_SWITCH_NUDGE_KEY);
      return null;
    }

    return {
      from: parsed.from,
      to: parsed.to,
    };
  } catch {
    window.sessionStorage.removeItem(LOCALE_SWITCH_NUDGE_KEY);
    return null;
  }
}

export function LanguageNudge() {
  const { locale, setLocale, messages, nudgeOpenRequest } = useLocale();
  const [visible, setVisible] = useState(false);
  const previousRequestRef = useRef(nudgeOpenRequest);

  // useEffect is required to read one-time nudge state from sessionStorage.
  useEffect(() => {
    const payload = readNudgePayload();
    if (!payload) {
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 0);

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(LOCALE_SWITCH_NUDGE_KEY);
    }

    return () => window.clearTimeout(timer);
  }, []);

  // useEffect is required to react to explicit "show nudge" requests from debug tools.
  useEffect(() => {
    if (nudgeOpenRequest === previousRequestRef.current) {
      return;
    }

    previousRequestRef.current = nudgeOpenRequest;
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [nudgeOpenRequest]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[360px] z-[70] rounded-2xl border border-border bg-white/95 backdrop-blur-md p-4 shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary">
            <Languages className="w-4 h-4" />
          </span>
          <p className="text-sm font-semibold text-foreground">{messages.common.changeLanguage}</p>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => setVisible(false)}
          aria-label={messages.languageNudge.dismiss}
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={locale === "id" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setLocale("id");
            setVisible(false);
          }}
          className="h-20 rounded-xl justify-center gap-1.5 flex-col"
        >
          <span className="w-10 h-7 rounded-md overflow-hidden ring-1 ring-black/10">
            <Image src="/images/flags/id.svg" alt={messages.common.indonesian} width={40} height={28} className="w-full h-full object-cover" />
          </span>
          <span>{messages.common.indonesian}</span>
        </Button>
        <Button
          variant={locale === "en" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setLocale("en");
            setVisible(false);
          }}
          className="h-20 rounded-xl justify-center gap-1.5 flex-col"
        >
          <span className="w-10 h-7 rounded-md overflow-hidden ring-1 ring-black/10">
            <Image src="/images/flags/en-us.svg" alt={messages.common.english} width={40} height={28} className="w-full h-full object-cover" />
          </span>
          <span>{messages.common.english}</span>
        </Button>
      </div>
    </div>
  );
}
