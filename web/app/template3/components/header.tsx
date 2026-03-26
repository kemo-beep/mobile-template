"use client";

import { Apple, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { MagneticButton } from "./animations";
import { ThemeToggle } from "./theme-toggle";

export function AppStoreButton({ className = "", variant = "primary" }: { className?: string; variant?: "primary" | "secondary" }) {
  const isPrimary = variant === "primary";
  const bgClass = isPrimary ? "bg-[#ccff00] text-black" : "bg-[#050505] text-white";

  return (
    <button
      className={`group relative flex items-center justify-center gap-3 overflow-hidden rounded-full transition-all duration-500 hover:scale-105 active:scale-95 ${bgClass} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
      <Apple size={28} className="mb-1 relative z-10" />
      <div className="flex flex-col items-start relative z-10">
        <span className={`text-[10px] leading-none font-bold tracking-wide ${isPrimary ? "text-black/70" : "text-white/70"}`}>
          Download on the
        </span>
        <span className="text-lg leading-none font-black mt-1 tracking-tight">App Store</span>
      </div>
    </button>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled 
          ? "top-0 w-full max-w-[100vw] rounded-none bg-white/90 dark:bg-[#050505]/90 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 py-4 shadow-xl dark:shadow-2xl" 
          : "top-6 w-[calc(100%-3rem)] max-w-6xl rounded-[2.5rem] bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 py-3 shadow-xl dark:shadow-2xl"
      }`}
    >
      <div className="w-full h-full flex items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black dark:bg-[#ccff00] flex items-center justify-center shadow-md dark:shadow-[0_0_20px_rgba(204,255,0,0.4)]">
            <div className="w-3 h-3 bg-white dark:bg-black rounded-full" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-black dark:text-white">AURA</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 px-4">
          {["Features", "Workouts", "Testimonials"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-black/70 dark:text-white/70 hover:text-black dark:hover:text-[#ccff00] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ccff00] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <MagneticButton strength={0.2}>
            <AppStoreButton className="py-2.5 px-6" />
          </MagneticButton>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button className="text-black dark:text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
}
