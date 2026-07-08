import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    title: "Phoneme-Level Analysis",
    description: "Every sound you make is individually scored. See exactly which phonemes need work and how to improve them.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Multi-Dimensional Scoring",
    description: "Get scored on accuracy, fluency, completeness, and prosody — the four pillars of natural speech.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "AI-Powered Coaching",
    description: "Receive personalized feedback from AI that identifies patterns, suggests exercises, and tracks your strengths.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Privacy-First Design",
    description: "Audio is processed in-memory and immediately discarded. Zero data retention. DPDP Act compliant.",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-violet-500/10 blur-[120px]" />
          <div className="absolute top-40 left-1/4 h-[300px] w-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />
          <div className="absolute top-20 right-1/4 h-[250px] w-[350px] rounded-full bg-purple-500/8 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Powered by Azure Speech AI & Gemini
            </div>

            {/* Headline */}
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Perfect your{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                pronunciation
              </span>
              <br />
              with AI precision
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Upload a 30–45 second English audio recording and receive instant,
              phoneme-level pronunciation feedback with personalized coaching.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/assess"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110"
              >
                Start Assessment
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <span className="text-sm text-muted-foreground">
                No account required · Free to use
              </span>
            </div>

            {/* Audio wave animation */}
            <div className="mt-16 flex items-center justify-center gap-1" aria-hidden>
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-violet-500/40 to-indigo-500/40"
                  style={{
                    height: `${Math.max(8, Math.sin(i * 0.4) * 30 + Math.random() * 20)}px`,
                    animation: `wave ${1.5 + Math.random() * 0.5}s ease-in-out ${i * 0.05}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/40 bg-card/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Enterprise-grade speech analysis
            </h2>
            <p className="mt-3 text-muted-foreground">
              Built with the same technology used by language learning platforms worldwide.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-card/80 hover:shadow-lg hover:shadow-violet-500/5"
              >
                <div className="mb-4 inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-400 transition-colors group-hover:bg-violet-500/15">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-sm font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-violet-500 to-indigo-600 text-[10px] font-bold text-white">
                P
              </div>
              <span>Pronovo</span>
              <span className="mx-1">·</span>
              <span>Built by Arnav</span>
            </div>
            <p className="text-xs text-muted-foreground/60">
              Audio is processed in-memory and never stored. DPDP Act compliant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
