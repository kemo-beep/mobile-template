import Link from "next/link"

export default function Template2ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <Link href="/template2" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Template 2
        </Link>

        <div className="mt-8 rounded-3xl border border-border bg-card p-8 lg:p-10 shadow-sm">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Need help or want to collaborate? Reach out to the Clarity team and we will respond as quickly as possible.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-semibold">Support</h2>
            <p className="mt-2 text-muted-foreground">
              <a href="mailto:support@clarity.app" className="underline underline-offset-4">
                support@clarity.app
              </a>
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-semibold">Partnerships</h2>
            <p className="mt-2 text-muted-foreground">
              <a href="mailto:partners@clarity.app" className="underline underline-offset-4">
                partners@clarity.app
              </a>
            </p>
          </section>
          <section className="rounded-2xl border border-border/70 bg-card p-6 sm:col-span-2">
            <h2 className="text-xl font-semibold">Press</h2>
            <p className="mt-2 text-muted-foreground">
              <a href="mailto:press@clarity.app" className="underline underline-offset-4">
                press@clarity.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
