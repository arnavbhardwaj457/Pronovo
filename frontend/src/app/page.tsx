import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      {/* ── Hero ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background: dot grid + subtle glow */}
        <div className="absolute inset-0 -z-10 dot-grid" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-[140px] -z-10" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          {/* Version badge */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[12px] font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              v1.0 — Open source
            </span>
          </div>

          {/* Headline — short, confident, no fluff */}
          <h1 className="text-center text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.03em]">
            Understand how you
            <br />
            <span className="text-primary">actually sound</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[540px] text-center text-[15px] leading-relaxed text-muted-foreground">
            Upload a short English recording. Get phoneme-level scores,
            word-by-word breakdowns, and actionable tips to improve
            your pronunciation — in under 30 seconds.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/assess"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-[13px] font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Try it now
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="https://github.com/arnavbhardwaj457/Pronovo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View source
            </a>
          </div>

          {/* Audio visualizer — minimal, just a tasteful accent */}
          <div className="mt-14 flex items-end justify-center gap-[3px] h-10 opacity-40" aria-hidden>
            {Array.from({ length: 48 }).map((_, i) => {
              const h = Math.abs(Math.sin(i * 0.35)) * 100;
              return (
                <div
                  key={i}
                  className="w-[2px] rounded-full bg-primary/60"
                  style={{
                    height: `${Math.max(8, h)}%`,
                    animation: `wave 2.4s ease-in-out ${i * 0.04}s infinite`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="mb-12 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-primary mb-2">
              How it works
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Three steps, zero friction
            </h2>
          </div>

          <div className="grid gap-px sm:grid-cols-3 bg-border rounded-xl overflow-hidden">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Record or upload a 30–45 second English audio clip. WAV, MP3, M4A, and more.",
              },
              {
                step: "02",
                title: "Analyze",
                desc: "Azure Speech AI scores every phoneme. Gemini generates personalized feedback.",
              },
              {
                step: "03",
                title: "Improve",
                desc: "See word-by-word scores, tap into phoneme breakdowns, follow coaching tips.",
              },
            ].map((item) => (
              <div key={item.step} className="bg-background p-6 sm:p-8">
                <span className="text-[11px] font-bold tracking-widest text-primary/60 uppercase">
                  Step {item.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical highlights ──────────────── */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="mb-12 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-primary mb-2">
              Under the hood
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Built for quality, not demos
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 stagger">
            {[
              {
                title: "Phoneme-level granularity",
                desc: "Not just word scores. Every individual sound is assessed using Azure's pronunciation assessment engine — the same technology behind language learning platforms.",
                tag: "Azure Speech SDK",
              },
              {
                title: "AI coaching, not just scores",
                desc: "Gemini 2.5 Flash analyzes patterns across your results to generate specific, actionable feedback. It identifies L1 interference patterns and suggests targeted exercises.",
                tag: "Gemini 2.5 Flash",
              },
              {
                title: "Privacy by architecture",
                desc: "Audio is processed in-memory and immediately discarded. No database, no file storage, no accounts. The safest data is data you never store.",
                tag: "DPDP Compliant",
              },
              {
                title: "Production engineering",
                desc: "TypeScript end-to-end, Zod validation, structured logging, rate limiting, LLM fallbacks, retry with backoff. Not a hackathon project.",
                tag: "Full Stack",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="card-glow group rounded-xl border border-border bg-background p-5 sm:p-6 transition-all animate-fade-up"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold mb-1.5">{feature.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Ready to hear the truth?
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground">
            It takes less than a minute. No sign-up required.
          </p>
          <Link
            href="/assess"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-6 text-[13px] font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Start assessment
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row text-[12px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="6" className="fill-primary" />
                <path d="M10 22V10h4.5c1.4 0 2.5.35 3.3 1.05.8.7 1.2 1.65 1.2 2.85 0 1.2-.4 2.15-1.2 2.85-.8.7-1.9 1.05-3.3 1.05H13v4.2H10z" className="fill-primary-foreground" />
              </svg>
              <span>Pronovo · Built by Arnav</span>
            </div>
            <p className="text-muted-foreground/60">
              Audio processed in-memory. Never stored. DPDP Act compliant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
