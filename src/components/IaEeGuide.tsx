"use client";

import Link from "next/link";
import { Award, CheckCircle2, ArrowRight, Lightbulb, Target, Compass } from "lucide-react";

export default function IaEeGuide() {
  return (
    <section id="ia-ee" className="py-20 bg-white border-t border-slate-200/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            IB DP Core Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Internal Assessment &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-600 to-indigo-600">
              Extended Essay Guides
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl text-center text-sm sm:text-base leading-relaxed">
            Step-by-step frameworks, assessment criteria breakdowns, and high-scoring sample research ideas designed to help IB students achieve Level 7 in their ESS Internal Assessment and Extended Essay.
          </p>
        </div>

        {/* 2 Main Cards: IA Guide & EE Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Internal Assessment (IA) Card */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-8 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-blue-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-100/80 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  25% of Final IB Grade
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">ESS Internal Assessment (IA)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A 1,500 to 2,250 word individual investigation focusing on a specific environmental issue with local or global relevance.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Four Assessment Criteria:</div>
                {[
                  { name: "Identifying Context (6 marks)", desc: "Clear environmental issue, RQ, and local connection" },
                  { name: "Planning (6 marks)", desc: "Methodology, variables control, safety & ethics" },
                  { name: "Analysis (6 marks)", desc: "Raw data processing, statistical tests, error analysis" },
                  { name: "Evaluation (6 marks)", desc: "Conclusion linked to RQ, strengths, limitations & solutions" },
                ].map((crit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">{crit.name}:</strong> {crit.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                href="/courses/ess#ia-guide"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
              >
                Access IA Criteria &amp; Sample Topics
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Extended Essay (EE) Card */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-8 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100/80 border border-indigo-200 flex items-center justify-center text-indigo-600">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  4,000-Word Core Requirement
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">ESS Extended Essay (EE)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                An independent interdisciplinary research paper integrating environmental science with human societal perspectives.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Success Factors:</div>
                {[
                  { name: "Interdisciplinary Focus", desc: "Must balance scientific environmental data with societal/ethical dimensions" },
                  { name: "Focused Research Question", desc: "Narrow geographic or localized scope for deep critical analysis" },
                  { name: "Primary & Secondary Data", desc: "Combining fieldwork, surveys, spatial data, and academic literature" },
                  { name: "Reflective Process", desc: "3 mandatory RPPF reflection sessions with supervisor" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Lightbulb className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">{item.name}:</strong> {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <Link
                href="/courses/ess#ee-guide"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all"
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
