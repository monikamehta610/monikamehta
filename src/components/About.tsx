"use client";

import { BookOpen, Monitor, FlaskConical, Thermometer } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Curriculum & Instruction",
    icon: BookOpen,
    skills: [
      "IBDP Biology & ESS",
      "Inquiry-Based Learning",
      "Differentiated Assessment",
      "Group 4 Project Leadership",
      "IA & EE Mentorship",
      "Curriculum Development",
    ],
  },
  {
    title: "Educational Technology",
    icon: Monitor,
    skills: [
      "ManageBac",
      "Nearpod & Pear Deck",
      "Padlet & Trello",
      "Powtoon & Flipgrid",
      "Google Suite for Education",
      "Distance Learning Integration",
    ],
  },
  {
    title: "Laboratory Expertise",
    icon: FlaskConical,
    skills: [
      "PCR (Polymerase Chain Reaction)",
      "Western Blot & ELISA",
      "Chromatography",
      "Spectrophotometry",
      "Gel Electrophoresis",
      "Cell Line & Tissue Culture",
    ],
  },
  {
    title: "Environmental Sensors",
    icon: Thermometer,
    skills: [
      "Vernier Sensors (CO2, O2)",
      "pH & Dissolved Oxygen Sensors",
      "Soil Moisture & Turbidimeter",
      "Field Data Acquisition",
      "Experimental Science Projects",
    ],
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 border-t"
      style={{ background: "#FFFFFF", borderColor: "#E8E5E0" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section heading */}
        <div className="max-w-2xl mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#1C1C1C" }}
          >
            Background
          </span>
          <h2
            className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
            style={{ color: "#1A1A1A" }}
          >
            About Monika Mehta
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "#6B6B6B", lineHeight: "1.7" }}
          >
            My background, teaching philosophy, and core scientific competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

          {/* Bio */}
          <div className="lg:col-span-4 space-y-5">
            <h3
              className="text-lg font-semibold"
              style={{ color: "#1A1A1A" }}
            >
              Professional Biography
            </h3>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#6B6B6B", lineHeight: "1.75" }}>
              <p>
                I am a dedicated Science Educator and Biotechnology professional with over 9 years of experience bridging academic research, university lecturing, IBDP instruction, and industrial quality control.
              </p>
              <p>
                As an expert in IBDP Biology and Environmental Systems and Societies (ESS), I have a proven track record of mentoring students through Internal Assessments and Extended Essays, guiding them to build rigorous research designs.
              </p>
              <p>
                My background in industrial QA and university-level instruction provides deep expertise in molecular biology protocols including PCR, Western Blot, ELISA, and Cell Line maintenance.
              </p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="lg:col-span-8">
            <h3
              className="text-lg font-semibold mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SKILL_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.title}
                    className="rounded-2xl border p-6 space-y-4"
                    style={{
                      background: "#FAFAF9",
                      borderColor: "#E8E5E0",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "#F0F0EE" }}
                      >
                        <Icon className="w-4 h-4" style={{ color: "#1C1C1C" }} />
                      </div>
                      <h4
                        className="text-sm font-semibold leading-tight"
                        style={{ color: "#1A1A1A" }}
                      >
                        {category.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors hover:border-[#1C1C1C] hover:text-[#1C1C1C]"
                          style={{
                            background: "#FFFFFF",
                            borderColor: "#E8E5E0",
                            color: "#6B6B6B",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
