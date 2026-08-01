"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap } from "lucide-react";

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-stone-200/80 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-stone-900 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white text-xs font-black shadow-md shadow-orange-600/20">
                MM
              </div>
              <span className="font-extrabold tracking-tight">
                Monika Mehta<span className="text-orange-600">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/courses/ess"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-600/20 hover:shadow-orange-600/30 hover:scale-[1.02] transition-all duration-200"
            >
              <GraduationCap className="w-4 h-4" />
              Explore ESS
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-stone-100 text-stone-700 border border-stone-200 hover:text-stone-900 focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Main menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 border-b border-stone-200 bg-white/95 backdrop-blur-xl" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1.5 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-stone-700 hover:text-orange-600 hover:bg-stone-100 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/courses/ess"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-600 text-white font-bold text-sm shadow-md"
            >
              <GraduationCap className="w-4 h-4" />
              Explore ESS Slides &amp; Practice
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
