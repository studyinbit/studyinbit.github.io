"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
        {scholarship.program}
      </p>

      {/* Title */}
      <h3 className="text-xl font-display font-bold mb-1">{scholarship.name}</h3>
      {scholarship.subtitle && (
        <p className="text-sm text-muted-foreground mb-3">{scholarship.subtitle}</p>
      )}

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {scholarship.campus === "beijing" && <Badge variant="outline">Beijing Campus</Badge>}
        {scholarship.campus === "zhuhai" && <Badge variant="outline">Zhuhai Campus</Badge>}
        {scholarship.campus === "both" && <Badge variant="secondary">All Campuses</Badge>}
        {scholarship.languageRestriction === "chinese-only" && (
          <Badge variant="destructive">Chinese-Taught Only</Badge>
        )}
        {scholarship.deadline && (
          <Badge variant="default">Deadline: {scholarship.deadline}</Badge>
        )}
        {scholarship.applicationPeriod && (
          <Badge variant="default">Apply: {scholarship.applicationPeriod}</Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{scholarship.description}</p>

      {/* Tiers */}
      <div className="space-y-2 mb-5 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Coverage Tiers
        </p>
        {scholarship.tiers.map((tier) => (
          <div key={tier.name} className="bg-primary/5 rounded-xl px-4 py-2.5">
            <span className="font-semibold text-sm text-foreground">{tier.name}</span>
            <span className="text-xs text-muted-foreground ml-2">— {tier.coverageSummary}</span>
          </div>
        ))}
      </div>

      {/* Application method */}
      <p className="text-xs text-muted-foreground mb-3">
        <span className="font-semibold text-foreground">How to apply:</span> {scholarship.applicationMethod}
      </p>

      {/* Notes */}
      {scholarship.notes && scholarship.notes.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {scholarship.notes.map((note, i) => (
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
          Learn More <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </motion.div>
  );
}
