export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="acc">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
