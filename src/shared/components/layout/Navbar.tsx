"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Container } from "./Container";
import {
  Menu,
  ChevronLeft,
  Swords,
  LogOut,
  User,
  HelpCircle,
  BookOpen,
  Shield,
  Crown,
  Flag,
} from "lucide-react";
import { Button } from "../ui/Button";
import {
  PRACTICES_URL,
  COMPETITIONS_URL,
  WRITEUPS_URL,
  API_BASE_URL,
  SITE_URL,
  ACCOUNTS_URL,
  ADMIN_URL,
} from "@/shared/lib/config";

interface NavLinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface UserInfo {
  id?: string;
  username?: string;
  email?: string;
  level?: number;
  role?: string;
  avatarUrl?: string;
}

const getDefaultAvatar = (username?: string) =>
  `https://api.dicebear.com/7.x/bottts/svg?seed=ExoQuestDefault`;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

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
            if (parsed?.state?.user) setUser(parsed.state.user);
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
            if (parsed?.state?.user) setUser(parsed.state.user);
            return;
          }
        }
      } catch {
        // localStorage access failed
      }

      // Fallback: silent refresh verification with backend using HttpOnly refresh cookie
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.user || data?.token) {
            setIsAuthenticated(true);
            if (data?.user) setUser(data.user);
            return;
          }
        }
      } catch {
        // silent refresh failed / offline
      }

      setIsAuthenticated(false);
      setUser(null);
    };

    void checkAuth();

    // Listen to cross-tab BroadcastChannel auth sync if available
    if (typeof BroadcastChannel !== "undefined") {
      try {
        const ch = new BroadcastChannel("exo-auth-channel");
        ch.onmessage = (event) => {
          if (event.data?.type === "AUTH_LOGIN") {
            setIsAuthenticated(true);
            if (event.data?.user) setUser(event.data.user);
          } else if (event.data?.type === "AUTH_LOGOUT") {
            setIsAuthenticated(false);
            setUser(null);
          }
        };
        return () => ch.close();
      } catch {
        // BroadcastChannel unavailable
      }
    }
  }, []);

  // Fetch full user profile if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${API_BASE_URL}/api/profile`, { credentials: "include" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user) {
            setUser((prev) => ({ ...prev, ...data.user }));
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);


  const handleLogout = async () => {
    const csrfMatch = typeof document !== "undefined" ? document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/) : null;
    const csrfToken = csrfMatch ? decodeURIComponent(csrfMatch[1]) : "";
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {},
      });
    } catch {
      // offline / unreachable
    }
    // Clear storage and cookies
    try {
      localStorage.removeItem("exo-auth-storage");
    } catch {}
    if (typeof document !== "undefined") {
      document.cookie = "exo-auth-storage=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      document.cookie = "exo_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      document.cookie = "exo_refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
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
    setUser(null);
    window.location.href = `${ACCOUNTS_URL}/login?logged_out=true`;
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
        {/* <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) =>
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-white group"
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
        </nav> */}

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!hydrated ? (
            <div className="h-9 w-24 rounded bg-[var(--color-card)] animate-pulse" />
          ) : !isAuthenticated ? (
            <a href={`${ACCOUNTS_URL}/register?returnTo=${encodeURIComponent(SITE_URL)}`}>
              <Button variant="primary" size="sm" leftIcon={<Swords className="w-4 h-4" />}>
                Start Exploiting
              </Button>
            </a>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="relative flex items-center justify-center p-0.5 rounded-full ring-2 ring-purple-500/30 hover:ring-purple-500/70 hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none"
                title={user?.username || "Account menu"}
                aria-label="Account menu"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
                  <NextImage
                    src={user?.avatarUrl && user.avatarUrl.trim() ? user.avatarUrl.trim() : getDefaultAvatar(user?.username)}
                    alt={user?.username || "User avatar"}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-[#0c0e14] py-2 shadow-2xl z-50 text-sm animate-in fade-in zoom-in-95 backdrop-blur-xl">
                  {/* Name & Level */}
                  <div className="px-4 py-2.5 border-b border-white/[0.08]">
                    <p className="font-mono text-xs font-bold text-white truncate">
                      {user?.username || "OPERATOR"}
                    </p>
                    <p className="text-[10px] text-purple-400 font-mono mt-0.5">
                      Level {user?.level || 1}
                    </p>
                  </div>

                  {/* Profile & Support */}
                  <div className="py-1">
                    <a
                      href={`${ACCOUNTS_URL}/profile`}
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                    >
                      <User size={15} className="text-purple-400 shrink-0" />
                      <span>Profile</span>
                    </a>

                    <Link
                      href="/support"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                    >
                      <HelpCircle size={15} className="text-purple-400 shrink-0" />
                      <span>Support</span>
                    </Link>
                  </div>

                  <div className="my-1 border-t border-white/[0.08]" />

                  {/* Competition & Writeup & Practice */}
                  <div className="py-1">
                    <a
                      href={PRACTICES_URL}
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors">
                        <Flag size={15} className="text-purple-400 shrink-0" />
                        <span>Practice</span>
                    </a>
                    <a
                      href={COMPETITIONS_URL}
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                    >
                      <Swords size={15} className="text-purple-400 shrink-0" />
                      <span>Competition</span>
                    </a>

                    <a
                      href={WRITEUPS_URL}
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                    >
                      <BookOpen size={15} className="text-purple-400 shrink-0" />
                      <span>Writeup</span>
                    </a>
                  </div>

                  {(user?.role === "admin" || user?.role === "superadmin") && (
                    <>
                      <div className="my-1 border-t border-white/[0.08]" />
                      <div className="py-1">
                        <a
                          href={ADMIN_URL}
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Shield size={15} className="shrink-0" />
                          <span>Admin Panel</span>
                        </a>
                        {user?.role === "superadmin" && (
                          <a
                            href={`${ADMIN_URL}/superadmin`}
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-amber-400 hover:bg-amber-500/10 transition-colors"
                          >
                            <Crown size={15} className="shrink-0" />
                            <span>Super Admin</span>
                          </a>
                        )}
                      </div>
                    </>
                  )}

                  <div className="my-1 border-t border-white/[0.08]" />

                  {/* Logout */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                    >
                      <LogOut size={15} className="shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
          {isAuthenticated && (
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-purple-500/40 bg-purple-500/10">
                <NextImage
                  src={user?.avatarUrl && user.avatarUrl.trim() ? user.avatarUrl.trim() : getDefaultAvatar(user?.username)}
                  alt={user?.username || "User avatar"}
                  width={36}
                  height={36}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-sm font-bold text-white truncate">{user?.username || "OPERATOR"}</p>
                <p className="text-xs text-purple-400 font-mono">Level {user?.level || 1}</p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--color-card-border)] space-y-3">
            {!hydrated ? null : !isAuthenticated ? (
              <a href={`${ACCOUNTS_URL}/register?returnTo=${encodeURIComponent(SITE_URL)}`} className="block w-full">
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
              <div className="space-y-2">
                <a
                  href={`${ACCOUNTS_URL}/profile`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                >
                  <User size={16} className="text-purple-400 shrink-0" />
                  <span>Profile</span>
                </a>
                <Link
                  href="/support"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                >
                  <HelpCircle size={16} className="text-purple-400 shrink-0" />
                  <span>Support</span>
                </Link>
                <a
                  href={COMPETITIONS_URL}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                >
                  <Swords size={16} className="text-purple-400 shrink-0" />
                  <span>Competition</span>
                </a>
                <a
                  href={WRITEUPS_URL}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-300 hover:bg-purple-500/10 hover:text-white transition-colors"
                >
                  <BookOpen size={16} className="text-purple-400 shrink-0" />
                  <span>Writeup</span>
                </a>
                {(user?.role === "admin" || user?.role === "superadmin") && (
                  <a
                    href={ADMIN_URL}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Shield size={16} className="shrink-0" />
                    <span>Admin Panel</span>
                  </a>
                )}
                <Button
                  variant="danger"
                  className="w-full flex items-center justify-center gap-2 mt-2"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={16} /> Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
