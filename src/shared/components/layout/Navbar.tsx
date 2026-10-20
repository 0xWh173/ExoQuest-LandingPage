"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Menu, ChevronLeft, Swords, LogOut } from "lucide-react";
import { Button } from "../ui/Button";
import {
  PRACTICES_URL,
  COMPETITIONS_URL,
  WRITEUPS_URL,
  API_BASE_URL,
  SITE_URL,
} from "@/shared/lib/config";

interface NavLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // Check shared cookie, localStorage, and silent backend refresh for cross-port / cross-domain authentication
    const checkAuth = async () => {
      if (typeof document === "undefined") return;
      const match = document.cookie.match(/(^| )exo-auth-storage=([^;]+)/);
      if (match) {
        try {
          const parsed = JSON.parse(decodeURIComponent(match[2]));
          if (parsed?.state?.isAuthenticated || parsed?.state?.user) {
            setIsAuthenticated(true);
            return;
          }
        } catch {
          // parse failed
        }
      }

      // Check localStorage fallback
      try {
        const local = localStorage.getItem("exo-auth-storage");
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed?.state?.isAuthenticated || parsed?.state?.user) {
            setIsAuthenticated(true);
            return;
          }
        }
      } catch {
        // localStorage access failed
      }

      // Fallback: silent refresh verification with backend using HttpOnly refresh cookie
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.user || data?.accessToken) {
            setIsAuthenticated(true);
            return;
          }
        }
      } catch {
        // silent refresh failed / offline
      }

      setIsAuthenticated(false);
    };

    void checkAuth();

    // Listen to cross-tab BroadcastChannel auth sync if available
    if (typeof BroadcastChannel !== "undefined") {
      try {
        const ch = new BroadcastChannel("exo-auth-channel");
        ch.onmessage = (event) => {
          if (event.data?.type === "AUTH_LOGIN") {
            setIsAuthenticated(true);
          } else if (event.data?.type === "AUTH_LOGOUT") {
            setIsAuthenticated(false);
          }
        };
        return () => ch.close();
      } catch {
        // BroadcastChannel unavailable
      }
    }
  }, []);

  const navLinks: NavLinkItem[] = [
    { label: "Challenges", href: `${PRACTICES_URL}/challenges`, isExternal: true },
    { label: "Competitions", href: COMPETITIONS_URL, isExternal: true },
    { label: "Writeups", href: WRITEUPS_URL, isExternal: true },
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
  ];

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // offline / unreachable
    }
    // Clear shared cookie
    if (typeof document !== "undefined") {
      document.cookie = "exo-auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    }
    if (typeof BroadcastChannel !== "undefined") {
      try {
        const ch = new BroadcastChannel("exo-auth-channel");
        ch.postMessage({ type: "AUTH_LOGOUT" });
        ch.close();
      } catch {
        // BroadcastChannel unavailable
      }
    }
    setIsAuthenticated(false);
    window.location.href = `${PRACTICES_URL}/login?logged_out=true`;
  };

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
          {!hydrated ? (
            <div className="h-9 w-24 rounded bg-[var(--color-card)] animate-pulse" />
          ) : !isAuthenticated ? (
            <a href={`${PRACTICES_URL}/register?returnTo=${encodeURIComponent(SITE_URL)}`}>
              <Button variant="primary" size="sm" leftIcon={<Swords className="w-4 h-4" />}>
                Start Exploiting
              </Button>
            </a>
          ) : (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
              className="hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              Logout
            </Button>
          )}
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
            {!hydrated ? null : !isAuthenticated ? (
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
            ) : (
              <Button
                variant="danger"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
              >
                <LogOut size={16} /> Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
