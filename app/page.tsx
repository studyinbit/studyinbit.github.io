"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlurImage } from "@/components/ui/blur-image";
import { GraduationCap, Globe, Users, TrendingUp } from "lucide-react";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SquareArrowTopRight } from "@/components/ui/SquareArrowTopRight";
import { siteContent } from "@/lib/content";

// Static Image Imports
import heroImg1 from "@/public/images/uni/IMG_20251101_124832167.CCD.webp";
import heroImg2 from "@/public/images/uni/IMG_20250914_190338764.CCD.NIGHT.webp";
import heroImg3 from "@/public/images/uni/IMG_20251213_102035090.CCD.webp";
import heroImg4 from "@/public/images/uni/IMG_20251207_121823829.CCD.webp";

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

  return (
    <div className="relative overflow-hidden">
      {/* Animated Breathing Background Blobs */}
      <GradientBlob variant="cool" className="top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <GradientBlob variant="warm" className="top-[20%] right-0 w-[600px] h-[600px] translate-x-1/3 opacity-30" delay={2} />
      <GradientBlob variant="accent" className="bottom-0 left-1/4 w-[400px] h-[400px] opacity-20" delay={4} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-32 md:pb-32 px-6">
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
                className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
              >
                Engineering <br />
                <span className="text-gradient-cool">The Future</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
              >
                {siteContent.hero.subtitle}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <WhatsAppButton />
                {/* <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-7 border bg-white hover:bg-white transition-all duration-300 group whitespace-nowrap min-w-[160px]" asChild>
                  <Link href="/why-bit" className="flex items-center justify-center gap-2">
                    Why BIT? <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                </Button> */}
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

      {/* Stats Section */}
      <section className="relative py-12 border-y border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {siteContent.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-lg font-medium text-primary">{stat.suffix}</span>
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground/60">{stat.source}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props Grid */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Why Top Students Choose BIT</h2>
            <p className="text-lg text-muted-foreground">
              Beyond rankings, we offer a strategic ecosystem for engineering success, tailored specifically for Indonesian students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {siteContent.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href="/why-bit"
                  className="block h-full group relative p-8 rounded-3xl bg-white border border-white/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-6 h-6 text-primary">
                        {index === 0 && <GraduationCap />}
                        {index === 1 && <Globe />}
                        {index === 2 && <TrendingUp />}
                        {index === 3 && <Users />}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 font-display flex items-center gap-2">
                      {feature.title}
                      <SquareArrowTopRight
                        size={12}
                        strokeWidth={3}
                        className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0"
                      />
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
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
