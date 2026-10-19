"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Menu, ChevronLeft, Swords } from "lucide-react";
import { Button } from "../ui/Button";
import {
  PRACTICES_URL,
  COMPETITIONS_URL,
  WRITEUPS_URL,
  SITE_URL,
} from "@/shared/lib/config";

interface NavLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks: NavLinkItem[] = [
    { label: "Challenges", href: `${PRACTICES_URL}/dashboard/challenges`, isExternal: true },
    { label: "Competitions", href: COMPETITIONS_URL, isExternal: true },
    { label: "Writeups", href: WRITEUPS_URL, isExternal: true },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-card-border)] bg-[#08090d]/90 backdrop-blur-xl">
      <Container className="flex h-14 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-black tracking-widest text-[var(--color-foreground)]"
        >
          <span>
            Exo<span className="text-[var(--color-primary)]">Quest</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)] group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 origin-left bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)] group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 origin-left bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          )}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href={`${PRACTICES_URL}/login?returnTo=${encodeURIComponent(SITE_URL)}`}>
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </a>
          <a href={`${PRACTICES_URL}/register?returnTo=${encodeURIComponent(SITE_URL)}`}>
            <Button variant="primary" size="sm" leftIcon={<Swords className="w-4 h-4" />}>
              Start Exploiting
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center text-[var(--color-muted)] hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-card-border)] bg-[var(--color-background)] px-6 py-6 space-y-4">
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-gray-300 hover:text-[var(--color-primary)] transition-colors py-2"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-gray-300 hover:text-[var(--color-primary)] transition-colors py-2"
              >
                {link.label}
              </Link>
            )
          )}

          <div className="pt-4 border-t border-[var(--color-card-border)] space-y-3">
            <a href={`${PRACTICES_URL}/login?returnTo=${encodeURIComponent(SITE_URL)}`} className="block w-full">
              <Button variant="ghost" className="w-full" onClick={() => setMobileOpen(false)}>
                Login
              </Button>
            </a>
            <a href={`${PRACTICES_URL}/register?returnTo=${encodeURIComponent(SITE_URL)}`} className="block w-full">
              <Button
                variant="primary"
                className="w-full"
                leftIcon={<Swords className="w-4 h-4" />}
                onClick={() => setMobileOpen(false)}
              >
                Start Exploiting
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
