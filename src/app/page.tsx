import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoursesTeaser from "@/components/CoursesTeaser";
import IaEeGuide from "@/components/IaEeGuide";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <CoursesTeaser />
        <IaEeGuide />
        <About />
        <Experience />
        <Contact />
      </main>
      {/* Footer — warm white, consistent with body */}
      <footer
        className="py-10 border-t"
        style={{
          background: "#FAFAF9",
          borderColor: "#E8E5E0",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "#1C1C1C" }}
            >
              MM
            </div>
            <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
              Monika Mehta
            </span>
          </div>
          <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
            © {new Date().getFullYear()} Monika Mehta · IBDP Biology & ESS Educator · All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/#contact"
              className="text-xs font-medium transition-colors hover:underline"
              style={{ color: "#1C1C1C" }}
            >
              Book a Call
            </a>
            <a
              href="/courses/ess"
              className="text-xs font-medium"
              style={{ color: "#6B6B6B" }}
            >
              ESS Course
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
