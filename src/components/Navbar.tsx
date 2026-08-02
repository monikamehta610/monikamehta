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
          ? "bg-white/90 backdrop-blur-xl border-b border-amber-200/80 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Stylized Science Wordmark (Left-aligned) */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 text-xl font-bold tracking-tight text-stone-900 hover:opacity-90 transition-opacity"
            >
              {/* Monogram Icon using #ffe588 */}
              <div
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-amber-950 font-black shadow-md shadow-amber-500/20 group"
                style={{ background: "linear-gradient(135deg, #ffe588 0%, #f59e0b 100%)" }}
              >
                <svg
                  className="w-5 h-5 text-amber-950"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 18V6H7.5L10 12L12.5 6H16V18H13.5V10.5L10.5 16.5H9.5L6.5 10.5V18H4Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18.5 7C16.5 7 15 8.5 15 10.5C15 13 18.5 15 18.5 15C18.5 15 22 13 22 10.5C22 8.5 20.5 7 18.5 7Z"
                    fill="#1c1917"
                    fillOpacity="0.8"
                  />
                </svg>
              </div>

              {/* Wordmark Text */}
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight leading-none text-stone-900">
                  Monika Mehta<span className="text-amber-600">.</span>
                </span>
                <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-widest leading-none mt-1">
                  IBDP Science Educator
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-stone-700 hover:text-amber-700 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/courses/ess"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-amber-950 text-xs font-black shadow-md shadow-amber-500/20 hover:scale-[1.02] transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #ffe588 0%, #f59e0b 100%)" }}
            >
              <GraduationCap className="w-4 h-4" />
              Explore ESS
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-amber-50 text-stone-900 border border-amber-200 hover:text-amber-800 focus:outline-none cursor-pointer"
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
          isOpen ? "max-h-80 border-b border-amber-200 bg-white/95 backdrop-blur-xl" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1.5 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-stone-800 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/courses/ess"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-amber-950 font-black text-sm shadow-md"
              style={{ background: "linear-gradient(135deg, #ffe588 0%, #f59e0b 100%)" }}
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
