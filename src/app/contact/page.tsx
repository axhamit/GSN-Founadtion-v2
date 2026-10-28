import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact GSN Foundation for course details, batches and admissions.",
  path: "/contact",
});

export default function Contact({ searchParams }: { searchParams: { course?: string } }) {
  const course = typeof searchParams.course === "string" ? searchParams.course.slice(0, 100) : undefined;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
          ],
        }}
      />
      <div className="container page contact-grid">
        <div>
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
          <h1>Contact us</h1>
          <p className="lead muted">Tell us what you are looking for and we will get back to you.</p>
          <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          {CONTACT.people.map((p) => <p key={p.phone}>{p.name}: <a href={`tel:${p.phone.replace(/\s/g, "")}`}>{p.phone}</a></p>)}
        </div>
        <ContactForm course={course} />
      </div>
    </>
  );
}
