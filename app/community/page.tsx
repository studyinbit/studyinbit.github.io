"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BlurImage } from "@/components/ui/blur-image";
import { Users, BookOpen, Briefcase, Heart, Plane, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

import { GradientBlob } from "@/components/ui/GradientBlob";
import { PageSegue } from "@/components/ui/PageSegue";

import galleryImg1 from "@/public/images/uni/IMG_20250917_093259940.CCD.webp";
import galleryImg2 from "@/public/images/uni/IMG_20251122_121955346.CCD.webp";
import galleryImg3 from "@/public/images/uni/boxing_club.jpg";
import galleryImg4 from "@/public/images/uni/IMG_20250912_085144058.CCD.webp";
import galleryImg5 from "@/public/images/uni/study_session.jpg";
import galleryImg6 from "@/public/images/uni/wushu_competition.jpg";
import galleryImg7 from "@/public/images/uni/kungfu_show.jpg";
import galleryImg8 from "@/public/images/uni/marathon_5k.jpg";
import galleryImg9 from "@/public/images/uni/BBB_chinesetaught.jpg";
import galleryImg10 from "@/public/images/uni/BBB_englishtaught.jpg";

import permitImg from "@/public/images/icons/permitbeijing.webp";
import ppitImg from "@/public/images/icons/ppitiongkok.webp";
import bindImg from "@/public/images/icons/bit_indonesia.webp"

export default function CommunityPage() {
  // rAF-driven orbit animation — syncs with browser animation frame loop and smoothly ramps speed back up after tab switch instead of jumping
  const orbitRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const hoverSpeed = useRef(1);
  const orbitState = useRef({
    angle: 0,
    lastTime: 0,
    speedMultiplier: 1,
    rampStart: 0,
    isRamping: false,
  });

  useEffect(() => {
    const state = orbitState.current;
    const SPEED = 30; // deg/s — (360 / SPEED = seconds per rotation)
    const RAMP_DURATION = 1400; // ms to reach full speed after tab switch
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!state.lastTime) {
        state.lastTime = timestamp;
        rafId = requestAnimationFrame(animate);
        return;
      }

      const dt = timestamp - state.lastTime;
      state.lastTime = timestamp;

      if (dt > 200) {
        state.isRamping = true;
        state.rampStart = timestamp;
        state.speedMultiplier = 0;
      }

      if (state.isRamping) {
        const p = Math.min((timestamp - state.rampStart) / RAMP_DURATION, 1);
        state.speedMultiplier = p * p * (3 - 2 * p);
        if (p >= 1) {
          state.isRamping = false;
          state.speedMultiplier = 1;
        }
      }

      // Smoothly lerp hover speed (50% slowdown on hover)
      const hoverTarget = isHovering.current ? 0.5 : 1;
      hoverSpeed.current += (hoverTarget - hoverSpeed.current) * 0.08;

      const effectiveDt = Math.min(dt, 50);
      state.angle = (state.angle + SPEED * state.speedMultiplier * hoverSpeed.current * (effectiveDt / 1000)) % 360;

      if (orbitRef.current) {
        orbitRef.current.style.setProperty("--orbit-angle", `${state.angle}deg`);
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pillars = [
    {
      title: "Academic Support",
      icon: BookOpen,
      desc: "Weekly group study sessions, senior mentorship, and exam prep workshops. No one falls behind.",
      quote: "\"The Iron Triangle (Math, Physics, Programming) is tough. But with BIND study groups, no one gets left behind.\"",
      author: "Sarah, CS Year 2"
    },
    {
      title: "Career Integration",
      icon: Briefcase,
      desc: "Job fairs for Indonesian students, resume workshops, and direct connections to alumni at Huawei & BYD.",
      quote: "\"I got my internship at Huawei through a BIND alumni connection.\"",
      author: "Budi, EE Year 3"
    },
    {
      title: "Community & Culture",
      icon: Heart,
      desc: "Indonesian Independence Day celebrations, e-sports tournaments, movie nights, and weekend food gatherings.",
      quote: "\"It really feels like a second home. The masak bareng (cooking together) sessions are the highlight of my week.\"",
      author: "Putri,  Year 1"
    },
    {
      title: "Arrival Support",
      icon: Plane,
      desc: "Airport pickup, dorm setup assistance, SIM card registration, and a 'Zero-Stress' landing experience.",
      quote: "\"I was so nervous about arriving alone, but the BIND team was waiting for me at the dorm with snacks!\"",
      author: "Rizky, Year 1"
    }
  ];

  const arrivalSteps = [
    {
      step: "01",
      title: "Before You Fly",
      desc: "Join the WeChat group, pre-order dorm essentials (bedding, cleaning supplies) via our Jastip service, and get packing tips.",
      icon: Plane
    },
    {
      step: "02",
      title: "Arrival Day",
      desc: "Free university shuttle bus takes you directly to Liangxiang. The BIND Welcome Team meets you at the dorm to help with luggage.",
      icon: Home
    },
    {
      step: "03",
      title: "First Week",
      desc: "We guide you through bank setup, SIM card activation, campus tours, and welcome dinners to meet your cohort.",
      icon: Users
    }
  ];

  const galleryImages = [
    { src: galleryImg1, caption: "Wencui Building" },
    { src: galleryImg2, caption: "ICF Event" },
    { src: galleryImg3, caption: "Boxing Club" },
    { src: galleryImg4, caption: "Opening Ceremony" },
    { src: galleryImg5, caption: "Group Study" },
    { src: galleryImg6, caption: "Wushu Competition" },
    { src: galleryImg7, caption: "Kung Fu Show" },
    { src: galleryImg8, caption: "5km Marathon Event" },
    { src: galleryImg9, caption: "BIND BBB Chinese-taught Community Study" },
    { src: galleryImg10, caption: "BIND BBB English-taught Community Study" },
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
            Join The Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            400+ Indonesian students. Structured support from Day 1. One of the most active student organizations on campus.
          </motion.p>
        </div>

        {/* BIND Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:gap-8 mb-32"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl md:rounded-3xl p-4 md:p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-9 h-9 md:w-12 md:h-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                <pillar.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-sm md:text-2xl font-bold font-display mb-1.5 md:mb-3">{pillar.title}</h3>
              <p className="text-xs md:text-base text-muted-foreground mb-3 md:mb-6 leading-relaxed">
                {pillar.desc}
              </p>
              <blockquote className="border-l-2 md:border-l-4 border-primary/20 pl-2.5 md:pl-4 italic text-[10px] md:text-sm text-muted-foreground">
                {pillar.quote}
                <footer className="mt-1 md:mt-2 font-semibold text-foreground not-italic text-[10px] md:text-sm">— {pillar.author}</footer>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrival System */}
        <div className="mb-32">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-4">Zero-Stress Arrival</h2>
            <p className="text-sm md:text-base text-muted-foreground">The things that usually stress parents out? We&apos;ve got them covered.</p>
          </div>

          {/* Desktop - 3 column grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 relative">
            <div className="absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 -z-10" />
            {arrivalSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2 }}
                className="relative bg-white rounded-3xl p-8 shadow-sm border border-border"
              >
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-white shadow-sm">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center">
                  <span className="text-sm font-bold text-primary tracking-widest uppercase mb-2 block">{step.step}</span>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile - vertical stack with left-aligned timeline */}
          <div className="md:hidden space-y-4">
            {arrivalSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.15 }}
                className="relative bg-white rounded-2xl p-4 shadow-sm border border-border flex gap-4 items-start"
              >
                <div className="w-11 h-11 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{step.step}</span>
                  <h3 className="text-sm font-bold mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Network */}
        {/* Desktop version - card with rotating orbit */}
        <div className="hidden md:block bg-gradient-to-r from-slate-900 from-40% to-slate-100 text-white rounded-[2.5rem] p-12 mb-32 relative overflow-hidden">
          <GradientBlob variant="cool" className="opacity-50" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Part of a Larger Network</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                StudyinBIT is connected to organizations such as <strong>BIND</strong> (BIT Indonesia), <strong>PERMIT Beijing</strong> (Indonesian Students Association in Beijing) and <strong>PPIT Tiongkok</strong>. This gives you access to Embassy resources, inter-university events, and a network of over 1,000 Indonesian students across the city.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white gap-2 pl-3 h-auto py-2.5" asChild>
                  <a href="https://www.instagram.com/permitbeijing/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Image src="/images/icons/insagram-white-outline.svg" alt="Instagram" width={18} height={18} className="opacity-90" />
                    <span>@permitbeijing</span>
                  </a>
                </Button>
                <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white gap-2 pl-3 h-auto py-2.5" asChild>
                  <a href="https://www.instagram.com/bit_indonesia/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Image src="/images/icons/insagram-white-outline.svg" alt="Instagram" width={18} height={18} className="opacity-90" />
                    <span>@bit_indonesia</span>
                  </a>
                </Button>
                <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white gap-2 pl-3 h-auto py-2.5" asChild>
                  <a href="https://www.instagram.com/ppitiongkok" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Image src="/images/icons/insagram-white-outline.svg" alt="Instagram" width={18} height={18} className="opacity-90" />
                    <span>@ppitiongkok</span>
                  </a>
                </Button>
              </div>
            </div>
            {/* Rotating orbit logos */}
            <div
              className="flex items-center justify-center -mt-6"
              onMouseEnter={() => { isHovering.current = true; }}
              onMouseLeave={() => { isHovering.current = false; }}
            >
              <div className="relative w-80 h-80">
                <div
                  ref={orbitRef}
                  className="absolute inset-0"
                  style={{ transform: "rotate(var(--orbit-angle, 0deg))" }}
                >
                  {[
                    { src: bindImg, alt: "BIND", handle: "@bit_indonesia", url: "https://www.instagram.com/bit_indonesia/", angle: 0 },
                    { src: permitImg, alt: "PERMIT Beijing", handle: "@permitbeijing", url: "https://www.instagram.com/permitbeijing/", angle: 120 },
                    { src: ppitImg, alt: "PPIT Tiongkok", handle: "@ppitiongkok", url: "https://www.instagram.com/ppitiongkok/", angle: 240 },
                  ].map((logo, idx) => {
                    const rad = (logo.angle * Math.PI) / 180;
                    const x = Math.round(Math.cos(rad) * 110);
                    const y = Math.round(Math.sin(rad) * 110);
                    return (
                      <a
                        key={idx}
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute w-[106px] h-[106px] rounded-full bg-white p-3 shadow-lg overflow-visible group/logo cursor-pointer hover:scale-[1.2] transition-[scale] duration-200"
                        style={{
                          left: `calc(50% + ${x}px - 53px)`,
                          top: `calc(50% + ${y}px - 53px)`,
                          transform: "rotate(calc(-1 * var(--orbit-angle, 0deg)))",
                        }}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden relative">
                          <BlurImage src={logo.src} alt={logo.alt} className="rounded-full object-contain" fill sizes="106px" />
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                            {logo.handle}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile version - section layout with marquee */}
        <div className="md:hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white mb-32 -mx-6 px-6 py-12 relative overflow-hidden">
          <GradientBlob variant="cool" className="opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold mb-6">Part of a Larger Network</h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              StudyinBIT is connected to organizations such as <strong>BIND</strong> (BIT Indonesia), <strong>PERMIT Beijing</strong> (Indonesian Students Association in Beijing) and <strong>PPIT Tiongkok</strong>. This gives you access to Embassy resources, inter-university events, and a network of over 1,000 Indonesian students across the city.
            </p>
            <div className="flex gap-3 flex-wrap mb-10">
              <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white gap-2 pl-3 h-auto py-2.5" asChild>
                <a href="https://www.instagram.com/permitbeijing/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Image src="/images/icons/insagram-white-outline.svg" alt="Instagram" width={18} height={18} className="opacity-90" />
                  <span>@permitbeijing</span>
                </a>
              </Button>
              <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white gap-2 pl-3 h-auto py-2.5" asChild>
                <a href="https://www.instagram.com/bit_indonesia/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Image src="/images/icons/insagram-white-outline.svg" alt="Instagram" width={18} height={18} className="opacity-90" />
                  <span>@bit_indonesia</span>
                </a>
              </Button>
              <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white gap-2 pl-3 h-auto py-2.5" asChild>
                <a href="https://www.instagram.com/ppitiongkok" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Image src="/images/icons/insagram-white-outline.svg" alt="Instagram" width={18} height={18} className="opacity-90" />
                  <span>@ppitiongkok</span>
                </a>
              </Button>
            </div>
            {/* Infinite scrolling marquee */}
            <div className="overflow-hidden -mx-6">
              <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(2)].map((_, dupeIdx) => (
                  <div key={dupeIdx} className="flex gap-6">
                    {[
                      { src: bindImg, alt: "BIND", url: "https://www.instagram.com/bit_indonesia/" },
                      { src: permitImg, alt: "PERMIT Beijing", url: "https://www.instagram.com/permitbeijing/" },
                      { src: ppitImg, alt: "PPIT Tiongkok", url: "https://www.instagram.com/ppitiongkok/" },
                    ].map((logo, idx) => (
                      <a key={idx} href={logo.url} target="_blank" rel="noopener noreferrer" className="w-24 h-24 rounded-full bg-white p-3 shadow-lg flex-shrink-0 relative overflow-hidden">
                        <BlurImage src={logo.src} alt={logo.alt} className="rounded-full object-contain" fill sizes="96px" />
                      </a>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Life at BIT</h2>
          <div className="columns-2 md:columns-3 gap-4 md:gap-6">
            {galleryImages.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="relative rounded-2xl overflow-hidden group break-inside-avoid mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <BlurImage
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-white font-medium text-sm">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {/* <div className="text-center mb-20">
          <h2 className="text-3xl font-display font-bold mb-6">Want to talk to a senior?</h2>
          <WhatsAppButton />
        </div> */}

      </div>

      {/* Link to Admissions Page */}
      <PageSegue
        title="Ready to Apply?"
        description="Learn about requirements, scholarships, and the application timeline for BIT."
        buttonText="View Admissions Info"
        buttonHref="/admissions"
      />
    </div>
  );
}
