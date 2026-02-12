"use client";

import { motion } from "framer-motion";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { CostCalculator } from "@/components/features/CostCalculator";
import { ScholarshipInfoCard } from "@/components/features/ScholarshipInfoCard";
import { ScholarshipCarousel } from "@/components/features/ScholarshipCarousel";
import { PageSegue } from "@/components/ui/PageSegue";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { siteContent } from "@/lib/content";
import { localizePath } from "@/lib/i18n/path-utils";

export default function ScholarshipCostPage() {
  const { locale } = useLocale();
  const isId = locale === "id";
  const admissionsHref = localizePath("/admissions", locale);

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
            {isId ? "Beasiswa & " : "Scholarship & "}
            <span className="text-primary">{isId ? "Biaya" : "Cost"}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {isId
              ? "BIT berkomitmen membuat pendidikan teknik kelas dunia lebih terjangkau. Jelajahi pilihan beasiswa dan estimasikan biaya tahunanmu."
              : "BIT is committed to making world-class engineering education accessible. Explore available scholarships and estimate your annual investment."}
          </motion.p>
        </div>

        {/* Scholarship Information */}
        <div className="mb-24 scroll-mt-24" id="scholarships">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">{isId ? "Beasiswa" : "Scholarships"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isId
                ? "Ada beberapa program beasiswa untuk mahasiswa internasional. Lihat opsinya di bawah, lalu gunakan kalkulator untuk estimasi biaya."
                : "Multiple scholarship programs are available for international students. Explore your options below, then use the calculator to estimate your costs."}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {siteContent.scholarshipInfo.map((scholarship, idx) => (
              <ScholarshipInfoCard key={scholarship.id} scholarship={scholarship} index={idx} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <ScholarshipCarousel scholarships={siteContent.scholarshipInfo} />
          </div>
        </div>

        {/* Cost Calculator Section */}
        <div className="mb-24 scroll-mt-24" id="calculator">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">{isId ? "Kalkulator Biaya" : "Cost Calculator"}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isId
                ? "Perkirakan biaya tahunan berdasarkan pilihan beasiswa dan tempat tinggalmu."
                : "Estimate your annual investment based on your scholarship and housing preferences."}
            </p>
          </div>
          <CostCalculator />
        </div>

      </div>

      <PageSegue
        title={isId ? "Siap Mendaftar?" : "Ready to Apply?"}
        description={
          isId
            ? "Pelajari persyaratan dan timeline pendaftaran BIT."
            : "Learn about requirements and the application timeline for BIT."
        }
        buttonText={isId ? "Lihat Info Admisi" : "View Admissions Info"}
        buttonHref={admissionsHref}
      />
    </div>
  );
}
