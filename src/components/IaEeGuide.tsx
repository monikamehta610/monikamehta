import Link from "next/link";
import { ArrowRight, CheckCircle2, Lightbulb, FileText, Target, BookOpen } from "lucide-react";

const IA_CRITERIA = [
  { name: "Identifying Context", desc: "Clear environmental issue, focused RQ, and local/global context." },
  { name: "Planning", desc: "Methodology, variable control, safety & ethics." },
  { name: "Analysis", desc: "Raw data processing, statistical tests, uncertainty analysis." },
  { name: "Evaluation", desc: "Conclusion linked to RQ, strengths, limitations & solutions." },
];

const EE_FACTORS = [
  { name: "Interdisciplinary Focus", desc: "Balance environmental data with societal and ethical dimensions." },
  { name: "Focused Research Question", desc: "Narrow scope for deep, critical analysis over breadth." },
  { name: "Primary & Secondary Data", desc: "Combine fieldwork, surveys, spatial data, and academic literature." },
  { name: "Reflective Process", desc: "Three mandatory RPPF reflection sessions with supervisor." },
];

export default function IaEeGuide() {
  return (
    <section
      id="ia-ee"
      className="py-24 border-t"
      style={{ background: "#F5F4F2", borderColor: "#E8E5E0" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section heading */}
        <div className="max-w-2xl mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#1C1C1C" }}
          >
            IB DP Core
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
            style={{ color: "#1A1A1A" }}
          >
            Internal Assessment & Extended Essay
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "#6B6B6B", lineHeight: "1.7" }}
          >
            A high-level breakdown of the two most critical independent research components in the IB Diploma Programme.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          
          {/* Tile 1: IA Hero (Col span 2) */}
          <div
            className="md:col-span-2 rounded-3xl border p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
            style={{ background: "#FFFFFF", borderColor: "#E8E5E0" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F0F0EE" }}>
                  <Target className="w-5 h-5" style={{ color: "#1C1C1C" }} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#1C1C1C" }}>Individual Investigation</span>
                  <h3 className="text-xl font-bold" style={{ color: "#1A1A1A" }}>Internal Assessment (IA)</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {IA_CRITERIA.map((c, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-1.5" style={{ color: "#1A1A1A" }}>
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#1C1C1C" }} />
                      {c.name} (6 Marks)
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B6B6B" }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t flex items-center justify-between" style={{ borderColor: "#E8E5E0" }}>
              <span className="text-xs font-semibold" style={{ color: "#9CA3AF" }}>24 Total Marks</span>
              <Link href="/courses/ess#ia-guide" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75" style={{ color: "#1C1C1C" }}>
                Access Guide & Topics <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Tile 2: IA Stats (Col span 1) */}
          <div
            className="md:col-span-1 rounded-3xl border p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-md"
            style={{ background: "#1C1C1C", borderColor: "#1C1C1C" }}
          >
             <h3 className="text-5xl font-bold tracking-tighter mb-2" style={{ color: "#FFFFFF" }}>25%</h3>
             <p className="text-sm font-medium mb-6" style={{ color: "#9CA3AF" }}>of final ESS grade</p>
             <div className="w-full h-px bg-white/10 mb-6" />
             <div className="flex items-center justify-center gap-2 text-sm font-medium text-white mb-1">
               <FileText className="w-4 h-4" /> 1,500 - 2,250
             </div>
             <p className="text-xs text-white/60">Words Required</p>
          </div>

          {/* Tile 3: EE Stats (Col span 1) */}
          <div
            className="md:col-span-1 rounded-3xl border p-8 flex flex-col justify-center items-center text-center transition-all duration-300 hover:shadow-md"
            style={{ background: "#FFFFFF", borderColor: "#E8E5E0" }}
          >
             <h3 className="text-4xl font-bold tracking-tighter mb-2" style={{ color: "#1A1A1A" }}>4,000</h3>
             <p className="text-sm font-medium mb-6" style={{ color: "#6B6B6B" }}>Max Word Count</p>
             <div className="w-full h-px mb-6" style={{ background: "#E8E5E0" }} />
             <div className="flex items-center justify-center gap-2 text-sm font-bold mb-1" style={{ color: "#1C1C1C" }}>
               <BookOpen className="w-4 h-4" /> Interdisciplinary
             </div>
             <p className="text-xs" style={{ color: "#9CA3AF" }}>Societal & Ethical Focus</p>
          </div>

          {/* Tile 4: EE Hero (Col span 2) */}
          <div
            className="md:col-span-2 rounded-3xl border p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
            style={{ background: "#FFFFFF", borderColor: "#E8E5E0" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F0F0EE" }}>
                  <Lightbulb className="w-5 h-5" style={{ color: "#1C1C1C" }} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#1C1C1C" }}>Independent Research</span>
                  <h3 className="text-xl font-bold" style={{ color: "#1A1A1A" }}>Extended Essay (EE)</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {EE_FACTORS.map((f, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-1.5" style={{ color: "#1A1A1A" }}>
                       <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#1C1C1C" }} />
                      {f.name}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B6B6B" }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t flex items-center justify-end" style={{ borderColor: "#E8E5E0" }}>
              <Link href="/courses/ess#ee-guide" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75" style={{ color: "#1C1C1C" }}>
                Access EE Framework <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
