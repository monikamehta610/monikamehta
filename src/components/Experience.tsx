"use client";

import { Briefcase, Calendar } from "lucide-react";

interface Job {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

const EXPERIENCES: Job[] = [
  {
    title: "Senior Frontend Engineer",
    company: "PixelForge Technologies",
    period: "Jan 2024 - Present",
    bullets: [
      "Architected next-gen Next.js (App Router) SaaS frontend, improving Core Web Vitals (LCP) by 40% and reducing Webpack build bundle sizes by 25%.",
      "Led a team of 4 frontend engineers, defining clean coding standards, linting rules, and automated unit testing methodologies (Vitest & React Testing Library).",
      "Collaborated closely with visual designers to deploy a highly extensible, tokenized design system using Tailwind CSS, supporting multiple light/dark branding themes.",
    ],
  },
  {
    title: "Software Engineer",
    company: "CloudScale Systems",
    period: "Jun 2022 - Dec 2023",
    bullets: [
      "Built and maintained scalable Node.js/Express API servers, processing over 1.2 million daily requests with optimized PostgreSQL queries and Redis caches.",
      "Successfully migrated a legacy multi-page application to a dynamic, client-side React SPA, improving mobile user session times by 30%.",
      "Reduced infrastructure and hosting overhead by 15% through refactoring endpoints to AWS Lambda serverless functions and optimizing Cloudfront CDN caching.",
    ],
  },
  {
    title: "Web Developer (Freelance)",
    company: "Independent Practice",
    period: "Sep 2020 - May 2022",
    bullets: [
      "Designed and launched responsive portfolio websites and marketing landing pages for local and international small businesses using Gatsby and React.",
      "Built custom payment gateways and store integrations utilizing Stripe Checkout, Mailchimp marketing APIs, and the Shopify Storefront API.",
      "Optimized pages to achieve perfect 100/100 Lighthouse performance and accessibility scores using semantic HTML5 elements and WCAG-compliant attributes.",
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
            My professional career path and key contributions across full-time and freelance roles.
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
                      {job.company}
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
