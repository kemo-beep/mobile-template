"use client"

import { useRef, useEffect, useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeInUp, BlurFade } from "./animations"

const testimonials = [
  {
    content: "This app has completely transformed how I approach my work day. I've never been more productive or felt more in control of my time.",
    author: "Sarah Chen",
    role: "Product Designer",
    company: "Stripe",
    image: "from-rose-300 to-rose-400",
    rating: 5,
  },
  {
    content: "Finally, an app that respects my privacy while helping me stay focused. It's exactly what I needed for deep work sessions.",
    author: "Marcus Williams",
    role: "Software Engineer", 
    company: "Linear",
    image: "from-blue-300 to-blue-400",
    rating: 5,
  },
  {
    content: "The insights feature helped me understand my productivity patterns. Game changer for remote work and async collaboration.",
    author: "Elena Rodriguez",
    role: "Marketing Lead",
    company: "Notion",
    image: "from-amber-300 to-amber-400",
    rating: 5,
  },
  {
    content: "I've tried dozens of focus apps, but Clarity is the only one that stuck. The design is beautiful and it just works.",
    author: "James Park",
    role: "Founder",
    company: "Raycast",
    image: "from-emerald-300 to-emerald-400",
    rating: 5,
  },
  {
    content: "The focus sessions have helped me write more consistently than ever before. My book is finally getting finished.",
    author: "Olivia Martinez",
    role: "Author",
    company: "Independent",
    image: "from-violet-300 to-violet-400",
    rating: 5,
  },
  {
    content: "As a developer, I need long stretches of uninterrupted focus. Clarity helps me protect that time and track my progress.",
    author: "David Kim",
    role: "Senior Engineer",
    company: "Vercel",
    image: "from-cyan-300 to-cyan-400",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 lg:py-40 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-muted/50 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-1.5 text-sm mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
              <span className="text-muted-foreground font-medium">Testimonials</span>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Loved by focused individuals
            </h2>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Join thousands of people who have transformed their productivity with Clarity.
            </p>
          </FadeInUp>
        </div>

        {/* Testimonials marquee */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <TestimonialMarquee testimonials={testimonials.slice(0, 3)} direction="left" />
          <TestimonialMarquee testimonials={testimonials.slice(3)} direction="right" className="mt-6" />
        </div>
      </div>
    </section>
  )
}

type TestimonialItem = typeof testimonials[0];

function TestimonialMarquee({ 
  testimonials: items, 
  direction = "left",
  className
}: { 
  testimonials: TestimonialItem[]
  direction?: "left" | "right"
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div 
      ref={containerRef}
      className={cn("flex overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className={cn(
          "flex gap-6 animate-marquee",
          direction === "right" && "animate-marquee-reverse",
          isPaused && "pause-animation"
        )}
        style={{
          animationPlayState: isPaused ? "paused" : "running"
        }}
      >
        {/* Double the testimonials for seamless loop */}
        {[...items, ...items].map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.author}-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[number] }) {
  return (
    <div className="group relative w-[400px] shrink-0 rounded-2xl bg-card border border-border/50 p-8 transition-all duration-300 hover:border-border hover:shadow-lg">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-foreground leading-relaxed mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className={cn(
          "h-12 w-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-medium",
          testimonial.image
        )}>
          {testimonial.author.split(" ").map(n => n[0]).join("")}
        </div>
        <div>
          <p className="font-medium text-foreground">{testimonial.author}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}
