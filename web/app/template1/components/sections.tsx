import { Activity, Apple, Fingerprint, Menu, Moon, Star, X, Zap } from "lucide-react";
import Link from "next/link";
import { AppStoreButton, CheckIcon, Reveal, SparklesIcon } from "./ui";
import { PhoneMockup } from "./phone-mockup";

const navItems = ["Features", "Design", "Reviews"] as const;

export function Navigation({
  isScrolled,
  isMobileMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}) {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/70 backdrop-blur-xl border-b border-neutral-200/50 py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-[14px] bg-black flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
            <SparklesIcon className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-900">Lumina</span>
        </div>

        <div className="hidden md:flex items-center gap-10 bg-white/50 backdrop-blur-md px-8 py-2.5 rounded-full border border-neutral-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex">
          <button className="bg-neutral-900 hover:bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] hover:-translate-y-0.5">
            Get Started
          </button>
        </div>

        <button className="md:hidden text-neutral-900 z-50 relative" onClick={onToggleMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 flex flex-col pt-32 px-8 gap-8 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={onCloseMenu}
            className="text-3xl font-bold text-neutral-900 tracking-tight"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {item}
          </a>
        ))}
        <div className="pt-8 mt-auto mb-12">
          <AppStoreButton className="w-full" />
        </div>
      </div>
    </nav>
  );
}

export function HeroSection() {
  return (
    <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-[100px] -z-10 animate-pulse-glow" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 lg:gap-12 items-center">
        <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0 relative z-10">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-neutral-800 text-xs font-bold uppercase tracking-widest mb-8 border border-neutral-200/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
              </span>
              Native iOS Experience
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-neutral-900 leading-[1.05] mb-8">
              Clear mind.
              <br />
              <span className="text-gradient">Master day.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl sm:text-2xl text-neutral-500/90 mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              The beautifully minimalist journal and habit tracker designed exclusively for the Apple ecosystem.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <AppStoreButton />
              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-[3px] border-[#fafafa] bg-neutral-200 flex items-center justify-center overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col ml-2 text-left">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 font-bold mt-1">4.9/5 Average</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative w-full flex justify-center lg:justify-end">
          <Reveal delay={200} direction="scale" className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-gradient-to-tr from-indigo-400/30 to-purple-400/30 rounded-full blur-[80px] -z-10" />
            <PhoneMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function LogoMarqueeSection() {
  return (
    <section className="border-y border-neutral-200/50 bg-white/50 backdrop-blur-md py-12 overflow-hidden flex flex-col items-center">
      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">Recognized By Industry Leaders</p>
      <div className="w-full relative flex overflow-hidden mask-edges">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee whitespace-nowrap opacity-40 hover:opacity-70 transition-opacity duration-500">
          {[...Array(2)].map((_, loop) => (
            <div key={loop} className="flex gap-20 px-10 items-center">
              <div className="text-2xl font-bold font-serif tracking-tight">TechCrunch</div>
              <div className="text-2xl font-black tracking-tighter">WIRED</div>
              <div className="text-xl font-bold flex items-center gap-2">
                <Apple size={28} /> App of the Day
              </div>
              <div className="text-2xl font-black italic tracking-tight">The Verge</div>
              <div className="text-2xl font-bold uppercase tracking-widest">FastCo</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Moon size={28} className="text-indigo-600" />,
      title: "Mindful Reflection",
      desc: "Guided prompts help you untangle your thoughts and end your day with absolute clarity.",
    },
    {
      icon: <Zap size={28} className="text-orange-500" />,
      title: "Frictionless Tracking",
      desc: "Log your daily habits with a single tap. Beautiful native widgets keep your goals front and center.",
    },
    {
      icon: <Fingerprint size={28} className="text-emerald-500" />,
      title: "Absolute Privacy",
      desc: "Your data never leaves your device. FaceID lock and end-to-end encryption come completely standard.",
    },
  ];

  return (
    <section id="features" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
              Radical simplicity.
              <br />
              Powerful underlying logic.
            </h2>
            <p className="text-xl text-neutral-500 font-medium leading-relaxed">
              We stripped away the noise. Lumina gives you exactly what you need to focus, and stays entirely out of your way.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 150} direction="up">
              <div className="group bg-neutral-50 rounded-[2rem] p-10 hover:bg-white transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-200/50 hover:border-neutral-200 relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 border border-neutral-100 group-hover:scale-110 transition-transform duration-500 ease-out">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4 tracking-tight">{feature.title}</h3>
                  <p className="text-neutral-500 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DesignSection() {
  return (
    <section id="design" className="py-32 bg-[#0a0a0a] relative overflow-hidden text-white">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="mb-20 max-w-2xl">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter text-gradient-light">Native to the core.</h2>
            <p className="text-neutral-400 text-xl font-medium leading-relaxed">
              Lumina feels right at home on your iPhone. Built with Swift and optimized for iOS 17, it delivers a buttery smooth, premium experience you expect from Apple.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-6 auto-rows-[240px]">
          <Reveal className="lg:col-span-8 row-span-2" delay={100}>
            <div className="dark-glass-card rounded-[2.5rem] h-full p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-3xl group-hover:opacity-70 transition-opacity duration-700" />
              <h3 className="text-3xl font-bold mb-4">Interactive Widgets</h3>
              <p className="text-neutral-400 font-medium max-w-md">Log habits directly from your home screen without ever opening the app. Seamless, instant, magical.</p>
              <div className="absolute -bottom-10 -right-10 w-[350px] h-[250px] bg-neutral-900/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Activity className="text-indigo-400" size={24} />
                  </div>
                  <Apple size={20} className="text-neutral-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Morning Run</span>
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-neutral-500">Read 10 Pages</span>
                    <div className="w-6 h-6 rounded-full border-2 border-neutral-600" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4 row-span-1" delay={200}>
            <div className="dark-glass-card rounded-[2.5rem] h-full p-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Moon className="text-purple-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Dark Mode</h3>
              <p className="text-neutral-400 font-medium">True OLED blacks for late-night journaling.</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4 row-span-1" delay={300}>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[2.5rem] h-full p-8 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
              <h3 className="text-6xl font-bold tracking-tighter mb-2">0.2s</h3>
              <p className="text-indigo-100 font-medium">Average launch time. Blistering fast.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="flex justify-center mb-10 text-amber-400 gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={32} fill="currentColor" />
            ))}
          </div>
          <blockquote className="text-3xl sm:text-5xl font-bold text-neutral-900 tracking-tight leading-[1.2] mb-12">
            &quot;It&apos;s rare to find an app that feels this perfectly crafted. Lumina is the first journaling app I actually look forward to opening every morning.&quot;
          </blockquote>
          <div className="flex items-center justify-center gap-5">
            <img src="https://i.pravatar.cc/150?img=32" alt="Reviewer" className="w-16 h-16 rounded-full object-cover shadow-md" />
            <div className="text-left">
              <p className="font-bold text-lg text-neutral-900">Sarah Jenkins</p>
              <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Product Designer @ Apple</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FaqSection() {
  const faqs = [
    {
      question: "Is Lumina free to use?",
      answer: "Yes. Core journaling and habit tracking features are free forever with no hidden paywalls.",
    },
    {
      question: "Does my data leave my device?",
      answer: "No. Your personal entries remain private on your device, with secure syncing options under your control.",
    },
    {
      question: "Can I use Lumina offline?",
      answer: "Absolutely. You can write entries, track habits, and review progress without an internet connection.",
    },
    {
      question: "Which devices are supported?",
      answer: "Lumina is designed for iPhone first, with seamless support for the wider Apple ecosystem.",
    },
  ];

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">Frequently asked questions</h2>
            <p className="mt-5 text-lg text-neutral-500 font-medium">Everything you need to know before you get started.</p>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {faqs.map((item, index) => (
            <Reveal key={item.question} delay={index * 100}>
              <details className="group rounded-3xl border border-neutral-200/70 bg-neutral-50 px-7 py-6 hover:bg-white hover:shadow-[0_12px_30px_-20px_rgba(0,0,0,0.2)] transition-all duration-300">
                <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-neutral-900">{item.question}</h3>
                  <span className="text-neutral-500 text-xl leading-none transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-neutral-600 leading-relaxed">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#fafafa]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[800px] h-[800px] bg-gradient-to-tr from-indigo-300 via-purple-300 to-transparent rounded-full blur-[100px] animate-pulse-glow" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Reveal direction="scale">
          <h2 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-8 tracking-tighter">Ready to gain clarity?</h2>
          <p className="text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join 100,000+ users who have transformed their daily routines. Free forever for core features.
          </p>
          <div className="flex justify-center">
            <AppStoreButton className="scale-110 hover:scale-[1.15]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FooterSection() {
  const footerLinks = [
    { label: "Privacy", href: "/template1/privacy" },
    { label: "Terms", href: "/template1/terms" },
    { label: "Contact Us", href: "/template1/contact" },
    { label: "Press Kit", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
  ];

  return (
    <footer className="bg-white border-t border-neutral-200/50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center">
              <SparklesIcon className="text-white w-4 h-4" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-neutral-900">Lumina</span>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm font-semibold text-neutral-500">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-black transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-neutral-400 border-t border-neutral-100 pt-8">
          <p>© {new Date().getFullYear()} Lumina App Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
