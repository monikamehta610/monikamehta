"use client";

import { Layout, Server, Cpu } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Frontend Development",
    icon: <Layout className="w-5 h-5 text-primary" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "State Management (Redux/Zustand)", "Responsive Web Design"],
  },
  {
    title: "Backend & Databases",
    icon: <Server className="w-5 h-5 text-primary" />,
    skills: ["Node.js", "Express", "RESTful APIs", "GraphQL", "PostgreSQL", "MongoDB", "Prisma ORM"],
  },
  {
    title: "Tools & DevOps",
    icon: <Cpu className="w-5 h-5 text-primary" />,
    skills: ["Git & GitHub", "Cloudflare Pages & Workers", "Docker", "Vercel", "npm & pnpm", "CI/CD Pipelines", "Linux & Shell Scripting"],
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
          <p className="text-muted-foreground max-w-xl text-center">
            My background, philosophy, and the tools I use to bring ideas to life.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Professional Bio */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Who I Am
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I am a dedicated software engineer with a strong passion for building web applications that combine clean, maintainable architecture with intuitive, premium user experiences. I thrive at the intersection of design and engineering.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With experience in the React and Next.js ecosystem, I specialize in crafting fast, accessible, and responsive interfaces. I enjoy writing clean code, solving complex performance bottlenecks, and optimizing applications for zero-overhead static hosting like Cloudflare Pages.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I&apos;m not coding, I&apos;m exploring new web standards, designing user interfaces, or contributing to open-source software.
            </p>
          </div>

          {/* Core Technical Toolkit */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Technical Toolkit
            </h3>
            <div className="space-y-6">
              {SKILL_CATEGORIES.map((category) => (
                <div
                  key={category.title}
                  className="p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-secondary border border-border">
                      {category.icon}
                    </div>
                    <h4 className="font-semibold text-lg text-foreground">
                      {category.title}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-xl text-sm font-medium bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground border border-border/60 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
