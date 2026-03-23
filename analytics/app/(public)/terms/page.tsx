export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <div className="mt-8 space-y-4 text-sm">
        <p>
          This is a placeholder terms of service. Replace this content with your actual
          terms that govern use of the analytics dashboard and related services.
        </p>
        <p>
          Include sections for: acceptance of terms, description of service, user
          obligations, intellectual property, disclaimers, and limitation of liability.
        </p>
      </div>
    </div>
  );
}
