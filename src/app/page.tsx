import Link from "next/link";
import { ArrowRight, BookOpenCheck, MessageCircleQuestion, FileText, Timer, TrendingUp, Target, Users, Award } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import CourseCard from "@/components/CourseCard";
import FAQ from "@/components/FAQ";
import { COURSES, coursesIn, CATEGORIES } from "@/data/courses";
import { STATS } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "GSN Foundation | Exam Coaching and AI Programs",
  description: "Coaching for PCMB 11th and 12th, JEE, NEET, KCET and 10th Board with online and offline classes, plus new project-based AI programs.",
  path: "/",
});

const WHY = [
  { icon: BookOpenCheck, title: "Experienced faculty", text: "Learn from IIT/NIT and medical-college graduates with long teaching experience." },
  { icon: MessageCircleQuestion, title: "Doubt solving", text: "Dedicated mentors and subject experts to resolve doubts quickly." },
  { icon: FileText, title: "Study materials", text: "Notes, practice papers and reference books provided." },
  { icon: Timer, title: "Regular mock tests", text: "Full-length mock tests with performance analysis." },
];

const BENEFITS = [
  { icon: TrendingUp, title: "Structured learning paths", text: "Clear progression from fundamentals to advanced topics with defined milestones." },
  { icon: Target, title: "Project-based approach", text: "Apply concepts through hands-on projects and real-world exercises." },
  { icon: Users, title: "Personalized attention", text: "Small batch sizes and individual doubt-clearing sessions." },
  { icon: Award, title: "Industry-aligned curriculum", text: "Content designed to match current academic and industry requirements." },
];

const STEPS = [
  { t: "Explore", d: "Pick a program and read the full syllabus before you commit." },
  { t: "Learn", d: "Work through structured modules with mentor support." },
  { t: "Build", d: "Apply each topic in projects, practice papers and mock tests." },
  { t: "Apply", d: "Take your skills into exams, college and your first projects." },
];

export default function Home() {
  const ai = coursesIn("artificial-intelligence");
  const exam = COURSES.filter((c) => c.category !== "artificial-intelligence");
  const featured = COURSES.filter((c) => c.featured);
  const newCourses = COURSES.filter((c) => c.isNew);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Prepare for your exams. Build for what comes next.</h1>
            <p className="lead">Expert coaching for PCMB, JEE, NEET, KCET and 10th Board, in online and offline classes. Now with project-based programs in Artificial Intelligence.</p>
            <div className="cta-row">
              <Link href="/courses" className="btn btn-primary">Explore courses <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link href="/courses/artificial-intelligence" className="btn btn-ghost">See AI programs</Link>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section className="strip" aria-label="About GSN Foundation">
        <div className="container strip-grid">
          {STATS.map((s) => (<div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>))}
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <h2>Explore by category</h2>
          <p className="muted-dark">Choose from our comprehensive range of programs designed for different learning goals.</p>
          <div className="grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} href={cat.slug === "artificial-intelligence" ? "/courses/artificial-intelligence" : "/courses"} className="category-card">
                <h3>{cat.name}</h3>
                <p className="muted-dark">{cat.blurb}</p>
                <span className="arrow-link">Browse courses <ArrowRight size={16} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Featured programs</h2>
          <p className="muted">Our most popular and recommended courses across all categories.</p>
          <div className="grid">{featured.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
          <p className="center"><Link href="/courses" className="btn btn-ghost">View all courses</Link></p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>New: Artificial Intelligence programs</h2>
          <p className="muted">Five programs for building with AI, from prompting to production. Curricula are proposed and subject to GSN Foundation approval.</p>
          <div className="grid">{ai.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
          <p className="center"><Link href="/learning-paths" className="btn btn-ghost">See suggested learning paths</Link></p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <h2>Exam coaching programs</h2>
          <p className="muted-dark">Existing GSN Foundation programs for school boards and competitive exams.</p>
          <div className="grid">{exam.slice(0, 6).map((c) => <CourseCard key={c.slug} course={c} />)}</div>
          <p className="center"><Link href="/courses" className="btn btn-dark">View all courses</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Learning benefits</h2>
          <p className="muted">What makes learning at GSN Foundation different.</p>
          <div className="grid grid-4">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="plain"><Icon size={26} aria-hidden="true" /><h3>{title}</h3><p className="muted">{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>Why students choose GSN Foundation</h2>
          <div className="grid grid-4">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="plain"><Icon size={26} aria-hidden="true" /><h3>{title}</h3><p className="muted">{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>How learning works</h2>
          <ol className="steps">{STEPS.map((s) => (<li key={s.t}><h3>{s.t}</h3><p className="muted">{s.d}</p></li>))}</ol>
        </div>
      </section>

      <section className="section section-light">
        <div className="container narrow">
          <h2>Student testimonials</h2>
          <p className="muted-dark">Hear from students who have learned with GSN Foundation.</p>
          <div className="notice info">
            <strong>Coming soon:</strong> We will add genuine student testimonials and success stories here. If you are a past student and would like to share your experience, please contact us.
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <h2>Questions</h2>
          <FAQ items={[
            { q: "Are classes online or offline?", a: "GSN Foundation offers both. Contact the team to confirm what is available for your program and batch." },
            { q: "Are the AI programs open for enrollment?", a: "They are new and being finalised. Send an inquiry and the team will share current status." },
            { q: "How do I get fee and batch details?", a: "Use the contact form or call the numbers listed on the contact page." },
          ]} />
        </div>
      </section>

      <section className="cta-band">
        <div className="container center">
          <h2>Talk to the GSN Foundation team</h2>
          <p className="muted">Tell us your class, exam or goal and we will suggest the right program.</p>
          <Link href="/contact" className="btn btn-primary">Send an inquiry</Link>
        </div>
      </section>
    </>
  );
}
