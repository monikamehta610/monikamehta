"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  BookOpen,
  Layers,
  FileText,
  Award,
  CheckCircle2,
  Brain,
  Lightbulb,
} from "lucide-react";
import { Course, Slide } from "@/data/courses";
import { YouTubeLink } from "@/components/YouTubeLink";

// ── Design tokens ─────────────────────────────────────────────
const S = {
  bg: "#FAFAF9",
  bgSubtle: "#F5F4F2",
  white: "#FFFFFF",
  border: "#E8E5E0",
  fg: "#1A1A1A",
  fgMuted: "#6B6B6B",
  fgSubtle: "#9CA3AF",
  accent: "#2E6B4F",
  accentLight: "#E8F5EE",
  accentDark: "#1D4535",
  shadow: "0 1px 4px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.07)",
};

// ── Practice Questions data ────────────────────────────────────
const PRACTICE_QUESTIONS = [
  {
    id: "p1-case-study",
    title: "Paper 1: Case Study Analysis & Data Strategy",
    type: "Paper 1 Guide",
    description: "How to analyse unseen maps, data tables, and environmental graphs in 1 hour.",
    tips: [
      "Read the resource booklet thoroughly before attempting questions.",
      "Identify the specific location/biome and connect to systems thinking.",
      "Percentage change formula: ((New − Old) / Old) × 100.",
      "For 6-mark synthesis questions, reference 3+ specific figures from the booklet.",
    ],
    questions: [
      {
        q: "Outline two environmental impacts of converting tropical rainforest to monoculture palm oil plantations in South East Asia. [4 marks]",
        ms: "1. Loss of biodiversity/habitat destruction leading to species endangerment (e.g. orangutans).\n2. Soil degradation & loss of soil carbon storage due to clear-cutting and erosion.\n3. Increased GHG emissions from peatland burning.\n4. Disruption of local hydrological cycle (reduced evapotranspiration).",
      },
      {
        q: "Evaluate the sustainability of a named water management strategy in an arid region. [6 marks]",
        ms: "Name strategy (e.g., Sorek Desalination, Israel).\nPros: Reliable freshwater supply, reduces groundwater over-extraction, enables food security.\nCons: High energy consumption, brine discharge harms marine ecosystems, high capital cost.\nConclusion: Sustainable if powered by solar renewables, but requires brine treatment.",
      },
    ],
  },
  {
    id: "p2-essay-guide",
    title: "Paper 2: Section B 9-Mark Essay Structure",
    type: "Paper 2 Guide",
    description: "Mastering 9-mark extended responses with the EVS + Named Examples framework.",
    tips: [
      "Always include 2 named, specific case studies.",
      "Address environmental value systems (Technocentric, Ecocentric, Anthropocentric).",
      "Conclude with a balanced evaluation: short-term vs long-term sustainability.",
    ],
    questions: [
      {
        q: "To what extent can the production of food be considered sustainable? [9 marks]",
        ms: "Introduction: Define food sustainability.\nBody 1 (Technocentric): Green Revolution HYVs feed 8B people BUT cause eutrophication & soil degradation.\nBody 2 (Ecocentric): Permaculture & mob grazing restore soil carbon BUT lower yield per hectare.\nConclusion: Industrial farming unsustainable long-term; sustainable intensification + dietary shifts required.",
      },
      {
        q: "Compare the effectiveness of international agreements in managing climate change vs stratospheric ozone depletion. [9 marks]",
        ms: "Introduction: Montreal Protocol (ozone) vs Paris Agreement (climate).\nPoint 1: Montreal — universal ratification, legally binding, financial aid → 99% CFC reduction.\nPoint 2: Paris — non-binding NDCs, fossil fuel dependence → boundary crossed (>425 ppm CO₂).\nEvaluation: Montreal succeeded due to clear substitutes and targeted chemicals.",
      },
    ],
  },
];

// ── IA Criteria data ─────────────────────────────────────────
const IA_CRITERIA = [
  {
    title: "1. Identifying Context",
    marks: "6 marks",
    focus: "Environmental issue, Research Question, Local/Global Context",
    checkpoints: [
      "Formulate a focused, quantitative Research Question.",
      "Explicitly state the environmental issue and its ecological/societal relevance.",
      "Connect the local study site to broader ESS concepts.",
    ],
  },
  {
    title: "2. Planning",
    marks: "6 marks",
    focus: "Methodology, Variable Control, Safety & Ethics",
    checkpoints: [
      "Identify IV, DV, and at least 5 Controlled Variables.",
      "Provide a clear, step-by-step methodology allowing exact replication.",
      "Detail environmental safety, ethics, and risk assessment.",
    ],
  },
  {
    title: "3. Analysis",
    marks: "6 marks",
    focus: "Raw Data Processing, Statistical Testing & Graphs",
    checkpoints: [
      "Present raw data tables with units, uncertainties (±), and clear headings.",
      "Process data (Mean, SD, Spearman's Rank or Chi-Squared test).",
      "Include trendlines and statistical significance interpretation (p-value).",
    ],
  },
  {
    title: "4. Evaluation",
    marks: "6 marks",
    focus: "Conclusion, Strengths, Weaknesses & Solutions",
    checkpoints: [
      "State a clear conclusion answering your exact Research Question.",
      "Evaluate methodological limitations (systematic vs random errors).",
      "Propose realistic, specific improvements and extension investigations.",
    ],
  },
];

const SAMPLE_IA_TOPICS = [
  "Effect of microplastic concentration on freshwater Daphnia magna heart rate and mortality.",
  "Investigating the correlation between lichen diversity and distance from an industrial factory.",
  "Impact of soil compaction on water infiltration rates across three contrasting land-use zones.",
  "Comparative analysis of nitrate & phosphate runoff levels upstream vs downstream of agricultural fields.",
  "Evaluating the effect of household greywater reuse on plant germination and soil salinity.",
];

// ── Component ────────────────────────────────────────────────
export default function CourseClientPortal({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState<"slides" | "questions" | "ia-ee">("slides");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "SL" | "HL">("all");
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>("p1-case-study");

  const unitList = useMemo(() => {
    const seen = new Set<string>();
    course.slides.forEach((s) => seen.add(s.unit));
    return Array.from(seen);
  }, [course]);

  const stats = useMemo(() => {
    const total = course.slides.length;
    const published = course.slides.filter((s) => s.status !== "coming-soon").length;
    const slCount = course.slides.filter((s) => s.level.includes("SL")).length;
    const hlCount = course.slides.filter((s) => s.level.includes("HL")).length;
    const pct = total > 0 ? Math.round((published / total) * 100) : 0;
    return { total, published, slCount, hlCount, pct };
  }, [course]);

  const filteredSlides = useMemo(() => {
    return course.slides.filter((slide) => {
      if (selectedUnit !== "all" && slide.unit !== selectedUnit) return false;
      if (selectedLevel === "SL" && !slide.level.includes("SL")) return false;
      if (selectedLevel === "HL" && !slide.level.includes("HL")) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          slide.title.toLowerCase().includes(q) ||
          slide.subtitle.toLowerCase().includes(q) ||
          slide.slug.toLowerCase().includes(q) ||
          slide.unit.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [course.slides, selectedUnit, selectedLevel, searchQuery]);

  const groupedSlides = useMemo(() => {
    const groups: [string, Slide[]][] = [];
    const seen = new Set<string>();
    for (const slide of filteredSlides) {
      if (!seen.has(slide.unit)) {
        seen.add(slide.unit);
        groups.push([slide.unit, []]);
      }
      groups.find(([u]) => u === slide.unit)![1].push(slide);
    }
    return groups;
  }, [filteredSlides]);

  // ── Shared chip style ──
  const chipBase = (active: boolean) => ({
    padding: "6px 14px",
    borderRadius: 9999,
    fontSize: "0.8125rem",
    fontWeight: 600,
    whiteSpace: "nowrap" as const,
    border: active ? `1.5px solid ${S.accent}` : `1px solid ${S.border}`,
    background: active ? S.accentLight : S.white,
    color: active ? S.accent : S.fgMuted,
    cursor: "pointer",
    transition: "all 0.15s ease",
  });

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <span style={{
            fontSize: "1.75rem",
            background: S.accentLight,
            width: 48, height: 48,
            borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${S.border}`,
          }}>
            {course.icon}
          </span>
          <div>
            <span style={{
              fontSize: "0.6875rem", fontWeight: 700,
              letterSpacing: "0.07em", textTransform: "uppercase" as const,
              color: S.accent,
              background: S.accentLight,
              padding: "3px 10px", borderRadius: 9999,
              border: `1px solid ${S.border}`,
            }}>
              IB DP Curriculum · First Assessment 2026
            </span>
            <h1 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
              fontWeight: 700, color: S.fg,
              letterSpacing: "-0.02em", margin: "4px 0 0 0",
            }}>
              {course.title}
            </h1>
          </div>
        </div>
        <p style={{ color: S.fgMuted, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 640 }}>
          {course.description}
        </p>

        {/* Progress card */}
        <div style={{
          marginTop: "1.5rem",
          background: S.white,
          border: `1px solid ${S.border}`,
          borderRadius: 16,
          padding: "1.25rem 1.5rem",
          boxShadow: S.shadow,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ fontWeight: 600, fontSize: "0.9rem", color: S.fg }}>
              {stats.published} of {stats.total} Topics Published
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", fontWeight: 600 }}>
              <span style={{ background: S.accentLight, color: S.accent, padding: "3px 10px", borderRadius: 9999 }}>
                {stats.slCount} SL
              </span>
              <span style={{ background: S.bgSubtle, color: S.fgMuted, padding: "3px 10px", borderRadius: 9999 }}>
                {stats.hlCount} HL
              </span>
              <span style={{ color: S.accent, fontWeight: 700 }}>{stats.pct}% Complete</span>
            </div>
          </div>
          <div style={{ height: 5, background: S.bgSubtle, borderRadius: 9999, overflow: "hidden" }}>
            <div style={{
              width: `${stats.pct}%`, height: "100%",
              background: S.accent,
              borderRadius: 9999,
              transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }} />
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{ display: "flex", gap: "0.25rem", borderBottom: `1px solid ${S.border}`, marginBottom: "2rem" }}>
        {[
          { id: "slides", label: "Interactive Slides", icon: BookOpen },
          { id: "questions", label: "Practice Questions", icon: FileText },
          { id: "ia-ee", label: "IA & EE Hub", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "slides" | "questions" | "ia-ee")}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.75rem 1.25rem",
                borderRadius: "10px 10px 0 0",
                fontSize: "0.875rem", fontWeight: active ? 700 : 500,
                border: "none", cursor: "pointer",
                background: active ? S.white : "transparent",
                color: active ? S.accent : S.fgMuted,
                borderBottom: active ? `2px solid ${S.accent}` : "2px solid transparent",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: SLIDES ── */}
      {activeTab === "slides" && (
        <div>
          {/* Search + Level filter */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 260 }}>
              <Search size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: S.fgSubtle }} />
              <input
                type="text"
                placeholder="Search by title, number (e.g. 4.1), or keyword…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px 9px 38px",
                  borderRadius: 12, border: `1px solid ${S.border}`,
                  background: S.white, fontSize: "0.875rem", color: S.fg,
                  outline: "none", boxShadow: S.shadow,
                }}
              />
            </div>
            <div style={{ display: "flex", background: S.bgSubtle, padding: 3, borderRadius: 12, border: `1px solid ${S.border}` }}>
              {(["all", "SL", "HL"] as const).map((lvl) => (
                <button key={lvl} onClick={() => setSelectedLevel(lvl)} style={{
                  padding: "6px 14px", borderRadius: 9,
                  fontSize: "0.8rem", fontWeight: selectedLevel === lvl ? 700 : 500,
                  border: "none", cursor: "pointer",
                  background: selectedLevel === lvl ? S.white : "transparent",
                  color: selectedLevel === lvl ? S.accent : S.fgMuted,
                  boxShadow: selectedLevel === lvl ? S.shadow : "none",
                  transition: "all 0.15s",
                }}>
                  {lvl === "all" ? "All" : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Unit filter chips */}
          <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.5rem", marginBottom: "1.5rem", scrollbarWidth: "none" }}>
            <button onClick={() => setSelectedUnit("all")} style={chipBase(selectedUnit === "all")}>
              All Units ({course.slides.length})
            </button>
            {unitList.map((unit) => (
              <button key={unit} onClick={() => setSelectedUnit(unit)} style={chipBase(selectedUnit === unit)}>
                {unit} ({course.slides.filter((s) => s.unit === unit).length})
              </button>
            ))}
          </div>

          {/* Slide cards */}
          {groupedSlides.length === 0 ? (
            <div style={{
              background: S.white, border: `1px dashed ${S.border}`,
              borderRadius: 16, padding: "3rem 2rem", textAlign: "center",
            }}>
              <BookOpen size={28} style={{ margin: "0 auto 0.75rem", color: S.fgSubtle }} />
              <p style={{ fontWeight: 600, color: S.fg, marginBottom: "0.25rem" }}>No matching topics</p>
              <p style={{ fontSize: "0.85rem", color: S.fgMuted }}>Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {groupedSlides.map(([unit, slides]) => (
                <div key={unit}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.625rem" }}>
                    <Layers size={13} style={{ color: S.accent }} />
                    <h2 style={{
                      fontSize: "0.7rem", fontWeight: 700,
                      letterSpacing: "0.07em", textTransform: "uppercase" as const,
                      color: S.fgSubtle, margin: 0,
                    }}>
                      {unit}
                    </h2>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "0.625rem" }}>
                    {slides.map((slide) => {
                      const isCS = slide.status === "coming-soon";
                      const card = (
                        <div style={{
                          background: S.white,
                          border: `1px solid ${S.border}`,
                          borderRadius: 12,
                          padding: "1rem 1.25rem",
                          display: "flex", alignItems: "center",
                          justifyContent: "space-between", gap: "1rem",
                          opacity: isCS ? 0.55 : 1,
                          transition: "all 0.15s ease",
                          boxShadow: isCS ? "none" : S.shadow,
                          cursor: isCS ? "default" : "pointer",
                        }}>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.25rem" }}>
                              <span style={{ fontWeight: 600, color: S.fg, fontSize: "0.9rem", letterSpacing: "-0.01em" }}>
                                {slide.title}
                              </span>
                              <span style={{
                                fontSize: "0.625rem", fontWeight: 700,
                                color: S.accent, background: S.accentLight,
                                padding: "2px 7px", borderRadius: 9999,
                              }}>
                                {slide.level}
                              </span>
                            </div>
                            <p style={{ fontSize: "0.8125rem", color: S.fgMuted, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {slide.subtitle}
                            </p>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                            {slide.youtubeUrl && !isCS && <YouTubeLink url={slide.youtubeUrl} />}
                            {isCS ? (
                              <span style={{
                                fontSize: "0.65rem", fontWeight: 600,
                                color: S.fgSubtle, background: S.bgSubtle,
                                padding: "3px 10px", borderRadius: 9999,
                              }}>
                                Coming Soon
                              </span>
                            ) : (
                              <div style={{
                                width: 30, height: 30, borderRadius: 9,
                                background: S.accentLight,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <ArrowRight size={14} style={{ color: S.accent }} />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                      if (isCS) return <div key={slide.slug}>{card}</div>;
                      return (
                        <Link key={slide.slug} href={slide.htmlFile!} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                          {card}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: PRACTICE QUESTIONS ── */}
      {activeTab === "questions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{
            background: S.white, border: `1px solid ${S.border}`,
            borderRadius: 16, padding: "1.5rem", boxShadow: S.shadow,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Brain size={18} style={{ color: S.accent }} />
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: S.fg, margin: 0 }}>
                IB DP ESS Exam Questions & Frameworks
              </h2>
            </div>
            <p style={{ color: S.fgMuted, fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
              Master Paper 1 case study synthesis and Paper 2 extended response 9-mark essay structures.
            </p>
          </div>

          {PRACTICE_QUESTIONS.map((set) => {
            const isExp = expandedQuestion === set.id;
            return (
              <div key={set.id} style={{
                background: S.white, border: `1px solid ${S.border}`,
                borderRadius: 16, overflow: "hidden", boxShadow: S.shadow,
              }}>
                <div
                  onClick={() => setExpandedQuestion(isExp ? null : set.id)}
                  style={{
                    padding: "1.25rem 1.5rem", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                    background: isExp ? "#F0F9F4" : S.white,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" as const, color: S.accent, background: S.accentLight, padding: "2px 8px", borderRadius: 9999 }}>
                        {set.type}
                      </span>
                      <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: S.fg, margin: 0 }}>
                        {set.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: "0.8125rem", color: S.fgMuted, margin: 0 }}>{set.description}</p>
                  </div>
                  <ArrowRight size={16} style={{ transform: isExp ? "rotate(90deg)" : "none", transition: "transform 0.2s", color: S.accent, flexShrink: 0 }} />
                </div>

                {isExp && (
                  <div style={{ padding: "1.5rem", borderTop: `1px solid ${S.border}`, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <div>
                      <h4 style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.05em", color: S.accent, marginBottom: "0.5rem" }}>
                        Strategy Checkpoints
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: "1.25rem", color: S.fg, fontSize: "0.85rem", lineHeight: 1.7 }}>
                        {set.tips.map((t, i) => <li key={i} style={{ marginBottom: "0.2rem" }}>{t}</li>)}
                      </ul>
                    </div>
                    {set.questions.map((qItem, qi) => (
                      <div key={qi} style={{ background: S.bg, border: `1px solid ${S.border}`, borderRadius: 12, padding: "1rem 1.25rem" }}>
                        <div style={{ fontWeight: 600, color: S.fg, fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                          Q{qi + 1}: {qItem.q}
                        </div>
                        <div style={{ background: S.white, border: `1px solid ${S.border}`, borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.8125rem", color: S.fgMuted, lineHeight: 1.65, whiteSpace: "pre-line" }}>
                          <strong style={{ color: S.accent }}>Mark Scheme Guidance:</strong>{"\n"}{qItem.ms}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── TAB 3: IA & EE HUB ── */}
      {activeTab === "ia-ee" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ background: S.white, border: `1px solid ${S.border}`, borderRadius: 16, padding: "1.5rem", boxShadow: S.shadow }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Award size={20} style={{ color: S.accent }} />
              <h2 style={{ fontSize: "1.125rem", fontWeight: 700, color: S.fg, margin: 0 }}>
                ESS Internal Assessment (IA) & Extended Essay (EE) Portal
              </h2>
            </div>
            <p style={{ color: S.fgMuted, fontSize: "0.875rem", lineHeight: 1.7, margin: 0 }}>
              Assessment criteria breakdowns and topic ideas for a Level 7 Individual Investigation (25% of final grade).
            </p>
          </div>

          {/* IA Criteria */}
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: S.fg, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle2 size={16} style={{ color: S.accent }} />
              The Four ESS IA Criteria — Total: 24 Marks
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "0.875rem" }}>
              {IA_CRITERIA.map((crit) => (
                <div key={crit.title} style={{ background: S.white, border: `1px solid ${S.border}`, borderRadius: 14, padding: "1.25rem", boxShadow: S.shadow }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: S.accent, margin: 0 }}>{crit.title}</h4>
                    <span style={{ fontSize: "0.7rem", color: S.fgSubtle, fontWeight: 600 }}>({crit.marks})</span>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: S.fg, fontWeight: 600, margin: "0 0 0.75rem 0" }}>
                    Focus: {crit.focus}
                  </p>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem", color: S.fgMuted, fontSize: "0.8rem", lineHeight: 1.65 }}>
                    {crit.checkpoints.map((cp, i) => <li key={i} style={{ marginBottom: "0.2rem" }}>{cp}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sample topics */}
          <div style={{ background: S.white, border: `1px solid ${S.border}`, borderRadius: 16, padding: "1.5rem", boxShadow: S.shadow }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: S.fg, margin: "0 0 1rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Lightbulb size={16} style={{ color: S.accent }} />
              High-Scoring Sample ESS IA Research Questions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {SAMPLE_IA_TOPICS.map((topic, i) => (
                <div key={i} style={{ background: S.bg, border: `1px solid ${S.border}`, borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.85rem", color: S.fg, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontWeight: 700, color: S.accent, fontSize: "0.75rem", minWidth: 20 }}>#{i + 1}</span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
