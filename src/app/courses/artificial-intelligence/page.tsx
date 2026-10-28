import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import CourseCard from "@/components/CourseCard";
import { coursesIn } from "@/data/courses";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Artificial Intelligence Courses",
  description: "Generative AI, Applied AI/ML Engineering, AI Engineering, LLMs and RAG, and Prompt Engineering: project-based AI programs from GSN Foundation.",
  path: "/courses/artificial-intelligence",
  noindex: process.env.INDEX_PROPOSED_COURSES !== "true",
});

export default function AICategory() {
  const list = coursesIn("artificial-intelligence");
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses` },
            { "@type": "ListItem", position: 3, name: "Artificial Intelligence", item: `${SITE_URL}/courses/artificial-intelligence` },
          ],
        }}
      />
      <div className="container page">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses" }, { name: "Artificial Intelligence", href: "/courses/artificial-intelligence" }]} />
        <h1>Artificial Intelligence courses</h1>
        <p className="lead muted">Five programs that cover building with generative models, engineering ML systems, and shipping AI software. Each has its own syllabus and projects.</p>
        <div className="grid">{list.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
        <p className="center"><Link href="/learning-paths" className="btn btn-ghost">Compare learning paths</Link></p>
      </div>
    </>
  );
}
