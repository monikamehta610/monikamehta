"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Award, FileText, CheckCircle2, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
    >
      {/* Soft background glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-emerald-400/10 blur-[140px] animate-pulse-slow [animation-delay:2s]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8 lg:py-16">
          {/* Main Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-fade-in-up">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Science Educator, IBDP Specialist &amp; Biotech Professional</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
              Elevating Science Education &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-indigo-600">
                Academic Performance.
              </span>
            </h1>

            {/* Subheading focusing on tutoring/lecturing lead generation */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Hi, I&apos;m <strong>Monika Mehta</strong>. With 9+ years of University lecturing, IBDP Biology &amp; ESS instruction, and Industrial Quality Control experience, I help students achieve Level 7 IB scores and universities deliver high-impact science education.
            </p>

            {/* CTA Buttons - Primary: Book Intro Call / Tutoring; Secondary: Study Slides */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book a Free 15-Min Intro Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/courses/ess"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Browse Course Materials
              </Link>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">9+</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-blue-600">100s</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Students Taught</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">Level 7</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">IB Mastery Track</div>
              </div>
            </div>
          </div>

          {/* Educator & Services Card */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in-up [animation-delay:0.2s]">
            <div className="relative group w-full max-w-md">
              {/* Soft outer shadow card */}
              <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 shadow-2xl shadow-slate-200/60 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-lg">
                      🎓
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Educational Services</h3>
                      <p className="text-xs text-slate-500">Tutoring, Lecturing &amp; Consulting</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Accepting Students
                  </span>
                </div>

                {/* Services List */}
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle2, color: "text-blue-600", title: "IBDP Biology & ESS Tutoring", desc: "One-on-one personalized coaching targeting Level 7 scores" },
                    { icon: Award, color: "text-emerald-600", title: "Internal Assessment (IA) Mentorship", desc: "Expert guidance from topic selection to data analysis" },
                    { icon: FileText, color: "text-indigo-600", title: "University Science Lecturing", desc: "Microbiology, Genetics, and General Biology instruction" },
                    { icon: Sparkles, color: "text-amber-500", title: "Biotech Quality Control Consulting", desc: "9+ years industrial QC and laboratory compliance background" },
                  ].map((service, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <service.icon className={`w-5 h-5 ${service.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{service.title}</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{service.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary CTA button */}
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Book a Consultation Session
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
