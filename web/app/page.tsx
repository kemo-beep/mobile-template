import { buttonVariants } from "@/lib/button-variants"
import { PhoneMockup } from "@/components/phone-mockup"
import { RotatingText } from "@/components/rotating-text"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Page() {
  const appStoreUrl =
    process.env.NEXT_PUBLIC_APP_STORE_URL || "#"
  const playStoreUrl =
    process.env.NEXT_PUBLIC_PLAY_STORE_URL || "#"

  return (
    <div className="flex min-h-svh flex-col">
      {/* Floating pill-shaped header */}
      <header className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
        <nav className="flex items-center gap-6 rounded-full border border-border/50 bg-zinc-900/95 px-5 py-2.5 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-zinc-900/80">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="#people"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              People
            </Link>
            <Link
              href="#business"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Business
            </Link>
            <Link
              href="#company"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Company
            </Link>
          </div>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "ml-auto rounded-full bg-white px-4 text-sm font-medium text-zinc-900 hover:bg-white/90"
            )}
          >
            Log in
          </Link>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero section - mint/cream gradient */}
        <section className="relative flex flex-col items-center overflow-hidden rounded-b-[3rem] bg-gradient-to-b from-[#e8f5e9] via-[#f0f9f4] to-[#fafaf9] px-6 pb-16 pt-28">
          {/* Announcement badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-white/90 px-4 py-1.5 text-sm font-medium text-emerald-800 shadow-sm">
            We are live on Product Hunt! 🔥
          </div>
          <h1 className="max-w-3xl text-center text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
            Banking made simple, secure, and <RotatingText />
          </h1>
          <p className="mt-4 max-w-xl text-center text-lg text-zinc-600">
            Manage your finances anytime, anywhere with our easy-to-use mobile
            banking app.
          </p>
          <a
            href={appStoreUrl}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 flex h-12 items-center justify-center rounded-xl bg-zinc-900 px-8 text-base font-medium hover:bg-zinc-800"
            )}
          >
            Download App
          </a>
          {/* Hero image - phone mockup */}
          <div className="mt-10">
            <PhoneMockup />
          </div>
        </section>

        {/* People section */}
        <section id="people" className="scroll-mt-24 border-t border-border/50 bg-muted/30 px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Built for people like you
            </h2>
            <p className="mt-3 text-muted-foreground">
              Individuals and families who want banking that just works — no hidden fees,
              no complicated setup. Open an account in minutes.
            </p>
          </div>
        </section>

        {/* Business section */}
        <section id="business" className="scroll-mt-24 px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Built for growing businesses
            </h2>
            <p className="mt-3 text-muted-foreground">
              Send invoices, manage team spending, and track cash flow — all from
              one app. Built for freelancers, startups, and small teams.
            </p>
          </div>
        </section>

        {/* Social proof / Trust section */}
        <section className="flex flex-col items-center border-t border-border/50 bg-muted/20 px-6 py-16">
          <p className="text-center text-sm font-medium text-zinc-600">
            Loved & trusted by +200,000 businesses
          </p>
          <div className="mt-6 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#4285F4]" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.636-8.634z" />
              </svg>
              <span className="text-xl font-bold text-zinc-900">★ 4.8</span>
              <span className="text-xs text-muted-foreground">Rating on Play Store</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 shadow-sm">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-zinc-900"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="text-xl font-bold text-zinc-900">★ 4.9</span>
              <span className="text-xs text-muted-foreground">Rating on App Store</span>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-emerald-600"
                fill="currentColor"
              >
                <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
              </svg>
              <span className="text-xl font-bold text-zinc-900">★ 4.8</span>
              <span className="text-xs text-muted-foreground">Rating on Trustpilot</span>
            </div>
          </div>
          {/* App Store buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={appStoreUrl}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex h-12 items-center gap-2 rounded-xl px-6 border-zinc-300 hover:bg-zinc-50"
              )}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href={playStoreUrl}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex h-12 items-center gap-2 rounded-xl px-6 border-zinc-300 hover:bg-zinc-50"
              )}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h5.06c.46-1.71 1.94-3 3.69-3 .36 0 .71.05 1.05.12.42-1.12 1.44-1.92 2.67-1.92 1.47 0 2.66 1.19 2.66 2.66 0 .14-.02.28-.04.41.62.27 1.12.86 1.3 1.58.05.2.08.41.08.62v9.62c0 .83-.67 1.5-1.5 1.5H4.5c-.83 0-1.5-.67-1.5-1.5zm14-7h-2v-2h2v2zm0-4h-2V7h2v2.5zM17.5 22h-5c-.83 0-1.5-.67-1.5-1.5v-17c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5z" />
              </svg>
              Google Play
            </a>
          </div>
        </section>

        {/* Company section */}
        <section id="company" className="scroll-mt-24 border-t border-border/50 bg-muted/30 px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Trusted by leading companies
            </h2>
            <p className="mt-3 text-muted-foreground">
              From startups to enterprises, thousands of teams rely on us for
              fast, secure, and transparent financial operations.
            </p>
          </div>
        </section>

        {/* Benefits section */}
        <section className="flex flex-col items-center px-6 py-20">
          <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Benefits
          </div>
          <h2 className="mt-4 max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Why choose us?
          </h2>
          <div className="mt-12 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
            <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/20 hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary/15">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900">Secure & Simple</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Bank with confidence. Your data is encrypted and protected with
                industry-leading security.
              </p>
            </div>
            <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/20 hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary/15">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900">Always Available</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Manage your finances anytime, anywhere. Full access on iOS and
                Android.
              </p>
            </div>
            <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition hover:border-primary/20 hover:shadow-md">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary/15">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 9l-5 5-4-4-3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900">Smart Insights</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Get personalized insights and recommendations to make better
                financial decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-gradient-to-b from-[#e8f5e9]/50 to-transparent px-6 py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Ready to get started?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Download the app and open your account in minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={appStoreUrl}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "flex h-12 items-center gap-2 rounded-xl bg-zinc-900 px-6 font-medium hover:bg-zinc-800"
                )}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href={playStoreUrl}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "flex h-12 items-center gap-2 rounded-xl border-zinc-300 px-6 hover:bg-zinc-50"
                )}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h5.06c.46-1.71 1.94-3 3.69-3 .36 0 .71.05 1.05.12.42-1.12 1.44-1.92 2.67-1.92 1.47 0 2.66 1.19 2.66 2.66 0 .14-.02.28-.04.41.62.27 1.12.86 1.3 1.58.05.2.08.41.08.62v9.62c0 .83-.67 1.5-1.5 1.5H4.5c-.83 0-1.5-.67-1.5-1.5zm14-7h-2v-2h2v2zm0-4h-2V7h2v2.5zM17.5 22h-5c-.83 0-1.5-.67-1.5-1.5v-17c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5z" />
                </svg>
                Google Play
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border bg-zinc-50">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <p className="mt-4 font-semibold text-zinc-900">Your App Name</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Mobile banking for modern teams and businesses. Simple, secure, and always available.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900">Product</p>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="#people" className="transition hover:text-zinc-900">People</Link>
              <Link href="#business" className="transition hover:text-zinc-900">Business</Link>
              <Link href="#company" className="transition hover:text-zinc-900">Company</Link>
              <a href={appStoreUrl} className="transition hover:text-zinc-900">App Store</a>
              <a href={playStoreUrl} className="transition hover:text-zinc-900">Google Play</a>
            </nav>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900">Legal</p>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/privacy" className="transition hover:text-zinc-900">Privacy Policy</Link>
              <Link href="/terms" className="transition hover:text-zinc-900">Terms of Service</Link>
              <Link href="/contact" className="transition hover:text-zinc-900">Contact</Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-border px-6 py-4">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Your App Name. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <Link href="/privacy" className="transition hover:text-zinc-900">Privacy</Link>
              <Link href="/terms" className="transition hover:text-zinc-900">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
