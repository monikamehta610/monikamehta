"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Award, FileText, CheckCircle2, Calendar, Building2, GraduationCap, Microscope } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-gradient-to-b from-yellow-50/60 via-white to-amber-50/30"
    >
      {/* Soft background glows using #facc15 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] left-[10%] w-[420px] h-[420px] rounded-full blur-[140px] animate-pulse-slow"
          style={{ background: "rgba(250, 204, 21, 0.35)" }}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full blur-[150px] animate-pulse-slow [animation-delay:2s]"
          style={{ background: "rgba(234, 179, 8, 0.2)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8 lg:py-12">
          {/* Main Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-fade-in-up">
            
            {/* Top pill badge using Solar Yellow */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black text-slate-950 border border-yellow-300 shadow-xs"
              style={{ background: "#facc15" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-900 animate-pulse" />
              <span>IBDP Biology &amp; ESS Educator | 9+ Years Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
              Master IB Biology &amp; ESS with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-600 to-slate-900">
                Expert Guidance.
              </span>
            </h1>

            {/* Subheading focusing on tutoring & lecturing */}
            <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed">
              Hi, I&apos;m <strong>Monika Mehta</strong>. With over 9 years of university lecturing and IBDP Biology &amp; ESS instruction experience, I help students achieve Level 7 IB scores and master complex scientific concepts with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-slate-950 font-black text-sm shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto cursor-pointer"
                style={{ background: "linear-gradient(135deg, #facc15 0%, #eab308 100%)" }}
              >
                <Calendar className="w-4 h-4" />
                Book a Free 15-Min Intro Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/courses/ess"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-yellow-300/80 text-slate-800 font-bold text-sm hover:bg-yellow-50 hover:text-slate-950 shadow-xs transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                Browse Course Materials
              </Link>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-yellow-200/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">9+</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600">100s</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">Students Taught</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-yellow-600">Level 7</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">IB Mastery Track</div>
              </div>
            </div>
          </div>

          {/* Educator & Services Card */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in-up [animation-delay:0.2s]">
            <div className="relative group w-full max-w-md">
              {/* Soft outer shadow card */}
              <div className="relative rounded-3xl border border-yellow-200/90 bg-white/95 backdrop-blur-xl p-6 shadow-2xl shadow-slate-900/5 space-y-5">
                <div className="flex items-center justify-between border-b border-yellow-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-yellow-300 flex items-center justify-center text-slate-950 font-black text-lg"
                      style={{ background: "#facc15" }}
                    >
                      🎓
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Educational Services</h3>
                      <p className="text-xs text-slate-600">Tutoring &amp; Academic Lecturing</p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-black uppercase tracking-wider text-slate-950 px-2.5 py-1 rounded-full border border-yellow-300"
                    style={{ background: "#facc15" }}
                  >
                    Accepting Students
                  </span>
                </div>

                {/* Services List */}
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle2, color: "text-amber-600", title: "IBDP Biology & ESS Tutoring", desc: "One-on-one personalized coaching targeting Level 7 scores" },
                    { icon: Award, color: "text-yellow-600", title: "Internal Assessment (IA) Mentorship", desc: "Expert guidance from topic selection to data analysis" },
                    { icon: FileText, color: "text-slate-800", title: "University Science Lecturing", desc: "Microbiology, Genetics, and General Biology instruction" },
                    { icon: Sparkles, color: "text-amber-500", title: "Interactive Course & Exam Strategy", desc: "Full slide decks, Paper 1 & 2 exam strategies & mark schemes" },
                  ].map((service, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-yellow-50/50 border border-yellow-100">
                      <service.icon className={`w-5 h-5 ${service.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{service.title}</div>
                        <div className="text-[11px] text-slate-600 leading-tight">{service.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary CTA button using Solar Yellow */}
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-slate-950 font-black text-xs shadow-md transition-colors"
                  style={{ background: "linear-gradient(135deg, #facc15 0%, #eab308 100%)" }}
                >
                  Book a Consultation Session
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Credibility & Social Proof Strip */}
        <div className="mt-10 pt-8 border-t border-yellow-200/80">
          <p className="text-center text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-6">
            Institutional Teaching &amp; Industry Experience
          </p>

          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
            {[
              {
                name: "Fountainhead School",
                role: "IB World School Educator",
                icon: GraduationCap,
                color: "text-amber-600",
              },
              {
                name: "Uka Tarsadia University",
                role: "Assistant Professor & Lecturer",
                icon: Building2,
                color: "text-yellow-600",
              },
              {
                name: "Arkray Healthcare Pvt. Ltd.",
                role: "Biotech & Quality Control Executive",
                icon: Microscope,
                color: "text-slate-800",
              },
            ].map((inst, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-yellow-200/90 shadow-xs hover:shadow-md hover:border-yellow-300 transition-all duration-200 grayscale hover:grayscale-0"
              >
                <div className="p-2 rounded-xl" style={{ background: "#facc15" }}>
                  <inst.icon className={`w-5 h-5 ${inst.color}`} />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">{inst.name}</div>
                  <div className="text-[10px] font-semibold text-slate-600">{inst.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
