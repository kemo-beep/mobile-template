import Link from "next/link"

export default function Template2TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <Link href="/template2" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Template 2
        </Link>

        <div className="mt-8 rounded-3xl border border-border bg-card p-8 lg:p-10 shadow-sm">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            These terms describe the rules for using Clarity, including user responsibilities and service limitations.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-semibold">Account Responsibilities</h2>
            <p className="mt-2 text-muted-foreground">You are responsible for account security and lawful use of the product.</p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-semibold">Availability</h2>
            <p className="mt-2 text-muted-foreground">We aim for high availability, but maintenance and outages may occasionally affect access.</p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-semibold">Policy Updates</h2>
            <p className="mt-2 text-muted-foreground">Terms may change over time. Continued usage implies acceptance of the latest terms.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
