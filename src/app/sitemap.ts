import type { MetadataRoute } from "next";
import { COURSES, isIndexable } from "@/data/courses";
import { SITE_URL, INDEX_PROPOSED } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/courses", "/about", "/contact"].map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now }));
  const ai = INDEX_PROPOSED ? ["/courses/artificial-intelligence", "/learning-paths"].map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now })) : [];
  const courses = COURSES.filter(isIndexable).map((c) => ({ url: `${SITE_URL}/courses/${c.slug}`, lastModified: now }));
  return [...pages, ...ai, ...courses];
}
