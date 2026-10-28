"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container page center">
      <h1>Something went wrong</h1>
      <p className="muted">Try again. If the problem continues, contact the GSN Foundation team.</p>
      <button type="button" className="btn btn-primary" onClick={reset}>Try again</button>
    </div>
  );
}
