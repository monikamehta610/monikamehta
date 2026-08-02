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
      {/* Footer */}
      <footer
        className="py-10 border-t"
        style={{
          background: "#FDF8F3",
          borderColor: "#E8D5C8",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "#C1604A" }}
            >
              MM
            </div>
            <span className="text-sm font-medium" style={{ color: "#2C1810" }}>
              Monika Mehta
            </span>
          </div>
          <p className="text-xs text-center" style={{ color: "#A8887E" }}>
            © {new Date().getFullYear()} Monika Mehta · IBDP Biology & ESS Educator · All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/#contact"
              className="text-xs font-medium transition-colors hover:underline"
              style={{ color: "#C1604A" }}
            >
              Book a Call
            </a>
            <a
              href="/courses/ess"
              className="text-xs font-medium"
              style={{ color: "#7A5C52" }}
            >
              ESS Course
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
