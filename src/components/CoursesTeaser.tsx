import Link from "next/link";
import { ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";
import { COURSES } from "@/data/courses";

export default function CoursesTeaser() {
  const essCourse = COURSES.find((c) => c.slug === "ess");
  const bioCourse = COURSES.find((c) => c.slug === "biology");
  const essCount = essCourse ? essCourse.slides.filter((s) => s.status !== "coming-soon").length : 0;
  const bioCount = bioCourse ? bioCourse.slides.filter((s) => s.status !== "coming-soon").length : 0;

  return (
    <section id="courses" className="py-20 bg-emerald-50/50 border-t border-emerald-200/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
            Curriculum Guide (First Assessment 2026)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950">
            IB DP Science{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900">
              Courses &amp; Slides
            </span>
          </h2>
          <p className="text-emerald-900/80 max-w-xl text-center text-sm sm:text-base leading-relaxed">
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
              badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
              href: "/courses/ess",
              count: essCount,
              total: essCourse ? essCourse.slides.length : 25,
            },
            {
              icon: "🧬",
              label: "Biology",
              full: "IB DP Biology SL & HL",
              desc: "Cell biology, molecular genetics, ecology, evolution, and human physiology — interactive slides coming soon.",
              badgeColor: "bg-teal-100 text-teal-900 border-teal-200",
              href: "/courses/biology",
              count: bioCount,
              total: bioCourse ? bioCourse.slides.length : 20,
            },
          ].map((card) => (
            <Link key={card.label} href={card.href} className="group block" style={{ textDecoration: "none" }}>
              <div className="rounded-3xl border border-emerald-200 bg-white p-7 hover:border-emerald-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 cursor-pointer h-full flex flex-col justify-between space-y-6">
                
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{card.icon}</span>
                    <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.count > 0 ? `${card.count} / ${card.total} Topics Live` : "Coming Soon"}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xl text-emerald-950 group-hover:text-emerald-700 transition-colors">
                      {card.full}
                    </h3>
                    <p className="text-emerald-800/70 text-xs sm:text-sm leading-relaxed mt-2">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900/80 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    SL &amp; HL Covered
                  </span>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-700 group-hover:translate-x-1 transition-transform">
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
