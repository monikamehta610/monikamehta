"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Award, FileText, CheckCircle2, PlayCircle } from "lucide-react";

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
              <span>IB DP Environmental Systems &amp; Societies &amp; Biology</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
              Master IB Science with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-indigo-600">
                Interactive Slides &amp; Guides.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Comprehensive study resources created by <strong>Monika Mehta</strong> — Science Educator with 9+ years of University &amp; IBDP instruction. Interactive slide decks, practice question sets, and Internal Assessment &amp; Extended Essay guides.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
              <Link
                href="/courses/ess"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Explore ESS Slide Decks
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#ia-ee"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:text-slate-900 shadow-xs transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                IA &amp; EE Guidance Portal
              </a>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">25+</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Interactive Topics</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-blue-600">50+</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Custom Diagrams</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">100%</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">2026 IB Syllabus</div>
              </div>
            </div>
          </div>

          {/* Feature Showcase Card */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in-up [animation-delay:0.2s]">
            <div className="relative group w-full max-w-md">
              {/* Soft outer shadow card */}
              <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 shadow-2xl shadow-slate-200/60 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-lg">
                      🌍
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">IB DP ESS Portal</h3>
                      <p className="text-xs text-slate-500">Environmental Systems &amp; Societies</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    SL &amp; HL Ready
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle2, color: "text-emerald-600", title: "Complete Slide Decks", desc: "All 7 units formatted with high-res illustrations" },
                    { icon: FileText, color: "text-blue-600", title: "Practice Questions & Exam Tips", desc: "Paper 1 case studies & Paper 2 9-mark essay guides" },
                    { icon: Award, color: "text-indigo-600", title: "Internal Assessment (IA) Hub", desc: "Criteria breakdown & 15+ sample research topics" },
                    { icon: PlayCircle, color: "text-rose-500", title: "Video Lessons", desc: "YouTube companion tutorials linked to each topic" },
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <feat.icon className={`w-5 h-5 ${feat.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{feat.title}</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Link Button */}
                <Link
                  href="/courses/ess"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Start Studying Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
