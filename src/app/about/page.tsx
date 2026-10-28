import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About GSN Foundation",
  description: "GSN Foundation provides expert coaching for PCMB, JEE, NEET, KCET and 10th Board, with online and offline classes and personalized study plans.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
          ],
        }}
      />
      <div className="container page narrow">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
        <h1>About GSN Foundation</h1>
        <p className="lead">Bridging the gap between campus and corporate.</p>
        <p>GSN Foundation provides expert coaching for PCMB 11th and 12th, competitive exams such as JEE, NEET and KCET, and 10th Standard Board preparation. Students learn through online and offline classes with personalized study plans.</p>
        <p>We are now adding project-based programs in Artificial Intelligence so students and professionals can build practical technology skills alongside their academic goals.</p>
        <p className="notice info">Add your mission, history, faculty profiles and verified results here. Only publish figures you can substantiate.</p>
      </div>
    </>
  );
}
