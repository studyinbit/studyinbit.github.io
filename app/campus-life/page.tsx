"use client";

import { motion } from "framer-motion";
import { BlurImage } from "@/components/ui/blur-image";
import { MapPin, Coffee, Utensils, Wifi, Bus, Bike, Shield } from "lucide-react";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { PageSegue } from "@/components/ui/PageSegue";
import Carousel from "@/components/ui/Carousel";

import dormImg1 from "@/public/images/uni/IMG_20251103_130246 (1).webp";
import dormImg2 from "@/public/images/uni/IMG_20251109_094544.webp";
import dormImg3 from "@/public/images/uni/IMG_20251109_094546.webp";

import galleryImg1 from "@/public/images/uni/IMG_20250914_190338764.CCD.NIGHT.webp";
import galleryImg2 from "@/public/images/uni/IMG_20251101_124832167.CCD.webp";
import galleryImg3 from "@/public/images/uni/IMG_20251213_102035090.CCD.webp";
import galleryImg4 from "@/public/images/uni/IMG_20251207_121823829.CCD.webp";
import galleryImg5 from "@/public/images/uni/IMG_20250915_121520361.CCD.webp";
import galleryImg6 from "@/public/images/uni/IMG_20250911_163633452.CCD.webp";
import galleryImg7 from "@/public/images/uni/bridge.jpg";
import galleryImg8 from "@/public/images/uni/canteen北.jpg";
import galleryImg9 from "@/public/images/uni/noodles.jpg";
import galleryImg10 from "@/public/images/uni/duck_south_canteen.jpg";
import galleryImg11 from "@/public/images/uni/gym4thfloor.jpg";
import galleryImg12 from "@/public/images/uni/zoo.jpg";
import galleryImg13 from "@/public/images/uni/24_7_library.png";
import galleryImg14 from "@/public/images/uni/IMG_20250930_174155491.CCD.webp";
import beijingMap from "@/public/images/beijing-map.webp";

export default function CampusLifePage() {
  const facilities = [
    { title: "2,500 Seat Library", icon: MapPin, desc: "A massive, modern library with private study pods and group rooms." },
    { title: "North Canteen", icon: Utensils, desc: "Famous in Beijing. 4 floors of incredible, affordable food." },
    { title: "Campus Coffee", icon: Coffee, desc: "Multiple cafes for your morning espresso or late-night study fuel." },
    { title: "Campus WiFi", icon: Wifi, desc: "High-speed edu-roam access across the entire campus." },
    { title: "Shuttle Bus", icon: Bus, desc: "Regular shuttles to the subway and central Beijing campus." },
    { title: "Bike Sharing", icon: Bike, desc: "Grab a bike anywhere to get to class in 5 minutes." },
  ];

  const newDorms = [
    {
      title: "4-Person Suite",
      price: "~800 RMB/mo",
      features: ["2 Bedrooms (2 per room)", "Private Bathroom", "AC & Heating", "Does not provide free water", "Modern Furnishings"],
      image: dormImg1
    }
  ];

  const oldDorms = [
    {
      title: "2-Person Room",
      price: "~900 RMB/mo",
      features: ["Private Bathroom", "Balcony", "AC & Heating", "Water is free", "Desks & Storage"],
      image: dormImg2
    },
    {
      title: "3-Person Room",
      price: "~700 RMB/mo",
      features: ["Private Bathroom", "Balcony", "AC & Heating", "Water is free", "Spacious Layout"],
      image: dormImg2
    },
    {
      title: "4-Person Room",
      price: "900 RMB/mo",
      features: ["Private Bathroom", "Balcony", "Most Affordable", "Water is free", "Community Feel"],
      image: dormImg3
    }
  ];

  const galleryImages = [
    { src: galleryImg1, caption: "Campus at Night" },
    { src: galleryImg2, caption: "Campus in Autumn" },
    { src: galleryImg3, caption: "Campus in Snow" },
    { src: galleryImg4, caption: "International Students Dorm Entrance" },
    { src: galleryImg5, caption: "Calculus Class" },
    { src: galleryImg6, caption: "Campus Gala" },
    { src: galleryImg7, caption: "Park Bridge" },
    { src: galleryImg8, caption: "North Canteen" },
    { src: galleryImg9, caption: "Halal Canteen Food" },
    { src: galleryImg10, caption: "Canteen Food" },
    { src: galleryImg11, caption: "Gym 4th Floor" },
    { src: galleryImg12, caption: "Mini Zoo" },
    { src: galleryImg13, caption: "24/7 Library" },
    { src: galleryImg14, caption: "Autumn Scenery" },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-32">
      <GradientBlob variant="cool" className="top-20 left-0 w-[600px] h-[600px] -translate-x-1/3 opacity-30" />
      <GradientBlob variant="warm" className="bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 opacity-30" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Your Home in <span className="text-primary">Beijing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Modern facilities. Incredible food. A community that feels engineered for deep worklike family. Located in Liangxiang, Beijing.
          </motion.p>
        </div>

        {/* Dormitories */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Where You&apos;ll Live</h2>
            <p className="text-muted-foreground">Affordable, comfortable, and safe.</p>
          </div>

          {/* Location Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 text-white -mx-6 px-6 py-8 md:mx-0 md:rounded-3xl md:p-16 relative overflow-hidden mb-12"
          >
            <div className="absolute top-0 right-0 w-full h-full opacity-20">
              <GradientBlob variant="cool" className="translate-x-1/2" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 md:mb-6">Liangxiang Campus</h2>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4 md:mb-6">
                  Liangxiang is a small university district located outside of beijing. It is located 30-40km from central Beijing. It would take 1-2 hours(depending on how busy the subway is) to travel from campus to the city center. Liangxiang campus occupies an area of 2,001,000 m².
                </p>
                <div className="flex items-center gap-3 md:gap-4 text-slate-300 text-sm md:text-base">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  <span>Library seats 2,500 students</span>
                </div>
              </div>
              <div className="h-48 md:h-64 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden relative group">
                <BlurImage src={beijingMap} alt="Map of Liangxiang vs Beijing" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" placeholder="blur" />
              </div>
            </div>
          </motion.div>
          <div className="space-y-16">
            {/* New Building */}
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-8 text-primary">New Building (Bohou)</h3>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {newDorms.map((dorm, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border group"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <BlurImage src={dorm.image} alt={dorm.title} placeholder="blur" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                        {dorm.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">{dorm.title}</h3>
                      <ul className="space-y-2">
                        {dorm.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile - centered card matching carousel width */}
              <div className="md:hidden flex justify-center">
                {newDorms.map((dorm, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border w-[288px]"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <BlurImage src={dorm.image} alt={dorm.title} placeholder="blur" className="w-full h-full object-cover" />
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-xs font-medium z-10">
                        {dorm.price}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold mb-3">{dorm.title}</h3>
                      <ul className="space-y-1.5">
                        {dorm.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Old Building */}
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-8 text-primary">Old Building (International Students Dorm)</h3>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {oldDorms.map((dorm, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border group"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <BlurImage src={dorm.image} alt={dorm.title} placeholder="blur" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                        {dorm.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">{dorm.title}</h3>
                      <ul className="space-y-2">
                        {dorm.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden flex justify-center">
                <Carousel baseWidth={320} loop>
                  {oldDorms.map((dorm, idx) => (
                    <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border h-full">
                      <div className="h-44 overflow-hidden relative">
                        <BlurImage src={dorm.image} alt={dorm.title} placeholder="blur" className="w-full h-full object-cover" />
                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-xs font-medium z-10">
                          {dorm.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-bold mb-3">{dorm.title}</h3>
                        <ul className="space-y-1.5">
                          {dorm.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Life at BIT</h2>
            <p className="text-muted-foreground">Everything you need within walking distance.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {facilities.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/40 hover:bg-white/80 transition-colors"
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Campus Moments</h2>
          <div className="mb-24 columns-2 md:columns-3 gap-4 md:gap-6">
            {galleryImages.map((img, idx) => (
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
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-white font-medium text-sm">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Link to Community Page */}
      <PageSegue
        title="Meet Your Community"
        description="Join 400+ Indonesian students and discover the support system that makes BIT feel like home."
        buttonText="Discover the Community"
        buttonHref="/community"
      />
    </div>
  );
}
