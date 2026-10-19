"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { FileText, ShieldCheck, RefreshCw, X, ArrowLeft } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { TERMS_AND_CONDITIONS_TEXT, PRIVACY_POLICY_TEXT, REFUND_POLICY_TEXT } from "@/shared/constants/legalDocs";

type LegalType = "terms" | "privacy" | "refund" | null;

interface LegalModalContextType {
  activeModal: LegalType;
  openTerms: () => void;
  openPrivacy: () => void;
  openRefund: () => void;
  closeModal: () => void;
}

const LegalModalContext = createContext<LegalModalContextType>({
  activeModal: null,
  openTerms: () => { },
  openPrivacy: () => { },
  openRefund: () => { },
  closeModal: () => { },
});

export const useLegalModal = () => useContext(LegalModalContext);

export function LegalModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<LegalType>(null);

  const openTerms = () => setActiveModal("terms");
  const openPrivacy = () => setActiveModal("privacy");
  const openRefund = () => setActiveModal("refund");
  const closeModal = () => setActiveModal(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  const getTitle = () => {
    switch (activeModal) {
      case "terms": return "Terms Of Services";
      case "privacy": return "Privacy Policy";
      case "refund": return "Refund and Cancellation Policy";
      default: return "";
    }
  };

  const getContent = () => {
    switch (activeModal) {
      case "terms": return TERMS_AND_CONDITIONS_TEXT;
      case "privacy": return PRIVACY_POLICY_TEXT;
      case "refund": return REFUND_POLICY_TEXT;
      default: return "";
    }
  };

  const getIcon = () => {
    switch (activeModal) {
      case "terms": return FileText;
      case "privacy": return ShieldCheck;
      case "refund": return RefreshCw;
      default: return FileText;
    }
  };

  const title = getTitle();
  const content = getContent();
  const Icon = getIcon();

  return (
    <LegalModalContext.Provider value={{ activeModal, openTerms, openPrivacy, openRefund, closeModal }}>
      {children}

      {/* Global Legal Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in font-sans">
          {/* Backdrop overlay click to close */}
          <div
            className="absolute inset-0"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-2xl border border-white/10 bg-[#0c0e14] shadow-2xl overflow-hidden animate-zoom-in text-slate-200">

            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#12151f] px-5 py-4 sm:px-8 sm:py-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Icon size={22} />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">{title}</h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ExoQuest Platform Legal Documentation • Updated August 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                {/* Switch Document Buttons (Desktop) */}
                <div className="hidden sm:flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={openTerms}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      activeModal === "terms"
                        ? "bg-purple-600 text-white shadow"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Terms
                  </button>
                  <button
                    type="button"
                    onClick={openPrivacy}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      activeModal === "privacy"
                        ? "bg-purple-600 text-white shadow"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Privacy
                  </button>
                  <button
                    type="button"
                    onClick={openRefund}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                      activeModal === "refund"
                        ? "bg-purple-600 text-white shadow"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Refund Policy
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors focus:outline-none"
                  title="Close modal (Esc)"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 space-y-6 text-sm text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <div className="mb-6 pb-3 border-b border-white/10">
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{children}</h2>
                    </div>
                  ),
                  h2: ({ children }) => (
                    <h3 className="text-base sm:text-lg font-semibold text-purple-300 mt-8 mb-3 pt-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-400 inline-block"></span>
                      <span>{children}</span>
                    </h3>
                  ),
                  h3: ({ children }) => (
                    <h4 className="text-sm font-semibold text-slate-200 mt-5 mb-2">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-slate-300 leading-7">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 space-y-2 pl-4 list-disc marker:text-purple-400/70">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 space-y-2 pl-4 list-decimal marker:text-purple-400/70">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-300 leading-6">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  code: ({ children }) => (
                    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-purple-300">{children}</code>
                  ),
                }}
              >
                {content}
              </Markdown>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#12151f] px-5 py-3.5 sm:px-8">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Have questions?</span>
                <a href="mailto:support@exoquest.dev" className="text-purple-400 hover:underline">
                  Contact Support
                </a>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                {/* Mobile Switch Tabs */}
                <div className="flex sm:hidden items-center gap-2 text-xs">
                  <button type="button" onClick={openTerms} className={`hover:underline ${activeModal === "terms" ? "text-purple-400 font-bold" : "text-slate-400"}`}>
                    Terms
                  </button>
                  <span className="text-slate-600">·</span>
                  <button type="button" onClick={openPrivacy} className={`hover:underline ${activeModal === "privacy" ? "text-purple-400 font-bold" : "text-slate-400"}`}>
                    Privacy
                  </button>
                  <span className="text-slate-600">·</span>
                  <button type="button" onClick={openRefund} className={`hover:underline ${activeModal === "refund" ? "text-purple-400 font-bold" : "text-slate-400"}`}>
                    Refund
                  </button>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-purple-500 transition-colors ml-2"
                >
                  <ArrowLeft size={14} />
                  <span>Close</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </LegalModalContext.Provider>
  );
}
