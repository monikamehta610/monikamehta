"use client";

import { FileText, Award, GraduationCap } from "lucide-react";

interface HighlightItem {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  illustration: React.ReactNode;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    title: "Review on Autophagy: Mechanism of cell housekeeping",
    subtitle: "Published Scientific Literature",
    description: "Published review article in the International Journal for Research Trends and Innovation (IJRTI) exploring the cellular mechanisms of autophagy, lysosomal degradation pathways, and their implications for biotechnology and pathology.",
    tags: ["Autophagy", "Cellular Biology", "Biotechnology", "Scientific Writing"],
    icon: <FileText className="w-5 h-5 text-primary" />,
    illustration: (
      <svg
        className="w-full h-full text-primary/40 dark:text-primary/20"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="10" width="180" height="100" rx="6" stroke="currentColor" strokeWidth="2" />
        {/* Document representation */}
        <line x1="30" y1="35" x2="170" y2="35" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="50" x2="170" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="30" y1="65" x2="170" y2="65" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="80" x2="120" y2="80" stroke="currentColor" strokeWidth="1" />
        <rect x="140" y="70" width="30" height="30" rx="2" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    title: "GSET & ICAR-NET",
    subtitle: "Professional Certifications",
    description: "Successfully cleared the Indian Council of Agricultural Research National Eligibility Test (ICAR-NET) for Agricultural Research and the Gujarat State Eligibility Test (GSET) for State Lectureship.",
    tags: ["ICAR-NET", "GSET", "State Lectureship", "Agricultural Science"],
    icon: <Award className="w-5 h-5 text-primary" />,
    illustration: (
      <svg
        className="w-full h-full text-violet-500/40 dark:text-violet-500/20"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="10" width="180" height="100" rx="6" stroke="currentColor" strokeWidth="2" />
        {/* Certificate/Shield representation */}
        <path d="M100 35 L135 50 L135 80 C135 98 100 105 100 105 C100 105 65 98 65 80 L65 50 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
        <circle cx="100" cy="65" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M95 65 L98 68 L105 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Academic Programs & Mentorship",
    subtitle: "Curriculum Supervision",
    description: "Led large-scale science programs supervising research methodologies. Mentored 100+ students annually through the complete IBDP Internal Assessment (IA) and Extended Essay (EE) cycles, and instructed 180+ university laboratory students.",
    tags: ["Research Design", "Data Analysis", "Laboratory Mentorship", "IBDP Group 4"],
    icon: <GraduationCap className="w-5 h-5 text-primary" />,
    illustration: (
      <svg
        className="w-full h-full text-emerald-500/40 dark:text-emerald-500/20"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="10" width="180" height="100" rx="6" stroke="currentColor" strokeWidth="2" />
        {/* Growing scientific structure representation */}
        <circle cx="60" cy="80" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
        <circle cx="100" cy="45" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
        <circle cx="140" cy="80" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
        <line x1="68" y1="72" x2="92" y2="53" stroke="currentColor" strokeWidth="2" />
        <line x1="132" y1="72" x2="108" y2="53" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Academic & Professional <span className="text-primary">Highlights</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground max-w-xl text-center">
            Key milestones spanning peer-reviewed scientific publications, government research credentials, and academic program direction.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((item, index) => (
            <article
              key={item.title}
              className="group flex flex-col rounded-2xl border border-border bg-card hover:border-primary/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Illustration Container */}
              <div className="aspect-[5/3] w-full bg-secondary/50 border-b border-border flex items-center justify-center p-4 group-hover:bg-secondary/30 transition-colors duration-300">
                {item.illustration}
              </div>

              {/* Card Details */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-secondary text-primary border border-border">
                      {item.icon}
                    </span>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {item.subtitle}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-250">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
