import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Course Materials | Monika Mehta",
  description:
    "Interactive IBDP slide-based course materials by Monika Mehta — IBDP Biology & Environmental Systems and Societies.",
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fbfaf8",
        color: "#2f2a24",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
        colorScheme: "light" as const,
      }}
    >
      {/* Sticky top bar — warm light, matches the slide aesthetic */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 52,
          background: "rgba(251,250,248,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #ece7e2",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "#6f6a64",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
        >
          <ArrowLeft size={14} />
          Portfolio
        </Link>

        {/* Brand */}
        <Link
          href="/courses"
          style={{
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#2f2a24",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          📚 Course Materials
        </Link>

        {/* Subject pills */}
        <nav style={{ display: "flex", gap: "0.625rem" }}>
          <Link
            href="/courses/ess"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#0891b2",
              background: "rgba(8,145,178,0.09)",
              padding: "4px 10px",
              borderRadius: 9999,
              textDecoration: "none",
            }}
          >
            🌍 ESS
          </Link>
          <Link
            href="/courses/biology"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#16a34a",
              background: "rgba(22,163,74,0.09)",
              padding: "4px 10px",
              borderRadius: 9999,
              textDecoration: "none",
            }}
          >
            🧬 Biology
          </Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer
        style={{
          borderTop: "1px solid #ece7e2",
          padding: "1.5rem",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "#9e9890",
          marginTop: "3rem",
        }}
      >
        © {new Date().getFullYear()} Monika Mehta · IBDP Science Educator ·{" "}
        <Link href="/" style={{ color: "#5a7d65", textDecoration: "none" }}>
          monikamehta.com
        </Link>
      </footer>
    </div>
  );
}
