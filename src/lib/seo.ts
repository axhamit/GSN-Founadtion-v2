import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

export function buildMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title: opts.title, description: opts.description, url, siteName: SITE_NAME, type: "website", locale: "en_IN" },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}
