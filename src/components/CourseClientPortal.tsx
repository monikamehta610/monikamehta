"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Search, Sparkles, BookOpen, Layers } from "lucide-react";
import { getCourse, Course, Slide } from "@/data/courses";
import { YouTubeLink } from "@/components/YouTubeLink";

export default function CourseClientPortal({ course }: { course: Course }) {
  // State for search and filter controls
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "SL" | "HL">("all");

  // Get unique unit names in original order
  const unitList = useMemo(() => {
    const unitsSet = new Set<string>();
    course.slides.forEach((s) => unitsSet.add(s.unit));
    return Array.from(unitsSet);
  }, [course]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = course.slides.length;
    const published = course.slides.filter((s) => s.status !== "coming-soon").length;
    const slCount = course.slides.filter((s) => s.level.includes("SL")).length;
    const hlCount = course.slides.filter((s) => s.level.includes("HL")).length;
    const percentage = total > 0 ? Math.round((published / total) * 100) : 0;
    return { total, published, slCount, hlCount, percentage };
  }, [course]);

  // Filtered slides based on search, unit, and level
  const filteredSlides = useMemo(() => {
    return course.slides.filter((slide) => {
      // Unit filter
      if (selectedUnit !== "all" && slide.unit !== selectedUnit) {
        return false;
      }
      // Level filter
      if (selectedLevel === "SL" && !slide.level.includes("SL")) return false;
      if (selectedLevel === "HL" && !slide.level.includes("HL")) return false;

      // Search query filter (matches title, subtitle, slug, or unit)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = slide.title.toLowerCase().includes(q);
        const matchSubtitle = slide.subtitle.toLowerCase().includes(q);
        const matchSlug = slide.slug.toLowerCase().includes(q);
        const matchUnit = slide.unit.toLowerCase().includes(q);
        return matchTitle || matchSubtitle || matchSlug || matchUnit;
      }
      return true;
    });
  }, [course.slides, selectedUnit, selectedLevel, searchQuery]);

  // Group filtered slides by unit
  const groupedFilteredSlides = useMemo(() => {
    const groups: [string, Slide[]][] = [];
    const seen = new Set<string>();
    for (const slide of filteredSlides) {
      if (!seen.has(slide.unit)) {
        seen.add(slide.unit);
        groups.push([slide.unit, []]);
      }
      const group = groups.find(([u]) => u === slide.unit)!;
      group[1].push(slide);
    }
    return groups;
  }, [filteredSlides]);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
      {/* Header & Course Overview */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span
            style={{
              fontSize: "1.75rem",
              background: course.accentColor + "15",
              width: 48,
              height: 48,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${course.accentColor}25`,
            }}
          >
            {course.icon}
          </span>
          <div>
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: course.accentColor,
                background: course.accentColor + "12",
                padding: "3px 10px",
                borderRadius: 9999,
              }}
            >
              IB DP Curriculum Guide (First Assessment 2026)
            </span>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "#2f2a24",
                letterSpacing: "-0.025em",
                margin: "4px 0 0 0",
              }}
            >
              {course.title}
            </h1>
          </div>
        </div>
        <p style={{ color: "#6f6a64", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 680 }}>
          {course.description}
        </p>

        {/* Progress & Quick Stats Card */}
        <div
          style={{
            marginTop: "1.5rem",
            background: "#ffffff",
            border: "1px solid #ece7e2",
            borderRadius: 16,
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={18} style={{ color: course.accentColor }} />
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#2f2a24" }}>
                Course Progress: {stats.published} of {stats.total} Topics Published
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", fontWeight: 600 }}>
              <span style={{ background: "#f5f3f0", color: "#6f6a64", padding: "3px 10px", borderRadius: 9999 }}>
                {stats.slCount} SL Topics
              </span>
              <span style={{ background: course.accentColor + "14", color: course.accentColor, padding: "3px 10px", borderRadius: 9999 }}>
                {stats.hlCount} HL Topics
              </span>
              <span style={{ fontWeight: 800, color: course.accentColor }}>{stats.percentage}% Complete</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 6, background: "#efecea", borderRadius: 9999, overflow: "hidden" }}>
            <div
              style={{
                width: `${stats.percentage}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${course.accentColor}, #22c55e)`,
                borderRadius: 9999,
                transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar: Search & Filter Tabs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {/* Search Bar & Level Filter */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          {/* Search Box */}
          <div style={{ position: "relative", flex: 1, minWidth: 260 }}>
            <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9e9890" }} />
            <input
              type="text"
              placeholder="Search subtopics by title, number (e.g. 4.1, 6.2), or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.625rem 1rem 0.625rem 2.6rem",
                borderRadius: 12,
                border: "1px solid #ece7e2",
                background: "#ffffff",
                fontSize: "0.875rem",
                color: "#2f2a24",
                outline: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            />
          </div>

          {/* Level Filter Toggle */}
          <div style={{ display: "flex", background: "#f5f3f0", padding: 3, borderRadius: 12, border: "1px solid #ece7e2" }}>
            {(["all", "SL", "HL"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 9,
                  fontSize: "0.7875rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  background: selectedLevel === lvl ? "#ffffff" : "transparent",
                  color: selectedLevel === lvl ? course.accentColor : "#6f6a64",
                  boxShadow: selectedLevel === lvl ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {lvl === "all" ? "All Levels" : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Unit Filter Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.25rem", scrollbarWidth: "none" }}>
          <button
            onClick={() => setSelectedUnit("all")}
            style={{
              padding: "6px 14px",
              borderRadius: 9999,
              fontSize: "0.8125rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              border: selectedUnit === "all" ? `1.5px solid ${course.accentColor}` : "1px solid #ece7e2",
              background: selectedUnit === "all" ? course.accentColor + "14" : "#ffffff",
              color: selectedUnit === "all" ? course.accentColor : "#6f6a64",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            All Units ({course.slides.length})
          </button>
          {unitList.map((unit) => {
            const count = course.slides.filter((s) => s.unit === unit).length;
            const isSelected = selectedUnit === unit;
            return (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 9999,
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  border: isSelected ? `1.5px solid ${course.accentColor}` : "1px solid #ece7e2",
                  background: isSelected ? course.accentColor + "14" : "#ffffff",
                  color: isSelected ? course.accentColor : "#6f6a64",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {unit} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic List Render */}
      {groupedFilteredSlides.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            border: "1px dashed #ece7e2",
            borderRadius: 16,
            padding: "3.5rem 2rem",
            textAlign: "center",
            color: "#9e9890",
          }}
        >
          <BookOpen size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.5 }} />
          <p style={{ fontWeight: 700, color: "#2f2a24", marginBottom: "0.25rem" }}>
            No matching topics found
          </p>
          <p style={{ fontSize: "0.85rem", color: "#6f6a64" }}>
            Try adjusting your search query or unit/level filter.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {groupedFilteredSlides.map(([unit, slides]) => (
            <div key={unit}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <Layers size={14} style={{ color: course.accentColor }} />
                <h2
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#9e9890",
                    margin: 0,
                  }}
                >
                  {unit}
                </h2>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "0.75rem" }}>
                {slides.map((slide) => {
                  const isComingSoon = slide.status === "coming-soon";

                  const cardInner = (
                    <div
                      style={{
                        background: "#ffffff",
                        border: isComingSoon ? "1px dashed #ece7e2" : "1px solid #ece7e2",
                        borderRadius: 14,
                        padding: "1.125rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                        opacity: isComingSoon ? 0.6 : 1,
                        transition: "all 0.18s ease",
                        boxShadow: isComingSoon ? "none" : "0 1px 4px rgba(0,0,0,0.03)",
                      }}
                      className={!isComingSoon ? "hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30" : ""}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                          <span style={{ fontWeight: 800, color: "#2f2a24", fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>
                            {slide.title}
                          </span>
                          <span
                            style={{
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              color: course.accentColor,
                              background: course.accentColor + "14",
                              padding: "2px 8px",
                              borderRadius: 9999,
                              border: `1px solid ${course.accentColor}25`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {slide.level}
                          </span>
                        </div>
                        <p style={{ fontSize: "0.8125rem", color: "#6f6a64", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* Right Action Icons */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                        {slide.youtubeUrl && !isComingSoon && (
                          <YouTubeLink url={slide.youtubeUrl} />
                        )}
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
                            }}
                          >
                            Coming Soon
                          </span>
                        ) : (
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 10,
                              background: course.accentColor + "12",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <ArrowRight size={16} style={{ color: course.accentColor }} />
                          </div>
                        )}
                      </div>
                    </div>
                  );

                  if (isComingSoon) {
                    return <div key={slide.slug}>{cardInner}</div>;
                  }

                  return (
                    <Link
                      key={slide.slug}
                      href={slide.htmlFile!}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      {cardInner}
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
