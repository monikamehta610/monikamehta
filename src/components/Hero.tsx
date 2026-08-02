import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, CheckCircle2, Layers } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#FDF8F3" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left: Text Content */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Status pills */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border"
                style={{ background: "#FAEAE4", borderColor: "#E8D5C8", color: "#C1604A" }}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>IBDP Science Specialist</span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm"
                style={{ background: "#FFFFFF", borderColor: "#E8D5C8", color: "#2C1810" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Accepting Students for 2025–2026
              </div>
            </div>

            {/* Main headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]"
              style={{ color: "#2C1810" }}
            >
              IB Diploma Science Education & Research Guidance
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 text-lg sm:text-xl font-normal leading-relaxed"
              style={{ color: "#7A5C52", lineHeight: "1.6" }}
            >
              Comprehensive IBDP Biology & Environmental Systems (ESS) curriculum materials, interactive slide decks, Internal Assessment (IA) mentorship, and university lecturing.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{
                  background: "#C1604A",
                  boxShadow: "0 4px 14px rgba(193, 96, 74, 0.3)",
                }}
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/courses/ess"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all hover:border-[#C1604A] hover:bg-white"
                style={{
                  borderColor: "#E8D5C8",
                  color: "#2C1810",
                  background: "transparent",
                }}
              >
                <BookOpen className="w-4 h-4" style={{ color: "#C1604A" }} />
                Explore ESS Course
              </Link>
            </div>

            {/* Trust proof points */}
            <div
              className="mt-14 pt-8 border-t grid grid-cols-2 sm:grid-cols-4 gap-6"
              style={{ borderColor: "#E8D5C8" }}
            >
              {[
                { stat: "9+ Years", label: "Teaching & Lecturing" },
                { stat: "100s", label: "Students Mentored" },
                { stat: "7 Units", label: "Complete ESS Course" },
                { stat: "2026 Ready", label: "Updated IB Guide" },
              ].map(({ stat, label }) => (
                <div key={stat}>
                  <div className="text-2xl font-bold tracking-tight" style={{ color: "#2C1810" }}>{stat}</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: "#7A5C52" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual Asset — Layered Slide Deck Stack */}
          <div className="lg:col-span-5 relative hidden lg:block h-[500px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">

              {/* Back Card */}
              <div
                className="absolute w-72 h-80 rounded-2xl border shadow-lg transform rotate-6 translate-x-8 -translate-y-4 transition-transform duration-700"
                style={{ background: "#FFFFFF", borderColor: "#E8D5C8", zIndex: 1 }}
              >
                <div className="p-5 h-full flex flex-col opacity-40">
                  <div className="w-8 h-8 rounded-lg mb-4" style={{ background: "#FAEAE4" }} />
                  <div className="w-3/4 h-3 rounded-full mb-3" style={{ background: "#E8D5C8" }} />
                  <div className="w-1/2 h-3 rounded-full mb-6" style={{ background: "#E8D5C8" }} />
                  <div className="flex-1 rounded-xl" style={{ background: "#FDF8F3" }} />
                </div>
              </div>

              {/* Middle Card */}
              <div
                className="absolute w-72 h-80 rounded-2xl border shadow-xl transform -rotate-3 -translate-x-4 translate-y-2 transition-transform duration-700"
                style={{ background: "#FFFFFF", borderColor: "#E8D5C8", zIndex: 2 }}
              >
                <div className="p-5 h-full flex flex-col opacity-70">
                  <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ background: "#FAEAE4" }}>
                    <Layers className="w-4 h-4" style={{ color: "#C1604A" }} />
                  </div>
                  <div className="w-2/3 h-4 rounded-full mb-3" style={{ background: "#E8D5C8" }} />
                  <div className="w-full h-2 rounded-full mb-2" style={{ background: "#F5EDE3" }} />
                  <div className="w-4/5 h-2 rounded-full mb-6" style={{ background: "#F5EDE3" }} />
                  <div className="flex-1 rounded-xl border border-dashed flex items-center justify-center" style={{ borderColor: "#E8D5C8", background: "#FDF8F3" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: "#E8D5C8" }} />
                  </div>
                </div>
              </div>

              {/* Front Main Card */}
              <div
                className="absolute w-80 h-96 rounded-2xl border shadow-2xl transition-transform duration-500 hover:-translate-y-2"
                style={{ background: "#FFFFFF", borderColor: "#C1604A", zIndex: 3 }}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                      style={{ background: "#C1604A" }}
                    >
                      ESS
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ background: "#FAEAE4", color: "#C1604A" }}
                    >
                      Topic 4.1
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-tight mb-3" style={{ color: "#2C1810" }}>
                    Introduction to Water Systems
                  </h3>
                  <p className="text-xs leading-relaxed mb-6" style={{ color: "#7A5C52" }}>
                    Interactive slide deck covering the hydrological cycle, ocean currents, and global water security.
                  </p>

                  <div className="flex-1 rounded-xl overflow-hidden relative" style={{ background: "#FDF8F3" }}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <div className="w-full h-1/2 border-b border-dashed mb-2" style={{ borderColor: "#E8D5C8" }} />
                      <div className="w-24 h-24 rounded-full border-4 opacity-10" style={{ borderColor: "#C1604A" }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
