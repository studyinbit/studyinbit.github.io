"use client";

import { motion } from "framer-motion";
import { BlurImage } from "@/components/ui/blur-image";
import { MapPin, Coffee, Utensils, Wifi, Bus, Bike, Shield } from "lucide-react";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { MobilePeekDeck } from "@/components/ui/MobilePeekDeck";
import { DormitoryCard, type DormitoryCardData } from "@/components/features/DormitoryCard";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { PageSegue } from "@/components/ui/PageSegue";
import { localizePath } from "@/lib/i18n/path-utils";
import { useMobileGalleryHighlight } from "@/hooks/use-mobile-gallery-highlight";

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
  const { locale } = useLocale();
  const isId = locale === "id";
  const communityHref = localizePath("/community", locale);

  const facilities = [
    {
      title: isId ? "Perpustakaan 2.500 Kursi" : "2,500 Seat Library",
      icon: MapPin,
      desc: isId
        ? "Perpustakaan modern yang besar dengan pod belajar pribadi dan ruang diskusi."
        : "A massive, modern library with private study pods and group rooms.",
    },
    {
      title: isId ? "North Canteen" : "North Canteen",
      icon: Utensils,
      desc: isId
        ? "Terkenal di Beijing. 4 lantai pilihan makanan enak dengan harga mahasiswa."
        : "Famous in Beijing. 4 floors of incredible, affordable food.",
    },
    {
      title: isId ? "Kafe Kampus" : "Campus Coffee",
      icon: Coffee,
      desc: isId
        ? "Banyak kafe untuk kopi pagi atau lembur tugas sampai malam."
        : "Multiple cafes for your morning espresso or late-night study fuel.",
    },
    {
      title: isId ? "Internet Kampus" : "Campus Internet",
      icon: Wifi,
      desc: isId
        ? "WiFi cepat tersedia di seluruh kampus, dengan opsi LAN di asrama."
        : "High-speed WiFi access across the entire campus, with LAN available in dorms.",
    },
    {
      title: isId ? "Bus Shuttle" : "Shuttle Bus",
      icon: Bus,
      desc: isId
        ? "Shuttle rutin ke stasiun subway dan kampus pusat Beijing."
        : "Regular shuttles to the subway and central Beijing campus.",
    },
    {
      title: isId ? "Sepeda Bersama" : "Bike Sharing",
      icon: Bike,
      desc: isId
        ? "Ambil sepeda dari mana saja dan sampai kelas dalam 5 menit."
        : "Grab a bike anywhere to get to class in 5 minutes.",
    },
  ];

  const newDorms: DormitoryCardData[] = [
    {
      title: isId ? "Suite 4 Orang" : "4-Person Suite",
      price: isId ? "~800 RMB/bln" : "~800 RMB/mo",
      features: isId
        ? ["2 Kamar Tidur (2 orang/kamar)", "Kamar mandi pribadi", "AC & pemanas", "Air tidak gratis", "Furnitur modern"]
        : ["2 Bedrooms (2 per room)", "Private Bathroom", "AC & Heating", "Does not provide free water", "Modern Furnishings"],
      image: dormImg1
    }
  ];

  const oldDorms: DormitoryCardData[] = [
    {
      title: isId ? "Kamar 2 Orang" : "2-Person Room",
      price: isId ? "~900 RMB/bln" : "~900 RMB/mo",
      features: isId
        ? ["Kamar mandi pribadi", "Balkon", "AC & pemanas", "Air gratis", "Meja belajar & penyimpanan"]
        : ["Private Bathroom", "Balcony", "AC & Heating", "Water is free", "Desks & Storage"],
      image: dormImg2
    },
    {
      title: isId ? "Kamar 3 Orang" : "3-Person Room",
      price: isId ? "~700 RMB/bln" : "~700 RMB/mo",
      features: isId
        ? ["Kamar mandi pribadi", "Balkon", "AC & pemanas", "Air gratis", "Ruang lebih lega"]
        : ["Private Bathroom", "Balcony", "AC & Heating", "Water is free", "Spacious Layout"],
      image: dormImg2
    },
    {
      title: isId ? "Kamar 4 Orang" : "4-Person Room",
      price: isId ? "900 RMB/bln" : "900 RMB/mo",
      features: isId
        ? ["Kamar mandi pribadi", "Balkon", "Pilihan paling terjangkau", "Air gratis", "Nuansa komunitas"]
        : ["Private Bathroom", "Balcony", "Most Affordable", "Water is free", "Community Feel"],
      image: dormImg3
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const galleryImages = [
    { src: galleryImg1, caption: isId ? "Kampus di Malam Hari" : "Campus at Night" },
    { src: galleryImg2, caption: isId ? "Kampus Saat Musim Gugur" : "Campus in Autumn" },
    { src: galleryImg3, caption: isId ? "Kampus Saat Salju" : "Campus in Snow" },
    { src: galleryImg4, caption: isId ? "Pintu Masuk Asrama Mahasiswa Internasional" : "International Students Dorm Entrance" },
    { src: galleryImg5, caption: isId ? "Kelas Kalkulus" : "Calculus Class" },
    { src: galleryImg6, caption: isId ? "Gala Kampus" : "Campus Gala" },
    { src: galleryImg7, caption: isId ? "Jembatan Taman" : "Park Bridge" },
    { src: galleryImg8, caption: "North Canteen" },
    { src: galleryImg9, caption: isId ? "Makanan Kantin Halal" : "Halal Canteen Food" },
    { src: galleryImg10, caption: isId ? "Makanan Kantin" : "Canteen Food" },
    { src: galleryImg11, caption: isId ? "Gym Lantai 4" : "Gym 4th Floor" },
    { src: galleryImg12, caption: isId ? "Mini Zoo" : "Mini Zoo" },
    { src: galleryImg13, caption: isId ? "Perpustakaan 24/7" : "24/7 Library" },
    { src: galleryImg14, caption: isId ? "Pemandangan Musim Gugur" : "Autumn Scenery" },
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
            {isId ? "Rumahmu di " : "Your Home in "}
            <span className="text-primary">Beijing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {isId
              ? "Fasilitas modern. Makanan enak. Komunitas suportif untuk belajar serius sekaligus hidup nyaman. Berlokasi di Liangxiang, Beijing."
              : "Modern facilities. Incredible food. A community that feels engineered for deep work and family-like support. Located in Liangxiang, Beijing."}
          </motion.p>
        </div>

        {/* Dormitories */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">{isId ? "Tempat Tinggalmu" : "Where You'll Live"}</h2>
            <p className="text-muted-foreground">{isId ? "Terjangkau, nyaman, dan aman." : "Affordable, comfortable, and safe."}</p>
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
                <h2 className="text-2xl md:text-4xl font-display font-bold mb-4 md:mb-6">{isId ? "Kampus Liangxiang" : "Liangxiang Campus"}</h2>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4 md:mb-6">
                  {isId
                    ? "Liangxiang adalah distrik universitas yang berada di pinggiran Beijing, sekitar 30-40 km dari pusat kota. Perjalanan ke pusat kota biasanya 1-2 jam, tergantung kepadatan subway. Luas kampus Liangxiang mencapai 2.001.000 m2."
                    : "Liangxiang is a small university district located outside of Beijing. It is around 30-40 km from central Beijing. Travel from campus to city center typically takes 1-2 hours depending on subway traffic. Liangxiang campus occupies an area of 2,001,000 m2."}
                </p>
                <div className="flex items-center gap-3 md:gap-4 text-slate-300 text-sm md:text-base">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  <span>{isId ? "Perpustakaan menampung 2.500 mahasiswa" : "Library seats 2,500 students"}</span>
                </div>
              </div>
              <div className="h-48 md:h-64 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden relative group">
                <BlurImage src={beijingMap} alt="Map of Liangxiang vs Beijing" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" placeholder="blur" />
              </div>
            </div>
          </motion.div>
          <div className="space-y-16">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-8 text-primary">{isId ? "Gedung Baru (Bohou)" : "New Building (Bohou)"}</h3>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {newDorms.map((dorm, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1 }}
                    className="h-full"
                  >
                    <DormitoryCard dorm={dorm} className="h-full" />
                  </motion.div>
                ))}
              </div>

              {/* Mobile */}
              <div className="md:hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <MobilePeekDeck
                    items={newDorms}
                    ariaLabel={isId ? "Pilihan kamar gedung baru" : "New building room options"}
                    renderItem={(dorm) => <DormitoryCard dorm={dorm} compact />}
                    getItemKey={(dorm) => `${dorm.title}-${dorm.price}`}
                  />
                </motion.div>
              </div>
            </div>

            {/* Old Building */}
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-4 md:mb-8 text-primary">{isId ? "Gedung Lama (Asrama Mahasiswa Internasional)" : "Old Building (International Students Dorm)"}</h3>

              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8">
                {oldDorms.map((dorm, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1 }}
                    className="h-full"
                  >
                    <DormitoryCard dorm={dorm} className="h-full" />
                  </motion.div>
                ))}
              </div>

              {/* Mobile */}
              <div className="md:hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <MobilePeekDeck
                    items={oldDorms}
                    ariaLabel={isId ? "Pilihan kamar gedung lama" : "Old building room options"}
                    renderItem={(dorm) => <DormitoryCard dorm={dorm} compact />}
                    getItemKey={(dorm) => `${dorm.title}-${dorm.price}`}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">{isId ? "Hidup di BIT" : "Life at BIT"}</h2>
            <p className="text-muted-foreground">{isId ? "Semua yang kamu butuhkan ada dalam jarak jalan kaki." : "Everything you need within walking distance."}</p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 md:gap-8"
          >
            {facilities.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl md:rounded-3xl p-4 md:p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-9 h-9 md:w-12 md:h-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </div>
                <h3 className="text-sm md:text-2xl font-bold font-display mb-1.5 md:mb-3">{item.title}</h3>
                <p className="text-xs md:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gallery */}
        <div className="mb-32">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">{isId ? "Momen Kampus" : "Campus Moments"}</h2>
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

      </div>

      {/* Link to Community Page */}
      <PageSegue
        title={isId ? "Kenali Komunitasmu" : "Meet Your Community"}
        description={
          isId
            ? "Bergabung dengan 400+ mahasiswa Indonesia dan temukan sistem dukungan yang bikin BIT terasa seperti rumah."
            : "Join 400+ Indonesian students and discover the support system that makes BIT feel like home."
        }
        buttonText={isId ? "Lihat Komunitas" : "Discover the Community"}
        buttonHref={communityHref}
      />
    </div>
  );
}
