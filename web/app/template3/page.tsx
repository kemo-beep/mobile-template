import { Metadata } from "next";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Workouts } from "./components/workouts";
import { Footer } from "./components/footer";
import { ScrollProgress } from "./components/animations";
import { Header } from "./components/header";

export const metadata: Metadata = {
  title: "Aura | Personalized AI Fitness",
  description: "The most intelligent iOS fitness tracker with electric energy.",
};

export default function Template3Page() {
  return (
    <div className="bg-[#fafafa] dark:bg-[#050505] min-h-screen text-black dark:text-white selection:bg-[#ccff00] selection:text-black overflow-x-hidden font-sans transition-colors duration-500">
      <ScrollProgress className="[&>div]:bg-[#ccff00]" />
      <Header />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes customPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-custom-pulse {
          animation: customPulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .neon-border {
          box-shadow: 0 0 20px rgba(204, 255, 0, 0.2), inset 0 0 20px rgba(204, 255, 0, 0.1);
          border: 1px solid rgba(204, 255, 0, 0.5);
        }
      ` }} />

      <Hero />
      <Features />
      <Workouts />
      <Footer/>
    </div>
  );
}
