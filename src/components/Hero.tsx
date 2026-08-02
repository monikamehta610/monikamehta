import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, CheckCircle2, Layers } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden" style={{ background: "#FAFAF9" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Status pills */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border"
                style={{ background: "#F0F0EE", borderColor: "#E8E5E0", color: "#1C1C1C" }}
              >
                <GraduationCap className="w-3.5 h-3.5" style={{ color: "#1C1C1C" }} />
                <span>IBDP Science Specialist</span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm transition-transform hover:scale-105"
                style={{ background: "#FFFFFF", borderColor: "#E8E5E0", color: "#1A1A1A" }}
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
              style={{ color: "#1A1A1A" }}
            >
              IB Diploma Science Education & Research Guidance
            </h1>

            {/* Subtitle */}
            <p
              className="mt-6 text-lg sm:text-xl font-normal leading-relaxed"
              style={{ color: "#6B6B6B", lineHeight: "1.6" }}
            >
              Comprehensive IBDP Biology & Environmental Systems (ESS) curriculum materials, interactive slide decks, Internal Assessment (IA) mentorship, and university lecturing.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:bg-black hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                style={{ background: "#1C1C1C" }}
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/courses/ess"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border transition-all hover:bg-white hover:border-[#1C1C1C]"
                style={{
                  borderColor: "#E8E5E0",
                  color: "#1A1A1A",
                  background: "transparent",
                }}
              >
                <BookOpen className="w-4 h-4" style={{ color: "#1C1C1C" }} />
                Explore ESS Course
              </Link>
            </div>

            {/* Trust proof points */}
            <div
              className="mt-14 pt-8 border-t grid grid-cols-2 sm:grid-cols-4 gap-6"
              style={{ borderColor: "#E8E5E0" }}
            >
              <div>
                <div className="text-2xl font-bold tracking-tight" style={{ color: "#1A1A1A" }}>9+ Years</div>
                <div className="text-xs mt-1 font-medium" style={{ color: "#6B6B6B" }}>Teaching & Lecturing</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight" style={{ color: "#1A1A1A" }}>100s</div>
                <div className="text-xs mt-1 font-medium" style={{ color: "#6B6B6B" }}>Students Mentored</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight" style={{ color: "#1A1A1A" }}>7 Units</div>
                <div className="text-xs mt-1 font-medium" style={{ color: "#6B6B6B" }}>Complete ESS Course</div>
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight" style={{ color: "#1A1A1A" }}>2026 Ready</div>
                <div className="text-xs mt-1 font-medium" style={{ color: "#6B6B6B" }}>Updated IB Guide</div>
              </div>
            </div>
          </div>

          {/* Right: Visual Asset (Abstract layered slide UI) */}
          <div className="lg:col-span-5 relative hidden lg:block h-[500px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Back Card */}
              <div 
                className="absolute w-72 h-80 rounded-2xl border shadow-lg transform rotate-6 translate-x-8 -translate-y-4 transition-transform duration-700 hover:rotate-12 hover:translate-x-12"
                style={{ background: "#FFFFFF", borderColor: "#E8E5E0", zIndex: 1 }}
              >
                <div className="p-5 h-full flex flex-col opacity-40">
                  <div className="w-8 h-8 rounded-lg mb-4" style={{ background: "#F0F0EE" }} />
                  <div className="w-3/4 h-3 rounded-full mb-3" style={{ background: "#E8E5E0" }} />
                  <div className="w-1/2 h-3 rounded-full mb-6" style={{ background: "#E8E5E0" }} />
                  <div className="flex-1 rounded-xl" style={{ background: "#FAFAF9" }} />
                </div>
              </div>

              {/* Middle Card */}
              <div 
                className="absolute w-72 h-80 rounded-2xl border shadow-xl transform -rotate-3 -translate-x-4 translate-y-2 transition-transform duration-700 hover:-rotate-6 hover:-translate-x-8"
                style={{ background: "#FFFFFF", borderColor: "#E8E5E0", zIndex: 2 }}
              >
                <div className="p-5 h-full flex flex-col opacity-70">
                  <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center" style={{ background: "#F0F0EE" }}>
                    <Layers className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="w-2/3 h-4 rounded-full mb-3" style={{ background: "#E8E5E0" }} />
                  <div className="w-full h-2 rounded-full mb-2" style={{ background: "#FAFAF9" }} />
                  <div className="w-4/5 h-2 rounded-full mb-6" style={{ background: "#FAFAF9" }} />
                  <div className="flex-1 rounded-xl border border-dashed flex items-center justify-center" style={{ borderColor: "#E8E5E0", background: "#FAFAF9" }}>
                     <CheckCircle2 className="w-8 h-8 text-gray-200" />
                  </div>
                </div>
              </div>

              {/* Front Main Card */}
              <div 
                className="absolute w-80 h-96 rounded-2xl border shadow-2xl transform z-10 transition-transform duration-500 hover:-translate-y-2"
                style={{ background: "#FFFFFF", borderColor: "#1C1C1C", zIndex: 3 }}
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm" style={{ background: "#1C1C1C" }}>
                      ESS
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: "#F0F0EE", color: "#1C1C1C" }}>
                      Topic 4.1
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold leading-tight mb-3" style={{ color: "#1A1A1A" }}>
                    Introduction to Water Systems
                  </h3>
                  <p className="text-xs leading-relaxed mb-6" style={{ color: "#6B6B6B" }}>
                    Interactive slide deck covering the hydrological cycle, ocean currents, and global water security.
                  </p>
                  
                  <div className="flex-1 rounded-xl overflow-hidden relative" style={{ background: "#FAFAF9" }}>
                    {/* Mock diagram */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <div className="w-full h-1/2 border-b border-dashed mb-2" style={{ borderColor: "#E8E5E0" }} />
                      <div className="w-24 h-24 rounded-full border-4 opacity-10" style={{ borderColor: "#1C1C1C" }} />
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
