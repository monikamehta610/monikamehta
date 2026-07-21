import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import CoursesTeaser from "@/components/CoursesTeaser";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Projects />
        <CoursesTeaser />
        <Experience />
        <Contact />
      </main>
      <footer className="py-8 border-t border-border bg-card/20 text-center text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Monika Mehta. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
