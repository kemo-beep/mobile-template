import Link from "next/link"

export default function Template2PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <Link href="/template2" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Template 2
        </Link>

        <div className="mt-8 rounded-3xl border border-border bg-card p-8 lg:p-10 shadow-sm">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            This policy explains what data Clarity uses, why it is needed, and how your information remains protected.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-semibold">What We Collect</h2>
            <p className="mt-2 text-muted-foreground">Session activity, preferences, and optional account metadata used to keep your experience consistent.</p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-semibold">How We Use It</h2>
            <p className="mt-2 text-muted-foreground">To provide focus tracking, reminders, sync, and support. We never sell your personal data.</p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-semibold">Questions</h2>
            <p className="mt-2 text-muted-foreground">
              Contact{" "}
              <a href="mailto:privacy@clarity.app" className="underline underline-offset-4">
                privacy@clarity.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
