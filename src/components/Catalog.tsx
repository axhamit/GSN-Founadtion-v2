"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, type Course } from "@/data/courses";
import CourseCard from "./CourseCard";

const LEVELS = ["All levels", "Beginner", "Intermediate", "Advanced"] as const;

export default function Catalog({ courses }: { courses: Course[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return courses.filter((c) => {
      if (cat !== "all" && c.category !== cat) return false;
      if (level !== "all" && c.level !== level) return false;
      if (!needle) return true;
      return [c.title, c.short, ...c.skills].join(" ").toLowerCase().includes(needle);
    });
  }, [courses, q, cat, level]);

  return (
    <div>
      <div className="filters" role="search">
        <label className="search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search courses</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by course, subject or skill" />
        </label>
        <div className="filter-row" role="group" aria-label="Filter by category">
          {[{ slug: "all", name: "All" }, ...CATEGORIES].map((c) => (
            <button key={c.slug} type="button" className="pill" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</button>
          ))}
        </div>
        <label className="select">
          <span className="sr-only">Filter by level</span>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="all">Any level</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
      </div>
      <p className="muted" aria-live="polite">{results.length} {results.length === 1 ? "course" : "courses"} found</p>
      {results.length ? (
        <div className="grid">{results.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
      ) : (
        <div className="empty">
          <p><strong>No courses match those filters.</strong></p>
          <p className="muted">Clear the search or choose a different category or level.</p>
          <button type="button" className="btn btn-ghost" onClick={() => { setQ(""); setCat("all"); setLevel("all"); }}>Reset filters</button>
        </div>
      )}
    </div>
  );
}
