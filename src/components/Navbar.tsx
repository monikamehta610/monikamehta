"use client";

import Link from "next/link";
import { BookOpen, Calendar, Mail } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors"
      style={{
        background: "rgba(250, 250, 249, 0.85)",
        borderColor: "#E8E5E0",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo / monogram */}
        <Link href="/" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold tracking-tight transition-transform group-hover:scale-105"
            style={{ background: "#1C1C1C" }}
          >
            MM
          </div>
          <div className="flex flex-col">
            <span
              className="text-sm font-semibold leading-none"
              style={{ color: "#1A1A1A" }}
            >
              Monika Mehta
            </span>
            <span
              className="text-[11px] leading-none mt-1"
              style={{ color: "#6B6B6B" }}
            >
              IBDP Biology & ESS Educator
            </span>
          </div>
        </Link>

        {/* Center navigation */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/courses/ess"
            className="text-xs font-medium transition-colors hover:text-[#1C1C1C]"
            style={{ color: "#6B6B6B" }}
          >
            ESS Course
          </Link>
          <Link
            href="/#ia-ee"
            className="text-xs font-medium transition-colors hover:text-[#1C1C1C]"
            style={{ color: "#6B6B6B" }}
          >
            IA & EE Guides
          </Link>
          <Link
            href="/#about"
            className="text-xs font-medium transition-colors hover:text-[#1C1C1C]"
            style={{ color: "#6B6B6B" }}
          >
            About
          </Link>
          <Link
            href="/#experience"
            className="text-xs font-medium transition-colors hover:text-[#1C1C1C]"
            style={{ color: "#6B6B6B" }}
          >
            Experience
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/courses/ess"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-white"
            style={{ borderColor: "#E8E5E0", color: "#1A1A1A", background: "#FAFAF9" }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: "#1C1C1C" }} />
            Browse Slides
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#1C1C1C" }}
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Call
          </Link>
        </div>
      </div>
    </header>
  );
}
