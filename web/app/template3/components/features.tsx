import { Zap, HeartPulse, ShieldCheck, Dumbbell } from "lucide-react";
import { FadeInUp, BlurFade } from "./animations";

const features = [
  {
    icon: <Dumbbell className="text-[#00f0ff]" size={32} />,
    title: "Adaptive Routines",
    desc: "Workouts that evolve in real-time based on your heart rate and muscle fatigue analysis."
  },
  {
    icon: <HeartPulse className="text-[#ccff00]" size={32} />,
    title: "Precision Biometrics",
    desc: "Connects seamlessly with Apple Health to provide deeply personalized recovery protocols."
  },
  {
    icon: <Zap className="text-purple-400" size={32} />,
    title: "Velocity Tracking",
    desc: "Leveraging the iPhone accelerometer to track your bar speed and explosive power."
  },
  {
    icon: <ShieldCheck className="text-rose-400" size={32} />,
    title: "Injury Prevention",
    desc: "AI-driven form correction alerts you before you compromise your structural integrity."
  }
];

export function Features() {
  return (
    <section className="py-32 relative z-10 bg-[#fafafa] dark:bg-[#050505] overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeInUp delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white mb-6">
              Intelligent by design.
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-xl text-black/60 dark:text-white/50 font-medium overflow-hidden">
              Aura doesn't just track your workouts. It thinks, anticipates, and challenges you to break your own limits.
            </p>
          </FadeInUp>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <BlurFade key={i} delay={0.2 + i * 0.1} className="h-full">
              <div className="group relative bg-white dark:bg-[#111] border border-black/5 dark:border-white/5 rounded-[2rem] p-10 overflow-hidden hover:border-black/10 dark:hover:border-white/20 transition-all duration-500 h-full shadow-lg dark:shadow-none">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-black border border-black/10 dark:border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-bold text-black dark:text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-lg text-black/60 dark:text-white/50 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
