"use client"

import { Button } from "@/components/ui/button"
import { Apple, Check, ArrowRight, Sparkles } from "lucide-react"
import { FadeInUp, FadeInScale, MagneticButton, AnimatedCounter } from "./animations"
import { cn } from "@/lib/utils"

const features = [
  "Unlimited focus sessions",
  "Smart task management",
  "Daily insights & analytics",
  "Cross-device sync",
  "No ads, ever",
  "Priority support",
]

export function CTA() {
  return (
    <section id="pricing" className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-foreground/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-gradient-to-bl from-foreground/5 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-1.5 text-sm mb-6 border border-border/50">
                <Sparkles className="h-4 w-4 text-foreground" />
                <span className="text-foreground font-medium">Free forever</span>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Start focusing today
              </h2>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Join <AnimatedCounter value={50000} suffix="+" className="font-semibold text-foreground" /> people who have transformed their productivity with Clarity.
              </p>
            </FadeInUp>
          </div>

          {/* Pricing card */}
          <FadeInScale delay={0.3}>
            <div className="relative mx-auto max-w-lg">
              {/* Card glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-foreground/10 via-foreground/5 to-foreground/10 rounded-[2rem] blur-xl" />
              
              <div className="relative rounded-[2rem] bg-card border border-border p-10 shadow-2xl shadow-foreground/5">
                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-6xl font-bold text-foreground">$0</span>
                    <span className="text-xl text-muted-foreground mb-2">/month</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">Free forever. No credit card required.</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

                {/* Features */}
                <ul className="space-y-4 mb-10">
                  {features.map((feature, index) => (
                    <li 
                      key={feature} 
                      className="flex items-center gap-4"
                      style={{
                        animationDelay: `${0.4 + index * 0.1}s`,
                      }}
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground">
                        <Check className="h-3.5 w-3.5 text-background" strokeWidth={3} />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <MagneticButton strength={0.1} className="w-full">
                  <Button 
                    size="lg" 
                    className="w-full rounded-xl py-7 text-base group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <Apple className="h-5 w-5" />
                      Download for iOS
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </MagneticButton>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Available on the App Store. Requires iOS 15 or later.
                </p>

                {/* Trust badges */}
                <div className="mt-8 flex items-center justify-center gap-6 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                    </svg>
                    <span>Secure</span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>No tracking</span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z" />
                    </svg>
                    <span>Private</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInScale>
        </div>
      </div>
    </section>
  )
}
