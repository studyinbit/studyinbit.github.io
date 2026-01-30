"use client";

import { Button } from "@/components/ui/button";
import { SquareArrowTopRight } from "@/components/ui/SquareArrowTopRight";

interface PageSegueProps {
  title: string;
  description: React.ReactNode;
  buttonText: string;
  buttonHref: string;
}

export function PageSegue({ title, description, buttonText, buttonHref }: PageSegueProps) {
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
            <a href={buttonHref} className="flex items-center gap-2">
              {buttonText}
              <SquareArrowTopRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
