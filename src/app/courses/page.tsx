import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COURSES } from "@/data/courses";

export default function CoursesHubPage() {
  return (
    <div style={{ maxWidth: 840, margin: "0 auto", padding: "3.5rem 1.5rem" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            color: "#5a7d65",
            background: "rgba(90,125,101,0.1)",
            padding: "4px 14px",
            borderRadius: 9999,
            marginBottom: "1rem",
          }}
        >
          International Baccalaureate Diploma Programme
        </span>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "#2f2a24",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
            marginBottom: "0.75rem",
          }}
        >
          Interactive Course Materials
        </h1>
        <p style={{ color: "#6f6a64", fontSize: "1rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
          Slide-based study resources created by Monika Mehta — Science Educator with 9+ years of IBDP teaching experience.
        </p>
      </div>

      {/* Course cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
        {COURSES.map((course) => {
          const published = course.slides.filter((s) => s.status !== "coming-soon");
          const planned = course.slides.filter((s) => s.status === "coming-soon");
          const total = course.slides.length;
          const pct = total > 0 ? Math.round((published.length / total) * 100) : 0;

          return (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              style={{ textDecoration: "none", flex: "1 1 340px", maxWidth: 440 }}
            >
              <div
                className="bg-white border border-[#ece7e2] rounded-[18px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full"
              >
                {/* Banner */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${course.accentColor}14, ${course.accentColor}06)`,
                    borderBottom: `1px solid ${course.accentColor}20`,
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: course.accentColor + "18",
                      border: `1.5px solid ${course.accentColor}28`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      flexShrink: 0,
                    }}
                  >
                    {course.icon}
                  </div>
                  <h2
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 800,
                      color: "#2f2a24",
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {course.shortTitle}
                  </h2>
                </div>

                {/* Body */}
                <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <p style={{ fontSize: "0.8375rem", color: "#6f6a64", lineHeight: 1.6, margin: 0 }}>
                    {course.description}
                  </p>

                  {/* Progress bar */}
                  {total > 0 && (
                    <div>
                      <div
                        style={{
                          height: 4,
                          background: "#efecea",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: course.accentColor,
                            borderRadius: 2,
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Stats row */}
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <div
                      style={{
                        flex: 1,
                        background: "#f5f3f0",
                        borderRadius: 10,
                        padding: "0.625rem",
                        textAlign: "center" as const,
                      }}
                    >
                      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#2f2a24" }}>
                        {published.length}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#9e9890" }}>published</div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        background: course.accentColor + "0e",
                        borderRadius: 10,
                        padding: "0.625rem",
                        textAlign: "center" as const,
                      }}
                    >
                      <div style={{ fontSize: "1.25rem", fontWeight: 800, color: course.accentColor }}>
                        {planned.length}
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#9e9890" }}>planned</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: published.length > 0 ? course.accentColor : "#9e9890",
                      fontWeight: 600,
                      fontSize: "0.8375rem",
                    }}
                  >
                    <span>
                      {published.length > 0
                        ? published.length === total
                          ? "View all slides"
                          : "View slides"
                        : "View planned topics"}
                    </span>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
