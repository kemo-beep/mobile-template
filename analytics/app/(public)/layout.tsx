import { LandingFooter } from "@/components/landing-footer";
import { LandingHeader } from "@/components/landing-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
