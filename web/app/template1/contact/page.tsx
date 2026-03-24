import Link from "next/link";

export default function Template1ContactPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/template1" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900">
          ← Back to Template 1
        </Link>
        <h1 className="mt-6 text-5xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          Reach the Lumina team for support, partnerships, or feedback. We usually reply within one business day.
        </p>

        <section className="mt-12 grid gap-5">
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">Support</h2>
            <p className="mt-2 text-neutral-600">
              Email{" "}
              <a href="mailto:support@lumina.app" className="underline underline-offset-4">
                support@lumina.app
              </a>
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">Partnerships</h2>
            <p className="mt-2 text-neutral-600">
              Email{" "}
              <a href="mailto:partners@lumina.app" className="underline underline-offset-4">
                partners@lumina.app
              </a>
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">Press</h2>
            <p className="mt-2 text-neutral-600">
              Email{" "}
              <a href="mailto:press@lumina.app" className="underline underline-offset-4">
                press@lumina.app
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
