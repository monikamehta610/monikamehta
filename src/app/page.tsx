import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
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
        <Experience />
        <Contact />
      </main>
      <footer className="py-8 border-t border-border bg-card/20 text-center text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Monika Mehta. All rights reserved.</p>
          <p className="mt-1">
            Built with Next.js (App Router), Tailwind CSS v4, and Lucide React. Optimized for Cloudflare Pages.
          </p>
        </div>
      </footer>
    </>
  );
}
