"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Award, FileText, CheckCircle2, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0b0f19]"
    >
      {/* Dynamic Background glowing blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-[380px] h-[380px] rounded-full bg-teal-500/15 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[15%] right-[8%] w-[420px] h-[420px] rounded-full bg-indigo-600/15 blur-[140px] animate-pulse-slow [animation-delay:2s]" />
        <div className="absolute top-[40%] right-[30%] w-[250px] h-[250px] rounded-full bg-cyan-500/10 blur-[90px] animate-pulse-slow [animation-delay:4s]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8 lg:py-16">
          {/* Main Hero Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-fade-in-up">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-800/90 text-teal-300 border border-teal-500/30 shadow-lg shadow-teal-500/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>IB DP Environmental Systems &amp; Societies &amp; Biology</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Master IB DP Science with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-indigo-400">
                Interactive Excellence.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Comprehensive study resources created by <strong>Monika Mehta</strong> — Science Educator with 9+ years of University &amp; IBDP instruction. Complete slide decks, practice question sets, and Internal Assessment &amp; Extended Essay guides.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto pt-2">
              <Link
                href="/courses/ess"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Explore ESS Slide Decks
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#ia-ee"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-700/80 hover:text-white transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                IA &amp; EE Guidance Portal
              </a>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">25+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Interactive Topics</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-teal-400">50+</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Custom Diagrams</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-400">100%</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">2026 IB Syllabus</div>
              </div>
            </div>
          </div>

          {/* Feature Showcase Card */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in-up [animation-delay:0.2s]">
            <div className="relative group w-full max-w-md">
              {/* Glow backdrop */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-teal-500 via-indigo-500 to-emerald-500 opacity-25 group-hover:opacity-40 blur-2xl transition-all duration-500 animate-float" />

              {/* Glassmorphism Card */}
              <div className="relative rounded-3xl border border-slate-700/80 bg-slate-900/90 backdrop-blur-xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 font-black text-lg">
                      🌍
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">IB DP ESS Portal</h3>
                      <p className="text-xs text-slate-400">Environmental Systems &amp; Societies</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                    SL &amp; HL Ready
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle2, color: "text-emerald-400", title: "Complete Slide Decks", desc: "All 7 units formatted with high-res illustrations" },
                    { icon: FileText, color: "text-indigo-400", title: "Practice Questions & Exam Tips", desc: "Paper 1 case studies & Paper 2 9-mark essay guides" },
                    { icon: Award, color: "text-teal-400", title: "Internal Assessment (IA) Hub", desc: "Criteria breakdown & 15+ sample research topics" },
                    { icon: PlayCircle, color: "text-rose-400", title: "Video Lessons", desc: "YouTube companion tutorials linked to each topic" },
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800">
                      <feat.icon className={`w-5 h-5 ${feat.color} flex-shrink-0 mt-0.5`} />
                      <div>
                        <div className="text-xs font-bold text-slate-200">{feat.title}</div>
                        <div className="text-[11px] text-slate-400 leading-tight">{feat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Link Button */}
                <Link
                  href="/courses/ess"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold text-xs border border-slate-700 transition-colors"
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
