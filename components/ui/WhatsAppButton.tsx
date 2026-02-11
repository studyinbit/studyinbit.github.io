"use client";

import WhatsAppIcon from "@/public/images/icons/whatsapp-icon.svg";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { siteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  size?: "sm" | "lg" | "default";
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  size = "lg",
  className,
  children,
}: WhatsAppButtonProps) {
  const { locale } = useLocale();
  const label = children ?? (locale === "id" ? "Chat via WhatsApp" : "Chat on WhatsApp");

  return (
    <Button
      size={size}
      variant="outline"
      className={cn(
        "rounded-full border bg-white hover:bg-white text-foreground font-medium transition-all duration-300 group relative overflow-hidden",
        size === "lg" && "text-lg px-8 py-7",
        size === "sm" && "px-6 py-5",
        className
      )}
      asChild
    >
      <a
        href={siteContent.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        {/* Bottom inner glow - subtle and bright */}
        <div
          className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "inset 0 -8px 12px -6px oklch(0.596 0.17 163.7 / 0.6)"
          }}
        />

        {/* Fading Green Outline - grows up on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-full border-[2.5px] border-primary transition-all duration-700 pointer-events-none",
            "opacity-15 group-hover:opacity-30", // Constant reduced opacity
            "[mask-image:linear-gradient(to_top,black,transparent)] [-webkit-mask-image:linear-gradient(to_top,black,transparent)]",
            "[mask-size:100%_25%] [-webkit-mask-size:100%_25%]", // Starts at 25% height
            "[mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]",
            "[mask-position:bottom] [-webkit-mask-position:bottom]",
            "group-hover:[mask-size:100%_55%] group-hover:[-webkit-mask-size:100%_55%]" // Crawls up to 55% on hover
          )}
        />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-6 h-6 relative z-10" />

        {/* Button Text */}
        <span className="relative z-10">{label}</span>
      </a>
    </Button>
  );
}
