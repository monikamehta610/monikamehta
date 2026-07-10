"use client";

import { Briefcase, Calendar } from "lucide-react";

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

const EXPERIENCES: Job[] = [
  {
    title: "IBDP Biology & ESS Educator",
    company: "Fountainhead School",
    location: "Gujarat, India",
    period: "Aug 2019 – Feb 2025",
    bullets: [
      "Delivered IBDP Biology and ESS curriculum, consistently revising materials to enhance student engagement and performance.",
      "Mentored 100+ students annually through the complete IBDP Biology and ESS internal assessment (IA) cycle, providing structured feedback on research design, data analysis, and critical evaluation.",
      "Supervised Extended Essays (EE) and provided expert guidance on External Assessments, ensuring alignment with IBO marking schemes.",
      "Led the IBDP Group 4 Project, managing research themes, experimental content, field trips, and guest speaker sessions.",
      "Evaluated student progress using diverse assessment methods, including mastery skill checklists and criterion-referenced tests.",
      "Integrated advanced EdTech tools (Nearpod, Padlet, Trello) to facilitate interactive and distance learning environments."
    ],
  },
  {
    title: "Online IBDP Tutor (Biology & ESS)",
    company: "Freelance (Remote)",
    location: "Global",
    period: "March 2020 – March 2025",
    bullets: [
      "Provide personalized, one-on-one global tutoring focused on mastering complex biological concepts and improving IA/EE scores.",
      "Supervised Extended Essays in Biology and ESS, guiding students in developing high-level research questions and academic writing skills that meet IBO criteria.",
      "Deliver strategic feedback on assessment drafts aligned with IBDP command terms to push academic performance."
    ],
  },
  {
    title: "Teaching Assistant",
    company: "Uka Tarsadia University",
    location: "India",
    period: "Aug 2016 – July 2019",
    bullets: [
      "Large-Scale Undergraduate Instruction: Delivered lectures and supervised laboratory practicals for 180+ first-year Biotechnology and Microbiology students annually across three rotating cohorts.",
      "Postgraduate Mentorship: Provided specialized instruction and academic support to classes of 30+ Master’s students, focusing on advanced biotechnology applications.",
      "Research & Thesis Supervision: Directly assisted professors in guiding the theses and research projects of 15+ students annually, ensuring rigorous scientific methodology and data integrity.",
      "Academic Coordination: Actively organized national and international seminars, workshops, and conferences, managing logistics and participant engagement.",
      "Departmental Service: Served as an active member of the women's grievance redressal committee, contributing to a supportive and equitable campus environment."
    ],
  },
  {
    title: "Quality Control Chemist",
    company: "Arkray Healthcare Pvt. Ltd.",
    location: "India",
    period: "July 2015 – July 2016",
    bullets: [
      "Quality Assurance: Conducted qualitative and quantitative analysis of raw materials and finished products to ensure 100% compliance with GMP/GLP standards.",
      "Analytical Testing: Validated biochemical and microbiological assays using PCR, ELISA, Spectroscopy, and Chromatography.",
      "Molecular Techniques: Executed high-level protocols including Western Blot, Gel Electrophoresis, and maintenance of Cell Line/Tissue Cultures.",
      "Lab Operations: Managed daily equipment calibration and water treatment analysis to ensure laboratory precision and safety."
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-secondary/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground max-w-xl text-center">
            My professional career path in science education, research lecturing, and healthcare quality assurance.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-border md:ml-6 space-y-12">
          {EXPERIENCES.map((job, index) => (
            <div key={index} className="relative pl-8 md:pl-10 group">
              {/* Timeline marker */}
              <span className="absolute left-0 top-1.5 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-secondary border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary group-hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-all duration-350 z-10">
                <Briefcase className="w-4 h-4" />
              </span>

              {/* Grid / Details */}
              <div className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm group-hover:border-primary/20 transition-all duration-300 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {job.title}
                    </h3>
                    <p className="text-sm font-semibold text-primary">
                      {job.company} <span className="text-xs text-muted-foreground font-normal">| {job.location}</span>
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-secondary text-muted-foreground border border-border/80 w-fit">
                    <Calendar className="w-3.5 h-3.5" />
                    {job.period}
                  </span>
                </div>

                <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  {job.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="pl-1">
                      <span className="relative -left-1">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
