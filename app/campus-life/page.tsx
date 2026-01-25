"use client";

import { motion } from "framer-motion";
import { MapPin, Coffee, Utensils, Wifi, Bus, Bike } from "lucide-react";
import { GradientBlob } from "@/components/ui/GradientBlob";

export default function CampusLifePage() {
  const facilities = [
    { title: "2,500 Seat Library", icon: MapPin, desc: "A massive, modern library with private study pods and group rooms." },
    { title: "North Canteen", icon: Utensils, desc: "Famous in Beijing. 4 floors of incredible, affordable food." },
    { title: "Campus Coffee", icon: Coffee, desc: "Multiple cafes for your morning espresso or late-night study fuel." },
    { title: "Campus WiFi", icon: Wifi, desc: "High-speed edu-roam access across the entire campus." },
    { title: "Shuttle Bus", icon: Bus, desc: "Regular shuttles to the subway and central Beijing campus." },
    { title: "Bike Sharing", icon: Bike, desc: "Grab a bike anywhere to get to class in 5 minutes." },
  ];

  const dormTypes = [
    {
      title: "4-Person Suite (New Building)",
      price: "~1,200 RMB/yr",
      features: ["2 Bedrooms (2 per room)", "Private Bathroom", "AC & Heating", "Modern Furnishings"],
      image: "/images/uni/IMG_20251103_130246 (1).webp" // Placeholder mapping
    },
    {
      title: "2-Person Room (Old Building)",
      price: "~4,500 RMB/yr",
      features: ["Private Bathroom", "Balcony", "AC & Heating", "Desks & Storage"],
      image: "/images/uni/IMG_20251109_094544.webp" // Placeholder mapping
    },
    {
      title: "4-Person Room (Standard)",
      price: "900 RMB/yr",
      features: ["Private Bathroom", "Balcony", "Most Affordable", "Community Feel"],
      image: "/images/uni/IMG_20251109_094546.webp" // Placeholder mapping
    }
  ];

  const galleryImages = [
    { src: "/images/uni/IMG_20250914_190338764.CCD.NIGHT.webp", caption: "Campus at Night" },
    { src: "/images/uni/IMG_20251101_124832167.CCD.webp", caption: "Autumn on Campus" },
    { src: "/images/uni/IMG_20251213_102035090.CCD.webp", caption: "Library Study Area" },
    { src: "/images/uni/IMG_20251207_121823829.CCD.webp", caption: "Sports Field" },
    { src: "/images/uni/IMG_20250915_121520361.CCD.webp", caption: "Modern Architecture" },
    { src: "/images/uni/IMG_20250911_163633452.CCD.webp", caption: "Student Center" },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-32 pb-20">
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
            Modern facilities. Incredible food. A community that feels like family. Located in Liangxiang, engineered for deep work.
          </motion.p>
        </div>

        {/* Dormitories */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Where You&apos;ll Live</h2>
            <p className="text-muted-foreground">Affordable, comfortable, and safe.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {dormTypes.map((dorm, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border group"
              >
                <div className="h-64 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder while loading */}
                   <img src={dorm.image} alt={dorm.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                     {dorm.price}
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{dorm.title}</h3>
                  <ul className="space-y-2">
                    {dorm.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
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
                viewport={{ once: true }}
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
          <div className="grid md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
             {galleryImages.map((img, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 className={`relative rounded-2xl overflow-hidden group ${idx === 0 || idx === 3 ? "md:col-span-2" : ""}`}
               >
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
                    <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">{img.caption}</p>
                 </div>
                 <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
