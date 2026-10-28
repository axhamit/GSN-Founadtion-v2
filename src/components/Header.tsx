"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { CATEGORIES, COURSES } from "@/data/courses";

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

const SIGNIN = process.env.NEXT_PUBLIC_SIGNIN_URL || "/sign-in";
const SIGNUP = process.env.NEXT_PUBLIC_SIGNUP_URL || "/sign-up";

export default function Header() {
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const pathname = usePathname();
  const wrap = useRef<HTMLLIElement>(null);

  useEffect(() => { setMega(false); setDrawer(false); }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setDrawer(false); } };
    const onClick = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setMega(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);

  return (
    <header className="site-header">
      <div className="container bar">
        <Link href="/" className="logo" aria-label="GSN Foundation home">
          <Image src="/logo.png" alt="GSN Foundation" width={240} height={120} className="logo-image logo-light" />
          <Image src="/logoWhite.png" alt="" aria-hidden="true" width={240} height={120} className="logo-image logo-dark" />
        </Link>

        <nav aria-label="Primary" className="nav-desktop">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li ref={wrap} onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
              <button type="button" aria-expanded={mega} aria-controls="mega" onClick={() => setMega((v) => !v)}>
                Courses <ChevronDown size={16} aria-hidden="true" />
              </button>
              <div id="mega" className="mega" hidden={!mega}>
                <div className="mega-grid">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.slug} className="mega-col">
                      <h2><Link href={cat.slug === "artificial-intelligence" ? "/courses/artificial-intelligence" : "/courses"}>{cat.name}</Link></h2>
                      <p>{cat.blurb}</p>
                      <ul>
                        {COURSES.filter((c) => c.category === cat.slug).slice(0, 5).map((c) => (
                          <li key={c.slug}><Link href={`/courses/${c.slug}`}>{c.title}{c.isNew && <span className="badge badge-new">New</span>}</Link></li>
                        ))}
                        {COURSES.filter((c) => c.category === cat.slug).length > 5 && (
                          <li><Link href={cat.slug === "artificial-intelligence" ? "/courses/artificial-intelligence" : "/courses"} className="text-sm">View all →</Link></li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
                <Link href="/courses" className="mega-all">Browse all courses</Link>
              </div>
            </li>
            <li><Link href="/learning-paths">Learning Paths</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="bar-actions">
          <ThemeToggle />
          {/* Sign in/sign up hidden per user request */}
          {/* <Link href={SIGNIN} className="btn-link nav-desktop">Sign in</Link>
          <Link href={SIGNUP} className="btn btn-primary nav-desktop">Sign up</Link> */}
          <button type="button" className="icon-btn nav-mobile" aria-label={drawer ? "Close menu" : "Open menu"} aria-expanded={drawer} aria-controls="drawer" onClick={() => setDrawer((v) => !v)}>
            {drawer ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="drawer" className="drawer" hidden={!drawer}>
        <nav aria-label="Mobile">
          <div className="drawer-logo">
            <Image src="/logo.png" alt="GSN Foundation" width={220} height={110} className="drawer-logo-image logo-light" />
            <Image src="/logoWhite.png" alt="" aria-hidden="true" width={220} height={110} className="drawer-logo-image logo-dark" />
          </div>
          <Link href="/">Home</Link>
          {CATEGORIES.map((cat) => (
            <details key={cat.slug}>
              <summary>{cat.name}</summary>
              <ul>
                {COURSES.filter((c) => c.category === cat.slug).map((c) => <li key={c.slug}><Link href={`/courses/${c.slug}`}>{c.title}</Link></li>)}
              </ul>
            </details>
          ))}
          <Link href="/courses">All courses</Link>
          <Link href="/learning-paths">Learning Paths</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {/* Sign in/sign up hidden per user request */}
          {/* <div className="drawer-cta"><Link href={SIGNIN} className="btn btn-ghost">Sign in</Link><Link href={SIGNUP} className="btn btn-primary">Sign up</Link></div> */}
        </nav>
      </div>
    </header>
  );
}
