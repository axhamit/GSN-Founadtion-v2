import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, Clock, Users, Award, BookOpen, Target, User } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CourseArt from "@/components/CourseArt";
import CourseCard from "@/components/CourseCard";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { COURSES, getCourse, isIndexable, type Course } from "@/data/courses";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() { return COURSES.map((c) => ({ slug: c.slug })); }
export const dynamicParams = false;

function metaFor(c: Course) {
  const ai = c.category === "artificial-intelligence";
  return {
    title: ai ? `${c.title} Course: Syllabus and Projects` : `${c.title} Coaching`,
    description: ai ? `${c.short} See the ${c.modules.length}-module syllabus, projects and outcomes.` : `${c.short}. Online and offline classes, mock tests and doubt solving at GSN Foundation.`,
  };
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCourse(params.slug);
  if (!c) return {};
  const { title, description } = metaFor(c);
  return buildMetadata({ title, description, path: `/courses/${c.slug}`, noindex: !isIndexable(c) });
}

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="dsec"><h2>{title}</h2>{children}</section>
);
const Ticks = ({ items }: { items: string[] }) => (
  <ul className="ticks">{items.map((i) => <li key={i}><Check size={16} aria-hidden="true" />{i}</li>)}</ul>
);
const MetaItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="meta-item">
    <Icon size={20} aria-hidden="true" />
    <div>
      <span className="meta-label">{label}</span>
      <span className="meta-value">{value}</span>
    </div>
  </div>
);

export default function CoursePage({ params }: { params: { slug: string } }) {
  const c = getCourse(params.slug);
  if (!c) notFound();
  if (c.comingSoon) {
    return (
      <section className={`course-hero theme-${c.theme}`}>
        <div className="container course-hero-grid">
          <div>
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses" }, { name: c.title, href: `/courses/${c.slug}` }]} />
            <p className="badge">Coming soon</p>
            <h1>{c.title}</h1>
            <p className="lead">{c.short}</p>
            <p className="notice info">We’re preparing this course. Please check back soon for updates.</p>
            <Link href="/courses" className="btn btn-ghost">Browse all courses</Link>
          </div>
          <div className="course-art-wrap"><CourseArt theme={c.theme} large /></div>
        </div>
      </section>
    );
  }
  const catName = c.category === "artificial-intelligence" ? "Artificial Intelligence" : c.category === "exam-coaching" ? "Exam Coaching" : "Career Programs";
  const catHref = c.category === "artificial-intelligence" ? "/courses/artificial-intelligence" : "/courses";
  const related = c.related.map(getCourse).filter(Boolean) as Course[];
  const proposed = c.status === "proposed";
  const toc = [
    ["overview", "Overview"],
    c.audience.length && ["audience", "Who it is for"],
    c.outcomes.length && ["outcomes", "Outcomes"],
    c.modules.length && ["syllabus", "Syllabus"],
    c.tools.length && ["tools", "Tools"],
    c.projects.length && ["projects", "Projects"],
    c.roles.length && ["roles", "Career applications"],
    ["instructor", "Instructor"],
    ["faq", "FAQ"],
  ].filter(Boolean) as string[][];

  return (
    <>
      <section className={`course-hero theme-${c.theme}`}>
        <div className="container course-hero-grid">
          <div>
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Courses", href: "/courses" }, { name: catName, href: catHref }, { name: c.title, href: `/courses/${c.slug}` }]} />
            <p className="ccard-cat">{catName} · {c.level}</p>
            <h1>{c.title}</h1>
            <p className="lead">{c.short}</p>
            {proposed && <p className="notice info">This program is new and its curriculum is awaiting GSN Foundation approval. Duration, fees and start dates are not yet published.</p>}
            <div className="cta-row">
              <Link href={`/contact?course=${encodeURIComponent(c.title)}`} className="btn btn-primary">{proposed ? "Register interest" : "Enquire now"}</Link>
              {c.modules.length > 0 && <a href="#syllabus" className="btn btn-ghost">Explore syllabus</a>}
            </div>
          </div>
          <div className="course-art-wrap"><CourseArt theme={c.theme} large /></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="course-meta-grid">
            <MetaItem icon={Clock} label="Duration" value="Flexible (contact for details)" />
            <MetaItem icon={Users} label="Format" value="Online & Offline" />
            <MetaItem icon={BookOpen} label="Modules" value={`${c.modules.length} comprehensive modules`} />
            <MetaItem icon={Target} label="Level" value={c.level} />
          </div>
        </div>
      </section>

      <div className="container detail">
        <aside className="toc" aria-label="On this page">
          <ul>{toc.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
        </aside>
        <div className="detail-body">
          <Section id="overview" title="Overview">
            <p>{c.overview}</p>
            {c.placeholder && <p className="notice info">Detailed syllabus, schedule and fee information for this program will be added by GSN Foundation. Contact the team for current details.</p>}
            {c.prerequisites.length > 0 && (<><h3>Prerequisites</h3><Ticks items={c.prerequisites} /></>)}
          </Section>
          {c.audience.length > 0 && <Section id="audience" title="Who should take this course"><Ticks items={c.audience} /></Section>}
          {c.outcomes.length > 0 && <Section id="outcomes" title="What you will be able to do"><Ticks items={c.outcomes} /></Section>}
          {c.modules.length > 0 && (
            <Section id="syllabus" title="Syllabus">
              <div className="acc">
                {c.modules.map((mod, i) => (
                  <details key={mod.title}>
                    <summary><span className="mnum">{i + 1}</span>{mod.title}{mod.optional && <span className="badge">Advanced</span>}</summary>
                    <ul>{mod.lessons.map((l) => <li key={l}>{l}</li>)}</ul>
                  </details>
                ))}
              </div>
            </Section>
          )}
          {c.tools.length > 0 && <Section id="tools" title="Tools and technologies"><ul className="chips">{c.tools.map((t) => <li key={t}>{t}</li>)}</ul></Section>}
          {c.projects.length > 0 && (
            <Section id="projects" title="Projects and capstone">
              <div className="grid grid-2">{c.projects.map((p) => <div key={p.title} className="plain"><h3>{p.title}</h3><p className="muted">{p.text}</p></div>)}</div>
              {c.capstone && <p className="capstone"><strong>Capstone:</strong> {c.capstone}</p>}
            </Section>
          )}
          {c.roles.length > 0 && <Section id="roles" title="Career applications"><Ticks items={c.roles} /><p className="muted">These are areas where the skills apply. GSN Foundation does not guarantee jobs or salaries.</p></Section>}
          <Section id="instructor" title="Meet the instructor">
            <div className="instructor-card">
              <div className="instructor-avatar">
                <User size={48} aria-hidden="true" />
              </div>
              <div className="instructor-info">
                <h3>GSN Foundation Faculty</h3>
                <p className="muted">Expert instructors with industry and academic experience in {c.category === "artificial-intelligence" ? "AI, machine learning, and software engineering" : "their respective fields"}. All instructors are IIT/NIT graduates or have advanced degrees with extensive teaching experience.</p>
                <div className="instructor-highlights">
                  <div className="highlight-item">
                    <Award size={20} aria-hidden="true" />
                    <span>Industry Experts</span>
                  </div>
                  <div className="highlight-item">
                    <Users size={20} aria-hidden="true" />
                    <span>Experienced Mentors</span>
                  </div>
                  <div className="highlight-item">
                    <BookOpen size={20} aria-hidden="true" />
                    <span>Practical Teaching</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="notice info">Detailed instructor profiles will be added here. Contact us for more information about who will be teaching your course.</p>
          </Section>
          <Section id="faq" title="Frequently asked questions"><FAQ items={c.faq} /></Section>
          <section className="dsec cta-inline">
            <h2>Interested in {c.title}?</h2>
            <Link href={`/contact?course=${encodeURIComponent(c.title)}`} className="btn btn-primary">{proposed ? "Register interest" : "Send an inquiry"}</Link>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container"><h2>Related courses</h2><div className="grid">{related.map((r) => <CourseCard key={r.slug} course={r} />)}</div></div>
        </section>
      )}

      {isIndexable(c) && (
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Course", name: c.title, description: c.short, url: `${SITE_URL}/courses/${c.slug}`, provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL } }} />
      )}
    </>
  );
}
