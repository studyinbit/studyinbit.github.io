"use client";

import Image from "next/image";
import { Languages, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function LanguagePickerPrompt() {
  const {
    locale,
    setLocale,
    showLanguagePrompt,
    acceptCurrentLanguage,
    messages,
  } = useLocale();

  if (!showLanguagePrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Dismiss language picker"
        onClick={acceptCurrentLanguage}
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-picker-title"
        className="relative z-10 w-full max-w-[380px] rounded-3xl border border-border bg-background p-5 shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close language picker"
          onClick={acceptCurrentLanguage}
          className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="pt-1">
          <div className="inline-flex items-center gap-2 justify-center w-full">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
              <Languages className="w-4.5 h-4.5" />
            </span>
            <h2 id="language-picker-title" className="text-base font-semibold text-foreground">
              {messages.languagePrompt.title}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            variant={locale === "id" ? "default" : "outline"}
            onClick={() => setLocale("id")}
            className="h-28 rounded-xl w-full justify-center gap-2 text-base flex-col"
          >
            <span className="w-16 h-12 rounded-md overflow-hidden ring-1 ring-black/10">
              <Image src="/images/flags/id.svg" alt={messages.common.indonesian} className="w-full h-full object-cover" width={64} height={48} />
            </span>
            <span>{messages.common.indonesian}</span>
          </Button>
          <Button
            variant={locale === "en" ? "default" : "outline"}
            onClick={() => setLocale("en")}
            className="h-28 rounded-xl w-full justify-center gap-2 text-base flex-col"
          >
            <span className="w-16 h-12 rounded-md overflow-hidden ring-1 ring-black/10">
              <Image src="/images/flags/en-us.svg" alt={messages.common.english} className="w-full h-full object-cover" width={64} height={48} />
            </span>
            <span>{messages.common.english}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
