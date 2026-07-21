"use client";

import { ArrowRight, Mail, Phone } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background glowing blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-primary/20 blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-emerald-600/10 blur-[100px] animate-pulse-slow [animation-delay:2s]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12 lg:py-20">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent text-primary border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Science Educator & Biotech Professional
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              Inspiring the next <br className="hidden sm:inline" />
              generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-700">scientists.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Hi, I&apos;m Monika Mehta. I am a dedicated Science Educator and Biotechnology professional with over 9 years of experience spanning University lecturing, IBDP instruction, and Industrial Quality Control.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="#experience"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 w-full sm:w-auto cursor-pointer"
              >
                View Experience
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-secondary border border-border text-foreground font-semibold hover:bg-muted transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                Get in Touch
              </a>
            </div>

            {/* Social & Contact Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://linkedin.com/in/monikapmehtabiotech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:monikamehta610@gmail.com"
                className="p-3 rounded-xl bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-all duration-200"
                aria-label="Email Address"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="tel:+16692646035"
                className="p-3 rounded-xl bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-all duration-200"
                aria-label="Phone Number"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Profile Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center animate-fade-in-up [animation-delay:0.2s]">
            <div className="relative group w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer glowing border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-emerald-700 opacity-20 group-hover:opacity-30 blur-2xl transition-all duration-500 animate-float" />

              {/* Main Container */}
              <div className="relative w-full h-full rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-4 overflow-hidden shadow-2xl flex items-center justify-center">
                {/* Techy grid line decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Styled DNA double helix and laboratory vector illustration */}
                <svg
                  className="w-4/5 h-4/5 text-primary/80 dark:text-primary/60 animate-float"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                  
                  {/* DNA strands */}
                  <path d="M60 60 C80 90, 120 110, 140 140" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <path d="M140 60 C120 90, 80 110, 60 140" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* DNA base pairs */}
                  <line x1="72" y1="78" x2="128" y2="78" stroke="currentColor" strokeWidth="2" />
                  <line x1="85" y1="92" x2="115" y2="92" stroke="currentColor" strokeWidth="2" />
                  <line x1="100" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <line x1="85" y1="108" x2="115" y2="108" stroke="currentColor" strokeWidth="2" />
                  <line x1="72" y1="122" x2="128" y2="122" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Surrounding lab motifs */}
                  <circle cx="100" cy="65" r="8" fill="currentColor" fillOpacity="0.3" />
                  <circle cx="100" cy="135" r="8" fill="currentColor" fillOpacity="0.3" />
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
