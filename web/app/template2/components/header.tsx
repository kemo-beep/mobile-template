"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MagneticButton } from "./animations"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setScrolled(currentScrollY > 50)
      setHidden(currentScrollY > lastScrollY && currentScrollY > 400)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled 
            ? "bg-background/60 backdrop-blur-xl border-b border-border/50 py-3" 
            : "bg-transparent py-5",
          hidden && !mobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="group -m-1.5 p-1.5 flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-lg bg-foreground flex items-center justify-center overflow-hidden">
                <span className="text-sm font-bold text-background">C</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Clarity
              </span>
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-1">
            {["Features", "How it works", "Testimonials", "Pricing"].map((item) => (
              <NavLink key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}>
                {item}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3">
            <MagneticButton strength={0.15}>
              <Button 
                className="group relative rounded-full px-6 overflow-hidden bg-foreground text-background hover:bg-foreground"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Download
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100" />
              </Button>
            </MagneticButton>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div 
          className={cn(
            "absolute inset-y-0 right-0 w-full max-w-sm bg-background shadow-2xl transition-transform duration-500 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                  <span className="text-sm font-bold text-background">C</span>
                </div>
                <span className="text-lg font-semibold text-foreground">Clarity</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-full p-2.5 text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-1">
                {["Features", "How it works", "Testimonials", "Pricing"].map((item, i) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                    className="block rounded-xl px-4 py-3 text-lg font-medium text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      opacity: mobileMenuOpen ? 1 : 0,
                      transform: mobileMenuOpen ? "translateX(0)" : "translateX(20px)",
                      transition: `opacity 0.3s ease ${0.1 + i * 0.05}s, transform 0.3s ease ${0.1 + i * 0.05}s`,
                    }}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-border">
              <Button className="w-full rounded-full py-6 text-base">
                Download for iOS
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
      <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-[calc(100%-2rem)] group-hover:left-4" />
    </Link>
  )
}
