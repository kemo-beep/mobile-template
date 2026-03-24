"use client"

import { useRef, useEffect, useState } from "react"
import { CheckCircle2, Clock, ListTodo, Star, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function PhoneMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = (e.clientX - centerX) / rect.width
      const y = (e.clientY - centerY) / rect.height
      
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const rotateX = isHovering ? mousePosition.y * -10 : 0
  const rotateY = isHovering ? mousePosition.x * 10 : 0

  return (
    <div 
      ref={ref}
      className="relative flex justify-center"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 blur-3xl transition-opacity duration-500"
        style={{ opacity: isHovering ? 0.8 : 0.4 }}
      />

      {/* Phone container with 3D transform */}
      <div 
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Reflection/shadow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-foreground/10 rounded-full blur-2xl" />

        {/* Phone frame */}
        <div className="relative mx-auto w-[280px] sm:w-[300px] md:w-[320px]">
          {/* Phone outer shell */}
          <div className="rounded-[3rem] bg-gradient-to-b from-neutral-800 to-neutral-900 p-[3px] shadow-2xl shadow-foreground/20">
            <div className="rounded-[2.85rem] bg-gradient-to-b from-neutral-700 to-neutral-800 p-[2px]">
              <div className="rounded-[2.7rem] bg-foreground p-2.5">
                {/* Phone screen */}
                <div className="rounded-[2.3rem] bg-card overflow-hidden relative">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-[100px] h-[28px] bg-foreground rounded-full flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-neutral-700" />
                      <div className="w-[6px] h-[6px] rounded-full bg-neutral-800" />
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="flex items-center justify-between px-8 pt-4 pb-2 bg-card">
                    <span className="text-xs font-semibold text-foreground">9:41</span>
                    <div className="flex items-center gap-1.5">
                      <SignalIcon />
                      <WifiIcon />
                      <BatteryIcon />
                    </div>
                  </div>

                  {/* App content */}
                  <div className="px-5 pb-8 pt-4 min-h-[480px]">
                    {/* Greeting with animation */}
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground animate-fade-in">Good morning</p>
                      <h2 className="text-xl font-semibold text-foreground animate-fade-in animation-delay-100">
                        Let&apos;s focus today
                      </h2>
                    </div>

                    {/* Focus stats card with gradient border */}
                    <div className="mb-6 relative group">
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-border via-muted-foreground/20 to-border rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative rounded-2xl bg-gradient-to-br from-muted to-muted/50 p-5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-foreground">Today&apos;s Focus</span>
                          <div className="flex items-center gap-1 text-emerald-500">
                            <TrendingUp className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">+12%</span>
                          </div>
                        </div>
                        <div className="flex items-end gap-2">
                          <p className="text-4xl font-bold text-foreground tracking-tight">4:32</p>
                          <span className="text-sm text-muted-foreground mb-1">hours</span>
                        </div>
                        <div className="mt-4 h-2.5 w-full rounded-full bg-background/80 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-foreground to-foreground/80 transition-all duration-1000 ease-out animate-progress-fill"
                            style={{ width: "72%" }}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">72% of daily goal</p>
                          <p className="text-xs font-medium text-foreground">6h goal</p>
                        </div>
                      </div>
                    </div>

                    {/* Tasks section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-foreground">Priority Tasks</span>
                        <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                          See all
                        </button>
                      </div>
                      <div className="space-y-2.5">
                        <TaskItem completed text="Morning meditation" time="15 min" />
                        <TaskItem completed text="Review project brief" time="30 min" />
                        <TaskItem text="Deep work session" priority time="2 hr" />
                        <TaskItem text="Team standup" time="30 min" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Side buttons */}
          <div className="absolute -left-[2px] top-[120px] w-[3px] h-8 bg-neutral-700 rounded-l-sm" />
          <div className="absolute -left-[2px] top-[160px] w-[3px] h-14 bg-neutral-700 rounded-l-sm" />
          <div className="absolute -left-[2px] top-[185px] w-[3px] h-14 bg-neutral-700 rounded-l-sm" />
          <div className="absolute -right-[2px] top-[150px] w-[3px] h-16 bg-neutral-700 rounded-r-sm" />
        </div>

        {/* Floating elements */}
        <div className="absolute -left-20 top-1/4 animate-float-slow hidden lg:block">
          <div className="rounded-2xl bg-card border border-border/50 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Task completed</p>
                <p className="text-xs text-muted-foreground">Morning meditation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-16 top-1/2 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
          <div className="rounded-2xl bg-card border border-border/50 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Focus time</p>
                <p className="text-xs text-muted-foreground">4h 32m today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TaskItem({ 
  text, 
  completed = false, 
  priority = false,
  time
}: { 
  text: string
  completed?: boolean
  priority?: boolean
  time: string
}) {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 rounded-xl p-3.5 transition-all duration-200",
        completed 
          ? "bg-background/50" 
          : "bg-background hover:bg-background/80 hover:shadow-sm"
      )}
    >
      <button 
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200",
          completed 
            ? "bg-foreground" 
            : "border-2 border-muted-foreground/30 hover:border-foreground/50"
        )}
      >
        {completed && <CheckCircle2 className="h-5 w-5 text-background" />}
      </button>
      <div className="flex-1 min-w-0">
        <span className={cn(
          "text-sm block truncate transition-colors",
          completed ? "text-muted-foreground line-through" : "text-foreground"
        )}>
          {text}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {priority && (
          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
        )}
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  )
}

function SignalIcon() {
  return (
    <svg className="h-4 w-4 text-foreground" viewBox="0 0 17 14" fill="currentColor">
      <path d="M1 10h2v4H1v-4zm4-3h2v7H5V7zm4-3h2v10H9V4zm4-4h2v14h-2V0z" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg className="h-4 w-4 text-foreground" viewBox="0 0 16 12" fill="currentColor">
      <path d="M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM1.61 4.21a9.07 9.07 0 0 1 12.78 0l-1.06 1.06a7.58 7.58 0 0 0-10.66 0L1.61 4.21zm2.12 2.12a6.07 6.07 0 0 1 8.54 0l-1.06 1.06a4.57 4.57 0 0 0-6.42 0L3.73 6.33zm2.12 2.12a3.07 3.07 0 0 1 4.3 0l-1.06 1.06a1.57 1.57 0 0 0-2.18 0L5.85 8.45z" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg className="h-4 w-6 text-foreground" viewBox="0 0 25 12" fill="currentColor">
      <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="2" y="2" width="17" height="8" rx="1" fill="currentColor" />
      <path d="M23 4v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
