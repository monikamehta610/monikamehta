import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getCourse, getSlide, getAdjacentSlides, COURSES } from "@/data/courses";

export function generateStaticParams() {
  return COURSES.flatMap((course) =>
    course.slides.map((slide) => ({
      courseSlug: course.slug,
      slideSlug: slide.slug,
    }))
  );
}

export default async function SlidePage({
  params,
}: {
  params: Promise<{ courseSlug: string; slideSlug: string }>;
}) {
  const { courseSlug, slideSlug } = await params;
  const course = getCourse(courseSlug);
  const slide = getSlide(courseSlug, slideSlug);
  if (!course || !slide) notFound();

  const { prev, next } = getAdjacentSlides(courseSlug, slideSlug);

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, height: "calc(100vh - 52px)" }}>
      {/* Slim context bar */}
      <div
        style={{
          height: 44,
          background: "#f5f3f0",
          borderBottom: "1px solid #ece7e2",
          display: "flex",
          alignItems: "center",
          padding: "0 1.25rem",
          gap: "0.75rem",
          flexShrink: 0,
          justifyContent: "space-between",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.8rem",
            color: "#9e9890",
            minWidth: 0,
          }}
        >
          <Link href="/courses" style={{ color: "#9e9890", textDecoration: "none", whiteSpace: "nowrap" as const }}>
            Courses
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/courses/${course.slug}`}
            style={{ color: "#9e9890", textDecoration: "none", whiteSpace: "nowrap" as const }}
          >
            {course.shortTitle}
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: "#2f2a24", fontWeight: 600, whiteSpace: "nowrap" as const }}>
            {slide.title} — {slide.subtitle}
          </span>
        </div>

        {/* Prev / Next navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          {prev ? (
            <Link
              href={`/courses/${course.slug}/${prev.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.775rem",
                fontWeight: 500,
                color: "#6f6a64",
                background: "#fff",
                border: "1px solid #ece7e2",
                borderRadius: 8,
                padding: "4px 10px",
                textDecoration: "none",
              }}
            >
              <ChevronLeft size={13} />
              Previous
            </Link>
          ) : (
            <span style={{ width: 80 }} />
          )}
          {next ? (
            <Link
              href={`/courses/${course.slug}/${next.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.775rem",
                fontWeight: 500,
                color: "#fff",
                background: course.accentColor,
                border: `1px solid ${course.accentColor}`,
                borderRadius: 8,
                padding: "4px 10px",
                textDecoration: "none",
              }}
            >
              Next
              <ChevronRight size={13} />
            </Link>
          ) : null}

          {/* Open in new tab */}
          <a
            href={slide.htmlFile}
            target="_blank"
            rel="noopener noreferrer"
            title="Open slides in new tab"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#fff",
              border: "1px solid #ece7e2",
              color: "#9e9890",
              textDecoration: "none",
            }}
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Full-height iframe — the hosted slide */}
      <iframe
        src={slide.htmlFile}
        title={`${slide.title} — ${slide.subtitle}`}
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          background: "#fbfaf8",
        }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
