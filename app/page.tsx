"use client";

import { motion } from "framer-motion";
import { BlurImage } from "@/components/ui/blur-image";
import { TrendingUp, Shield, Award, Zap } from "lucide-react";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { PageSegue } from "@/components/ui/PageSegue";
import ShinyText from "@/components/ui/ShinyText";
import { useLocale } from "@/components/i18n/LocaleProvider";

import heroImg1 from "@/public/images/uni/IMG_20251101_124832167.CCD.webp";
import heroImg2 from "@/public/images/uni/IMG_20250914_190338764.CCD.NIGHT.webp";
import heroImg3 from "@/public/images/uni/IMG_20251213_102035090.CCD.webp";
import heroImg4 from "@/public/images/uni/IMG_20251207_121823829.CCD.webp";
import shanghaiImg from "@/public/images/shanghai.webp";

export default function Home() {
  const { messages } = useLocale();

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
      <GradientBlob variant="cool" className="top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <GradientBlob variant="warm" className="top-[20%] right-0 w-[600px] h-[600px] translate-x-1/3 opacity-30" delay={2} />
      <GradientBlob variant="accent" className="bottom-0 left-1/4 w-[400px] h-[400px] opacity-20" delay={4} />

      <section className="relative pt-28 pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                  {messages.home.heroBadge}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-8 leading-[1.2] pb-2"
              >
                {messages.home.heroTitleLead} <br />
                <span className="text-primary text">{messages.home.heroTitleAccent}</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
              >
                {messages.home.heroSubtitle}
              </motion.p>

              <motion.div variants={itemVariants} className="w-full">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                  {messages.home.rankingBySubject}{" "}
                  <span className="text-muted-foreground/50">({messages.home.rankingSource})</span>
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {messages.home.stats.map((stat, index) => (
                    <div key={index} className="text-left">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-2xl md:text-3xl font-semibold tabular-nums text-foreground">
                          {stat.value}
                        </span>
                        <span className="text-sm font-medium text-primary">{stat.suffix}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

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

      <section className="pb-20 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-32">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold mb-4">{messages.home.whyBitTitle}</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-white/40 backdrop-blur-sm shadow-xl"
            >
              <div className="aspect-video w-full bg-black">
                <video
                  className="block h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/video/VideoIntroduction.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-white/40 backdrop-blur-sm shadow-xl"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/50 border-b border-border/50">
                    <th className="p-3 sm:p-6 font-display font-bold text-foreground text-xs sm:text-base">{messages.home.tableHeaders.metric}</th>
                    <th className="p-3 sm:p-6 font-display font-bold text-primary text-xs sm:text-base">{messages.home.tableHeaders.rank}</th>
                    <th className="p-3 sm:p-6 font-display font-bold text-foreground text-xs sm:text-base">{messages.home.tableHeaders.elaboration}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {messages.home.rankingRows.map((item, index) => (
                    <tr key={index} className="hover:bg-white/40 transition-colors">
                      <td className="p-3 sm:p-6 font-medium text-xs sm:text-base">{item.metric}</td>
                      <td className={`p-3 sm:p-6 font-bold text-sm sm:text-xl ${index < 2 ? "text-emerald-600" : ""}`}>{item.rank}</td>
                      <td className="p-3 sm:p-6 text-muted-foreground text-[10px] sm:text-sm leading-relaxed">
                        <strong className="text-foreground block mb-0.5 sm:mb-1 text-xs sm:text-sm">{item.title}</strong>
                        <span className="hidden sm:inline">{item.desc}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 md:space-y-8"
            >
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 md:p-8 border border-white/40 shadow-sm">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-amber-100 text-amber-600 p-2 md:p-3 rounded-xl">
                    <Zap className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold font-display mb-1 md:mb-2">{messages.home.priorityCards[0].title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{messages.home.priorityCards[0].desc}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-5 md:p-8 border border-white/40 shadow-sm">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-blue-100 text-blue-600 p-2 md:p-3 rounded-xl">
                    <Award className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold font-display mb-1 md:mb-2">{messages.home.priorityCards[1].title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{messages.home.priorityCards[1].desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>

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
                <p className="text-white font-bold text-2xl">{messages.home.priorityVisual.title}</p>
                <p className="text-white/80">{messages.home.priorityVisual.subtitle}</p>
              </div>
            </motion.div>
          </div>

          <div className="grid mb-24 md:grid-cols-2 gap-12 items-center">
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
              <h2 className="text-3xl font-display font-bold mb-6">
                {messages.home.chinaSection.headingStart}{" "}
                <span className="text-primary">
                  <ShinyText
                    text={messages.home.chinaSection.headingShiny}
                    speed={2}
                    delay={1}
                    color="#009C62"
                    shineColor="#cfd8ccff"
                    spread={120}
                    className="text-primary"
                  />
                </span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {messages.home.chinaSection.body}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground">{messages.home.chinaSection.points[0].title}</h4>
                    <p className="text-sm text-muted-foreground">{messages.home.chinaSection.points[0].desc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground">{messages.home.chinaSection.points[1].title}</h4>
                    <p className="text-sm text-muted-foreground">{messages.home.chinaSection.points[1].desc}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PageSegue
        title={messages.home.segue.title}
        description={<>{messages.home.segue.description}</>}
        buttonText={messages.home.segue.button}
        buttonHref="/campus-life"
      />
    </div>
  );
}
