import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COURSES } from "@/data/courses";

export default function CoursesTeaser() {
  const essCourse = COURSES.find((c) => c.slug === "ess");
  const bioCourse = COURSES.find((c) => c.slug === "biology");
  const essCount = essCourse ? essCourse.slides.length : 0;
  const bioCount = bioCourse ? bioCourse.slides.length : 0;

  return (
    <section id="courses" style={{ padding: "5rem 0" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            IBDP{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-700">
              Course Materials
            </span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground max-w-xl text-center">
            Interactive slide-based study resources for IBDP Biology and Environmental Systems &amp;
            Societies — aligned with the current IB Diploma guide.
          </p>
        </div>

        {/* Two subject cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            {
              icon: "🌍",
              label: "ESS",
              full: "Environmental Systems & Societies",
              desc: "Ecosystems, climate, biodiversity, water systems, and sustainability — all in interactive slides.",
              color: "#0891b2",
              href: "/courses/ess",
              count: essCount,
            },
            {
              icon: "🧬",
              label: "Biology",
              full: "IBDP Biology SL & HL",
              desc: "Cell biology, genetics, ecology, evolution, and human physiology — slides coming soon.",
              color: "#16a34a",
              href: "/courses/biology",
              count: bioCount,
            },
          ].map((card) => (
            <Link key={card.label} href={card.href} style={{ textDecoration: "none" }}>
              <div
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col gap-4"
              >
                {/* Icon + badge */}
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "2rem" }}>{card.icon}</span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: card.color,
                      background: card.color + "14",
                      padding: "3px 10px",
                      borderRadius: 9999,
                    }}
                  >
                    {card.count > 0 ? `${card.count} slide${card.count > 1 ? "s" : ""} ready` : "Coming soon"}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-1">{card.full}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
                  style={{ color: card.color }}
                >
                  {card.count > 0 ? "View slides" : "Explore"}
                  <ArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Link to all courses */}
        <div className="flex justify-center mt-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse all course materials
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
