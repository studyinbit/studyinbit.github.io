"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Download, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { SquareArrowTopRight } from "@/components/ui/SquareArrowTopRight";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizePath } from "@/lib/i18n/path-utils";
import Link from "next/link";

export default function AdmissionsPage() {
  const { locale } = useLocale();
  const isId = locale === "id";
  const checklist = [
    {
      id: "academic",
      category: isId ? "Akademik" : "Academic",
      items: isId
        ? ["Ijazah SMA/Sederajat", "Kemampuan Matematika & Sains", "Skor Ujian CSCA"]
        : ["High School Diploma", "Math & Science proficiency", "CSCA Exam Score"],
    },
    {
      id: "language",
      category: isId ? "Bahasa" : "Language",
      items: isId
        ? ["IELTS 6.0+ / TOEFL 80+", "Tes Duolingo 110/160 (opsional jika sudah punya IELTS)", "HSK 4 (untuk program berbahasa Mandarin)"]
        : ["IELTS 6.0+ / TOEFL 80+", "Duolingo English test 110/160 (not required if already done IELTS)", "HSK 4 (for Chinese programs)"],
    },
    {
      id: "documents",
      category: isId ? "Dokumen" : "Documents",
      items: isId
        ? ["Transkrip (terjemahan resmi)", "Salinan paspor", "Study plan / personal statement", "2 surat rekomendasi", "Form pemeriksaan kesehatan", "Surat keterangan catatan kepolisian"]
        : ["Transcripts (Translated)", "Passport Copy", "Study Plan / Personal Statement", "2 Recommendation Letters", "Physical Exam Form", "Police Clearance Certificate"],
    },
  ];

  const timeline = [
    { month: isId ? "Sep - Okt" : "Sep - Oct", title: isId ? "Persiapan" : "Preparation", desc: isId ? "Riset program, siapkan dokumen, mulai persiapan CSCA." : "Research programs, prepare documents, start CSCA prep." },
    { month: isId ? "Nov - Des" : "Nov - Dec", title: isId ? "Masa Pendaftaran" : "Application Window", desc: isId ? "Kirim aplikasi online, ikut ujian CSCA (Des/Jan)." : "Submit online application, take CSCA exam (Dec/Jan)." },
    { month: "Jan - Mar", title: isId ? "Penilaian" : "Assessment", desc: isId ? "Wawancara (jika diperlukan), review beasiswa." : "Interviews (if required), scholarship reviews." },
    { month: isId ? "Apr - Jun" : "Apr - Jun", title: isId ? "Hasil & Visa" : "Results & Visa", desc: isId ? "Letter of acceptance terbit, JW202 diterbitkan, ajukan visa pelajar (X1)." : "Offer letters sent, JW202 form issued, Apply for Student Visa (X1)." },
    { month: "Sep", title: isId ? "Registrasi" : "Enrollment", desc: isId ? "Berangkat ke Beijing, check-in asrama, orientasi." : "Fly to Beijing, dorm check-in, orientation." },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-32">
      <GradientBlob variant="warm" className="top-20 left-0 w-[600px] h-[600px] -translate-x-1/3 opacity-30" />
      <GradientBlob variant="cool" className="bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 opacity-30" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            {isId ? "Jalurmu menuju " : "Your Path to "}
            <span className="text-primary">BIT</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {isId
              ? "Persyaratan jelas. Banyak opsi beasiswa. Alur terarah dari pendaftaran sampai tiba di kampus."
              : "Clear requirements. Multiple scholarship options. A guided journey from application to arrival."}
          </motion.p>
        </div>

        {/* CRITICAL ALERT - CSCA */}
        <motion.div
          className="mb-16 md:mb-24 rounded-2xl md:rounded-3xl overflow-hidden border-l-4 md:border-l-8 border-amber-500 bg-amber-50/80 backdrop-blur-sm shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-5 md:p-12">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="bg-amber-100 p-2 md:p-3 rounded-full text-amber-600 shrink-0">
                <AlertTriangle className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-amber-900 mb-1 md:mb-2">
                  {isId ? "UPDATE PENTING: Perubahan Admisi 2026" : "CRITICAL UPDATE: 2026 Admissions Change"}
                </h2>
                <p className="text-amber-800/80 text-sm md:text-lg">
                  {isId
                    ? <><strong>China Scholastic Competency Assessment (CSCA)</strong> kini menjadi standar untuk admisi internasional dan pemeringkatan beasiswa.</>
                    : <>The <strong>China Scholastic Competency Assessment (CSCA)</strong> is now the standard for international admissions and scholarship ranking.</>}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3 md:gap-6 mt-5 md:mt-8">
              <div className="bg-white/60 p-4 md:p-6 rounded-xl md:rounded-2xl border border-amber-200/50">
                <h3 className="font-bold text-amber-900 text-sm md:text-base mb-1 md:mb-2">{isId ? "Ujiannya" : "The Exam"}</h3>
                <p className="text-xs md:text-sm text-amber-800/70">
                  {isId
                    ? "Matematika (wajib) + Fisika ATAU Kimia. Format pilihan ganda dan pemecahan masalah."
                    : "Mathematics (Mandatory) + Physics OR Chemistry. Multiple choice & problem solving."}
                </p>
              </div>
              <div className="bg-white/60 p-4 md:p-6 rounded-xl md:rounded-2xl border border-amber-200/50">
                <h3 className="font-bold text-amber-900 text-sm md:text-base mb-1 md:mb-2">{isId ? "Kenapa Penting" : "Why It Matters"}</h3>
                <p className="text-xs md:text-sm text-amber-800/70">
                  {isId
                    ? "Skor menentukan tingkat beasiswa kamu (CSC Type A vs B). Skor tinggi = cakupan lebih baik."
                    : "Scores determine your scholarship tier (CSC Type A vs B). High score = Better coverage."}
                </p>
              </div>
              <div className="bg-white/60 p-4 md:p-6 rounded-xl md:rounded-2xl border border-amber-200/50 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-amber-900 text-sm md:text-base mb-1 md:mb-2">{isId ? "Apa yang Harus Dilakukan?" : "What To Do?"}</h3>
                  <p className="text-xs md:text-sm text-amber-800/70">
                    {isId
                      ? "Fokus ke Kalkulus dan Mekanika. Unduh contoh soal di bawah."
                      : "Focus on Calculus & Mechanics. Download sample papers below."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 md:mt-8 flex flex-wrap gap-2 md:gap-4">
               <Button variant="outline" className="border-amber-200 hover:bg-amber-100 text-amber-900 text-xs md:text-sm px-3 md:px-4 py-2">
                 <Download className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" /> {isId ? "Unduh Silabus" : "Download Syllabus"}
               </Button>
               <Button variant="outline" className="border-amber-200 hover:bg-amber-100 text-amber-900 text-xs md:text-sm px-3 md:px-4 py-2">
                 <Download className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" /> {isId ? "Contoh Soal CSCA" : "Sample CSCA Papers"}
               </Button>
            </div>
          </div>
        </motion.div>

        {/* Requirements Checklist */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">{isId ? "Persyaratan" : "Requirements"}</h2>
            <p className="text-muted-foreground">
              {isId ? "Siapkan dokumen ini sebelum portal pendaftaran dibuka." : "Prepare these documents before the portal opens."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {checklist.map((group, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  {group.id === "academic" && <GraduationCap className="w-5 h-5 text-primary" />}
                  {group.id === "language" && <BookOpen className="w-5 h-5 text-primary" />}
                  {group.id === "documents" && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  {group.category}
                </h3>
                <ul className="space-y-4">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scholarship & Cost Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{isId ? "Beasiswa & Biaya" : "Scholarships & Costs"}</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {isId
              ? "Jelajahi pilihan beasiswa dan gunakan kalkulator biaya untuk estimasi pengeluaran tahunanmu."
              : "Explore available scholarships and use our cost calculator to estimate your annual investment."}
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group rounded-full px-8 py-6 text-lg bg-white text-foreground hover:bg-gray-100 hover:text-foreground shadow-lg border border-border transition-colors"
            >
              <Link href={localizePath("/scholarship-cost", locale)} className="flex items-center gap-2">
                {isId ? "Lihat Beasiswa & Kalkulator Biaya" : "View Scholarships & Cost Calculator"}
                <SquareArrowTopRight />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">{isId ? "Timeline Pendaftaran" : "Application Timeline"}</h2>
          <div className="relative max-w-3xl mx-auto">
            {/* Mobile: continuous left line */}
            <div className="md:hidden absolute left-[7px] top-2 bottom-2 w-0.5 bg-primary/20" />
            {/* Desktop: continuous center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

            {timeline.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative md:grid md:grid-cols-2 md:gap-8 ${index === timeline.length - 1 ? "" : "mb-12"}`}
              >
                {/* Mobile: left dot */}
                <div className="md:hidden absolute left-0.75 top-2 w-2.5 h-2.5 rounded-full bg-primary border-2 border-white shadow-sm z-10" />

                {/* Desktop: center dot */}
                <div className="hidden md:block absolute left-1/2 top-2 w-3 h-3 rounded-full bg-primary border-4 border-white shadow-sm -translate-x-1/2 z-10" />

                {/* Content wrapper - alternates sides on desktop */}
                <div className={`${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12 md:col-start-2"} pl-10 pt-1`}>
                  <span className="text-primary font-bold tracking-wider text-sm uppercase mb-1 block">{step.month}</span>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </div>

      {/* Ready to Start Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{isId ? "Siap Memulai?" : "Ready to Start?"}</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {isId
              ? "Bergabunglah dengan komunitas 400+ mahasiswa Indonesia di salah satu universitas teknik paling bergengsi di Tiongkok."
              : "Join a community of 400+ Indonesian students at one of China's most prestigious engineering universities."}
          </p>
          <div className="flex justify-center">
            <WhatsAppButton />
          </div>
        </div>
      </section>
    </div>
  );
}
