import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background text-sm font-bold">
              M
            </div>
            <p className="text-sm font-semibold">Mobile Landing Templates</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/template1" className="rounded-full border border-border px-4 py-1.5 hover:bg-muted transition-colors">
              Template 1
            </Link>
            <Link href="/template2" className="rounded-full bg-foreground px-4 py-1.5 text-background hover:opacity-90 transition-opacity">
              Template 2
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-border/60 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex rounded-full border border-border bg-muted px-4 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Starter Collection
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Launch a polished mobile app landing page in minutes
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground text-lg">
              Choose between two complete landing page styles, each with FAQ, legal pages, and contact routes already wired.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/template1" className="rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90 transition-opacity">
                Explore Template 1
              </Link>
              <Link href="/template2" className="rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">
                Explore Template 2
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-card p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Template 1</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">Premium Apple-style hero</h2>
              <p className="mt-3 text-muted-foreground">
                Bold visual storytelling, cinematic sections, floating phone mockup, and elegant typography.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>• Glassmorphism sections and strong visual hierarchy</li>
                <li>• Collapsible FAQ section</li>
                <li>• Dedicated `privacy`, `terms`, and `contact` pages</li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/template1" className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90 transition-opacity">
                  Open Template 1
                </Link>
                <Link href="/template1/contact" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors">
                  Contact Page
                </Link>
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-card p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Template 2</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">Modern SaaS motion style</h2>
              <p className="mt-3 text-muted-foreground">
                Smooth reveal animations, product-first copy blocks, and modular sections built around reusable components.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>• Animation primitives and reusable blocks</li>
                <li>• Collapsible FAQ section</li>
                <li>• Dedicated `privacy`, `terms`, and `contact` pages</li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/template2" className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90 transition-opacity">
                  Open Template 2
                </Link>
                <Link href="/template2/contact" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors">
                  Contact Page
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="border-y border-border/60 bg-muted/30 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h3 className="text-xl font-bold tracking-tight">Quick Access</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/template1/privacy" className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Template 1 Privacy
              </Link>
              <Link href="/template1/terms" className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Template 1 Terms
              </Link>
              <Link href="/template1/contact" className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Template 1 Contact
              </Link>
              <Link href="/template2/privacy" className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Template 2 Privacy
              </Link>
              <Link href="/template2/terms" className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Template 2 Terms
              </Link>
              <Link href="/template2/contact" className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-muted transition-colors">
                Template 2 Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
