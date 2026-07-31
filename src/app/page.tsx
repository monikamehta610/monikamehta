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
      <footer className="py-8 border-t border-slate-800 bg-[#0b0f19] text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Monika Mehta. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
