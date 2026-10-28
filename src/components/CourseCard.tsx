import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/data/courses";
import CourseArt from "./CourseArt";

export default function CourseCard({ course }: { course: Course }) {
  const comingSoon = course.comingSoon === true;

  return (
    <article className={`ccard theme-${course.theme}${comingSoon ? " ccard-coming-soon" : ""}`}>
      <div className="ccard-art">
        <CourseArt theme={course.theme} />
        {comingSoon
          ? <span className="ccard-coming-soon-label">Coming Soon</span>
          : course.isNew && <div className="ccard-badges"><span className="badge badge-new">New</span></div>}
      </div>
      <div className="ccard-body">
        <p className="ccard-cat">{course.category === "artificial-intelligence" ? "Artificial Intelligence" : course.category === "exam-coaching" ? "Exam Coaching" : "Career Programs"} · {course.level}</p>
        <h3>
          {comingSoon
            ? course.title
            : <Link href={`/courses/${course.slug}`} className="ccard-link">{course.title}</Link>}
        </h3>
        <p className="ccard-desc">{course.short}</p>
        <ul className="chips" aria-label="Key skills">
          {course.skills.slice(0, 4).map((s) => <li key={s}>{s}</li>)}
        </ul>
        {!comingSoon && <span className="ccard-cta">{course.modules.length ? "View course and syllabus" : "View course"} <ArrowRight size={16} aria-hidden="true" /></span>}
      </div>
    </article>
  );
}
