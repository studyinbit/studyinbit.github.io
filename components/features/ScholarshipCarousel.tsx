"use client";

import { useState, useRef, useEffect, type TouchEvent } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  getScholarshipUiLabels,
  localizeScholarshipInfo,
} from "@/lib/i18n/scholarships";

interface ScholarshipTier {
  name: string;
  coverageSummary: string;
}

interface ScholarshipData {
  id: string;
  name: string;
  subtitle?: string;
  program: string;
  description: string;
  campus: "beijing" | "zhuhai" | "both";
  languageRestriction?: "chinese-only";
  deadline?: string;
  applicationPeriod?: string;
  applicationMethod: string;
  link?: string;
  tiers: ScholarshipTier[];
  notes?: string[];
}

interface ScholarshipCarouselProps {
  scholarships: ScholarshipData[];
}

const MAX_VISIBLE_TIERS = 3;

export function ScholarshipCarousel({ scholarships }: ScholarshipCarouselProps) {
  const { locale } = useLocale();
  const labels = getScholarshipUiLabels(locale);
  const [active, setActive] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [containerHeight, setContainerHeight] = useState(320);
  const sectionRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const localizedScholarships = scholarships.map((item) => localizeScholarshipInfo(item, locale));
  const activeScholarship = localizedScholarships[active];
  const isActiveExpanded = expandedId === activeScholarship.id;

  // Measure active card height to size the container
  // useEffect is necessary here: syncing container height with DOM measurement
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => setContainerHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [active, isActiveExpanded]);

  // Auto-rotate when visible and not expanded
  // useEffect is necessary: syncing with browser timer + IntersectionObserver
  useEffect(() => {
    if (!isInView || expandedId) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % scholarships.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isInView, expandedId, scholarships.length]);

  // IntersectionObserver for auto-rotate
  // useEffect is necessary: syncing with browser IntersectionObserver API
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const navigate = (dir: 1 | -1) => {
    setExpandedId(null);
    setActive((prev) => (prev + dir + scholarships.length) % scholarships.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const dist = touchStart - touchEnd;
    if (dist > 50) navigate(1);
    else if (dist < -50) navigate(-1);
  };

  const getCardClass = (index: number) => {
    const len = scholarships.length;
    if (index === active) return "translate-x-0 scale-100 opacity-100 z-20";
    if (index === (active + 1) % len)
      return "translate-x-[75%] scale-[0.78] opacity-40 z-10";
    if (index === (active - 1 + len) % len)
      return "-translate-x-[75%] scale-[0.78] opacity-40 z-10";
    return "translate-x-0 scale-[0.65] opacity-0 z-0 pointer-events-none";
  };

  const renderCardContent = (
    scholarship: ScholarshipData,
    isActive: boolean
  ) => {
    const isExpanded = expandedId === scholarship.id;
    const needsExpand = scholarship.tiers.length > MAX_VISIBLE_TIERS;
    const visibleTiers = isExpanded
      ? scholarship.tiers
      : scholarship.tiers.slice(0, MAX_VISIBLE_TIERS);

    return (
      <div
        className={`bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-4 transition-shadow duration-300 ${
          isActive ? "shadow-lg" : "shadow-sm"
        }`}
      >
        {/* Program type */}
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">
          {scholarship.program}
        </p>

        {/* Title */}
        <h3 className="text-[13px] font-display font-bold leading-tight">
          {scholarship.name}
        </h3>
        {scholarship.subtitle && (
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {scholarship.subtitle}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-1 mt-2 mb-2">
          {scholarship.campus === "beijing" && (
            <Badge
              variant="outline"
              className="text-[8px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.beijingCampus}
            </Badge>
          )}
          {scholarship.campus === "zhuhai" && (
            <Badge
              variant="outline"
              className="text-[8px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.zhuhaiCampus}
            </Badge>
          )}
          {scholarship.campus === "both" && (
            <Badge
              variant="secondary"
              className="text-[8px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.allCampuses}
            </Badge>
          )}
          {scholarship.languageRestriction === "chinese-only" && (
            <Badge
              variant="destructive"
              className="text-[8px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.chineseOnly}
            </Badge>
          )}
          {scholarship.deadline && (
            <Badge
              variant="default"
              className="text-[8px] px-1.5 py-0 h-4 leading-none"
            >
              {labels.deadlinePrefix}: {scholarship.deadline}
            </Badge>
          )}
          {scholarship.applicationPeriod && (
            <Badge
              variant="default"
              className="text-[8px] px-1.5 py-0 h-4 leading-none"
            >
              {scholarship.applicationPeriod}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2 mb-2.5">
          {scholarship.description}
        </p>

        {/* Coverage Tiers */}
        <div className="mb-2.5">
          <p className="text-[8px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {labels.coverageTiers}
          </p>
          <div className="space-y-1">
            {visibleTiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-primary/5 rounded-lg px-2.5 py-1.5"
              >
                <span className="font-semibold text-[10px] text-foreground">
                  {tier.name}
                </span>
                <span className="text-[8px] text-muted-foreground ml-1">
                  — {tier.coverageSummary}
                </span>
              </div>
            ))}
          </div>
          {needsExpand && isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedId(isExpanded ? null : scholarship.id);
              }}
              className="w-full flex items-center justify-center gap-0.5 pt-1.5 text-[10px] text-primary font-medium"
            >
              {isExpanded
                ? labels.showLess
                : labels.showMore(scholarship.tiers.length - MAX_VISIBLE_TIERS)}
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Application method */}
        <p className="text-[9px] text-muted-foreground">
          <span className="font-semibold text-foreground">{labels.howToApply}:</span>{" "}
          {scholarship.applicationMethod}
        </p>

        {/* Notes */}
        {scholarship.notes && scholarship.notes.length > 0 && (
          <ul className="mt-1.5 space-y-0.5">
            {scholarship.notes.map((note, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[9px] text-muted-foreground"
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
            className="inline-flex items-center gap-1 text-[10px] text-primary font-semibold hover:underline mt-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {labels.learnMore} <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    );
  };

  return (
    <div ref={sectionRef}>
      <div
        className="relative overflow-hidden transition-[height] duration-500 ease-out"
        style={{ height: containerHeight }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Invisible measure element — determines container height */}
        <div
          ref={measureRef}
          className="absolute top-0 left-0 right-0 mx-auto w-[80%] max-w-[300px] invisible pointer-events-none"
          aria-hidden="true"
        >
          {renderCardContent(activeScholarship, true)}
        </div>

        {/* Carousel cards */}
        {localizedScholarships.map((scholarship, index) => {
          const isActive = index === active;
          return (
            <div
              key={scholarship.id}
              className={`absolute top-0 left-0 right-0 mx-auto w-[80%] max-w-[300px] transition-all duration-500 ease-out ${getCardClass(
                index
              )}`}
              onClick={() => {
                if (!isActive) {
                  setActive(index);
                  setExpandedId(null);
                }
              }}
            >
              {renderCardContent(scholarship, isActive)}
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {localizedScholarships.map((_, idx) => (
          <button
            key={idx}
            className={`rounded-full transition-all duration-300 ${
              active === idx ? "bg-primary w-5 h-2" : "bg-primary/30 w-2 h-2"
            }`}
            onClick={() => {
              setActive(idx);
              setExpandedId(null);
            }}
            aria-label={labels.carouselDotAria(idx + 1)}
          />
        ))}
      </div>
    </div>
  );
}
