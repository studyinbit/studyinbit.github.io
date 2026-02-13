"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Input } from "@/components/ui/input";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

interface FAQItem {
  q: string;
  a: string;
  quote?: string;
  author?: string;
  category?: string;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function underlineMatches(text: string, query: string) {
  if (!query) return text;

  const regex = new RegExp(escapeRegExp(query), "gi");
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let matchCount = 0;

  for (const match of text.matchAll(regex)) {
    if (match.index == null) continue;

    const start = match.index;
    const end = start + match[0].length;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    parts.push(
      <span
        key={`${start}-${matchCount}`}
        className="underline decoration-blue-500 decoration-2 underline-offset-2"
      >
        {text.slice(start, end)}
      </span>
    );

    matchCount += 1;
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function FAQPage() {
  const { locale } = useLocale();
  const isId = locale === "id";
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategory, setOpenCategory] = useState<"any" | "parents" | "students" | "practical">("any");

  const categories = [
    { key: "any", label: isId ? "Semua" : "Any" },
    { key: "parents", label: isId ? "Orang Tua" : "Parents" },
    { key: "students", label: isId ? "Mahasiswa" : "Students" },
    { key: "practical", label: isId ? "Praktis" : "Practical" },
  ] as const;

  const faqData: Record<"parents" | "students" | "practical", FAQItem[]> = isId ? {
    parents: [
      {
        q: "Apakah anak saya aman di Tiongkok?",
        a: "Ya. Beijing termasuk kota besar yang aman dengan tingkat kriminalitas rendah. Kampus memiliki keamanan 24/7 dan akses asrama terkontrol. Komunitas BIND juga menjadi jaringan pendukung agar tidak ada mahasiswa yang merasa sendirian.",
      },
      {
        q: "Apakah anak saya akan merasa terisolasi?",
        a: "Tidak. Ada 400+ mahasiswa Indonesia di BIT. Organisasi BIND menyediakan komunitas sejak hari pertama, pertemuan rutin mingguan, dan kegiatan budaya. Rasanya benar-benar seperti rumah kedua.",
      },
      {
        q: "Bagaimana kalau anak saya belum bisa bahasa Mandarin?",
        a: "Program berbahasa Inggris tersedia. Selain itu, kampus menyediakan kelas Mandarin (target HSK 4). Banyak mahasiswa datang tanpa dasar Mandarin lalu mencapai level percakapan di tahun kedua.",
      },
      {
        q: "Apakah biayanya terjangkau?",
        a: "BIT jauh lebih terjangkau dibanding banyak kampus di Barat. Total biaya (tanpa beasiswa) sekitar 60.000-80.000 RMB/tahun. Dengan beasiswa (yang didapat banyak mahasiswa Indonesia), biayanya turun signifikan.",
      }
    ],
    students: [
      {
        q: "Apakah saya tetap bisa punya kehidupan sosial?",
        a: "Tentu. Keseimbangan akademik dan sosial sangat didukung. BIND rutin mengadakan acara, turnamen e-sports, dan trip akhir pekan. Di kampus juga ada kafe, lapangan olahraga, dan banyak klub mahasiswa.",
      },
      {
        q: "Bagaimana kualitas makanannya?",
        a: "BIT terkenal dengan makanan yang enak dan terjangkau. North Canteen saja punya 4 lantai dengan banyak pilihan menu. Ada juga kantin Muslim khusus dengan makanan halal.",
      },
      {
        q: "Apakah saya bisa akses Instagram/WhatsApp?",
        a: "Bisa, tapi perlu VPN. Ini hal yang umum bagi mahasiswa internasional. WhatsApp tetap bisa dipakai dengan VPN, tapi WeChat biasanya jadi aplikasi utama untuk kebutuhan harian.",
      }
    ],
    practical: [
      {
        q: "Bagaimana cara kirim uang?",
        a: "Bisa lewat transfer bank (SWIFT), Western Union, atau Alipay. Senior BIND juga membantu setup metode tukar uang yang aman dan umum dipakai mahasiswa.",
      },
      {
        q: "Bagaimana dengan layanan kesehatan?",
        a: "Ada klinik kampus untuk kebutuhan dasar. Asuransi kesehatan komprehensif biasanya termasuk dalam banyak beasiswa. Rumah sakit besar di Beijing juga punya layanan internasional.",
      },
      {
        q: "Apakah orang tua bisa berkunjung?",
        a: "Bisa. Namun biasanya tidak diizinkan menginap di area kampus.",
      },
      {
        q: "VPN apa yang sebaiknya saya gunakan?",
        a: "Ada banyak pilihan VPN global maupun lokal Tiongkok. LetsVPN termasuk yang populer di kalangan mahasiswa dan dosen internasional. Kalau ingin opsi yang lebih fleksibel, kamu juga bisa mempelajari opsi lokal (sering disebut airport VPN).",
      },
      {
        q: "Apakah ada makanan halal?",
        a: "Ada. BIT memiliki kantin halal khusus dengan makanan yang sesuai syariat.",
      }
    ]
  } : {
    parents: [
      {
        q: "Will my child be safe in China?",
        a: "Yes. Beijing is one of the safest major cities globally with low crime rates. The campus has 24/7 security and controlled dorm access. The BIND community also acts as a social safety net, ensuring no student is isolated.",
      },
      {
        q: "Will my child be isolated?",
        a: "Not at all. There are 400+ Indonesian students at BIT. The BIND organization provides immediate community, weekly gatherings, and cultural events. It truly feels like a 'home away from home'.",
      },
      {
        q: "What if my child doesn't speak Chinese?",
        a: "English-taught programs are available. Additionally, the university provides Chinese language courses (aiming for HSK 4). Many students arrive with zero Chinese and reach conversational fluency by Year 2.",
      },
      {
        q: "Is it affordable?",
        a: "BIT is very affordable compared to Western universities. Total cost (without scholarship) is ~60,000-80,000 RMB/year ($9k-12k). With scholarships (which most Indonesians get), costs drop significantly.",
      }
    ],
    students: [
      {
        q: "Will I have a social life?",
        a: "Absolutely. Balance is encouraged. BIND organizes regular events, e-sports tournaments, and weekend trips to Beijing. The campus has cafes, sports courts, and student clubs.",
      },
      {
        q: "Is the food good?",
        a: "BIT is famous for its good value and diverse foods. The North Canteen alone has 4 floors featuring many different foods. There is also a dedicated Muslim canteen with Halal food. You will not go hungry!",
      },
      {
        q: "Can I access Instagram/WhatsApp?",
        a: "Yes, but you need a VPN. It is a standard part of life for international students. WhatsApp works with VPN, but WeChat will become your primary daily app.",
      }
    ],
    practical: [
      {
        q: "How do I send money?",
        a: "Bank transfer (SWIFT), Western Union, or Alipay. BIND seniors also help set up trusted exchange methods.",
      },
      {
        q: "What about medical care?",
        a: "There is a university clinic on campus. Comprehensive medical insurance is included with most scholarships. Major Beijing hospitals have international departments.",
      },
      {
        q: "Can parents visit?",
        a: "Yes! However, they may not be allowed to stay overnight on campus.",
      },
      {
        q: "What VPN should I use?",
        a: "While there are many global & Chinese based VPNs, LetsVPN is the most popular choice amongst international students and teachers. For those willing to put up with more complexity or better value or flexibility you can look into local options (airport VPN).",
      },
      {
        q: "Is there Halal food?",
        a: "Yes! BIT has a dedicated Halal Canteen where all the foods are permissible under Islamic law.",
      }
    ]
  };

  // Flatten for search
  const anyFaqs = Object.entries(faqData).flatMap(([cat, items]) =>
    items.map((item) => ({ ...item, category: cat }))
  );

  const filteredFaqs = searchTerm
    ? anyFaqs.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.q.toLowerCase().includes(searchLower) ||
        item.a.toLowerCase().includes(searchLower) ||
        (item.quote && item.quote.toLowerCase().includes(searchLower)) ||
        (item.author && item.author.toLowerCase().includes(searchLower))
      );
    })
    : openCategory === "any"
      ? anyFaqs
      : faqData[openCategory];

  return (
    <div className="relative overflow-hidden min-h-screen pt-32 pb-20">
      <GradientBlob variant="cool" className="top-0 left-1/4 w-[600px] h-[600px] -translate-x-1/2 opacity-30" />
      <GradientBlob variant="accent" className="bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 opacity-30" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            {isId ? "Pertanyaan Kamu, " : "Your Questions, "}
            <span className="text-primary">{isId ? "Terjawab" : "Answered"}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            {isId
              ? "Kami paham kamu punya banyak pertanyaan. Ini jawaban jujur dari mahasiswa yang sudah menjalaninya."
              : "We know you have concerns. Here are honest answers from students who've been there."}
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder={isId
                ? "Cari pertanyaan spesifik (misalnya: keamanan, makanan, VPN)..."
                : "Search specific questions (e.g., 'safety', 'food', 'VPN')..."}
              className={cn(
                "pl-12 py-6 rounded-full text-lg shadow-sm border-primary/20 focus-visible:ring-primary/50 transition-all duration-300",
                searchTerm ? "bg-white" : "bg-white/40 hover:bg-white/60 focus:bg-white"
              )}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Toggles (only show if not searching) */}
        {!searchTerm && (
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setOpenCategory(cat.key)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${openCategory === cat.key
                    ? "bg-primary text-white shadow-md"
                    : "bg-white border border-border text-muted-foreground hover:bg-gray-50"
                  }`}
              >
                {isId ? "Untuk " : "For "}
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {searchTerm ? (
              // Search Results View
              filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => (
                  <FAQCard
                    key={faq.q}
                    faq={faq}
                    autoOpen={idx === 0 && searchTerm !== ""}
                    highlightQuery={searchTerm}
                  />
                ))
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  {isId
                    ? "Belum ada jawaban yang cocok. Coba tanya langsung via WhatsApp."
                    : "No answers found. Try asking us on WhatsApp!"}
                </div>
              )
            ) : (
              // Category View
              filteredFaqs.map((faq, idx) => (
                <FAQCard key={idx} faq={faq} />
              ))
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center bg-white/50 backdrop-blur-sm border border-white/60 rounded-3xl p-12 shadow-sm">
          <h2 className="text-2xl font-display font-bold mb-4">
            {isId ? "Masih ada pertanyaan?" : "Still have questions?"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isId
              ? "Tim mahasiswa kami siap bantu. Bukan chatbot, langsung senior yang berpengalaman."
              : "Our student team is ready to chat. No chatbots, just real seniors."}
          </p>
          <WhatsAppButton />
          {/* <Button size="lg" className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90" asChild>
            <a href="https://wa.me/8618810362679" target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp <MessageCircle className="ml-2 w-5 h-5" />
            </a>
          </Button> */}
        </div>

      </div>
    </div>
  );
}

function FAQCard({
  faq,
  autoOpen = false,
  highlightQuery = "",
}: {
  faq: FAQItem;
  autoOpen?: boolean;
  highlightQuery?: string;
}) {
  const [isOpen, setIsOpen] = useState(autoOpen);
  const [prevAutoOpen, setPrevAutoOpen] = useState(autoOpen);

  if (autoOpen !== prevAutoOpen) {
    setPrevAutoOpen(autoOpen);
    if (autoOpen && !isOpen) {
      setIsOpen(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-bold text-lg text-foreground pr-8">
          {underlineMatches(faq.q, highlightQuery)}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
              {underlineMatches(faq.a, highlightQuery)}
              {faq.quote && (
                <div className="mt-4 pl-4 border-l-4 border-primary/20 italic text-sm text-foreground/80">
                  &quot;{underlineMatches(faq.quote, highlightQuery)}&quot; <span className="block mt-1 font-semibold text-primary not-italic">— {faq.author}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
