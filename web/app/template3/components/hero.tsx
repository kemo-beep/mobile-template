"use client";

import { ArrowRight, Play, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { FadeInUp, LineReveal, Parallax, MagneticButton, BlurFade } from "./animations";
import { AppStoreButton } from "./header";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <Parallax speed={-0.3} className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#8bc34a]/40 dark:bg-[#ccff00]/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-custom-pulse" style={{ animationDelay: '0s' }} />
        </Parallax>
        <Parallax speed={0.2} className="absolute inset-0">
          <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[#00f0ff]/30 dark:bg-[#00f0ff]/15 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-custom-pulse" style={{ animationDelay: '2s' }} />
        </Parallax>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left Side: Copy */}
        <div className="z-10 mt-10 lg:mt-0">
          <FadeInUp delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-semibold mb-8 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#8bc34a] dark:bg-[#ccff00] animate-pulse" />
              <span className="text-black/80 dark:text-white/80">Aura AI v2.0 is live</span>
            </div>
          </FadeInUp>
          
          <div className="space-y-4 mb-8">
            <LineReveal delay={0.2}>
              <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-black to-black/70 dark:from-white dark:to-white/70 pb-2">
                Unleash
              </h1>
            </LineReveal>
            <LineReveal delay={0.3}>
              <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.9] text-[#8bc34a] dark:text-[#ccff00] pb-2 drop-shadow-[0_0_20px_rgba(139,195,74,0.3)] dark:drop-shadow-[0_0_20px_rgba(204,255,0,0.5)]">
                Your Energy.
              </h1>
            </LineReveal>
          </div>
          
          <FadeInUp delay={0.4}>
            <p className="text-xl sm:text-2xl text-black/60 dark:text-white/50 font-medium max-w-lg mb-12 leading-relaxed">
              The hyper-intelligent fitness companion that adapts to your biometric rhythms in real-time.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.5}>
            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton strength={0.3}>
                <AppStoreButton className="py-4 px-8 shadow-[0_0_40px_rgba(204,255,0,0.3)] hover:shadow-[0_0_60px_rgba(204,255,0,0.5)]" />
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <button className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white font-semibold border border-black/10 dark:border-white/10 transition-all hover:scale-105 shadow-sm dark:shadow-none">
                  <Play className="w-5 h-5" fill="currentColor" /> Watch Film
                </button>
              </MagneticButton>
            </div>
          </FadeInUp>
        </div>

        {/* Right Side: Abstract Visual / Phone */}
        <div className="relative flex justify-center lg:justify-end">
          <BlurFade delay={0.6} duration={1}>
            <Parallax speed={0.15}>
              <div className="relative w-[320px] sm:w-[380px] h-[650px] bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-black/10 dark:border-white/20 p-4 shadow-2xl overflow-hidden dark:neon-border transform perspective-1000 mt-10 lg:mt-0">
            <div className="absolute top-0 inset-x-0 h-8 flex justify-center items-center z-20">
              <div className="w-32 h-6 bg-black rounded-b-3xl" />
            </div>
            {/* App UI Mockup */}
            <div className="w-full h-full bg-gray-100 dark:bg-[#111] rounded-[2rem] overflow-hidden relative flex flex-col p-6 border border-black/5 dark:border-none">
              <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#8bc34a]/30 dark:bg-[#ccff00]/20 blur-[60px] rounded-full" />
              
              <div className="mt-12 flex justify-between items-center z-10">
                <div>
                  <p className="text-black/50 dark:text-white/50 text-sm font-semibold">Today's Score</p>
                  <p className="text-4xl font-black text-black dark:text-white">94<span className="text-[#8bc34a] dark:text-[#ccff00] text-2xl">.2</span></p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#8bc34a]/20 dark:bg-[#ccff00]/20 flex items-center justify-center">
                  <Activity className="text-[#8bc34a] dark:text-[#ccff00]" />
                </div>
              </div>

              <div className="mt-auto space-y-4 z-10">
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none">
                  <p className="text-black dark:text-white font-bold mb-1">HIIT Session</p>
                  <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-[#8bc34a] dark:bg-[#ccff00]" />
                  </div>
                </div>
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-black/5 dark:border-white/5 flex gap-4 shadow-sm dark:shadow-none">
                  <div className="flex-1">
                    <p className="text-black/50 dark:text-white/50 text-xs font-semibold mb-1">CALORIES</p>
                    <p className="text-black dark:text-white font-bold text-xl">842</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-black/50 dark:text-white/50 text-xs font-semibold mb-1">BPM</p>
                    <p className="text-black dark:text-white font-bold text-xl">145</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </BlurFade>
    </div>
  </div>
</section>
  );
}
