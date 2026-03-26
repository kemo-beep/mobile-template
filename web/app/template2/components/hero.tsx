"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhoneMockup } from "./phone-mockup"
import { 
  FadeInUp, 
  LineReveal, 
  MagneticButton, 
  AnimatedCounter,
  BlurFade,
  Parallax
} from "./animations"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Parallax speed={0.3} className="absolute -top-[40%] -right-[20%] w-[80%] h-[80%]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-muted/40 via-transparent to-transparent blur-3xl" />
        </Parallax>
        <Parallax speed={0.5} className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%]">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-muted/30 via-transparent to-transparent blur-3xl" />
        </Parallax>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Announcement badge */}
          <FadeInUp delay={0}>
            <div className="mb-8 flex justify-center">
              <Link
                href="#features"
                className="group inline-flex items-center gap-3 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 px-1.5 py-1.5 pr-5 text-sm transition-all hover:bg-muted hover:border-border"
              >
                <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                  New
                </span>
                <span className="text-muted-foreground">Focus Mode 2.0 is here</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeInUp>

          {/* Main headline */}
          <div className="space-y-4">
            <LineReveal delay={0.1}>
              <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl xl:text-[6rem]">
                Focus on what
              </h1>
            </LineReveal>
            <LineReveal delay={0.2}>
              <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl xl:text-[6rem]">
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
                  truly matters
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-foreground/10"
                    viewBox="0 0 200 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M1 8.5C47 2 87 2 199 8.5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="animate-draw-line"
                    />
                  </svg>
                </span>
              </h1>
            </LineReveal>
          </div>

          {/* Subheadline */}
          <FadeInUp delay={0.4} className="mt-8">
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl max-w-2xl mx-auto text-balance">
              A beautifully simple app designed to help you stay focused and accomplish more with less distraction.
            </p>
          </FadeInUp>

          {/* CTA Buttons */}
          <FadeInUp delay={0.5} className="mt-12">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <MagneticButton strength={0.25}>
                <Button 
                  size="lg" 
                  className="group relative rounded-full px-8 py-7 text-base overflow-hidden bg-foreground text-background shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] dark:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(0,0,0,0.6)] dark:hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)] transition-shadow duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2 font-semibold">
                    Download for iOS
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </MagneticButton>
              
              <MagneticButton strength={0.15}>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="group rounded-full px-8 py-7 text-base text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  <Play className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Watch demo
                </Button>
              </MagneticButton>
            </div>
          </FadeInUp>

          {/* Social proof */}
          <FadeInUp delay={0.6} className="mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[
                    "from-amber-200 to-amber-300",
                    "from-rose-200 to-rose-300",
                    "from-blue-200 to-blue-300",
                    "from-emerald-200 to-emerald-300",
                    "from-violet-200 to-violet-300",
                  ].map((gradient, i) => (
                    <div
                      key={i}
                      className="relative h-10 w-10 rounded-full border-[3px] border-background overflow-hidden transition-transform duration-300 hover:scale-110 hover:z-10"
                      style={{
                        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">
                    <AnimatedCounter value={50000} suffix="+" />
                  </p>
                  <p className="text-sm text-muted-foreground">focused individuals</p>
                </div>
              </div>
              
              <div className="hidden sm:block h-12 w-px bg-border" />
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-foreground">4.9</p>
                  <p className="text-sm text-muted-foreground">App Store rating</p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* Phone mockup with parallax */}
        <BlurFade delay={0.7} className="mt-20 lg:mt-24">
          <Parallax speed={0.2}>
            <PhoneMockup />
          </Parallax>
        </BlurFade>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-muted-foreground/50 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-foreground animate-scroll-line" />
          </div>
        </div>
      </div>
    </section>
  )
}
