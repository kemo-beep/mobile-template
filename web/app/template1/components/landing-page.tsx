"use client";

import { useEffect, useState } from "react";
import { CustomStyles } from "./styles";
import {
  CtaSection,
  DesignSection,
  FaqSection,
  FeaturesSection,
  FooterSection,
  HeroSection,
  LogoMarqueeSection,
  Navigation,
  ReviewsSection,
} from "./sections";

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-indigo-500/30 selection:text-indigo-900 overflow-x-hidden">
      <CustomStyles />

      <Navigation
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        onCloseMenu={() => setIsMobileMenuOpen(false)}
      />

      <HeroSection />
      <LogoMarqueeSection />
      <FeaturesSection />
      <DesignSection />
      <ReviewsSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
