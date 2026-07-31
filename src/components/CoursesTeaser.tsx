import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, GraduationCap, CheckCircle2 } from "lucide-react";
import { COURSES } from "@/data/courses";

export default function CoursesTeaser() {
  const essCourse = COURSES.find((c) => c.slug === "ess");
  const bioCourse = COURSES.find((c) => c.slug === "biology");
  const essCount = essCourse ? essCourse.slides.filter((s) => s.status !== "coming-soon").length : 0;
  const bioCount = bioCourse ? bioCourse.slides.filter((s) => s.status !== "coming-soon").length : 0;

  return (
    <section id="courses" className="py-20 bg-[#0f172a] border-t border-slate-800/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-300 border border-teal-500/20">
            <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
            Curriculum Guide (First Assessment 2026)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            IB DP Science{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-indigo-400">
              Courses &amp; Slides
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl text-center text-sm sm:text-base leading-relaxed">
            Interactive, slide-based study resources aligned with the official IB Diploma guide — with embedded custom diagrams, practice questions, and video companions.
          </p>
        </div>

        {/* Two subject cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: "🌍",
              label: "ESS",
              full: "Environmental Systems & Societies",
              desc: "Complete 7-unit interactive slide decks covering Ecosystems, Biodiversity, Water, Land, Atmosphere, and Sustainability.",
              badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/30",
              btnColor: "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-teal-500/20",
              href: "/courses/ess",
              count: essCount,
              total: essCourse ? essCourse.slides.length : 25,
            },
            {
              icon: "🧬",
              label: "Biology",
              full: "IB DP Biology SL & HL",
              desc: "Cell biology, molecular genetics, ecology, evolution, and human physiology — interactive slides coming soon.",
              badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
              btnColor: "bg-slate-800 text-slate-300 border border-slate-700",
              href: "/courses/biology",
              count: bioCount,
              total: bioCourse ? bioCourse.slides.length : 20,
            },
          ].map((card) => (
            <Link key={card.label} href={card.href} className="group block" style={{ textDecoration: "none" }}>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-7 hover:border-teal-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between space-y-6">
                
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{card.icon}</span>
                    <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.count > 0 ? `${card.count} / ${card.total} Topics Live` : "Coming Soon"}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xl text-white group-hover:text-teal-400 transition-colors">
                      {card.full}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    SL &amp; HL Covered
                  </span>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-teal-400 group-hover:translate-x-1 transition-transform">
                    {card.count > 0 ? "View All Topics & Slides" : "Explore Course"}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
