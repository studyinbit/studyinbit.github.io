"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { BlurImage } from "@/components/ui/blur-image";
import { Users, BookOpen, Briefcase, Heart, Plane, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { localizePath } from "@/lib/i18n/path-utils";
import { useMobileGalleryHighlight } from "@/hooks/use-mobile-gallery-highlight";

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
import bindImg from "@/public/images/icons/bit_indonesia.webp";

const NETWORK_WIDTH = 448;
const NETWORK_HEIGHT = 336;
const NETWORK_CENTER_X = NETWORK_WIDTH / 2;
const NETWORK_CENTER_Y = NETWORK_HEIGHT / 2;
const NETWORK_RING_RADIUS = 100;
const NETWORK_ICON_SIZE = 106;
const NETWORK_ICON_HALF = NETWORK_ICON_SIZE / 2;

type NetworkLogo = {
  src: StaticImageData;
  alt: string;
  handle: string;
  url: string;
  angle: number;
  radius: number;
  depth: number;
  floatX: number;
  floatY: number;
  tilt: number;
  duration: number;
  phaseOffset: number;
};

type FloatingNetworkLogoProps = {
  logo: NetworkLogo;
  baseX: number;
  baseY: number;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
  pointerActive: MotionValue<number>;
};

type MobileNetworkNode = {
  src: StaticImageData;
  alt: string;
  handle: string;
  url: string;
};

type MobileNetworkLogoProps = {
  logo: MobileNetworkNode;
};

function FloatingNetworkLogo({ logo, baseX, baseY, cursorX, cursorY, pointerActive }: FloatingNetworkLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const phase = useRef(logo.phaseOffset * Math.PI * 2);
  const floatOffsetX = useMotionValue(0);
  const floatOffsetY = useMotionValue(0);
  const floatRotate = useMotionValue(0);
  const pullOffsetX = useMotionValue(0);
  const pullOffsetY = useMotionValue(0);
  const x = useTransform(() => floatOffsetX.get() + pullOffsetX.get());
  const y = useTransform(() => floatOffsetY.get() + pullOffsetY.get());

  useAnimationFrame((_, delta) => {
    const dt = Math.min(delta, 40) / 1000;

    if (!prefersReducedMotion && !isHovered) {
      phase.current += (Math.PI * 2 * dt) / logo.duration;
      floatOffsetX.set(Math.sin(phase.current) * logo.floatX);
      floatOffsetY.set(Math.cos(phase.current * 0.92) * logo.floatY);
      floatRotate.set(Math.sin(phase.current * 0.75) * logo.tilt);
    }

    if (isHovered) {
      return;
    }

    const shouldPull = !prefersReducedMotion && pointerActive.get() > 0.5;
    let targetX = 0;
    let targetY = 0;

    if (shouldPull) {
      const currentX = baseX + floatOffsetX.get();
      const currentY = baseY + floatOffsetY.get();
      const dx = cursorX.get() - currentX;
      const dy = cursorY.get() - currentY;
      const distance = Math.hypot(dx, dy);
      const influence = Math.max(0, 1 - distance / 220);
      const maxPull = 11 * logo.depth;

      targetX = Math.max(-maxPull, Math.min(maxPull, dx * 0.08 * influence));
      targetY = Math.max(-maxPull, Math.min(maxPull, dy * 0.08 * influence));
    }

    pullOffsetX.set(pullOffsetX.get() + (targetX - pullOffsetX.get()) * 0.2);
    pullOffsetY.set(pullOffsetY.get() + (targetY - pullOffsetY.get()) * 0.2);
  });

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${baseX - NETWORK_ICON_HALF}px`,
        top: `${baseY - NETWORK_ICON_HALF}px`,
        x,
        y,
      }}
    >
      <motion.a
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-[106px] h-[106px] rounded-full bg-white p-3 shadow-lg overflow-visible group/logo cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{ rotate: floatRotate }}
        whileHover={{
          scale: 1.06,
          boxShadow: "0 16px 36px rgba(15, 23, 42, 0.28)",
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
      </motion.a>
    </motion.div>
  );
}

function MobileNetworkLogo({ logo }: MobileNetworkLogoProps) {
  return (
    <a
      href={logo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 block w-[76px] h-[76px] rounded-full bg-white p-2.5 shadow-[0_10px_26px_rgba(15,23,42,0.26)] overflow-hidden"
    >
      <BlurImage src={logo.src} alt={logo.alt} className="rounded-full object-contain" fill sizes="76px" />
    </a>
  );
}

export default function CommunityPage() {
  const { locale } = useLocale();
  const isId = locale === "id";
  const admissionsHref = localizePath("/admissions", locale);
  const networkRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const pointerActive = useMotionValue(0);

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
      title: isId ? "Dukungan Akademik" : "Academic Support",
      icon: BookOpen,
      desc: isId
        ? "Sesi belajar kelompok mingguan, mentoring dari senior, dan workshop persiapan ujian. Tidak ada yang tertinggal."
        : "Weekly group study sessions, senior mentorship, and exam prep workshops. No one falls behind.",
      // quote: "\"The Iron Triangle (Math, Physics, Programming) is tough. But with BIND study groups, no one gets left behind.\"",
      // author: "Sarah, CS Year 2"
    },
    {
      title: isId ? "Integrasi Karier" : "Career Integration",
      icon: Briefcase,
      desc: isId
        ? "Job fair untuk mahasiswa Indonesia, workshop CV, dan koneksi langsung ke alumni serta senior."
        : "Job fairs for Indonesian students, resume workshops, and direct connections to alumni & seniors.",
      // quote: "\"I got my internship at Huawei through a BIND alumni connection.\"",
      // author: "Budi, EE Year 3"
    },
    {
      title: isId ? "Budaya" : "Culture",
      icon: Heart,
      desc: isId
        ? "Ikut Cultural Days untuk memakai pakaian tradisional, berbagi cita rasa Indonesia, dan mempererat pertemanan lewat berbagai permainan."
        : "Join our special Cultural Days to wear your national dress with pride, share the flavors of home, and bond over games.",
      // quote: "\"It really feels like a second home. The masak bareng (cooking together) sessions are the highlight of my week.\"",
      // author: "Putri,  Year 1"
    },
    {
      title: isId ? "Bantuan Kedatangan" : "Arrival Support",
      icon: Plane,
      desc: isId
        ? "Penjemputan bandara, bantuan setup asrama, aktivasi kartu SIM, dan proses kedatangan yang minim stres."
        : "Airport pickup, dorm setup assistance, SIM card registration, and a 'Zero-Stress' landing experience.",
      // quote: "\"I was so nervous about arriving alone, but the BIND team was waiting for me at the dorm with snacks!\"",
      // author: "Rizky, Year 1"
    }
  ];

  const arrivalSteps = [
    {
      step: "01",
      title: isId ? "Sebelum Berangkat" : "Before You Fly",
      desc: isId
        ? "Gabung grup WeChat, pre-order kebutuhan asrama (sprei, perlengkapan kebersihan) lewat layanan Jastip, dan dapat checklist barang."
        : "Join the WeChat group, pre-order dorm essentials (bedding, cleaning supplies) via our Jastip service, and get packing tips.",
      icon: Plane
    },
    {
      step: "02",
      title: isId ? "Hari Kedatangan" : "Arrival Day",
      desc: isId
        ? "Shuttle kampus gratis mengantar langsung ke Liangxiang. Tim BIND akan menyambut di asrama dan bantu urus barang bawaan."
        : "Free university shuttle bus takes you directly to Liangxiang. The BIND Welcome Team meets you at the dorm to help with luggage.",
      icon: Home
    },
    {
      step: "03",
      title: isId ? "Minggu Pertama" : "First Week",
      desc: isId
        ? "Kami dampingi untuk setup bank, aktivasi SIM card, tur kampus, dan acara makan bersama agar cepat kenal satu angkatan."
        : "We guide you through bank setup, SIM card activation, campus tours, and welcome dinners to meet your cohort.",
      icon: Users
    }
  ];

  const galleryImages = [
    { src: galleryImg1, caption: isId ? "Gedung Wencui" : "Wencui Building" },
    { src: galleryImg2, caption: isId ? "Acara ICF" : "ICF Event" },
    { src: galleryImg3, caption: isId ? "Klub Tinju" : "Boxing Club" },
    { src: galleryImg4, caption: isId ? "Upacara Pembukaan" : "Opening Ceremony" },
    { src: galleryImg5, caption: isId ? "Belajar Kelompok" : "Group Study" },
    { src: galleryImg6, caption: isId ? "Kompetisi Wushu" : "Wushu Competition" },
    { src: galleryImg7, caption: isId ? "Pertunjukan Kung Fu" : "Kung Fu Show" },
    { src: galleryImg8, caption: isId ? "Event Marathon 5 km" : "5km Marathon Event" },
    { src: galleryImg9, caption: isId ? "Belajar Komunitas BIND BBB (Program Mandarin)" : "BIND BBB Chinese-taught Community Study" },
    { src: galleryImg10, caption: isId ? "Belajar Komunitas BIND BBB (Program Inggris)" : "BIND BBB English-taught Community Study" },
  ];

  const {
    isMobile: isMobileGallery,
    activeIndex: activeGalleryIndex,
    setItemRef: setGalleryItemRef,
    activateItem: activateGalleryItem,
    onItemTouchStart,
    onItemTouchMove,
    onItemTouchEnd,
  } = useMobileGalleryHighlight(galleryImages.length);

  const networkLogos: NetworkLogo[] = [
    {
      src: bindImg,
      alt: "BIND",
      handle: "@bit_indonesia",
      url: "https://www.instagram.com/bit_indonesia/",
      angle: -90,
      radius: NETWORK_RING_RADIUS,
      depth: 0.68,
      floatX: 3.8,
      floatY: 5.5,
      tilt: 1.2,
      duration: 8,
      phaseOffset: 0.12,
    },
    {
      src: permitImg,
      alt: "PERMIT Beijing",
      handle: "@permitbeijing",
      url: "https://www.instagram.com/permitbeijing/",
      angle: 30,
      radius: NETWORK_RING_RADIUS,
      depth: 0.9,
      floatX: 4.3,
      floatY: 6,
      tilt: 1.45,
      duration: 8.6,
      phaseOffset: 0.48,
    },
    {
      src: ppitImg,
      alt: "PPIT Tiongkok",
      handle: "@ppitiongkok",
      url: "https://www.instagram.com/ppitiongkok/",
      angle: 150,
      radius: NETWORK_RING_RADIUS,
      depth: 0.8,
      floatX: 4,
      floatY: 5.8,
      tilt: 1.3,
      duration: 8.2,
      phaseOffset: 0.78,
    },
  ];

  const mobileNetworkNodes: MobileNetworkNode[] = [
    {
      src: bindImg,
      alt: "BIND",
      handle: "@bit_indonesia",
      url: "https://www.instagram.com/bit_indonesia/",
    },
    {
      src: permitImg,
      alt: "PERMIT Beijing",
      handle: "@permitbeijing",
      url: "https://www.instagram.com/permitbeijing/",
    },
    {
      src: ppitImg,
      alt: "PPIT Tiongkok",
      handle: "@ppitiongkok",
      url: "https://www.instagram.com/ppitiongkok/",
    },
  ];

  const handleNetworkMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!networkRef.current) {
      return;
    }

    const rect = networkRef.current.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left);
    cursorY.set(event.clientY - rect.top);
    pointerActive.set(1);
  };

  const resetNetworkPull = () => {
    pointerActive.set(0);
  };

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
            {isId ? "Gabung Komunitas" : "Join The Community"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {isId
              ? "400+ mahasiswa Indonesia. Dukungan terstruktur sejak hari pertama. Salah satu organisasi mahasiswa paling aktif di kampus."
              : "400+ Indonesian students. Structured support from Day 1. One of the most active student organizations on campus."}
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
              <p className="text-xs md:text-base text-muted-foreground leading-relaxed">
                {pillar.desc}
              </p>
              {/* <blockquote className="border-l-2 md:border-l-4 border-primary/20 pl-2.5 md:pl-4 italic text-[10px] md:text-sm text-muted-foreground">
                {pillar.quote}
                <footer className="mt-1 md:mt-2 font-semibold text-foreground not-italic text-[10px] md:text-sm">— {pillar.author}</footer>
              </blockquote> */}
            </motion.div>
          ))}
        </motion.div>

        {/* Arrival System */}
        <div className="mb-32">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-4">{isId ? "Kedatangan Tanpa Stres" : "Zero-Stress Arrival"}</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {isId
                ? "Hal-hal yang biasanya bikin orang tua khawatir? Kami sudah siapkan semuanya."
                : "The things that usually stress parents out? We've got them covered."}
            </p>
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
        {/* Desktop version - organic floating logos with subtle pointer pull */}
        <div className="hidden md:block bg-gradient-to-r from-slate-900 from-40% to-slate-100 text-white rounded-[2.5rem] p-12 mb-32 relative overflow-hidden">
          <GradientBlob variant="cool" className="opacity-50" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{isId ? "Bagian dari Jaringan yang Lebih Besar" : "Part of a Larger Network"}</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                {isId
                  ? <>StudyinBIT terhubung dengan organisasi seperti <strong>BIND</strong> (BIT Indonesia), <strong>PERMIT Beijing</strong> (Persatuan Mahasiswa Indonesia di Beijing), dan <strong>PPIT Tiongkok</strong>. Ini memberi akses ke sumber daya KBRI, event lintas kampus, serta jaringan 1.000+ mahasiswa Indonesia di Beijing.</>
                  : <>StudyinBIT is connected to organizations such as <strong>BIND</strong> (BIT Indonesia), <strong>PERMIT Beijing</strong> (Indonesian Students Association in Beijing) and <strong>PPIT Tiongkok</strong>. This gives you access to Embassy resources, inter-university events, and a network of over 1,000 Indonesian students across the city.</>}
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
            {/* Ring-structured logos with micro-float motion */}
            <div
              className="flex items-center justify-center -mt-6"
              onMouseMove={handleNetworkMouseMove}
              onMouseLeave={resetNetworkPull}
            >
              <div ref={networkRef} className="relative w-[28rem] h-[21rem]">
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                  style={{
                    width: `${NETWORK_RING_RADIUS * 2 + 58}px`,
                    height: `${NETWORK_RING_RADIUS * 2 + 58}px`,
                  }}
                />
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
                  style={{
                    width: `${NETWORK_RING_RADIUS * 2}px`,
                    height: `${NETWORK_RING_RADIUS * 2}px`,
                  }}
                />
                {networkLogos.map((logo) => {
                  const rad = (logo.angle * Math.PI) / 180;
                  const baseX = NETWORK_CENTER_X + Math.cos(rad) * logo.radius;
                  const baseY = NETWORK_CENTER_Y + Math.sin(rad) * logo.radius;
                  return (
                    <FloatingNetworkLogo
                      key={logo.handle}
                      logo={logo}
                      baseX={baseX}
                      baseY={baseY}
                      cursorX={cursorX}
                      cursorY={cursorY}
                      pointerActive={pointerActive}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile version - constellation layout with scroll-reactive emphasis */}
        <div className="md:hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white mb-32 -mx-6 px-6 py-12 relative overflow-hidden">
          <GradientBlob variant="cool" className="opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold mb-6">{isId ? "Bagian dari Jaringan yang Lebih Besar" : "Part of a Larger Network"}</h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              {isId
                ? <>StudyinBIT terhubung dengan organisasi seperti <strong>BIND</strong> (BIT Indonesia), <strong>PERMIT Beijing</strong> (Persatuan Mahasiswa Indonesia di Beijing), dan <strong>PPIT Tiongkok</strong>. Ini memberi akses ke sumber daya KBRI, event lintas kampus, serta jaringan 1.000+ mahasiswa Indonesia di Beijing.</>
                : <>StudyinBIT is connected to organizations such as <strong>BIND</strong> (BIT Indonesia), <strong>PERMIT Beijing</strong> (Indonesian Students Association in Beijing) and <strong>PPIT Tiongkok</strong>. This gives you access to Embassy resources, inter-university events, and a network of over 1,000 Indonesian students across the city.</>}
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
            <div className="relative mx-auto max-w-[21.5rem]">
              <div className="relative rounded-[1.5rem] border border-white/15 bg-white/[0.04] backdrop-blur-sm p-5">
                <div className="absolute left-9 right-9 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-white/10 via-white/35 to-white/10" />
                <div className="relative z-10 grid grid-cols-3 gap-4 place-items-center">
                  {mobileNetworkNodes.map((logo) => (
                    <MobileNetworkLogo key={logo.handle} logo={logo} />
                  ))}
                </div>
              </div>
              <p
                className="mt-4 text-[11px] text-center text-slate-300/90 tracking-wide"
              >
                {isId ? "Tap logo untuk membuka Instagram." : "Tap any logo to open Instagram."}
              </p>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-32">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">{isId ? "Kehidupan di BIT" : "Life at BIT"}</h2>
          <p className="md:hidden text-center text-xs text-muted-foreground mb-6">
            {isId ? "Tap atau scroll untuk melihat deskripsi foto." : "Tap or scroll to reveal photo descriptions."}
          </p>
          <div className="columns-2 md:columns-3 gap-4 md:gap-6">
            {galleryImages.map((item, idx) => {
              const isActive = isMobileGallery && activeGalleryIndex === idx;

              return (
                <motion.div
                  key={idx}
                  ref={(node) => setGalleryItemRef(idx, node)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={isMobileGallery ? undefined : () => activateGalleryItem(idx)}
                  onTouchStart={isMobileGallery ? onItemTouchStart : undefined}
                  onTouchMove={isMobileGallery ? onItemTouchMove : undefined}
                  onTouchEnd={isMobileGallery ? () => onItemTouchEnd(idx) : undefined}
                  className={`relative rounded-2xl overflow-hidden group break-inside-avoid mb-6 ${isMobileGallery ? "cursor-pointer" : ""}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 z-10 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  />
                  <BlurImage
                    src={item.src}
                    alt={item.caption}
                    className={`w-full h-auto object-cover transform transition-transform duration-700 ${isActive ? "scale-105" : "group-hover:scale-105"}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 z-20 ${isActive ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"}`}
                  >
                    <p className="text-white font-medium text-sm">{item.caption}</p>
                  </div>
                </motion.div>
              );
            })}
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
        title={isId ? "Siap Mendaftar?" : "Ready to Apply?"}
        description={
          isId
            ? "Pelajari persyaratan, beasiswa, dan timeline pendaftaran BIT."
            : "Learn about requirements, scholarships, and the application timeline for BIT."
        }
        buttonText={isId ? "Lihat Info Admisi" : "View Admissions Info"}
        buttonHref={admissionsHref}
      />
    </div>
  );
}
