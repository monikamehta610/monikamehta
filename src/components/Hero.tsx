"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Award, FileText, CheckCircle2, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50"
    >
      {/* Soft background glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-orange-400/10 blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-amber-400/10 blur-[140px] animate-pulse-slow [animation-delay:2s]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8 lg:py-16">
          {/* Main Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-fade-in-up">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
              <span>IBDP Biology &amp; ESS Educator | 9+ Years Experience</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-stone-900">
              Master IB Biology &amp; ESS with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600">
                Expert Guidance.
              </span>
            </h1>

            {/* Subheading focusing on tutoring & lecturing */}
            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Hi, I&apos;m <strong>Monika Mehta</strong>. With over 9 years of university lecturing and IBDP Biology &amp; ESS instruction experience, I help students achieve Level 7 IB scores and master complex scientific concepts with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-orange-600 text-white font-extrabold text-sm shadow-lg shadow-orange-600/25 hover:bg-orange-700 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book a Free 15-Min Intro Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/courses/ess"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-50 hover:text-stone-900 shadow-xs transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                Browse Course Materials
              </Link>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-stone-900">9+</div>
                <div className="text-xs text-stone-500 font-semibold mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-orange-600">100s</div>
                <div className="text-xs text-stone-500 font-semibold mt-0.5">Students Taught</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600">Level 7</div>
                <div className="text-xs text-stone-500 font-semibold mt-0.5">IB Mastery Track</div>
              </div>
            </div>
          </div>

          {/* Educator & Services Card */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in-up [animation-delay:0.2s]">
            <div className="relative group w-full max-w-md">
              {/* Soft outer shadow card */}
              <div className="relative rounded-3xl border border-stone-200/90 bg-white/95 backdrop-blur-xl p-6 shadow-2xl shadow-stone-200/60 space-y-5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 font-black text-lg">
                      🎓
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900 text-base">Educational Services</h3>
                      <p className="text-xs text-stone-500">Tutoring &amp; Academic Lecturing</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Accepting Students
                  </span>
                </div>

                {/* Services List */}
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle2, color: "text-orange-600", title: "IBDP Biology & ESS Tutoring", desc: "One-on-one personalized coaching targeting Level 7 scores" },
                    { icon: Award, color: "text-amber-600", title: "Internal Assessment (IA) Mentorship", desc: "Expert guidance from topic selection to data analysis" },
                    { icon: FileText, color: "text-emerald-600", title: "University Science Lecturing", desc: "Microbiology, Genetics, and General Biology instruction" },
                    { icon: Sparkles, color: "text-stone-700", title: "Interactive Course & Exam Strategy", desc: "Full slide decks, Paper 1 & 2 exam strategies & mark schemes" },
                  ].map((service, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                      <service.icon className={`w-5 h-5 ${service.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <div className="text-xs font-bold text-stone-900">{service.title}</div>
                        <div className="text-[11px] text-stone-500 leading-tight">{service.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary CTA button */}
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors"
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
