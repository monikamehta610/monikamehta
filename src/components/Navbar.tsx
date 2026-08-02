"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "ESS Course", href: "/courses/ess" },
  { label: "Biology", href: "/courses/biology" },
  { label: "IA & EE Guide", href: "/#ia-ee" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-[#E8E5E0] shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            {/* Monogram — sage on white, clean */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold tracking-tight"
              style={{ background: "#2E6B4F" }}
            >
              MM
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-[#1A1A1A] text-[15px] tracking-tight">
                Monika Mehta
              </span>
              <span className="text-[10px] text-[#6B6B6B] font-medium tracking-wide mt-0.5">
                IBDP Science Educator
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/#contact"
              className="inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-md"
              style={{ background: "#2E6B4F" }}
            >
              Book a Call
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#1A1A1A] hover:bg-[#F5F4F2] transition-colors cursor-pointer"
            aria-expanded={isOpen}
            aria-label="Main menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-72 border-b border-[#E8E5E0] bg-white/98 backdrop-blur-xl"
            : "max-h-0"
        }`}
      >
        <div className="px-6 pt-2 pb-6 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F4F2] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#2E6B4F" }}
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
