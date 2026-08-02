import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { COURSES } from "@/data/courses";

export default function CoursesTeaser() {
  const essCourse = COURSES.find((c) => c.slug === "ess");
  const bioCourse = COURSES.find((c) => c.slug === "biology");
  const essCount = essCourse ? essCourse.slides.filter((s) => s.status !== "coming-soon").length : 0;
  const bioCount = bioCourse ? bioCourse.slides.filter((s) => s.status !== "coming-soon").length : 0;

  const cards = [
    {
      icon: "🌍",
      label: "ESS",
      full: "Environmental Systems & Societies",
      desc: "Complete 7-unit interactive slide decks covering Ecosystems, Biodiversity, Water, Land, Atmosphere, and Sustainability — aligned to the IB DP 2026 guide.",
      href: "/courses/ess",
      count: essCount,
      total: essCourse ? essCourse.slides.length : 25,
      badge: "SL & HL",
    },
    {
      icon: "🧬",
      label: "Biology",
      full: "IB DP Biology",
      desc: "Cell biology, molecular genetics, ecology, evolution, and human physiology — interactive slides and mark scheme guides coming soon.",
      href: "/courses/biology",
      count: bioCount,
      total: bioCourse ? bioCourse.slides.length : 20,
      badge: "SL & HL",
    },
  ];

  return (
    <section
      id="courses"
      className="py-24 border-t"
      style={{ background: "#FFFFFF", borderColor: "#E8E5E0" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section label + heading */}
        <div className="max-w-2xl mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#1C1C1C" }}
          >
            Course Materials
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
            style={{ color: "#1A1A1A" }}
          >
            IB DP Science Courses & Slides
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "#6B6B6B", lineHeight: "1.7" }}
          >
            Slide-based study resources aligned with the official IB Diploma guide — with embedded diagrams, practice questions, and mark scheme analysis.
          </p>
        </div>

        {/* Two subject cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group block"
              style={{ textDecoration: "none" }}
            >
              <div
                className="rounded-2xl border p-7 h-full flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-[#1C1C1C]"
                style={{
                  background: "#FFFFFF",
                  borderColor: "#E8E5E0",
                }}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{card.icon}</span>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "#F0F0EE", color: "#1C1C1C" }}
                    >
                      {card.count > 0 ? `${card.count} / ${card.total} Topics Live` : "Coming Soon"}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className="font-semibold text-lg leading-snug transition-colors group-hover:text-[#1C1C1C]"
                      style={{ color: "#1A1A1A" }}
                    >
                      {card.full}
                    </h3>
                    <p
                      className="text-sm mt-2 leading-relaxed"
                      style={{ color: "#6B6B6B", lineHeight: "1.7" }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-5 mt-5 border-t"
                  style={{ borderColor: "#E8E5E0" }}
                >
                  <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#6B6B6B" }}>
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#1C1C1C" }} />
                    {card.badge} Covered
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                    style={{ color: "#1C1C1C" }}
                  >
                    {card.count > 0 ? "View All Topics" : "Explore Course"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
