"use client";

import Image from "next/image";
import { Languages, X } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
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

  return (
    <AlertDialog
      open={showLanguagePrompt}
      onOpenChange={(open) => {
        if (!open) {
          acceptCurrentLanguage();
        }
      }}
    >
      <AlertDialogContent size="sm" className="max-w-[380px] rounded-3xl p-5">
        <button
          type="button"
          aria-label="Close language picker"
          onClick={acceptCurrentLanguage}
          className="absolute top-3 right-3 p-1.5 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <AlertDialogHeader className="pt-1">
          <div className="inline-flex items-center gap-2 justify-center">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
              <Languages className="w-4.5 h-4.5" />
            </span>
            <AlertDialogTitle>{messages.languagePrompt.title}</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-3 bg-transparent border-0 -mx-0 -mb-0 p-0 mt-3">
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
