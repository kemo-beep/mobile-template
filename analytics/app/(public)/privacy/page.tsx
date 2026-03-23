export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>
      <div className="mt-8 space-y-4 text-sm">
        <p>
          This is a placeholder privacy policy. Replace this content with your actual
          privacy policy that describes how you collect, use, and protect user data.
        </p>
        <p>
          Include sections for: data collection, data use, data retention, cookies,
          third-party services, user rights, and contact information.
        </p>
      </div>
    </div>
  );
}
