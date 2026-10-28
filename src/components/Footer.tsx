import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, COURSES } from "@/data/courses";
import { CONTACT } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container foot-grid">
        <div>
          <Image src="/logo.png" alt="GSN Foundation" width={240} height={60} className="footer-logo logo-light" />
          <Image src="/logoWhite.png" alt="" aria-hidden="true" width={240} height={60} className="footer-logo logo-dark" />
          <p className="muted">Bridging the gap between campus and corporate. Expert coaching for PCMB, JEE, NEET, KCET and 10th Board, plus new AI programs.</p>
          <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          {CONTACT.people.map((p) => <p key={p.phone} className="muted">{p.name}: <a href={`tel:${p.phone.replace(/\s/g, "")}`}>{p.phone}</a></p>)}
        </div>
        {CATEGORIES.map((cat) => (
          <div key={cat.slug}>
            <h2>{cat.name}</h2>
            <ul>{COURSES.filter((c) => c.category === cat.slug).map((c) => <li key={c.slug}><Link href={`/courses/${c.slug}`}>{c.title}</Link></li>)}</ul>
          </div>
        ))}
        <div>
          <h2>Company</h2>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/courses">All courses</Link></li>
            <li><Link href="/learning-paths">Learning paths</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="container foot-base"><p>© {new Date().getFullYear()} GSN Foundation. All rights reserved.</p></div>
    </footer>
  );
}
