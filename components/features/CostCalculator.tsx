"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { siteContent } from "@/lib/content";
import {
  getCostCalculatorLabels,
  localizeCalculatorScholarshipGroup,
  localizeCalculatorScholarshipName,
  localizeHousingOptionName,
} from "@/lib/i18n/scholarships";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

export function CostCalculator() {
  const { locale } = useLocale();
  const [scholarship, setScholarship] = useState("self-funded");
  const [housingId, setHousingId] = useState("intl-4p");
  const [tuitionType, setTuitionType] = useState("english");
  const labels = getCostCalculatorLabels(locale);
  const numberLocale = locale === "id" ? "id-ID" : "en-US";
  const yearUnit = locale === "id" ? "/thn" : "/yr";
  const monthUnit = locale === "id" ? "/bln" : "/mo";

  const { tuitionEnglish, tuitionChinese, livingOnCampus, livingOffCampus, insurance: insuranceCost } = siteContent.costs;
  const tuition = tuitionType === "english" ? tuitionEnglish : tuitionChinese;

  const selectedHousing = siteContent.housingOptions.find((h) => h.id === housingId);

  const selected = siteContent.calculatorScholarships.find((s) => s.id === scholarship);
  const cov = selected?.coverage;

  // Group scholarships for <optgroup>
  const groupedScholarships = useMemo(() => {
    const groups: Record<string, typeof siteContent.calculatorScholarships> = {};
    for (const s of siteContent.calculatorScholarships) {
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(s);
    }
    return groups;
  }, []);

  // Itemized calculations
  const tuitionCovered = tuition * (cov?.tuitionPercent ?? 0);
  const tuitionOutOfPocket = tuition - tuitionCovered;

  // Scholarship accommodation only covers International Dorm 4-Person Room
  // Housing costs are monthly — multiply by 12 for annual totals
  const coveredDormMonthly = siteContent.housingOptions.find((h) => h.id === "intl-4p")?.cost ?? 0;
  const coveredDormCost = coveredDormMonthly * 12;
  const accommodationCovered = cov?.accommodation ?? false;
  const effectiveHousing = accommodationCovered
    ? siteContent.housingOptions.find((h) => h.id === "intl-4p")
    : selectedHousing;
  const isOnCampus = effectiveHousing?.type === "on-campus";
  const housingCost = (effectiveHousing?.cost ?? 0) * 12;
  const housingCovered = accommodationCovered ? coveredDormCost : 0;
  const housingOutOfPocket = housingCost - housingCovered;

  const livingCost = isOnCampus ? livingOnCampus : livingOffCampus;

  const insuranceCovered = cov?.insurance ? insuranceCost : 0;
  const insuranceOutOfPocket = insuranceCost - insuranceCovered;

  const stipendMonthly = cov?.stipend ?? 0;
  const stipendAnnual = stipendMonthly * 12;

  const totalCost = tuition + housingCost + livingCost + insuranceCost;
  const totalCovered = tuitionCovered + housingCovered + insuranceCovered + stipendAnnual;
  const outOfPocket = Math.max(0, totalCost - totalCovered);

  // Chart data
  const chartData = [
    { name: labels.tuition, value: tuition, color: "#3b82f6" },
    { name: labels.housing, value: housingCost, color: "#8b5cf6" },
    { name: labels.livingExpenses, value: livingCost, color: "#10b981" },
    { name: labels.insurance, value: insuranceCost, color: "#f59e0b" },
  ].filter((d) => d.value > 0);

  const savingsData = [
    { name: labels.tuitionCovered, value: tuitionCovered, color: "#10b981" },
    { name: labels.housingCovered, value: housingCovered, color: "#06b6d4" },
    { name: labels.insuranceCovered, value: insuranceCovered, color: "#8b5cf6" },
    { name: labels.stipendCredit, value: stipendAnnual, color: "#22c55e" },
    { name: labels.outOfPocket, value: outOfPocket, color: "#f59e0b" },
  ].filter((d) => d.value > 0);

  const coverageIndicators = [
    {
      label: labels.coverageIndicators.tuition,
      covered: (cov?.tuitionPercent ?? 0) > 0,
      detail:
        cov?.tuitionPercent === 1
          ? labels.coverageIndicators.full
          : cov?.tuitionPercent
            ? `${cov.tuitionPercent * 100}%`
            : undefined,
    },
    { label: labels.coverageIndicators.accommodation, covered: cov?.accommodation ?? false },
    {
      label: labels.coverageIndicators.stipend,
      covered: (cov?.stipend ?? 0) > 0,
      detail: cov?.stipend ? `¥${cov.stipend}/${monthUnit.replace("/", "")}` : undefined,
    },
    { label: labels.coverageIndicators.insurance, covered: cov?.insurance ?? false },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Controls */}
      <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/40 shadow-lg">
        <h3 className="text-2xl font-display font-bold mb-6">{labels.costEstimator}</h3>

        <div className="space-y-6">
          {/* Tuition Selector */}
          <div>
            <Label htmlFor="tuition" className="text-sm font-semibold mb-2 block">
              {labels.tuition}
            </Label>
            <select
              id="tuition"
              value={tuitionType}
              onChange={(e) => setTuitionType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="english">{labels.tuitionEnglishLabel} (¥{tuitionEnglish.toLocaleString(numberLocale)}{yearUnit})</option>
              <option value="chinese">{labels.tuitionChineseLabel} (¥{tuitionChinese.toLocaleString(numberLocale)}{yearUnit})</option>
            </select>
          </div>

          {/* Scholarship Selector */}
          <div>
            <Label htmlFor="scholarship" className="text-sm font-semibold mb-2 block">
              {labels.scholarshipType}
            </Label>
            <select
              id="scholarship"
              value={scholarship}
              onChange={(e) => setScholarship(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              {Object.entries(groupedScholarships).map(([group, items]) => (
                <optgroup key={group} label={localizeCalculatorScholarshipGroup(group, locale)}>
                  {items.map((s) => (
                    <option key={s.id} value={s.id}>
                      {localizeCalculatorScholarshipName(s.id, s.name, locale)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            {/* Coverage indicators */}
            <div className="flex flex-wrap gap-2 mt-3">
              {coverageIndicators.map((ind) => (
                <span
                  key={ind.label}
                  className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${
                    ind.covered
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-muted/50 border-border text-muted-foreground"
                  }`}
                >
                  {ind.covered ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {ind.label}
                  {ind.covered && ind.detail && <span className="text-[10px] opacity-70">({ind.detail})</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Housing Selector */}
          <div>
            <Label htmlFor="housing" className="text-sm font-semibold mb-2 block">
              {labels.housing}
            </Label>
            {accommodationCovered ? (
              <>
                <div className="w-full px-4 py-3 rounded-xl border border-primary/30 bg-primary/5 text-sm font-medium">
                  {labels.intlDormCoveredLabel} (¥{coveredDormMonthly.toLocaleString(numberLocale)}{monthUnit} — ¥{coveredDormCost.toLocaleString(numberLocale)}{yearUnit})
                </div>
                <p className="text-xs text-primary mt-2">{labels.accommodationCoveredNote}</p>
              </>
            ) : (
              <select
                id="housing"
                value={housingId}
                onChange={(e) => setHousingId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              >
                {siteContent.housingOptions.map((h) => (
                  <option key={h.id} value={h.id}>
                    {localizeHousingOptionName(h.id, h.name, locale)} (¥{h.cost.toLocaleString(numberLocale)}{monthUnit} — ¥{(h.cost * 12).toLocaleString(numberLocale)}{yearUnit})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="pt-6 border-t border-border/50 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{labels.tuition}</span>
              <span className="font-semibold">
                {tuitionCovered > 0 ? (
                  <>
                    <span className="line-through text-muted-foreground/50 mr-2">¥{tuition.toLocaleString(numberLocale)}</span>
                    <span className="text-primary">¥{tuitionOutOfPocket.toLocaleString(numberLocale)}</span>
                  </>
                ) : (
                  <>¥{tuition.toLocaleString(numberLocale)}</>
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{labels.housing}</span>
              <span className="font-semibold">
                {housingCovered > 0 ? (
                  <>
                    <span className="line-through text-muted-foreground/50 mr-2">¥{housingCost.toLocaleString(numberLocale)}</span>
                    <span className="text-primary">¥{housingOutOfPocket.toLocaleString(numberLocale)}</span>
                  </>
                ) : (
                  <>¥{housingCost.toLocaleString(numberLocale)}</>
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{labels.livingExpenses}</span>
              <span className="font-semibold">¥{livingCost.toLocaleString(numberLocale)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{labels.insurance}</span>
              <span className="font-semibold">
                {insuranceCovered > 0 ? (
                  <>
                    <span className="line-through text-muted-foreground/50 mr-2">¥{insuranceCost.toLocaleString(numberLocale)}</span>
                    <span className="text-primary">¥{insuranceOutOfPocket.toLocaleString(numberLocale)}</span>
                  </>
                ) : (
                  <>¥{insuranceCost.toLocaleString(numberLocale)}</>
                )}
              </span>
            </div>
            {stipendAnnual > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-primary font-semibold">{labels.stipend} (¥{stipendMonthly.toLocaleString(numberLocale)}{monthUnit} × 12)</span>
                <span className="font-bold text-primary">-¥{stipendAnnual.toLocaleString(numberLocale)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm pt-3 border-t border-border/50">
              <span className="font-semibold">{labels.totalAnnualCost}</span>
              <span className="font-bold text-lg">¥{totalCost.toLocaleString(numberLocale)}</span>
            </div>
            {totalCovered > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-primary font-semibold">{labels.totalScholarshipCoverage}</span>
                <span className="font-bold text-primary">-¥{Math.min(totalCovered, totalCost).toLocaleString(numberLocale)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t-2 border-primary/20">
              <span className="font-bold text-lg">{labels.yourCostPerYear}</span>
              <span className="font-bold text-2xl text-primary">¥{outOfPocket.toLocaleString(numberLocale)}</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              {labels.usdApproxLabel}: ${Math.round(outOfPocket / 7.2).toLocaleString(numberLocale)} USD (¥7.2/USD)
            </p>
          </div>
        </div>
      </Card>

      {/* Right: Visualizations */}
      <div className="space-y-6">
        {/* Pie Chart */}
        <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/40 shadow-lg">
          <h3 className="text-xl font-display font-bold mb-6">{labels.costBreakdown}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) => `${name || ""} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `¥${Number(value).toLocaleString(numberLocale)}`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Savings Chart */}
        <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/40 shadow-lg">
          <h3 className="text-xl font-display font-bold mb-6">{labels.scholarshipImpact}</h3>
          {savingsData.length > 1 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={savingsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name || ""} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {savingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `¥${Number(value).toLocaleString(numberLocale)}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
              {labels.selectScholarshipHint}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
