"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { siteContent } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function CostCalculator() {
  const [scholarship, setScholarship] = useState("none");
  const [housing, setHousing] = useState("on-campus");

  const { tuition, dormOnCampus, livingOnCampus, livingOffCampus } = siteContent.costs;
  const selectedScholarship = siteContent.scholarships.find((s) => s.id === scholarship);
  const scholarshipValue = selectedScholarship?.value || 0;

  // Calculate costs
  const housingCost = housing === "on-campus" ? dormOnCampus : 0;
  const livingCost = housing === "on-campus" ? livingOnCampus : livingOffCampus;
  const totalCost = tuition + housingCost + livingCost;
  const outOfPocket = Math.max(0, totalCost - scholarshipValue);

  // Chart data
  const chartData = [
    { name: "Tuition", value: tuition, color: "#3b82f6" },
    { name: "Housing", value: housingCost, color: "#8b5cf6" },
    { name: "Living", value: livingCost, color: "#10b981" },
  ];

  const savingsData = [
    { name: "Scholarship Coverage", value: Math.min(scholarshipValue, totalCost), color: "#10b981" },
    { name: "Out of Pocket", value: outOfPocket, color: "#f59e0b" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Controls */}
      <Card className="p-8 bg-white/60 backdrop-blur-sm border-white/40 shadow-lg">
        <h3 className="text-2xl font-display font-bold mb-6">Cost Estimator</h3>

        <div className="space-y-6">
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
              {siteContent.scholarships.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-2">{selectedScholarship?.eligibility}</p>
          </div>

          {/* Housing Selector */}
          <div>
            <Label htmlFor="housing" className="text-sm font-semibold mb-2 block">
              Housing Preference
            </Label>
            <select
              id="housing"
              value={housing}
              onChange={(e) => setHousing(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              <option value="on-campus">On-Campus (Dorm)</option>
              <option value="off-campus">Off-Campus (Apartment)</option>
            </select>
          </div>

          {/* Cost Breakdown */}
          <div className="pt-6 border-t border-border/50 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tuition</span>
              <span className="font-semibold">¥{tuition.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Housing</span>
              <span className="font-semibold">¥{housingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Living Expenses</span>
              <span className="font-semibold">¥{livingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-border/50">
              <span className="font-semibold">Total Annual Cost</span>
              <span className="font-bold text-lg">¥{totalCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-primary font-semibold">Scholarship Coverage</span>
              <span className="font-bold text-primary">-¥{Math.min(scholarshipValue, totalCost).toLocaleString()}</span>
            </div>
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
                label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
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
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={savingsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
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
        </Card>
      </div>
    </div>
  );
}
