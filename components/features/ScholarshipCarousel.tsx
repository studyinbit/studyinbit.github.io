"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MobilePeekDeck } from "@/components/ui/MobilePeekDeck";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  getScholarshipUiLabels,
  localizeScholarshipInfo,
  type ScholarshipInfoData,
} from "@/lib/i18n/scholarships";

interface ScholarshipCarouselProps {
  scholarships: ScholarshipInfoData[];
}

const MAX_VISIBLE_TIERS = 3;

export function ScholarshipCarousel({ scholarships }: ScholarshipCarouselProps) {
  const { locale } = useLocale();
  const labels = getScholarshipUiLabels(locale);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const safeCount = scholarships?.length || 0;
  const localizedScholarships = scholarships.map((item) => localizeScholarshipInfo(item, locale));
  const normalizedActiveIndex = safeCount > 0 ? Math.min(activeIndex, safeCount - 1) : 0;
  const activeScholarship = safeCount > 0 ? localizedScholarships[normalizedActiveIndex] : null;

  const renderCardContent = (scholarship: ScholarshipInfoData, isActive: boolean) => {
    const isExpanded = expandedId === scholarship.id;
    const needsExpand = scholarship.tiers.length > MAX_VISIBLE_TIERS;
    const visibleTiers = isExpanded
      ? scholarship.tiers
      : scholarship.tiers.slice(0, MAX_VISIBLE_TIERS);

    return (
      <div
        className={`bg-white/85 backdrop-blur-md border border-white/70 rounded-[1.4rem] p-4 transition-all duration-300 ${
          isActive
            ? "shadow-[0_20px_35px_-28px_rgba(15,23,42,0.55)] ring-1 ring-primary/10"
            : "shadow-[0_14px_30px_-28px_rgba(15,23,42,0.45)]"
        }`}
      >
        {/* Program type */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">
          {scholarship.program}
        </p>

        {/* Title */}
        <h3 className="text-[15px] font-display font-bold leading-tight">
          {scholarship.name}
        </h3>
        {scholarship.subtitle && (
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {scholarship.subtitle}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-1 mt-2.5 mb-2.5">
          {scholarship.campus === "beijing" && (
            <Badge
              variant="outline"
              className="text-[9px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.beijingCampus}
            </Badge>
          )}
          {scholarship.campus === "zhuhai" && (
            <Badge
              variant="outline"
              className="text-[9px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.zhuhaiCampus}
            </Badge>
          )}
          {scholarship.campus === "both" && (
            <Badge
              variant="secondary"
              className="text-[9px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.allCampuses}
            </Badge>
          )}
          {scholarship.languageRestriction === "chinese-only" && (
            <Badge
              variant="destructive"
              className="text-[9px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.chineseOnly}
            </Badge>
          )}
          {scholarship.deadline && (
            <Badge
              variant="default"
              className="text-[9px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.deadlinePrefix}: {scholarship.deadline}
            </Badge>
          )}
          {scholarship.applicationPeriod && (
            <Badge
              variant="default"
              className="text-[9px] px-1.5 py-0 h-4 leading-none"
            >
              {scholarship.applicationPeriod}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-3 mb-3">
          {scholarship.description}
        </p>

        {/* Coverage Tiers */}
        <div className="mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            {labels.coverageTiers}
          </p>
          <div className="space-y-1.5">
            {visibleTiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-primary/5 rounded-lg px-2.5 py-2"
              >
                <span className="font-semibold text-[11px] text-foreground">
                  {tier.name}
                </span>
                <span className="text-[10px] text-muted-foreground ml-1">
                  — {tier.coverageSummary}
                </span>
              </div>
            ))}
          </div>
          {needsExpand && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedId(isExpanded ? null : scholarship.id);
              }}
              type="button"
              className="w-full flex items-center justify-center gap-0.5 pt-2 text-[11px] text-primary font-medium"
            >
              {isExpanded ? labels.showLess : labels.showMore}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Application method */}
        <p className="text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground">{labels.howToApply}:</span>{" "}
          {scholarship.applicationMethod}
        </p>

        {/* Notes */}
        {scholarship.notes && scholarship.notes.length > 0 && (
          <ul className="mt-1.5 space-y-0.5">
            {scholarship.notes.map((note, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[10px] text-muted-foreground"
              >
                <div className="w-1 h-1 rounded-full bg-primary mt-1 shrink-0" />
                {note}
              </li>
            ))}
          </ul>
        )}

        {/* External link */}
        {scholarship.link && (
          <a
            href={scholarship.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-primary font-semibold hover:underline mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {labels.learnMore} <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    );
  };

  if (safeCount === 0 || !activeScholarship) {
    return null;
  }

  return (
    <MobilePeekDeck
      items={localizedScholarships}
      ariaLabel={locale === "id" ? "Kartu beasiswa" : "Scholarship cards"}
      getItemKey={(scholarship) => scholarship.id}
      getIndicatorAriaLabel={labels.carouselDotAria}
      onActiveIndexChange={(index) => {
        setActiveIndex(index);
        setExpandedId(null);
      }}
      renderItem={(scholarship, _, isActive) => renderCardContent(scholarship, isActive)}
    />
  );
}
