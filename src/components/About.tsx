"use client";

import { BookOpen, Monitor, FlaskConical, Thermometer } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Curriculum & Instruction",
    icon: <BookOpen className="w-5 h-5 text-primary" />,
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
    icon: <Monitor className="w-5 h-5 text-primary" />,
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
    icon: <FlaskConical className="w-5 h-5 text-primary" />,
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
    icon: <Thermometer className="w-5 h-5 text-primary" />,
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
    <section id="about" className="py-20 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground max-w-xl text-center">
            My background, teaching philosophy, and core scientific competencies.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Professional Bio */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Professional Biography
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I am a dedicated Science Educator and Biotechnology professional with over 9 years of experience bridging academic research, university lecturing, IBDP (International Baccalaureate Diploma Programme) instruction, and industrial quality control.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As an expert in IBDP Biology and Environmental Systems and Societies (ESS), I have a proven track record of successfully mentoring students through Internal Assessments (IA) and Extended Essays (EE), guiding them to build rigorous research designs and write scholarly articles.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Additionally, my background in industrial QA and university-level instruction provides me with deep expertise in molecular biology protocols (including PCR, Western Blot, ELISA, and Cell Line maintenance). I strive to integrate technology and hands-on laboratory experience to cultivate a deep curiosity for the life sciences.
            </p>
          </div>

          {/* Core Technical Toolkit */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SKILL_CATEGORIES.map((category) => (
                <div
                  key={category.title}
                  className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-secondary border border-border">
                        {category.icon}
                      </div>
                      <h4 className="font-semibold text-base text-foreground leading-tight">
                        {category.title}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground border border-border/60 transition-all duration-150"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
