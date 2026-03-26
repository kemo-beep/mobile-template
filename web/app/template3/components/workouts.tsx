import { ArrowRight } from "lucide-react";
import { FadeInUp, AnimatedCounter, Parallax } from "./animations";
import { AppStoreButton } from "./header";

export function Workouts() {
  return (
    <section className="py-32 relative bg-[#fafafa] dark:bg-transparent transition-colors duration-500">
      <FadeInUp delay={0.1} className="max-w-7xl mx-auto px-6">
        <div className="bg-[#8bc34a] dark:bg-[#ccff00] rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-[0_0_100px_rgba(139,195,74,0.3)] dark:shadow-[0_0_100px_rgba(204,255,0,0.15)]">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
          
          <div className="max-w-xl relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter mb-6 leading-[0.9]">
              Ready to sweat?
            </h2>
            <p className="text-xl text-black/70 font-bold mb-10">
              Join the elite athletes who have already elevated their game. Free for your first 14 days.
            </p>
            <AppStoreButton variant="secondary" className="py-4 px-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:shadow-[0_0_60px_rgba(0,0,0,0.5)]" />
          </div>

          <div className="relative z-10 w-full max-w-sm">
            <Parallax speed={0.05}>
              <div className="aspect-square bg-gray-50 dark:bg-black rounded-[2.5rem] p-8 transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 shadow-2xl flex flex-col justify-center items-center text-center border border-black/10 dark:border-white/10">
                <p className="text-[#8bc34a] dark:text-[#ccff00] text-6xl md:text-7xl font-black mb-2 tracking-tighter">
                  <AnimatedCounter value={1000000} suffix="+" duration={2.5} />
                </p>
                <p className="text-black dark:text-white text-xl font-bold">Workouts Logged</p>
              </div>
            </Parallax>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
}
