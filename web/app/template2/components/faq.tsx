"use client"

import { Plus } from "lucide-react"
import { FadeInUp, BlurFade } from "./animations"

const faqs = [
  {
    question: "Is Clarity really free?",
    answer:
      "Yes. The core experience is free forever, including focus sessions, habit tracking, and productivity insights.",
  },
  {
    question: "Do you collect personal data?",
    answer:
      "No. Privacy is built-in from day one. Your entries and sessions stay private and are never sold to third parties.",
  },
  {
    question: "Can I use it without internet?",
    answer:
      "Absolutely. Clarity works offline so you can keep your momentum anywhere, then sync when you are connected again.",
  },
  {
    question: "Which platforms are supported?",
    answer:
      "Clarity is optimized for iOS and works great on modern Apple devices with smooth cross-device continuity.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 text-sm mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
              <span className="text-muted-foreground font-medium">FAQ</span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Questions, answered simply
            </h2>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Quick answers to the most common things people ask before getting started.
            </p>
          </FadeInUp>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-4">
          {faqs.map((item, index) => (
            <BlurFade key={item.question} delay={0.1 + index * 0.08}>
              <details className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-foreground/5">
                <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                  <Plus className="h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{item.answer}</p>
              </details>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
