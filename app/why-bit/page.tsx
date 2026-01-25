"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, Award, Zap } from "lucide-react";
import { GradientBlob } from "@/components/ui/GradientBlob";

export default function WhyBitPage() {
  return (
    <div className="relative overflow-hidden min-h-screen pt-32 pb-20">
      <GradientBlob variant="warm" className="top-20 left-0 w-[600px] h-[600px] -translate-x-1/3 opacity-30" />
      <GradientBlob variant="cool" className="bottom-0 right-0 w-[500px] h-[500px] translate-x-1/3 opacity-30" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Backed by the <span className="text-gradient-warm">Nation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            BIT is not just a university. It is a premier member of the &quot;Seven Sons of National Defense&quot; (国防七子) — institutions administered by the Ministry of Industry and Information Technology (MIIT) to drive China&apos;s technological sovereignty.
          </motion.p>
        </div>

        {/* The Seven Sons Explanation */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                    While other universities struggle for grants, BIT’s labs are capitalized by the state’s most critical projects. This ensures priority in aerospace, high-end manufacturing, and national security research.
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

          {/* Visual Element (Placeholder for illustration) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden flex items-center justify-center border border-white/50 shadow-inner"
          >
             <div className="absolute inset-0 bg-[url('/images/uni/IMG_20251101_124832167.CCD.webp')] bg-cover bg-center opacity-80" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <p className="text-white font-bold text-2xl">Research Priority</p>
                <p className="text-white/80">Aerospace & Defense Engineering</p>
             </div>
          </motion.div>
        </div>

        {/* Rankings Table */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">The Metrics That Matter</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              For Indonesian families, the disconnect between general rankings and specific engineering power is the most critical data point.
            </p>
          </div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="overflow-hidden rounded-3xl border border-border bg-white/40 backdrop-blur-sm shadow-xl"
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
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-6 font-medium">ARWU (Shanghai Ranking) 2025</td>
                  <td className="p-6 font-bold text-xl">#102</td>
                  <td className="p-6 text-muted-foreground text-sm leading-relaxed">
                    <strong className="text-foreground block mb-1">The Hard Science Metric.</strong>
                    Being on the cusp of the Top 100 globally signals immense research productivity.
                  </td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-6 font-medium">QS Graduate Employability</td>
                  <td className="p-6 font-bold text-xl text-emerald-600">#9</td>
                  <td className="p-6 text-muted-foreground text-sm leading-relaxed">
                    <strong className="text-foreground block mb-1">The ROI Metric.</strong>
                    BIT graduates are valued higher by employers than graduates from &quot;higher ranked&quot; but less practical universities.
                  </td>
                </tr>
                <tr className="hover:bg-white/40 transition-colors">
                  <td className="p-6 font-medium">NTU Ranking (Engineering)</td>
                  <td className="p-6 font-bold text-xl text-emerald-600">#14</td>
                  <td className="p-6 text-muted-foreground text-sm leading-relaxed">
                    <strong className="text-foreground block mb-1">The Truth.</strong>
                    In pure engineering output, BIT is a global top-15 institution, outranking many Ivy League schools.
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* Chinese Language Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
           <div className="order-2 md:order-1">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative rounded-3xl overflow-hidden shadow-xl border border-border group"
             >
                <div className="aspect-video relative">
                   <img src="/images/shanghai.webp" alt="Shanghai Skyline - China's Rise" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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

        {/* Location Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-20">
             <GradientBlob variant="cool" className="translate-x-1/2" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">The Geography of Focus</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Liangxiang is 30-40km from central Beijing. This isolation is a feature. In the city, distractions are infinite. In Liangxiang, the environment is engineered for deep work.
              </p>
              <div className="flex items-center gap-4 text-slate-300">
                <Shield className="w-5 h-5 text-emerald-400" />
                <span>Library seats 2,500 students</span>
              </div>
            </div>
             <div className="h-64 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden relative group">
                <img src="/images/beijing-map.webp" alt="Map of Liangxiang vs Beijing" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
