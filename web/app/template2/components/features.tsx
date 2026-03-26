"use client"

import { useRef, useState } from "react"
import { Focus, Zap, Shield, BarChart3, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeInUp, BlurFade } from "./animations"

const features = [
  {
    icon: Focus,
    title: "Deep Focus Mode",
    description: "Block distractions and enter a state of deep concentration with our intelligent focus sessions that adapt to your work patterns.",
    color: "from-blue-500/20 to-blue-600/5",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: Zap,
    title: "Smart Reminders",
    description: "Get gentle nudges at the right moment to help you stay on track without breaking your flow state or creative momentum.",
    color: "from-amber-500/20 to-amber-600/5",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays on your device. We believe in privacy by design, not as an afterthought. No tracking, no selling data.",
    color: "from-emerald-500/20 to-emerald-600/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Insightful Analytics",
    description: "Understand your productivity patterns with beautiful, actionable insights that help you optimize your daily workflow.",
    color: "from-rose-500/20 to-rose-600/5",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
  },
]

export function Features() {
  return (
    <section id="features" className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 text-sm mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
              <span className="text-muted-foreground font-medium">Features</span>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Everything you need to stay focused
            </h2>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto text-balance">
              Thoughtfully designed features that help you do your best work without the noise.
            </p>
          </FadeInUp>
        </div>

        {/* Features grid */}
        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <BlurFade key={feature.title} delay={0.1 + index * 0.1}>
              <FeatureCard feature={feature} index={index} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: typeof features[number]
  index: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group relative rounded-3xl bg-card p-8 lg:p-10 transition-all duration-500",
        "border border-border/50 hover:border-foreground/20",
        "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)]",
        "overflow-hidden",
        index === 0 && "sm:col-span-2 lg:col-span-1",
      )}
    >
      {/* Gradient spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: isHovering
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(var(--primary)), transparent 40%)`
            : "none",
        }}
      />
      
      {/* Subtle glowing border that follows mouse */}
      <div className="pointer-events-none absolute -inset-px rounded-[1.4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        style={{
          background: isHovering
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(var(--primary)), transparent 40%)`
            : "none",
          WebkitMaskImage: "linear-gradient(white, white)",
          WebkitMaskComposite: "xor",
          maskImage: "linear-gradient(white, white)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      >
        <div className="absolute inset-0 rounded-[1.4rem] bg-card" />
      </div>

      {/* Gradient background */}
      <div className={cn(
        "absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-60",
        `bg-gradient-to-br ${feature.color}`
      )} />

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className={cn(
            "inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
            feature.iconBg,
            "group-hover:scale-110"
          )}>
            <feature.icon className={cn("h-7 w-7 transition-colors", feature.iconColor)} />
          </div>
          
          <div className="opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
            <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-foreground transition-colors">
          {feature.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Hover indicator line */}
        <div className="mt-6 h-[2px] w-0 bg-foreground/20 transition-all duration-500 group-hover:w-16" />
      </div>
    </div>
  )
}
