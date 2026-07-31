import { notFound } from "next/navigation";
import { getCourse, COURSES } from "@/data/courses";
import CourseClientPortal from "@/components/CourseClientPortal";

export function generateStaticParams() {
  return COURSES.map((c) => ({ courseSlug: c.slug }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();

  return <CourseClientPortal course={course} />;
}
