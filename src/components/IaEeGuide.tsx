"use client";

import Link from "next/link";
import { FileText, Award, BookOpen, CheckCircle2, ArrowRight, Lightbulb, Target, Compass } from "lucide-react";

export default function IaEeGuide() {
  return (
    <section id="ia-ee" className="py-20 bg-[#0d1322] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            IB DP Core Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Internal Assessment &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-300 to-emerald-400">
              Extended Essay Guides
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-center text-sm sm:text-base leading-relaxed">
            Step-by-step frameworks, assessment criteria breakdowns, and high-scoring sample research ideas designed to help IB students achieve Level 7 in their ESS Internal Assessment and Extended Essay.
          </p>
        </div>

        {/* 2 Main Cards: IA Guide & EE Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Internal Assessment (IA) Card */}
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-8 space-y-6 flex flex-col justify-between shadow-xl hover:border-teal-500/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-300 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
                  25% of Final IB Grade
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">ESS Internal Assessment (IA)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A 1,500 to 2,250 word individual investigation focusing on a specific environmental issue with local or global relevance.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">Four Assessment Criteria:</div>
                {[
                  { name: "Identifying Context (6 marks)", desc: "Clear environmental issue, RQ, and local connection" },
                  { name: "Planning (6 marks)", desc: "Methodology, variables control, safety & ethics" },
                  { name: "Analysis (6 marks)", desc: "Raw data processing, statistical tests, error analysis" },
                  { name: "Evaluation (6 marks)", desc: "Conclusion linked to RQ, strengths, limitations & solutions" },
                ].map((crit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">{crit.name}:</strong> {crit.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/courses/ess#ia-guide"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-500/20 transition-all"
              >
                Access IA Criteria &amp; Sample Topics
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Extended Essay (EE) Card */}
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-8 space-y-6 flex flex-col justify-between shadow-xl hover:border-indigo-500/40 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  4,000-Word Core Requirement
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">ESS Extended Essay (EE)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                An independent interdisciplinary research paper integrating environmental science with human societal perspectives.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">Key Success Factors:</div>
                {[
                  { name: "Interdisciplinary Focus", desc: "Must balance scientific environmental data with societal/ethical dimensions" },
                  { name: "Focused Research Question", desc: "Narrow geographic or localized scope for deep critical analysis" },
                  { name: "Primary & Secondary Data", desc: "Combining fieldwork, surveys, spatial data, and academic literature" },
                  { name: "Reflective Process", desc: "3 mandatory RPPF reflection sessions with supervisor" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Lightbulb className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">{item.name}:</strong> {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href="/courses/ess#ee-guide"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all"
              >
                Access EE Framework &amp; Guidelines
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
