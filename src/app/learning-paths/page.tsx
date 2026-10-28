import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { getCourse } from "@/data/courses";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "AI Learning Paths",
  description: "Suggested orders for GSN Foundation's AI programs: build applications with generative AI, or engineer machine-learning systems.",
  path: "/learning-paths",
  noindex: process.env.INDEX_PROPOSED_COURSES !== "true",
});

const PATHS = [
  { name: "Build AI applications", blurb: "For learners who want to create products with language models.", steps: ["prompt-engineering", "generative-ai", "llm-rag"] },
  { name: "Become an ML engineer", blurb: "For learners who want to train, deploy and maintain predictive models.", steps: ["applied-ai-ml-engineering"] },
  { name: "AI Foundations", blurb: "Start from basics and build a strong foundation in AI concepts.", steps: ["prompt-engineering", "generative-ai"] },
  { name: "RAG Specialist", blurb: "Deep dive into retrieval-augmented generation and document AI.", steps: ["generative-ai", "llm-rag"] },
  { name: "Complete AI Engineer", blurb: "Comprehensive path covering all aspects of AI engineering.", steps: ["prompt-engineering", "generative-ai", "applied-ai-ml-engineering", "llm-rag"] },
];

export default function Paths() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Learning paths", item: `${SITE_URL}/learning-paths` },
          ],
        }}
      />
      <div className="container page narrow">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Learning paths", href: "/learning-paths" }] } />
        <h1>AI learning paths</h1>
        <p className="lead muted">Suggested orders only. Each course can be taken on its own, subject to prerequisites.</p>
        {PATHS.map((p) => (
          <section key={p.name} className="dsec">
            <h2>{p.name}</h2>
            <p className="muted">{p.blurb}</p>
            <ol className="path">
              {p.steps.map((s) => { const c = getCourse(s)!; return <li key={s}><Link href={`/courses/${c.slug}`}><strong>{c.title}</strong><span className="muted">{c.short}</span></Link></li>; })}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
