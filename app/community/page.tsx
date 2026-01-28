"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BlurImage } from "@/components/ui/blur-image";
import { Users, BookOpen, Briefcase, Heart, Plane, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { PageSegue } from "@/components/ui/PageSegue";

import galleryImg1 from "@/public/images/uni/IMG_20250917_093259940.CCD.webp";
import galleryImg2 from "@/public/images/uni/IMG_20251122_121955346.CCD.webp";
import galleryImg3 from "@/public/images/uni/IMG_20251213_092706951.CCD.webp";
import galleryImg4 from "@/public/images/uni/IMG_20250912_085144058.CCD.webp";
import galleryImg5 from "@/public/images/uni/IMG_20250930_174155491.CCD.webp";
import galleryImg6 from "@/public/images/uni/IMG_20251115_093217450.CCD.webp";

import permitImg from "@/public/images/icons/permitbeijing.webp";
import ppitImg from "@/public/images/icons/ppitiongkok.webp";

export default function CommunityPage() {
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
    { src: galleryImg1, caption: "Community Moment" },
    { src: galleryImg2, caption: "Community Moment" },
    { src: galleryImg3, caption: "Community Moment" },
    { src: galleryImg4, caption: "Community Moment" },
    { src: galleryImg5, caption: "Community Moment" },
    { src: galleryImg6, caption: "Community Moment" },
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
            Join Our Family
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
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 mb-32"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/50 backdrop-blur-md border border-white/60 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {pillar.desc}
              </p>
              <blockquote className="border-l-4 border-primary/20 pl-4 italic text-sm text-muted-foreground">
                {pillar.quote}
                <footer className="mt-2 font-semibold text-foreground not-italic">— {pillar.author}</footer>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrival System */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Zero-Stress Arrival</h2>
            <p className="text-muted-foreground">The things that usually stress parents out? We&apos;ve got them covered.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 -z-10" />

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
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Network */}
        <div className="bg-gradient-to-b md:bg-gradient-to-r from-slate-900 from-40% to-slate-100 text-white rounded-[2.5rem] p-12 mb-32 relative overflow-hidden">
          <GradientBlob variant="cool" className="opacity-50" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Part of a Larger Network</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                StudyinBIT is connected to <strong>PERMIT Beijing</strong> (Indonesian Students Association in Beijing) and <strong>PPIT Tiongkok</strong>. This gives you access to Embassy resources, inter-university events, and a network of over 1,000 Indonesian students across the city.
              </p>
              <div className="flex gap-4 flex-wrap">
                 <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white gap-2 pl-3 h-auto py-2.5" asChild>
                   <a href="https://www.instagram.com/permitbeijing/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                     <Image src="/images/icons/insagram-white-outline.svg" alt="Instagram" width={18} height={18} className="opacity-90" />
                     <span>@permitbeijing</span>
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
            <div className="flex gap-6 justify-center md:justify-end">
               <div className="w-32 h-32 rounded-full bg-white p-4 shadow-lg flex items-center justify-center relative overflow-hidden">
                 <BlurImage src={permitImg} alt="PERMIT Beijing" className="rounded-full object-contain" fill sizes="128px" />
               </div>
               <div className="w-32 h-32 rounded-full bg-white p-4 shadow-lg flex items-center justify-center translate-y-8 relative overflow-hidden">
                 <BlurImage src={ppitImg} alt="PPIT Tiongkok" className="rounded-full object-contain" fill sizes="128px" />
               </div>
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
