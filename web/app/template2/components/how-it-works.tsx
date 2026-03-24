"use client"

import { FadeInUp, BlurFade, useElementScrollProgress } from "./animations"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Set your intention",
    description: "Define what you want to accomplish. Clarity helps you break down big goals into manageable focus sessions.",
  },
  {
    number: "02", 
    title: "Enter focus mode",
    description: "Block distractions and immerse yourself in deep work. Our intelligent system learns your optimal work patterns.",
  },
  {
    number: "03",
    title: "Track your progress",
    description: "See beautiful insights about your productivity. Understand when you work best and optimize your schedule.",
  },
]

export function HowItWorks() {
  const { ref, progress } = useElementScrollProgress()

  return (
    <section id="how-it-works" className="py-32 lg:py-40 bg-muted/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--foreground) / 0.03) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-20 lg:mb-28">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-sm mb-6 border border-border/50">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
              <span className="text-muted-foreground font-medium">How it works</span>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Simple. Powerful. Effective.
            </h2>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Three steps to transform your productivity and reclaim your focus.
            </p>
          </FadeInUp>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-border hidden sm:block">
            <div 
              className="absolute top-0 left-0 w-full bg-foreground transition-all duration-100"
              style={{ 
                height: `${Math.min(progress * 1.5, 1) * 100}%`,
              }}
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <BlurFade key={step.number} delay={0.1 + index * 0.15}>
                <div className={cn(
                  "relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
                  index % 2 === 1 && "lg:text-right"
                )}>
                  {/* Step number for mobile / left column */}
                  <div className={cn(
                    "relative",
                    index % 2 === 1 && "lg:order-2"
                  )}>
                    <div className="flex items-start gap-6 lg:gap-8">
                      {/* Number circle */}
                      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background border-2 border-foreground shrink-0">
                        <span className="text-lg font-bold text-foreground">{step.number}</span>
                      </div>
                      
                      <div className="lg:hidden pt-2">
                        <h3 className="text-2xl font-bold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content for desktop */}
                  <div className={cn(
                    "hidden lg:block",
                    index % 2 === 1 && "lg:order-1"
                  )}>
                    <div className={cn(
                      "max-w-md",
                      index % 2 === 1 && "ml-auto"
                    )}>
                      <h3 className="text-3xl font-bold text-foreground mb-4">
                        {step.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
