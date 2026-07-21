import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getCourse, COURSES } from "@/data/courses";

export function generateStaticParams() {
  return COURSES.map((c) => ({ courseSlug: c.slug }));
}

export default async function CourseIndexPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.8rem",
          color: "#9e9890",
          marginBottom: "2rem",
        }}
      >
        <Link href="/courses" style={{ color: "#9e9890", textDecoration: "none" }}>
          Courses
        </Link>
        <ChevronRight size={13} />
        <span style={{ color: "#6f6a64", fontWeight: 500 }}>{course.shortTitle}</span>
      </div>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
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

      {/* Slides list */}
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
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              color: "#9e9890",
              marginBottom: "0.5rem",
            }}
          >
            Available Slides
          </p>
          {course.slides.map((slide, i) => (
            <Link
              key={slide.slug}
              href={slide.htmlFile}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div
                className="bg-white border border-[#ece7e2] rounded-[14px] p-[1.125rem_1.5rem] flex items-center justify-between gap-4 shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-150 cursor-pointer"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {/* Number badge */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: course.accentColor + "14",
                      color: course.accentColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#2f2a24", fontSize: "0.9375rem" }}>
                      {slide.title}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#9e9890", marginTop: "0.125rem" }}>
                      {slide.unit} · {slide.level} · {slide.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight size={16} style={{ color: course.accentColor, flexShrink: 0 }} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
