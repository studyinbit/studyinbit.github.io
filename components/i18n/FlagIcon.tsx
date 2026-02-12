import IndonesianFlag from "@/public/images/flags/id.svg";
import UnitedStatesFlag from "@/public/images/flags/en-us.svg";
import { type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type FlagIconProps = {
  locale: Locale;
  className?: string;
  title?: string;
};

const FLAG_MAP = {
  id: {
    component: IndonesianFlag,
    viewBox: "0 0 64 48",
  },
  en: {
    component: UnitedStatesFlag,
    viewBox: "0 0 64 48",
  },
} as const;

export function FlagIcon({ locale, className, title }: FlagIconProps) {
  const { component: Flag, viewBox } = FLAG_MAP[locale];

  return (
    <Flag
      className={cn("inline-block", className)}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable={false}
    />
  );
}
