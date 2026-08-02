"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Building2, GraduationCap, Microscope, CheckCircle2 } from "lucide-react";

const INSTITUTIONS = [
  { name: "Fountainhead School", role: "IB World School Educator", icon: GraduationCap },
  { name: "Uka Tarsadia University", role: "Assistant Professor & Lecturer", icon: Building2 },
  { name: "Arkray Healthcare Pvt. Ltd.", role: "Biotech & QC Executive", icon: Microscope },
];

const SERVICES = [
  "IBDP Biology & ESS Tutoring",
  "Internal Assessment (IA) Mentorship",
  "University Science Lecturing",
  "Exam Strategy & Mark Scheme Guides",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-20 pb-16 overflow-hidden"
      style={{ background: "#FAFAF9" }}
    >
      {/* Subtle sage glow — barely visible, just adds depth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(46,107,79,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center py-12">

          {/* ── Left: Text content ── */}
          <div className="flex flex-col items-start space-y-8 animate-fade-in-up">

            {/* Credential tag — understated, not a loud badge */}
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#2E6B4F" }}
              />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ color: "#2E6B4F" }}
              >
                IBDP Biology & ESS Educator · 9+ Years Experience
              </span>
            </div>

            {/* Headline — bold, restrained, clear */}
            <div className="space-y-3">
              <h1
                className="text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.12] tracking-tight"
                style={{ color: "#1A1A1A" }}
              >
                Master IB Biology & ESS with Expert Guidance.
              </h1>
              <p
                className="text-base sm:text-lg leading-relaxed max-w-lg"
                style={{ color: "#6B6B6B", lineHeight: "1.75" }}
              >
                I&apos;m <strong style={{ color: "#1A1A1A", fontWeight: 600 }}>Monika Mehta</strong> — an IBDP educator and university lecturer helping students achieve Level 7 IB scores and master complex scientific concepts with clarity and confidence.
              </p>
            </div>

            {/* Primary + Secondary CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-lg cursor-pointer"
                style={{ background: "#2E6B4F" }}
              >
                <Calendar className="w-4 h-4" />
                Book a Free 15-Min Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/courses/ess"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:bg-white cursor-pointer"
                style={{
                  borderColor: "#E8E5E0",
                  color: "#1A1A1A",
                  background: "transparent",
                }}
              >
                <BookOpen className="w-4 h-4" style={{ color: "#2E6B4F" }} />
                Browse Course Materials
              </Link>
            </div>

            {/* Stats — minimal, spaced */}
            <div
              className="flex items-center gap-10 pt-4 border-t w-full"
              style={{ borderColor: "#E8E5E0" }}
            >
              {[
                { value: "9+", label: "Years Teaching" },
                { value: "100s", label: "Students Taught" },
                { value: "Level 7", label: "IB Target Track" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: "#1A1A1A" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: "#9CA3AF" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Clean services card ── */}
          <div className="animate-fade-in-up [animation-delay:0.15s]">
            <div
              className="rounded-2xl border p-8 space-y-6"
              style={{
                background: "#FFFFFF",
                borderColor: "#E8E5E0",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Card header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-widest"
                    style={{ color: "#2E6B4F" }}
                  >
                    Educational Services
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: "#E8F5EE",
                      color: "#2E6B4F",
                    }}
                  >
                    Accepting Students
                  </span>
                </div>
                <h2
                  className="text-xl font-semibold leading-snug"
                  style={{ color: "#1A1A1A" }}
                >
                  Tutoring & Academic Lecturing
                </h2>
                <p className="text-sm" style={{ color: "#6B6B6B" }}>
                  One-on-one coaching tailored to each student&apos;s goals, learning pace, and IB requirements.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t" style={{ borderColor: "#E8E5E0" }} />

              {/* Services list */}
              <ul className="space-y-3">
                {SERVICES.map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: "#2E6B4F" }}
                    />
                    <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
                      {service}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="border-t" style={{ borderColor: "#E8E5E0" }} />

              {/* CTA */}
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 cursor-pointer"
                style={{ background: "#2E6B4F" }}
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Institution strip — minimal, trusted ── */}
        <div
          className="mt-8 pt-8 border-t"
          style={{ borderColor: "#E8E5E0" }}
        >
          <p
            className="text-center text-[11px] font-medium uppercase tracking-widest mb-6"
            style={{ color: "#9CA3AF" }}
          >
            Teaching & Industry Experience
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
            {INSTITUTIONS.map((inst) => (
              <div
                key={inst.name}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200 hover:shadow-sm"
                style={{
                  background: "#FFFFFF",
                  borderColor: "#E8E5E0",
                }}
              >
                <inst.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#2E6B4F" }} />
                <div>
                  <div className="text-xs font-semibold" style={{ color: "#1A1A1A" }}>
                    {inst.name}
                  </div>
                  <div className="text-[10px]" style={{ color: "#9CA3AF" }}>
                    {inst.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
