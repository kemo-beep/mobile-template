import { Header } from "./components/header"
import { Hero } from "./components/hero"
import { Features } from "./components/features"
import { HowItWorks } from "./components/how-it-works"
import { Testimonials } from "./components/testimonials"
import { FAQ } from "./components/faq"
import { CTA } from "./components/cta"
import { Footer } from "./components/footer"
import { ScrollProgress } from "./components/animations"

export default function LandingPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
