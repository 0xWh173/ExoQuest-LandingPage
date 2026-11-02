"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DarkVeil } from "@/components/effects/DarkVeil";
import { SiteHeader, NavRoute } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { HomeView } from "@/components/views/HomeView";
import { ProductsView } from "@/components/views/ProductsView";
import { SolutionsView } from "@/components/views/SolutionsView";
import { ContactView } from "@/components/views/ContactView";
import { LegalModals, ModalType } from "@/components/legal/LegalModals";

export default function HomePage() {
  const [currentRoute, setCurrentRoute] = useState<NavRoute>("home");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string, duration = 3500) => {
    setToastMessage(msg);
    setToastVisible(true);
    const t = setTimeout(() => {
      setToastVisible(false);
    }, duration);
    return () => clearTimeout(t);
  }, []);

  const routeMap: Record<string, { route: NavRoute; target?: string }> = {
    home: { route: "home", target: "home" },
    trust: { route: "home", target: "trust" },
    "free-challenge": { route: "home", target: "free-challenge" },
    about: { route: "home", target: "about" },
    products: { route: "products", target: "products" },
    "products-practice": { route: "products", target: "products-practice" },
    "products-ctf": { route: "products", target: "products-ctf" },
    "products-learn": { route: "products", target: "products-learn" },
    solutions: { route: "solutions", target: "solutions" },
    "solutions-colleges": { route: "solutions", target: "solutions-colleges" },
    "solutions-companies": { route: "solutions", target: "solutions-companies" },
    "solutions-communities": { route: "solutions", target: "solutions-communities" },
    "solutions-individuals": { route: "solutions", target: "solutions-individuals" },
    contact: { route: "contact", target: "contact" },
  };

  const handleNavigate = useCallback((route: NavRoute, targetId?: string) => {
    setCurrentRoute(route);
    if (targetId) {
      window.history.pushState(null, "", `#${targetId}`);
      setTimeout(() => {
        const idMap: Record<string, number> = {
          "solutions-colleges": 0,
          "solutions-companies": 1,
          "solutions-communities": 2,
          "solutions-individuals": 3,
        };
        if (idMap[targetId] !== undefined && (window as any).cardSwapApi) {
          (window as any).cardSwapApi.fit?.();
          (window as any).cardSwapApi.refresh?.();
          (window as any).cardSwapApi.goToCardIndex?.(idMap[targetId]);
        }
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
    } else {
      window.history.pushState(null, "", `#${route}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (route === "solutions" && (window as any).cardSwapApi) {
        setTimeout(() => {
          (window as any).cardSwapApi.fit?.();
          (window as any).cardSwapApi.refresh?.();
        }, 80);
      }
    }
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      const matched = routeMap[hash];
      if (matched) {
        setCurrentRoute(matched.route);
        if (matched.target) {
          setTimeout(() => {
            const idMap: Record<string, number> = {
              "solutions-colleges": 0,
              "solutions-companies": 1,
              "solutions-communities": 2,
              "solutions-individuals": 3,
            };
            if (idMap[matched.target!] !== undefined && (window as any).cardSwapApi) {
              (window as any).cardSwapApi.fit?.();
              (window as any).cardSwapApi.refresh?.();
              (window as any).cardSwapApi.goToCardIndex?.(idMap[matched.target!]);
            }
            const el = document.getElementById(matched.target!);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      {/* ===== DARK VEIL BACKGROUND ===== */}
      <DarkVeil />

      {/* ===== SITE HEADER ===== */}
      <SiteHeader currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* ===== MAIN APPLICATION VIEWS ===== */}
      <main>
        <HomeView
          isActive={currentRoute === "home"}
          onNavigate={handleNavigate}
          onShowToast={showToast}
        />
        <ProductsView
          isActive={currentRoute === "products"}
          onNavigate={handleNavigate}
        />
        <SolutionsView isActive={currentRoute === "solutions"} />
        <ContactView
          isActive={currentRoute === "contact"}
          onShowToast={showToast}
        />
      </main>

      {/* ===== MIRRORED FOOTER ===== */}
      <Footer
        onNavigate={handleNavigate}
        onOpenModal={(modal) => setActiveModal(modal)}
        onShowToast={showToast}
      />

      {/* ===== LEGAL MODALS ===== */}
      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />

      {/* ===== TOAST NOTIFICATION ===== */}
      <div id="toast" className={toastVisible ? "show" : ""} aria-live="polite">
        {toastMessage}
      </div>
    </>
  );
}
