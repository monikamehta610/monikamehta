// ─── Course Data ──────────────────────────────────────────────────────────────
// To add a new slide deck:
// 1. Download the Bloome widget HTML:
//    curl -s "https://bloome.im/api/widgets/YOUR-WIDGET-ID" -o public/slides/YOUR-SLUG.html
// 2. Add an entry below (follow the existing pattern)
// 3. Create a route: src/app/courses/[courseSlug]/[topicSlug]/page.tsx
//    (or copy an existing one and change the import path)

export interface Slide {
  slug: string;        // URL segment, e.g. "2-2"
  title: string;       // Display title
  subtitle: string;    // Short descriptor shown on card
  htmlFile: string;    // Path relative to /public, e.g. "/slides/ess-2-2.html"
  level: string;       // e.g. "SL & HL", "HL Only"
  unit: string;        // IB unit label, e.g. "Unit 2"
}

export interface Course {
  slug: string;        // URL segment, e.g. "ess"
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  accentColor: string;
  slides: Slide[];
}

export const COURSES: Course[] = [
  {
    slug: "ess",
    title: "Environmental Systems & Societies",
    shortTitle: "ESS",
    description: "IBDP Environmental Systems & Societies — interactive slide-based lesson materials.",
    icon: "🌍",
    accentColor: "#0891b2",
    slides: [
      {
        slug: "2-2",
        title: "Topic 2.2",
        subtitle: "Ecosystems & Ecology",
        htmlFile: "/slides/ess-2-2.html",
        level: "SL & HL",
        unit: "Unit 2",
      },
      // ── Add more ESS slides here ────────────────────────────────────────────
      // {
      //   slug: "2-3",
      //   title: "Topic 2.3",
      //   subtitle: "Flows of Energy & Matter",
      //   htmlFile: "/slides/ess-2-3.html",
      //   level: "SL & HL",
      //   unit: "Unit 2",
      // },
    ],
  },
  {
    slug: "biology",
    title: "Biology",
    shortTitle: "Biology",
    description: "IBDP Biology — interactive slide-based lesson materials for SL and HL.",
    icon: "🧬",
    accentColor: "#16a34a",
    slides: [
      // ── Add Biology slides here ─────────────────────────────────────────────
      // {
      //   slug: "2-2",
      //   title: "Topic 2.2",
      //   subtitle: "Water",
      //   htmlFile: "/slides/bio-2-2.html",
      //   level: "SL & HL",
      //   unit: "Unit 2",
      // },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export function getSlide(courseSlug: string, slideSlug: string): Slide | undefined {
  return getCourse(courseSlug)?.slides.find((s) => s.slug === slideSlug);
}

export function getAdjacentSlides(courseSlug: string, slideSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) return { prev: null, next: null };
  const idx = course.slides.findIndex((s) => s.slug === slideSlug);
  return {
    prev: idx > 0 ? course.slides[idx - 1] : null,
    next: idx < course.slides.length - 1 ? course.slides[idx + 1] : null,
  };
}
