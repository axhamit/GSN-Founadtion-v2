import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page center">
      <h1>Page not found</h1>
      <p className="muted">That page does not exist or has moved.</p>
      <Link href="/courses" className="btn btn-primary">Browse courses</Link>
    </div>
  );
}
