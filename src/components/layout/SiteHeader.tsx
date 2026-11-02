"use client";

import React, { useState, useEffect } from "react";

export type NavRoute = "home" | "products" | "solutions" | "contact";

interface SiteHeaderProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute, targetId?: string) => void;
}

export function SiteHeader({ currentRoute, onNavigate }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, route: NavRoute, targetId?: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    onNavigate(route, targetId);
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`} id="site-header">
        <div className="header-inner">
          <div
            className="brand-identity brand-identity--static cursor-pointer"
            onClick={(e) => handleLinkClick(e, "home")}
          >
            <span className="nav-logo-text">
              <span style={{ color: "var(--accent)" }}>EXO</span>
              <span style={{ color: "white" }}>QUEST</span>
            </span>
          </div>

          {/* Primary Desktop Nav */}
          <nav className="site-nav" aria-label="Main Navigation">
            <a
              href="#home"
              className={`nav-link ${currentRoute === "home" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "home")}
            >
              Home
            </a>
            <a
              href="#products"
              className={`nav-link ${currentRoute === "products" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "products")}
            >
              Products
            </a>
            <a
              href="#solutions"
              className={`nav-link ${currentRoute === "solutions" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "solutions")}
            >
              Solutions
            </a>
            <a
              href="#contact"
              className={`nav-link ${currentRoute === "contact" ? "active" : ""}`}
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              Contact
            </a>
          </nav>

          {/* Mobile Drawer Action Button */}
          <div className="header-actions">
            <button
              className="mobile-toggle-btn"
              id="mobile-toggle"
              aria-label="Toggle Navigation Drawer"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              {isMobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileOpen ? "open" : ""}`} id="mobile-drawer" aria-hidden={!isMobileOpen}>
        <div className="mobile-nav-group">
          <ul className="mobile-nav-links">
            <li>
              <a
                href="#home"
                className={`mobile-link ${currentRoute === "home" ? "active" : ""}`}
                onClick={(e) => handleLinkClick(e, "home")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#products"
                className={`mobile-link ${currentRoute === "products" ? "active" : ""}`}
                onClick={(e) => handleLinkClick(e, "products")}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#solutions"
                className={`mobile-link ${currentRoute === "solutions" ? "active" : ""}`}
                onClick={(e) => handleLinkClick(e, "solutions")}
              >
                Solutions
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`mobile-link ${currentRoute === "contact" ? "active" : ""}`}
                onClick={(e) => handleLinkClick(e, "contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

