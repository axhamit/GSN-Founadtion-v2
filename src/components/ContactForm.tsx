"use client";
import { useState } from "react";

type State = "idle" | "sending" | "success" | "error";

export default function ContactForm({ course }: { course?: string }) {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setState("success");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "success")
    return <div className="notice ok" role="status"><strong>Inquiry sent.</strong> The GSN Foundation team will contact you soon.</div>;

  return (
    <form onSubmit={onSubmit} className="form" noValidate={false}>
      <label>Full name<input name="name" required maxLength={100} autoComplete="name" /></label>
      <label>Phone<input name="phone" type="tel" required maxLength={20} autoComplete="tel" /></label>
      <label>Email (optional)<input name="email" type="email" maxLength={120} autoComplete="email" /></label>
      <label>Course of interest<input name="course" defaultValue={course} maxLength={100} /></label>
      <label>Message<textarea name="message" rows={4} maxLength={1000} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send inquiry"}</button>
      {state === "error" && <p className="notice err" role="alert">{msg}</p>}
    </form>
  );
}
