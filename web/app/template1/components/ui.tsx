"use client";

import { useEffect, useRef, useState } from "react";
import { Apple } from "lucide-react";

function useInView(options: IntersectionObserverInit & { triggerOnce?: boolean } = { threshold: 0.1, triggerOnce: true }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce && ref.current) observer.unobserve(ref.current);
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin, options.triggerOnce]);

  return [ref, isInView] as const;
}

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
};

export function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const baseClasses = "transition-all duration-1000 ease-[0.25,0.25,0,1]";
  const stateClasses = isInView
    ? "opacity-100 translate-y-0 translate-x-0 scale-100"
    : `opacity-0 ${
        direction === "up"
          ? "translate-y-12"
          : direction === "down"
            ? "-translate-y-12"
            : direction === "left"
              ? "translate-x-12"
              : direction === "right"
                ? "-translate-x-12"
                : direction === "scale"
                  ? "scale-95"
                  : ""
      }`;

  return (
    <div ref={ref} className={`${baseClasses} ${stateClasses} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function AppStoreButton({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <button
      className={`group relative flex items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3.5 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${
        dark
          ? "bg-white text-black hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
          : "bg-[#0a0a0a] text-white hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] hover:bg-[#1a1a1a]"
      } ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
      <Apple size={28} className="mb-1 relative z-10" />
      <div className="flex flex-col items-start relative z-10">
        <span className={`text-[10px] leading-none font-medium tracking-wide ${dark ? "text-neutral-600" : "text-neutral-400"}`}>
          Download on the
        </span>
        <span className="text-lg leading-none font-semibold mt-1 tracking-tight">App Store</span>
      </div>
    </button>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
