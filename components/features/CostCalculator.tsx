"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { siteContent } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

export function CostCalculator() {
  const [scholarship, setScholarship] = useState("self-funded");
  const [housingId, setHousingId] = useState("intl-4p");
  const [tuitionType, setTuitionType] = useState("english");

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
    { name: "Tuition", value: tuition, color: "#3b82f6" },
    { name: "Housing", value: housingCost, color: "#8b5cf6" },
    { name: "Living", value: livingCost, color: "#10b981" },
    { name: "Insurance", value: insuranceCost, color: "#f59e0b" },
  ].filter((d) => d.value > 0);

  const savingsData = [
    { name: "Tuition Covered", value: tuitionCovered, color: "#10b981" },
    { name: "Housing Covered", value: housingCovered, color: "#06b6d4" },
    { name: "Insurance Covered", value: insuranceCovered, color: "#8b5cf6" },
    { name: "Stipend Credit", value: stipendAnnual, color: "#22c55e" },
    { name: "Out of Pocket", value: outOfPocket, color: "#f59e0b" },
  ].filter((d) => d.value > 0);

  const coverageIndicators = [
    { label: "Tuition", covered: (cov?.tuitionPercent ?? 0) > 0, detail: cov?.tuitionPercent === 1 ? "Full" : cov?.tuitionPercent ? `${cov.tuitionPercent * 100}%` : undefined },
    { label: "Accommodation", covered: cov?.accommodation ?? false },
    { label: "Stipend", covered: (cov?.stipend ?? 0) > 0, detail: cov?.stipend ? `¥${cov.stipend}/mo` : undefined },
    { label: "Insurance", covered: cov?.insurance ?? false },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Controls */}
      <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/40 shadow-lg">
        <h3 className="text-2xl font-display font-bold mb-6">Cost Estimator</h3>

        <div className="space-y-6">
          {/* Tuition Selector */}
          <div>
            <Label htmlFor="tuition" className="text-sm font-semibold mb-2 block">
              Tuition
            </Label>
            <select
              id="tuition"
              value={tuitionType}
              onChange={(e) => setTuitionType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="english">English-Taught (¥{tuitionEnglish.toLocaleString()}/yr)</option>
              <option value="chinese">Chinese-Taught (¥{tuitionChinese.toLocaleString()}/yr)</option>
            </select>
          </div>

          {/* Scholarship Selector */}
          <div>
            <Label htmlFor="scholarship" className="text-sm font-semibold mb-2 block">
              Scholarship Type
            </Label>
            <select
              id="scholarship"
              value={scholarship}
              onChange={(e) => setScholarship(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              {Object.entries(groupedScholarships).map(([group, items]) => (
                <optgroup key={group} label={group}>
                  {items.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
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
              Housing
            </Label>
            {accommodationCovered ? (
              <>
                <div className="w-full px-4 py-3 rounded-xl border border-primary/30 bg-primary/5 text-sm font-medium">
                  International Dorm 4-Person Room (¥{coveredDormMonthly.toLocaleString()}/mo — ¥{coveredDormCost.toLocaleString()}/yr)
                </div>
                <p className="text-xs text-primary mt-2">Scholarship accommodation covers the International Dorm 4-Person Room only.</p>
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
                    {h.name} (¥{h.cost.toLocaleString()}/mo — ¥{(h.cost * 12).toLocaleString()}/yr)
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="pt-6 border-t border-border/50 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tuition</span>
              <span className="font-semibold">
                {tuitionCovered > 0 ? (
                  <>
                    <span className="line-through text-muted-foreground/50 mr-2">¥{tuition.toLocaleString()}</span>
                    <span className="text-primary">¥{tuitionOutOfPocket.toLocaleString()}</span>
                  </>
                ) : (
                  <>¥{tuition.toLocaleString()}</>
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Housing</span>
              <span className="font-semibold">
                {housingCovered > 0 ? (
                  <>
                    <span className="line-through text-muted-foreground/50 mr-2">¥{housingCost.toLocaleString()}</span>
                    <span className="text-primary">¥{housingOutOfPocket.toLocaleString()}</span>
                  </>
                ) : (
                  <>¥{housingCost.toLocaleString()}</>
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Living Expenses</span>
              <span className="font-semibold">¥{livingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Insurance</span>
              <span className="font-semibold">
                {insuranceCovered > 0 ? (
                  <>
                    <span className="line-through text-muted-foreground/50 mr-2">¥{insuranceCost.toLocaleString()}</span>
                    <span className="text-primary">¥{insuranceOutOfPocket.toLocaleString()}</span>
                  </>
                ) : (
                  <>¥{insuranceCost.toLocaleString()}</>
                )}
              </span>
            </div>
            {stipendAnnual > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-primary font-semibold">Stipend (¥{stipendMonthly.toLocaleString()}/mo × 12)</span>
                <span className="font-bold text-primary">-¥{stipendAnnual.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm pt-3 border-t border-border/50">
              <span className="font-semibold">Total Annual Cost</span>
              <span className="font-bold text-lg">¥{totalCost.toLocaleString()}</span>
            </div>
            {totalCovered > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-primary font-semibold">Total Scholarship Coverage</span>
                <span className="font-bold text-primary">-¥{Math.min(totalCovered, totalCost).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t-2 border-primary/20">
              <span className="font-bold text-lg">Your Cost Per Year</span>
              <span className="font-bold text-2xl text-primary">¥{outOfPocket.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              ≈ ${Math.round(outOfPocket / 7.2).toLocaleString()} USD (at ¥7.2/USD)
            </p>
          </div>
        </div>
      </Card>

      {/* Right: Visualizations */}
      <div className="space-y-6">
        {/* Pie Chart */}
        <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/40 shadow-lg">
          <h3 className="text-xl font-display font-bold mb-6">Cost Breakdown</h3>
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
              <Tooltip formatter={(value) => `¥${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Savings Chart */}
        <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/40 shadow-lg">
          <h3 className="text-xl font-display font-bold mb-6">Scholarship Impact</h3>
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
                <Tooltip formatter={(value) => `¥${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground text-sm">
              Select a scholarship to see its impact on your costs.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
