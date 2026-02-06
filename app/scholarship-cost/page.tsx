"use client";

import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { CostCalculator } from "@/components/features/CostCalculator";
import { ScholarshipInfoCard } from "@/components/features/ScholarshipInfoCard";
import { PageSegue } from "@/components/ui/PageSegue";
import { siteContent } from "@/lib/content";

export default function ScholarshipCostPage() {
  return (
    <div className="relative overflow-hidden min-h-screen pt-32">
      <GradientBlob variant="warm" className="top-20 left-0 w-[600px] h-[600px] -translate-x-1/3 opacity-30" />
      <GradientBlob variant="cool" className="bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 opacity-30" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Hero */}
        <div className="text-center max-w-3xl mt-28 mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Scholarship & <span className="text-primary">Cost</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            BIT is committed to making world-class engineering education accessible. Explore available scholarships and estimate your annual investment.
          </motion.p>
        </div>

        {/* Scholarship Information */}
        <div className="mb-24 scroll-mt-24" id="scholarships">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Scholarships</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple scholarship programs are available for international students. Explore your options below, then use the calculator to estimate your costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {siteContent.scholarshipInfo.map((scholarship, idx) => (
              <ScholarshipInfoCard key={scholarship.id} scholarship={scholarship} index={idx} />
            ))}
          </div>
        </div>

        {/* Cost Calculator Section */}
        <div className="mb-24 scroll-mt-24" id="calculator">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Cost Calculator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estimate your annual investment based on your scholarship and housing preferences.
            </p>
          </div>
          <CostCalculator />
        </div>

      </div>

      <PageSegue
        title="Ready to Apply?"
        description="Learn about requirements and the application timeline for BIT."
        buttonText="View Admissions Info"
        buttonHref="/admissions"
      />
    </div>
  );
}
