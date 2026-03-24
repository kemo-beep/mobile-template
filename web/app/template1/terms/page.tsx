import Link from "next/link";

export default function Template1TermsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/template1" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900">
          ← Back to Template 1
        </Link>
        <h1 className="mt-6 text-5xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          By using Lumina, you agree to these terms that govern account use, acceptable behavior, and service availability.
        </p>

        <section className="mt-12 space-y-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">Acceptable Use</h2>
            <p className="mt-2 text-neutral-600">You agree not to misuse, reverse engineer, or disrupt service operations.</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">Service Availability</h2>
            <p className="mt-2 text-neutral-600">We continuously improve reliability, but availability may vary due to maintenance or outages.</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">Updates to Terms</h2>
            <p className="mt-2 text-neutral-600">Terms may be updated periodically. Continued use means you accept the latest version.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
