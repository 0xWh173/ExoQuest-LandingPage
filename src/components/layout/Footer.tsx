"use client";

import React from "react";
import Image from "next/image";
import { NavRoute } from "./SiteHeader";
import { ModalType } from "../legal/LegalModals";

interface FooterProps {
  onNavigate: (route: NavRoute, targetId?: string) => void;
  onOpenModal: (modal: ModalType) => void;
  onShowToast?: (msg: string) => void;
}

export function Footer({ onNavigate, onOpenModal, onShowToast }: FooterProps) {
  const handleLink = (e: React.MouseEvent, route: NavRoute, targetId?: string) => {
    e.preventDefault();
    onNavigate(route, targetId);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-mirrored-grid">
          {/* Column 1: Brand & Contact Info */}
          <div className="footer-brand-col">
            <a
              href="#home"
              className="brand-identity"
              data-route="home"
              onClick={(e) => handleLink(e, "home")}
            >
              <div className="brand-badge" aria-label="ExoQuest badge logo">
                <Image src="/images/logo.png" alt="ExoQuest logo" width={32} height={32} />
              </div>
              <span className="nav-logo-text">
                <span style={{ color: "var(--accent)" }}>EXO</span>
                <span style={{ color: "white" }}>QUEST</span>
              </span>
            </a>
            <p>
              The modern cybersecurity practice platform and turnkey CTF-as-a-Service for universities, companies, and
              ethical hackers worldwide.
            </p>
            <div className="footer-contact-info">
              <span>Direct Inquiries:</span>
              <a href="mailto:contact@exoquest.dev" className="footer-email-link">
                contact@exoquest.dev
              </a>
              <span>HQ: Chennai, India</span>
            </div>
            <div className="footer-social-row">
              <a
                href="https://www.instagram.com/exo.quest/"
                className="social-btn"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://discord.com/invite/5SxnhdTUtr"
                className="social-btn"
                aria-label="Discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="footer-col">
            <h4 className="footer-col-title">Products</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#products-practice" onClick={(e) => handleLink(e, "products", "products-practice")}>
                  Practice Platform
                </a>
              </li>
              <li>
                <a href="#products-ctf" onClick={(e) => handleLink(e, "products", "products-ctf")}>
                  CTF-as-a-Service
                </a>
              </li>
              <li>
                <a href="#products-learn" onClick={(e) => handleLink(e, "products", "products-learn")}>
                  Learn (Coming Soon)
                </a>
              </li>
              <li>
                <a href="#free-challenge" onClick={(e) => handleLink(e, "home", "free-challenge")}>
                  Live Sandbox Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="footer-col">
            <h4 className="footer-col-title">Solutions</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#solutions-colleges" onClick={(e) => handleLink(e, "solutions", "solutions-colleges")}>
                  Colleges &amp; Universities
                </a>
              </li>
              <li>
                <a href="#solutions-companies" onClick={(e) => handleLink(e, "solutions", "solutions-companies")}>
                  Companies &amp; Enterprises
                </a>
              </li>
              <li>
                <a href="#solutions-communities" onClick={(e) => handleLink(e, "solutions", "solutions-communities")}>
                  Communities &amp; Clubs
                </a>
              </li>
              <li>
                <a href="#solutions-individuals" onClick={(e) => handleLink(e, "solutions", "solutions-individuals")}>
                  Individuals &amp; Solvers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="footer-col">
            <h4 className="footer-col-title">Resources</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  id="footer-writeups-link"
                  onClick={() => onShowToast?.("Writeups & Guides portal coming soon!")}
                >
                  Writeups &amp; Guides
                </button>
              </li>
              <li>
                <button
                  type="button"
                  id="footer-blog-link"
                  onClick={() => onShowToast?.("Security Blog portal coming soon!")}
                >
                  Security Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#about" onClick={(e) => handleLink(e, "home", "about")}>
                  About ExoQuest
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleLink(e, "contact")}>
                  Contact &amp; Partnerships
                </a>
              </li>
              <li>
                <a href="#trust" onClick={(e) => handleLink(e, "home", "trust")}>
                  Into the Void 2.0
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Legal Modals */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">© 2026 ExoQuest. All rights reserved.</p>
          <div className="footer-legal-links">
            <button type="button" id="terms-link" onClick={() => onOpenModal("terms")}>
              Terms and Conditions
            </button>
            <button type="button" id="privacy-link" onClick={() => onOpenModal("privacy")}>
              Privacy Policy
            </button>
            <button type="button" id="refund-link" onClick={() => onOpenModal("refund")}>
              Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

