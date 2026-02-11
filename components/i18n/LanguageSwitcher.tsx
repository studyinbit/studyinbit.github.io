"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/i18n/LocaleProvider";

type LanguageSwitcherProps = {
  compact?: boolean;
  className?: string;
  align?: "start" | "center" | "end";
  respondToOpenRequests?: boolean;
};

export function LanguageSwitcher({
  compact = false,
  className,
  align = "end",
  respondToOpenRequests = false,
}: LanguageSwitcherProps) {
  const {
    locale,
    locales,
    setLocale,
    switcherOpenRequest,
    messages,
  } = useLocale();

  const [open, setOpen] = useState(false);
  const previousRequestRef = useRef(switcherOpenRequest);

  // useEffect is necessary to open the switcher in response to global nudge actions.
  useEffect(() => {
    if (!respondToOpenRequests) {
      return;
    }

    if (switcherOpenRequest !== previousRequestRef.current) {
      const frame = requestAnimationFrame(() => {
        setOpen(true);
      });
      previousRequestRef.current = switcherOpenRequest;
      return () => cancelAnimationFrame(frame);
    }
  }, [respondToOpenRequests, switcherOpenRequest]);

  const currentLocaleMeta = locales.find((item) => item.code === locale) ?? locales[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          compact ? (
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn("rounded-full", className)}
              aria-label={messages.common.changeLanguage}
            >
              <Globe className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className={cn("rounded-full gap-2 px-2.5", className)}
              aria-label={messages.common.changeLanguage}
            >
              <Image
                src={currentLocaleMeta?.flagSrc}
                alt={currentLocaleMeta?.label}
                className="w-4 h-4 rounded-full object-cover"
                width={16}
                height={16}
              />
              <span className="text-xs font-semibold tracking-wide">{currentLocaleMeta?.shortLabel}</span>
            </Button>
          )
        }
      />
      <DropdownMenuContent align={align} className="w-52">
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => {
            if (isLocale(value)) {
              setLocale(value);
            }
          }}
        >
          {locales.map((item) => (
            <DropdownMenuRadioItem key={item.code} value={item.code}>
              <Image
                src={item.flagSrc}
                alt={item.label}
                className="w-4 h-4 rounded-full object-cover"
                width={16}
                height={16}
              />
              <span>{item.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
