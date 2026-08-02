import Link from "next/link";
import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";

const IA_CRITERIA = [
  { name: "Identifying Context", marks: "6 marks", desc: "Clear environmental issue, focused RQ, and local/global context." },
  { name: "Planning", marks: "6 marks", desc: "Methodology, variable control, safety & ethics." },
  { name: "Analysis", marks: "6 marks", desc: "Raw data processing, statistical tests, uncertainty analysis." },
  { name: "Evaluation", marks: "6 marks", desc: "Conclusion linked to RQ, strengths, limitations & solutions." },
];

const EE_FACTORS = [
  { name: "Interdisciplinary Focus", desc: "Balance environmental data with societal and ethical dimensions." },
  { name: "Focused Research Question", desc: "Narrow scope for deep, critical analysis over breadth." },
  { name: "Primary & Secondary Data", desc: "Combine fieldwork, surveys, spatial data, and academic literature." },
  { name: "Reflective Process", desc: "Three mandatory RPPF reflection sessions with supervisor." },
];

export default function IaEeGuide() {
  return (
    <section
      id="ia-ee"
      className="py-24 border-t"
      style={{ background: "#F5F4F2", borderColor: "#E8E5E0" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section heading */}
        <div className="max-w-2xl mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#1C1C1C" }}
          >
            IB DP Core
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
            style={{ color: "#1A1A1A" }}
          >
            Internal Assessment & Extended Essay Guides
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "#6B6B6B", lineHeight: "1.7" }}
          >
            Step-by-step frameworks, assessment criteria breakdowns, and high-scoring sample research ideas to help IB students achieve Level 7 in their ESS IA and Extended Essay.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* IA Card */}
          <div
            className="rounded-2xl border p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#1C1C1C]"
            style={{ background: "#FFFFFF", borderColor: "#E8E5E0" }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-widest"
                    style={{ color: "#1C1C1C" }}
                  >
                    Individual Investigation
                  </span>
                  <h3
                    className="mt-1 text-xl font-semibold leading-snug"
                    style={{ color: "#1A1A1A" }}
                  >
                    Internal Assessment (IA)
                  </h3>
                </div>
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-4"
                  style={{ background: "#F0F0EE", color: "#1C1C1C" }}
                >
                  25% of Grade
                </span>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B", lineHeight: "1.7" }}>
                A 1,500–2,250 word individual investigation focused on a specific environmental issue with local or global relevance.
              </p>

              {/* Criteria */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#9CA3AF" }}>
                  Four Assessment Criteria
                </p>
                {IA_CRITERIA.map((c) => (
                  <div key={c.name} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#1C1C1C" }} />
                    <div>
                      <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
                        {c.name}
                      </span>
                      <span className="text-xs ml-1.5 font-medium" style={{ color: "#9CA3AF" }}>
                        ({c.marks})
                      </span>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6B6B6B" }}>
                        {c.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor: "#E8E5E0" }}>
              <Link
                href="/courses/ess#ia-guide"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "#1C1C1C" }}
              >
                Access IA Criteria & Sample Topics
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* EE Card */}
          <div
            className="rounded-2xl border p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#1C1C1C]"
            style={{ background: "#FFFFFF", borderColor: "#E8E5E0" }}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-widest"
                    style={{ color: "#1C1C1C" }}
                  >
                    Independent Research Paper
                  </span>
                  <h3
                    className="mt-1 text-xl font-semibold leading-snug"
                    style={{ color: "#1A1A1A" }}
                  >
                    Extended Essay (EE)
                  </h3>
                </div>
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-4"
                  style={{ background: "#F5F4F2", color: "#6B6B6B" }}
                >
                  4,000 Words
                </span>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B", lineHeight: "1.7" }}>
                An independent interdisciplinary research paper integrating environmental science with human societal and ethical perspectives.
              </p>

              {/* Key factors */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#9CA3AF" }}>
                  Key Success Factors
                </p>
                {EE_FACTORS.map((f) => (
                  <div key={f.name} className="flex items-start gap-3">
                    <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#1C1C1C" }} />
                    <div>
                      <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
                        {f.name}
                      </span>
                      <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6B6B6B" }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t" style={{ borderColor: "#E8E5E0" }}>
              <Link
                href="/courses/ess#ee-guide"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "#1C1C1C" }}
              >
                Access EE Framework & Guidelines
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
