"use client";

import { motion } from "framer-motion";
import { BlurImage } from "@/components/ui/blur-image";
import { TrendingUp, Shield, Award, Zap } from "lucide-react";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { siteContent } from "@/lib/content";

// Static Image Imports
import heroImg1 from "@/public/images/uni/IMG_20251101_124832167.CCD.webp";
import heroImg2 from "@/public/images/uni/IMG_20250914_190338764.CCD.NIGHT.webp";
import heroImg3 from "@/public/images/uni/IMG_20251213_102035090.CCD.webp";
import heroImg4 from "@/public/images/uni/IMG_20251207_121823829.CCD.webp";
import shanghaiImg from "@/public/images/shanghai.webp";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Metrics data for responsive rendering (ordered by best ranking first)
  const metricsData = [
    {
      metric: "QS Graduate Employability",
      rankValue: "9",
      rankSuffix: "th",
      rankColor: "emerald",
      insightTitle: "The ROI Metric.",
      insightDescription: "BIT graduates are valued higher by employers than graduates from \"higher ranked\" but less practical universities."
    },
    {
      metric: "NTU Ranking (Engineering)",
      rankValue: "14",
      rankSuffix: "th",
      rankColor: "emerald",
      insightTitle: "The Truth.",
      insightDescription: "In pure engineering output, BIT is a global top-15 institution, outranking many Ivy League schools."
    },
    {
      metric: "ARWU (Shanghai Ranking) 2025",
      rankValue: "102",
      rankSuffix: "nd",
      rankColor: "default",
      insightTitle: "The Hard Science Metric.",
      insightDescription: "Being on the cusp of the Top 100 globally signals immense research productivity."
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated Breathing Background Blobs */}
      <GradientBlob variant="cool" className="top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <GradientBlob variant="warm" className="top-[20%] right-0 w-[600px] h-[600px] translate-x-1/3 opacity-30" delay={2} />
      <GradientBlob variant="accent" className="bottom-0 left-1/4 w-[400px] h-[400px] opacity-20" delay={4} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-22 md:pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start text-left z-10 relative"
            >
              <motion.div variants={itemVariants} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-sm text-sm font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Free Consultation
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-8 leading-[1.2] pb-2"
              >
                BIT <br />
                <span className="text-primary text">The Future of Engineering</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
              >
                {siteContent.hero.subtitle}
              </motion.p>

              <motion.div variants={itemVariants} className="w-full">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Ranking by Subject <span className="text-muted-foreground/50">(Source: QS Ranking)</span></p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {siteContent.stats.map((stat, index) => (
                    <div key={index} className="text-left">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-2xl md:text-3xl font-semibold tabular-nums text-foreground">
                          {stat.value}
                        </span>
                        <span className="text-sm font-medium text-primary">{stat.suffix}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual Grid */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="relative h-[600px] hidden lg:block"
            >
               <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-gradient-cool rounded-[2rem] opacity-10 blur-3xl" />
               <div className="grid grid-cols-2 gap-4 h-full p-4 relative">
                  <div className="space-y-4 pt-12">
                     <div className="h-64 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                        <BlurImage src={heroImg1} alt="Campus Life" placeholder="blur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                     <div className="h-48 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                        <BlurImage src={heroImg2} alt="Campus Night" placeholder="blur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="h-48 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                        <BlurImage src={heroImg3} alt="Students" placeholder="blur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                     <div className="h-64 rounded-2xl overflow-hidden shadow-lg border border-white/20 relative group">
                        <BlurImage src={heroImg4} alt="Library" placeholder="blur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>



      <section className="py-12 px-6 relative">
        <div className="container mx-auto max-w-6xl">

          {/* The Seven Sons Explanation */}
          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-2">The Funding Engine</h3>
                    <p className="text-muted-foreground">
                      While other universities struggle for grants, BIT&apos;s labs are capitalized by the state&apos;s most critical projects. This ensures priority in aerospace, high-end manufacturing, and national security research.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-2">&quot;Double First-Class&quot; Status</h3>
                    <p className="text-muted-foreground">
                      BIT is designated as a Class A &quot;Double First-Class&quot; university. This is the gold standard, placing you at the forefront of China&apos;s push to become a science and technology superpower.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden flex items-center justify-center border border-white/50 shadow-inner"
            >
              <div className="absolute inset-0">
                <BlurImage
                  src={heroImg1}
                  alt="BIT Campus"
                  fill
                  className="object-cover opacity-80"
                  placeholder="blur"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 z-10">
                <p className="text-white font-bold text-2xl">Research Priority</p>
                <p className="text-white/80">Aerospace & Defense Engineering</p>
              </div>
            </motion.div>
          </div>

          {/* Rankings Table */}
          <div className="mb-24">
            <div className="text-center mb-8">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                Global Recognition <span className="text-muted-foreground/50">(Multiple Rankings)</span>
              </p>
              <h2 className="text-3xl font-display font-bold mb-4">Other Metrics</h2>
            </div>

            {/* Mobile Card Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="block sm:hidden space-y-6"
            >
              {metricsData.map((metric, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-sm">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl md:text-4xl font-semibold font-display tabular-nums text-foreground">
                      {metric.rankValue}
                    </span>
                    <span className={`text-sm font-medium ${metric.rankColor === 'emerald' ? 'text-emerald-600' : 'text-primary'}`}>
                      {metric.rankSuffix}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {metric.metric}
                  </p>
                  <h3 className="font-bold text-foreground mb-2">
                    {metric.insightTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {metric.insightDescription}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Desktop Table Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="hidden sm:block overflow-hidden rounded-3xl border border-border bg-white/40 backdrop-blur-sm shadow-xl"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/50 border-b border-border/50">
                    <th className="p-6 font-display font-bold text-foreground">Metric</th>
                    <th className="p-6 font-display font-bold text-primary">Rank</th>
                    <th className="p-6 font-display font-bold text-foreground">Strategic Insight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {metricsData.map((metric, index) => (
                    <tr key={index} className="hover:bg-white/40 transition-colors">
                      <td className="p-6 font-medium">{metric.metric}</td>
                      <td className={`p-6 font-bold text-xl ${metric.rankColor === 'emerald' ? 'text-emerald-600' : ''}`}>
                        #{metric.rankValue}
                      </td>
                      <td className="p-6 text-muted-foreground text-sm leading-relaxed">
                        <strong className="text-foreground block mb-1">{metric.insightTitle}</strong>
                        {metric.insightDescription}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* Chinese Language Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden shadow-xl border border-border group"
              >
                <div className="aspect-video relative">
                  <BlurImage src={shanghaiImg} alt="Shanghai Skyline - China's Rise" fill className="object-cover group-hover:scale-105 transition-transform duration-700" placeholder="blur" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                </div>
              </motion.div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-display font-bold mb-6">Rise with a <span className="text-primary">Superpower</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                China is not just the world&apos;s factory; it is becoming the world&apos;s laboratory. Speaking Chinese is no longer just a &quot;nice-to-have&quot;—it is a critical career asset for the next 50 years.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground">Economic Gravity</h4>
                    <p className="text-sm text-muted-foreground">As trade between Indonesia and China explodes, bilingual engineers are the most sought-after talent in Jakarta.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground">Future-Proof Career</h4>
                    <p className="text-sm text-muted-foreground">Mastering Mandarin (aiming for HSK 5/6) opens doors to multinational giants like Huawei, BYD, and TikTok.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join a community of 400+ Indonesian students at one of China&apos;s most prestigious engineering universities.
          </p>
          <div className="flex justify-center">
            <WhatsAppButton />
          </div>
        </div>
      </section>
    </div>
  );
}
