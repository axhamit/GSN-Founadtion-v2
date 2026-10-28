import Catalog from "@/components/Catalog";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { COURSES } from "@/data/courses";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "All Courses",
  description: "Browse GSN Foundation programs: PCMB 11th and 12th, JEE, NEET, KCET, 10th Board, Career Launch Academy and new Artificial Intelligence courses.",
  path: "/courses",
});

export default function CoursesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE_URL}/courses` },
          ],
        }}
      />
      <div className="container page">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses" }]} />
        <h1>Find your course</h1>
        <p className="lead muted">Search by subject or skill, or filter by category and level.</p>
        <Catalog courses={COURSES} />
      </div>
    </>
  );
}
