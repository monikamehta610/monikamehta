"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Sparkles,
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

// Sample Practice Question Sets & Exam Tips data for ESS
const PRACTICE_QUESTIONS = [
  {
    id: "p1-case-study",
    title: "Paper 1: Case Study Analysis & Data Strategy",
    type: "Paper 1 Guide",
    description: "How to analyze unseen maps, data tables, and environmental graphs in 1 hour.",
    tips: [
      "Read the resource booklet thoroughly before attempting the questions.",
      "Identify the specific location/biome (e.g. Amazon basin, Great Barrier Reef) and connect to systems thinking.",
      "When asked to calculate percentage change: ((New - Old) / Old) × 100.",
      "For 6-mark synthesis questions, reference 3+ specific figures from the booklet.",
    ],
    questions: [
      {
        q: "Outline two environmental impacts of converting tropical rainforest to monoculture palm oil plantations in South East Asia. [4 marks]",
        ms: "1. Loss of biodiversity/habitat destruction leading to species endangerment (e.g., orangutans).\n2. Soil degradation & loss of soil carbon storage due to clear-cutting and erosion.\n3. Increased GHG emissions from peatland burning.\n4. Disruption of local hydrological cycle (reduced evapotranspiration).",
      },
      {
        q: "Evaluate the sustainability of a named water management strategy in an arid region. [6 marks]",
        ms: "Name strategy (e.g., Sorek Desalination in Israel or Drip Irrigation in Jordan).\nPros: Reliable freshwater supply, reduces groundwater over-extraction, enables food security.\nCons: High energy consumption (fossil fuel reliance), brine discharge harms marine ecosystems, high capital cost.\nConclusion: Sustainable if powered by solar renewables, but requires brine treatment.",
      },
    ],
  },
  {
    id: "p2-essay-guide",
    title: "Paper 2: Section B 9-Mark Essay Structure",
    type: "Paper 2 Guide",
    description: "Mastering 9-mark extended response essays with the EVS + Named Examples framework.",
    tips: [
      "Always include 2 named, specific case studies (e.g., Chernobyl vs Fukushima; Maasai land vs Knepp Estate).",
      "Address environmental value systems (Technocentric, Ecocentric, Anthropocentric).",
      "Conclude with a clear, balanced evaluation addressing short-term vs long-term sustainability.",
    ],
    questions: [
      {
        q: "To what extent can the production of food be considered sustainable? [9 marks]",
        ms: "Introduction: Define food sustainability (balance of yield, soil health, water use, GHG emissions).\nBody Paragraph 1 (Technocentric/Commercial): High yields from Green Revolution HYVs & synthetic fertilizers feed 8B people, BUT cause eutrophication & soil degradation (e.g. US Corn Belt).\nBody Paragraph 2 (Ecocentric/Regenerative): Permaculture & mob grazing (e.g. Gabe Brown's ranch) restore soil carbon & biodiversity, BUT yield per hectare is lower.\nConclusion: Industrial commercial farming is currently unsustainable long-term; sustainable intensification and dietary shifts toward lower trophic levels are required.",
      },
      {
        q: "Compare the effectiveness of international agreements in managing climate change vs stratospheric ozone depletion. [9 marks]",
        ms: "Introduction: Define Montreal Protocol (ozone) vs Paris Agreement (climate).\nPoint 1 (Ozone/Montreal): Universal ratification, legally binding phase-out of CFCs/ODSs, financial aid to developing nations $\\rightarrow$ 99% CFC reduction, boundary NOT crossed.\nPoint 2 (Climate/Paris): Non-binding NDCs, economic reliance on fossil fuels, tragedy of the commons $\\rightarrow$ CO₂ boundary crossed (>425 ppm).\nEvaluation: Montreal succeeded due to clear substitutes (HFCs/HCFCs) and targeted chemicals; Paris faces systemic energy dependence.",
      },
    ],
  },
];

// Sample Internal Assessment (IA) & Extended Essay (EE) Guidance Data
const IA_CRITERIA = [
  {
    title: "1. Identifying Context (6 marks)",
    focus: "Environmental issue, Research Question (RQ), and Local/Global Context",
    checkpoints: [
      "Formulate a focused, quantitative Research Question (e.g., 'How does distance from a urban highway affect soil pH and heavy metal concentration in...').",
      "Explicitly state the environmental issue and explain its ecological/societal relevance.",
      "Connect the local study site to broader ESS concepts.",
    ],
  },
  {
    title: "2. Planning (6 marks)",
    focus: "Methodology, Variable Control, Safety & Ethics",
    checkpoints: [
      "Identify Independent Variable, Dependent Variable, and at least 5 Controlled Variables.",
      "Provide a clear, step-by-step methodology allowing exact replication.",
      "Include a minimum sample size of 5 trials per location/concentration.",
      "Detail environmental safety, ethical considerations, and risk assessment.",
    ],
  },
  {
    title: "3. Analysis (6 marks)",
    focus: "Raw Data Processing, Statistical Testing & Graphs",
    checkpoints: [
      "Present raw data tables with units, uncertainties (±), and clear column headings.",
      "Process data (Mean, Standard Deviation, Percentage Change, Spearman's Rank or Chi-Squared test).",
      "Include clear trendlines and statistical significance interpretation (p-value).",
    ],
  },
  {
    title: "4. Evaluation (6 marks)",
    focus: "Conclusion, Strengths, Weaknesses & Solutions",
    checkpoints: [
      "State a clear conclusion answering your exact Research Question.",
      "Evaluate methodological limitations (systematic vs random errors).",
      "Propose realistic, specific improvements and realistic extension investigations.",
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

export default function CourseClientPortal({ course }: { course: Course }) {
  // Navigation Tabs: 'slides' | 'questions' | 'ia-ee'
  const [activeTab, setActiveTab] = useState<"slides" | "questions" | "ia-ee">("slides");

  // State for search and filter controls inside slides
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | "SL" | "HL">("all");

  // Accordion state for practice questions
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>("p1-case-study");

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
      if (selectedUnit !== "all" && slide.unit !== selectedUnit) return false;
      if (selectedLevel === "SL" && !slide.level.includes("SL")) return false;
      if (selectedLevel === "HL" && !slide.level.includes("HL")) return false;

      if (searchQuery.trim() !== "") {
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
                color: "#14281d",
                letterSpacing: "-0.025em",
                margin: "4px 0 0 0",
              }}
            >
              {course.title}
            </h1>
          </div>
        </div>
        <p style={{ color: "#065f46", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 680 }}>
          {course.description}
        </p>

        {/* Progress & Quick Stats Card */}
        <div
          style={{
            marginTop: "1.5rem",
            background: "#ffffff",
            border: "1px solid #d1fae5",
            borderRadius: 16,
            padding: "1.25rem 1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Sparkles size={18} style={{ color: course.accentColor }} />
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#14281d" }}>
                Course Progress: {stats.published} of {stats.total} Topics Published
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.75rem", fontWeight: 600 }}>
              <span style={{ background: "#ecfdf5", color: "#065f46", padding: "3px 10px", borderRadius: 9999 }}>
                {stats.slCount} SL Topics
              </span>
              <span style={{ background: course.accentColor + "14", color: course.accentColor, padding: "3px 10px", borderRadius: 9999 }}>
                {stats.hlCount} HL Topics
              </span>
              <span style={{ fontWeight: 800, color: course.accentColor }}>{stats.percentage}% Complete</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 6, background: "#ecfdf5", borderRadius: 9999, overflow: "hidden" }}>
            <div
              style={{
                width: `${stats.percentage}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${course.accentColor}, #0d9488)`,
                borderRadius: 9999,
                transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Top Navigation Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid #d1fae5", marginBottom: "2rem", paddingBottom: "0.25rem" }}>
        {[
          { id: "slides", label: "Interactive Slide Decks", icon: BookOpen },
          { id: "questions", label: "Practice Questions & Exam Tips", icon: FileText },
          { id: "ia-ee", label: "Internal Assessment (IA) & EE Hub", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.25rem",
                borderRadius: 12,
                fontSize: "0.875rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                background: isActive ? course.accentColor + "14" : "transparent",
                color: isActive ? course.accentColor : "#065f46",
                borderBottom: isActive ? `2px solid ${course.accentColor}` : "2px solid transparent",
                transition: "all 0.18s ease",
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: SLIDE DECKS ================= */}
      {activeTab === "slides" && (
        <div>
          {/* Controls Bar: Search & Filter Tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            {/* Search Box & Level Filter */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 260 }}>
                <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#047857" }} />
                <input
                  type="text"
                  placeholder="Search subtopics by title, number (e.g. 4.1, 6.2), or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.625rem 1rem 0.625rem 2.6rem",
                    borderRadius: 12,
                    border: "1px solid #d1fae5",
                    background: "#ffffff",
                    fontSize: "0.875rem",
                    color: "#14281d",
                    outline: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                />
              </div>

              {/* Level Filter Toggle */}
              <div style={{ display: "flex", background: "#ecfdf5", padding: 3, borderRadius: 12, border: "1px solid #d1fae5" }}>
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
                      color: selectedLevel === lvl ? course.accentColor : "#065f46",
                      boxShadow: selectedLevel === lvl ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
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
                  border: selectedUnit === "all" ? `1.5px solid ${course.accentColor}` : "1px solid #d1fae5",
                  background: selectedUnit === "all" ? course.accentColor + "14" : "#ffffff",
                  color: selectedUnit === "all" ? course.accentColor : "#065f46",
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
                      border: isSelected ? `1.5px solid ${course.accentColor}` : "1px solid #d1fae5",
                      background: isSelected ? course.accentColor + "14" : "#ffffff",
                      color: isSelected ? course.accentColor : "#065f46",
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

          {/* Topic Cards Grid */}
          {groupedFilteredSlides.length === 0 ? (
            <div
              style={{
                background: "#ffffff",
                border: "1px dashed #d1fae5",
                borderRadius: 16,
                padding: "3.5rem 2rem",
                textAlign: "center",
                color: "#065f46",
              }}
            >
              <BookOpen size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.5 }} />
              <p style={{ fontWeight: 700, color: "#14281d", marginBottom: "0.25rem" }}>
                No matching topics found
              </p>
              <p style={{ fontSize: "0.85rem", color: "#065f46" }}>
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
                        color: "#065f46",
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
                            border: isComingSoon ? "1px dashed #d1fae5" : "1px solid #d1fae5",
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
                          className={!isComingSoon ? "hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5" : ""}
                        >
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                              <span style={{ fontWeight: 800, color: "#14281d", fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>
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
                            <p style={{ fontSize: "0.8125rem", color: "#065f46", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {slide.subtitle}
                            </p>
                          </div>

                          {/* Action Icons */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                            {slide.youtubeUrl && !isComingSoon && (
                              <YouTubeLink url={slide.youtubeUrl} />
                            )}
                            {isComingSoon ? (
                              <span
                                style={{
                                  fontSize: "0.65rem",
                                  fontWeight: 700,
                                  color: "#047857",
                                  background: "#ecfdf5",
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
                                  background: course.accentColor + "14",
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

                      if (isComingSoon) return <div key={slide.slug}>{cardInner}</div>;

                      return (
                        <Link key={slide.slug} href={slide.htmlFile!} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
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
      )}

      {/* ================= TAB 2: PRACTICE QUESTIONS & EXAM TIPS ================= */}
      {activeTab === "questions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ background: "#ffffff", border: "1px solid #d1fae5", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Brain size={20} style={{ color: course.accentColor }} />
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#14281d", margin: 0 }}>
                IB DP ESS General Exam Tips &amp; Question Frameworks
              </h2>
            </div>
            <p style={{ color: "#065f46", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
              Master Paper 1 Case Study data synthesis and Paper 2 extended response 9-mark essay structures.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {PRACTICE_QUESTIONS.map((set) => {
              const isExpanded = expandedQuestion === set.id;
              return (
                <div
                  key={set.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #d1fae5",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
                  }}
                >
                  <div
                    onClick={() => setExpandedQuestion(isExpanded ? null : set.id)}
                    style={{
                      padding: "1.25rem 1.5rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      background: isExpanded ? "#f6fbf7" : "#ffffff",
                      transition: "background 0.15s ease",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        <span style={{ fontSize: "0.6875rem", fontWeight: 800, textTransform: "uppercase", color: course.accentColor, background: course.accentColor + "14", padding: "2px 8px", borderRadius: 9999 }}>
                          {set.type}
                        </span>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#14281d", margin: 0 }}>
                          {set.title}
                        </h3>
                      </div>
                      <p style={{ fontSize: "0.8125rem", color: "#065f46", margin: 0 }}>{set.description}</p>
                    </div>
                    <ArrowRight size={18} style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease", color: course.accentColor }} />
                  </div>

                  {isExpanded && (
                    <div style={{ padding: "1.5rem", borderTop: "1px solid #d1fae5", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      {/* Tips */}
                      <div>
                        <h4 style={{ fontSize: "0.8125rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#047857", marginBottom: "0.5rem" }}>
                          💡 Pro Strategy Checkpoints:
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#14281d", fontSize: "0.85rem", lineHeight: 1.6 }}>
                          {set.tips.map((t, idx) => (
                            <li key={idx} style={{ marginBottom: "0.25rem" }}>{t}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Sample Questions & Mark Schemes */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                        {set.questions.map((qItem, qIdx) => (
                          <div key={qIdx} style={{ background: "#f6fbf7", border: "1px solid #d1fae5", borderRadius: 12, padding: "1rem 1.25rem" }}>
                            <div style={{ fontWeight: 700, color: "#14281d", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                              Q{qIdx + 1}: {qItem.q}
                            </div>
                            <div style={{ background: "#ffffff", border: "1px solid #d1fae5", borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.8125rem", color: "#065f46", lineHeight: 1.65, whiteSpace: "pre-line" }}>
                              <strong style={{ color: course.accentColor }}>Official Mark Scheme Guidance:</strong>{"\n"}
                              {qItem.ms}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: IA & EE HUB ================= */}
      {activeTab === "ia-ee" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Header */}
          <div style={{ background: "#ffffff", border: "1px solid #d1fae5", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <Award size={22} style={{ color: course.accentColor }} />
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#14281d", margin: 0 }}>
                IB DP ESS Internal Assessment (IA) &amp; Extended Essay (EE) Portal
              </h2>
            </div>
            <p style={{ color: "#065f46", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
              Mastering the 4 assessment criteria for a Level 7 Individual Investigation (25% of final grade) and interdisciplinary Extended Essays.
            </p>
          </div>

          {/* IA Assessment Criteria Grid */}
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#14281d", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle2 size={18} style={{ color: "#047857" }} />
              The Four ESS IA Assessment Criteria (Total: 24 Marks)
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", gap: "1rem" }}>
              {IA_CRITERIA.map((crit, idx) => (
                <div key={idx} style={{ background: "#ffffff", border: "1px solid #d1fae5", borderRadius: 14, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.02)" }}>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 800, color: course.accentColor, margin: "0 0 0.25rem 0" }}>
                    {crit.title}
                  </h4>
                  <p style={{ fontSize: "0.8125rem", color: "#14281d", fontWeight: 600, margin: "0 0 0.75rem 0" }}>
                    Focus: {crit.focus}
                  </p>
                  <ul style={{ margin: 0, paddingLeft: "1.2rem", color: "#065f46", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    {crit.checkpoints.map((cp, cIdx) => (
                      <li key={cIdx} style={{ marginBottom: "0.25rem" }}>{cp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* High-Scoring Sample IA Topics */}
          <div style={{ background: "#ffffff", border: "1px solid #d1fae5", borderRadius: 16, padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#14281d", margin: "0 0 1rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Lightbulb size={18} style={{ color: "#047857" }} />
              High-Scoring Sample ESS IA Research Questions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {SAMPLE_IA_TOPICS.map((topic, tIdx) => (
                <div key={tIdx} style={{ background: "#f6fbf7", border: "1px solid #d1fae5", borderRadius: 10, padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#14281d", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontWeight: 800, color: course.accentColor }}>#{tIdx + 1}</span>
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
