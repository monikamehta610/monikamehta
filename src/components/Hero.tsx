import Link from "next/link";
import { ArrowRight, CheckCircle2, Award, BookOpen, GraduationCap } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "#FAFAF9" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">

          {/* Audience pill */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8 border"
            style={{
              background: "#F0F0EE",
              borderColor: "#E8E5E0",
              color: "#1C1C1C",
            }}
          >
            <GraduationCap className="w-3.5 h-3.5" style={{ color: "#1C1C1C" }} />
            <span>IBDP Science Specialist · 9+ Years Experience</span>
          </div>

          {/* Main headline */}
          <h1
            className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]"
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

          {/* Primary CTA + Secondary Link */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 shadow-sm"
              style={{ background: "#1C1C1C" }}
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/courses/ess"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-colors hover:bg-white"
              style={{
                borderColor: "#E8E5E0",
                color: "#1A1A1A",
                background: "#FAFAF9",
              }}
            >
              <BookOpen className="w-4 h-4" style={{ color: "#1C1C1C" }} />
              Explore ESS Course
            </Link>
          </div>

          {/* Trust proof points */}
          <div
            className="mt-16 pt-8 border-t grid grid-cols-2 sm:grid-cols-4 gap-6"
            style={{ borderColor: "#E8E5E0" }}
          >
            <div>
              <div className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>9+ Years</div>
              <div className="text-xs mt-1" style={{ color: "#6B6B6B" }}>Teaching & Lecturing</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>100s</div>
              <div className="text-xs mt-1" style={{ color: "#6B6B6B" }}>Students Mentored</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>7 Units</div>
              <div className="text-xs mt-1" style={{ color: "#6B6B6B" }}>Complete ESS Course</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>2026 Ready</div>
              <div className="text-xs mt-1" style={{ color: "#6B6B6B" }}>Updated IB Guide</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
