"use client";

import Link from "next/link";
import { BookOpen, Calendar } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors"
      style={{
        background: "rgba(253, 248, 243, 0.88)",
        borderColor: "#E8D5C8",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand logo / monogram */}
        <Link href="/" className="flex items-center gap-3 group" style={{ textDecoration: "none" }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold tracking-tight transition-transform group-hover:scale-105"
            style={{ background: "#C1604A" }}
          >
            MM
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none" style={{ color: "#2C1810" }}>
              Monika Mehta
            </span>
            <span className="text-[11px] leading-none mt-1" style={{ color: "#7A5C52" }}>
              IBDP Biology & ESS Educator
            </span>
          </div>
        </Link>

        {/* Center navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { href: "/courses/ess", label: "ESS Course" },
            { href: "/#ia-ee", label: "IA & EE Guides" },
            { href: "/#about", label: "About" },
            { href: "/#experience", label: "Experience" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium transition-colors"
              style={{ color: "#7A5C52" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C1604A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7A5C52")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/courses/ess"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors"
            style={{ borderColor: "#E8D5C8", color: "#2C1810", background: "#FDF8F3" }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: "#C1604A" }} />
            Browse Slides
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "#C1604A" }}
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Call
          </Link>
        </div>
      </div>
    </header>
  );
}
