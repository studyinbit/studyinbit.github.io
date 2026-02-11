"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SquareArrowTopRight } from "@/components/ui/SquareArrowTopRight";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { isInternalHref, localizePath } from "@/lib/i18n/path-utils";

interface PageSegueProps {
  title: string;
  description: React.ReactNode;
  buttonText: string;
  buttonHref: string;
}

export function PageSegue({ title, description, buttonText, buttonHref }: PageSegueProps) {
  const { locale } = useLocale();
  const internal = isInternalHref(buttonHref);
  const resolvedHref = internal ? localizePath(buttonHref, locale) : buttonHref;

  return (
    <section className="pb-24 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        {title && <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{title}</h2>}
        {description && (
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group rounded-full px-8 py-6 text-lg bg-white text-foreground hover:bg-gray-100 hover:text-foreground shadow-lg border border-border transition-colors"
          >
            {internal ? (
              <Link href={resolvedHref} className="flex items-center gap-2">
                {buttonText}
                <SquareArrowTopRight />
              </Link>
            ) : (
              <a href={resolvedHref} className="flex items-center gap-2">
                {buttonText}
                <SquareArrowTopRight />
              </a>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
