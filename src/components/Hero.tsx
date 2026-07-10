"use client";

import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background glowing blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-primary/20 blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-violet-600/10 dark:bg-violet-500/20 blur-[100px] animate-pulse-slow [animation-delay:2s]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12 lg:py-20">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent text-primary border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Available for Freelance & Full-time
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              Building digital experiences <br className="hidden sm:inline" />
              that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">matter.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Hi, I&apos;m Monika Mehta. I&apos;m a software engineer specializing in building modern, high-performance, and visually stunning web applications. Let&apos;s create something exceptional.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 w-full sm:w-auto cursor-pointer"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-secondary border border-border text-foreground font-semibold hover:bg-muted transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                Get in Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/monikamehta610"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-all duration-200"
                aria-label="Twitter Profile"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Profile Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in-up [animation-delay:0.2s]">
            <div className="relative group w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer glowing border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-violet-500 opacity-20 group-hover:opacity-30 blur-2xl transition-all duration-500 animate-float" />

              {/* Main Container */}
              <div className="relative w-full h-full rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-4 overflow-hidden shadow-2xl flex items-center justify-center">
                {/* Techy grid line decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Styled SVG avatar / coder illustration */}
                <svg
                  className="w-4/5 h-4/5 text-primary/80 dark:text-primary/60 animate-float"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                  <path
                    d="M60 140C60 117.909 77.9086 100 100 100C122.091 100 140 117.909 140 140"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="65" r="25" stroke="currentColor" strokeWidth="4" />
                  {/* Floating abstract code brackets */}
                  <path d="M45 75L35 85L45 95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M155 75L165 85L155 95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Interactive corner markers */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
