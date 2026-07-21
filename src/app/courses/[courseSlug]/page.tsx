import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCourse, COURSES, Slide } from "@/data/courses";

export function generateStaticParams() {
  return COURSES.map((c) => ({ courseSlug: c.slug }));
}

function groupByUnit(slides: Slide[]): [string, Slide[]][] {
  const seen = new Set<string>();
  const groups: [string, Slide[]][] = [];
  for (const slide of slides) {
    if (!seen.has(slide.unit)) {
      seen.add(slide.unit);
      groups.push([slide.unit, []]);
    }
    const group = groups.find(([u]) => u === slide.unit)!;
    group[1].push(slide);
  }
  return groups;
}

export default async function CourseIndexPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();

  const units = groupByUnit(course.slides);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{course.icon}</div>
        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            fontWeight: 800,
            color: "#2f2a24",
            letterSpacing: "-0.025em",
            marginBottom: "0.625rem",
          }}
        >
          {course.title}
        </h1>
        <p style={{ color: "#6f6a64", fontSize: "0.9375rem", lineHeight: 1.65 }}>
          {course.description}
        </p>
      </div>

      {/* Slides grouped by unit */}
      {course.slides.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            border: "1px dashed #ece7e2",
            borderRadius: 16,
            padding: "3rem",
            textAlign: "center" as const,
            color: "#9e9890",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📋</div>
          <p style={{ fontWeight: 600, color: "#6f6a64", marginBottom: "0.25rem" }}>
            Slides coming soon
          </p>
          <p style={{ fontSize: "0.8375rem" }}>
            Materials for this course are being prepared. Check back soon.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.5rem" }}>
          {units.map(([unit, slides]) => (
            <div key={unit}>
              <h2
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase" as const,
                  color: "#9e9890",
                  marginBottom: "0.625rem",
                }}
              >
                {unit}
              </h2>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.625rem" }}>
                {slides.map((slide) => {
                  const isComingSoon = slide.status === "coming-soon";

                  const cardContent = (
                    <div
                      className={`bg-white border rounded-[14px] p-[1rem_1.25rem] flex items-center justify-between gap-4 transition-all duration-150 ${
                        isComingSoon
                          ? "border-dashed border-[#ece7e2] opacity-50 cursor-default"
                          : "border-[#ece7e2] shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                      }`}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", minWidth: 0 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 700, color: "#2f2a24", fontSize: "0.9375rem" }}>
                              {slide.title}
                            </span>
                            <span
                              style={{
                                fontSize: "0.65rem",
                                fontWeight: 600,
                                color: course.accentColor,
                                background: course.accentColor + "14",
                                padding: "2px 8px",
                                borderRadius: 9999,
                                border: `1px solid ${course.accentColor}28`,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {slide.level}
                            </span>
                          </div>
                          <span style={{ fontSize: "0.8rem", color: "#9e9890" }}>
                            {slide.subtitle}
                          </span>
                        </div>
                      </div>
                      {isComingSoon ? (
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            color: "#9e9890",
                            background: "#f5f3f0",
                            padding: "3px 10px",
                            borderRadius: 9999,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          Coming Soon
                        </span>
                      ) : (
                        <ArrowRight size={16} style={{ color: course.accentColor, flexShrink: 0 }} />
                      )}
                    </div>
                  );

                  if (isComingSoon) {
                    return <div key={slide.slug}>{cardContent}</div>;
                  }

                  return (
                    <Link
                      key={slide.slug}
                      href={slide.htmlFile!}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      {cardContent}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
