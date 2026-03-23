"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRightIcon, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingLogoMark } from "@/components/landing-logo-mark";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#about", label: "About" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#articles", label: "Articles" },
] as const;

function NavLinks({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-8", className)}>
      {navItems.map((item) => {
        const isHome = item.href === "/";
        const isActive = isHome && pathname === "/";

        return (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function LandingHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/75">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="z-10 flex shrink-0 items-center gap-2.5 font-semibold tracking-tight text-foreground"
        >
          <LandingLogoMark className="text-foreground" />
          <span className="text-base sm:text-lg">Analytics</span>
        </Link>

        {/* Center nav — desktop */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          aria-label="Main"
        >
          <NavLinks className="flex-row items-center gap-8" />
        </nav>

        {/* Right: mobile menu + Contact (reference: black pill + arrow) */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full border-border/80 lg:hidden"
                  aria-label="Open menu"
                >
                  <MenuIcon className="size-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-6 pb-8">
                <NavLinks onNavigate={() => setOpen(false)} />
                <Link href="/sign-up" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-full font-semibold">
                    Contact
                    <ArrowRightIcon className="ml-1 size-4" />
                  </Button>
                </Link>
                <Link href="/sign-in" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full">
                    Sign in
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden sm:flex items-center gap-2">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                size="sm"
                className="h-9 rounded-full px-4 text-xs font-semibold sm:h-10 sm:text-sm hover:bg-muted/50"
              >
                Sign in
              </Button>
            </Link>
          </div>
          <Link href="/sign-up">
            <Button
              size="sm"
              className="h-9 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-5 text-xs font-medium shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] sm:h-10 sm:px-6 sm:text-sm transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] ring-1 ring-zinc-900/5 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Contact
              <ArrowRightIcon className="ml-1 size-3.5 sm:ml-1.5 sm:size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
