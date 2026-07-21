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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
        {COURSES.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              className="bg-white border border-[#ece7e2] rounded-[18px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
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
                <div>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                      color: course.accentColor,
                      marginBottom: "0.2rem",
                    }}
                  >
                    IBDP Course
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
              </div>

              {/* Body */}
              <div style={{ padding: "1.25rem 1.5rem" }}>
                <p style={{ fontSize: "0.8375rem", color: "#6f6a64", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {course.description}
                </p>

                {/* Stats */}
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
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
                      {course.slides.length}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#9e9890" }}>slides available</div>
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
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: course.accentColor }}>IB</div>
                    <div style={{ fontSize: "0.7rem", color: "#9e9890" }}>curriculum aligned</div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: course.accentColor,
                    fontWeight: 600,
                    fontSize: "0.8375rem",
                  }}
                >
                  <span>
                    {course.slides.length > 0 ? "View slides" : "Coming soon"}
                  </span>
                  {course.slides.length > 0 && <ArrowRight size={15} />}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
