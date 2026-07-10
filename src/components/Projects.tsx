"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  illustration: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    title: "E-Commerce Nexus",
    description: "A premium headless storefront built with Next.js App Router, Stripe checkout, and a serverless API backend running on Cloudflare Workers. It handles dynamic catalog filtering and instant search.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Cloudflare Workers"],
    githubUrl: "https://github.com/monikamehta610",
    demoUrl: "https://github.com/monikamehta610",
    illustration: (
      <svg
        className="w-full h-full text-primary/40 dark:text-primary/20"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="10" width="180" height="100" rx="6" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="35" x2="190" y2="35" stroke="currentColor" strokeWidth="2" />
        <circle cx="25" cy="22" r="4" fill="currentColor" />
        <circle cx="37" cy="22" r="4" fill="currentColor" />
        <circle cx="49" cy="22" r="4" fill="currentColor" />
        {/* Shopping layout representation */}
        <rect x="25" y="48" width="40" height="40" rx="3" fill="currentColor" fillOpacity="0.2" />
        <rect x="80" y="48" width="90" height="8" rx="2" fill="currentColor" fillOpacity="0.3" />
        <rect x="80" y="62" width="60" height="6" rx="2" fill="currentColor" fillOpacity="0.2" />
        <rect x="80" y="78" width="30" height="10" rx="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "DevStream Analytics",
    description: "A real-time developer productivity and git analytics dashboard. Integrates with the GitHub API to render gorgeous interactive commit flows, pull request metrics, and velocity tracking charts.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "GitHub API"],
    githubUrl: "https://github.com/monikamehta610",
    demoUrl: "https://github.com/monikamehta610",
    illustration: (
      <svg
        className="w-full h-full text-violet-500/40 dark:text-violet-500/20"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="10" width="180" height="100" rx="6" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="35" x2="190" y2="35" stroke="currentColor" strokeWidth="2" />
        {/* Bar chart representation */}
        <rect x="25" y="85" width="15" height="15" rx="2" fill="currentColor" />
        <rect x="50" y="65" width="15" height="35" rx="2" fill="currentColor" />
        <rect x="75" y="50" width="15" height="50" rx="2" fill="currentColor" />
        <rect x="100" y="75" width="15" height="25" rx="2" fill="currentColor" />
        <rect x="125" y="40" width="15" height="60" rx="2" fill="currentColor" />
        <rect x="150" y="55" width="15" height="45" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "CryptoPulse SPA",
    description: "A high-performance single-page web app tracking cryptocurrency assets. Uses persistent WebSockets for live rate updates, candles, price alerts, and customized responsive canvas charts.",
    tags: ["Next.js", "Tailwind CSS", "WebSockets", "HTML Canvas", "Lucide Icons"],
    githubUrl: "https://github.com/monikamehta610",
    demoUrl: "https://github.com/monikamehta610",
    illustration: (
      <svg
        className="w-full h-full text-emerald-500/40 dark:text-emerald-500/20"
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="10" width="180" height="100" rx="6" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="35" x2="190" y2="35" stroke="currentColor" strokeWidth="2" />
        {/* Candle line graph representation */}
        <path d="M25 80 L60 50 L95 65 L130 35 L165 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="50" r="4" fill="currentColor" />
        <circle cx="130" cy="35" r="4" fill="currentColor" />
        <circle cx="165" cy="45" r="4" fill="currentColor" />
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
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground max-w-xl text-center">
            A curated selection of applications built with high performance, beautiful UI, and optimized architecture in mind.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-2xl border border-border bg-card hover:border-primary/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Illustration Container */}
              <div className="aspect-[5/3] w-full bg-secondary/50 border-b border-border flex items-center justify-center p-4 group-hover:bg-secondary/30 transition-colors duration-300">
                {project.illustration}
              </div>

              {/* Card Details */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-250">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t border-border/60">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Code
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
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
