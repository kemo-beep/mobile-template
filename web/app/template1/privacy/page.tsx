import Link from "next/link";

export default function Template1PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-neutral-900">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/template1" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900">
          ← Back to Template 1
        </Link>
        <h1 className="mt-6 text-5xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">
          Your privacy matters. This page explains how data is stored, processed, and protected when using the Lumina experience.
        </p>

        <section className="mt-12 space-y-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">Information We Store</h2>
            <p className="mt-2 text-neutral-600">Journal content, habits, and usage preferences are stored securely and only used to power app features.</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">How We Use Data</h2>
            <p className="mt-2 text-neutral-600">Data is used to deliver syncing, personalization, and product reliability. We do not sell personal data.</p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-7">
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="mt-2 text-neutral-600">
              For privacy requests, email{" "}
              <a href="mailto:privacy@lumina.app" className="underline underline-offset-4">
                privacy@lumina.app
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
