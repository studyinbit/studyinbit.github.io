"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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

interface ScholarshipInfoProps {
  scholarship: {
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
  };
  index: number;
}

export function ScholarshipInfoCard({ scholarship, index }: ScholarshipInfoProps) {
  const { locale } = useLocale();
  const labels = getScholarshipUiLabels(locale);
  const localized = localizeScholarshipInfo(scholarship, locale);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col"
    >
      {/* Program type */}
      <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
        {localized.program}
      </p>

      {/* Title */}
      <h3 className="text-xl font-display font-bold mb-1">{localized.name}</h3>
      {localized.subtitle && (
        <p className="text-sm text-muted-foreground mb-3">{localized.subtitle}</p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {scholarship.campus === "beijing" && <Badge variant="outline">{labels.beijingCampus}</Badge>}
        {scholarship.campus === "zhuhai" && <Badge variant="outline">{labels.zhuhaiCampus}</Badge>}
        {scholarship.campus === "both" && <Badge variant="secondary">{labels.allCampuses}</Badge>}
        {scholarship.languageRestriction === "chinese-only" && (
          <Badge variant="destructive">{labels.chineseOnly}</Badge>
        )}
        {scholarship.deadline && (
          <Badge variant="default">{labels.deadlinePrefix}: {scholarship.deadline}</Badge>
        )}
        {scholarship.applicationPeriod && (
          <Badge variant="default">{labels.applyPrefix}: {scholarship.applicationPeriod}</Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{localized.description}</p>

      {/* Tiers */}
      <div className="space-y-2 mb-5 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {labels.coverageTiers}
        </p>
        {localized.tiers.map((tier) => (
          <div key={tier.name} className="bg-primary/5 rounded-xl px-4 py-2.5">
            <span className="font-semibold text-sm text-foreground">{tier.name}</span>
            <span className="text-xs text-muted-foreground ml-2">— {tier.coverageSummary}</span>
          </div>
        ))}
      </div>

      {/* Application method */}
      <p className="text-xs text-muted-foreground mb-3">
        <span className="font-semibold text-foreground">{labels.howToApply}:</span> {localized.applicationMethod}
      </p>

      {/* Notes */}
      {localized.notes && localized.notes.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {localized.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
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
          className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline mt-auto pt-2"
        >
          {labels.learnMore} <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </motion.div>
  );
}
