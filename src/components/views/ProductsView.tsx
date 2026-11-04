"use client";

import React, { useState, useEffect } from "react";
import { NavRoute } from "../layout/SiteHeader";
import AnimatedList from "@/components/effects/AnimatedList";

interface ProductsViewProps {
  isActive: boolean;
  onNavigate: (route: NavRoute, targetId?: string) => void;
}


export interface AddonService {
  title: string;
  name?: string;
  description: string;
  icon: React.ReactNode;
}

const ADDON_SERVICES: AddonService[] = [
  {
    title: "Cheat Detection",
    name: "Cheat Detection",
    description: "Detect suspicious activity to ensure fair and secure competitions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Docker Instances",
    name: "Docker Instances",
    description: "Isolated Docker containers for each contestant with automatic cleanup.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Question Creation",
    name: "Question Creation",
    description: "Custom handcrafted challenges with flags, writeups, and hints.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    title: "First Blood",
    name: "First Blood",
    description: "instant solve alerts, and bonus scoring telemetry for the fastest solvers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    title: "Dynamic Flags",
    name: "Dynamic Flags",
    description: "Unique, cryptographically generated flag values per participant or team to eliminate answer sharing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
  },
  {
    title: "Rate Limiting",
    name: "Rate Limiting",
    description: "Automated brute-force protection, request throttling, and API security against DDoS attacks.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export function ProductsView({ isActive, onNavigate }: ProductsViewProps) {
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAddonsOpen) {
        setIsAddonsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddonsOpen]);
  return (
    <div className={`app-view ${isActive ? "active" : ""}`} id="view-products" data-view="products">
      <section id="products" className="products-section">
        <h2 className="section-title">
          Built for Hackers. <span className="accent-text">Engineered for Scale.</span>
        </h2>
        <p className="section-subtitle">
          Three specialized cybersecurity pillars powering hands-on skill practice, turnkey tournament orchestration,
          and comprehensive challenge writeups for ethical hackers worldwide.
        </p>

        <div className="products-grid">
          {/* Card 1: Practice Platform */}
          <div className="product-card" id="products-practice">
            <div>
              <div className="product-top-row">
                <span className="product-badge-pill">CTF</span>
              </div>
              <h3 className="product-title">Practice Platform</h3>
              <p className="product-tagline">// Hands-On Vulnerability Mastery</p>
              <p className="product-desc">
                A platform where users can practice cybersecurity through CTF challenges, compete in contests, solve real-world security problems, and improve their skills through hands-on learning.
              </p>

              <ul className="product-features-list">
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>7+ Challenge Categories:</strong> Web, Reverse Engineering, Pwn, Cryptography, Digital Forensics, Cloud, and OSINT.
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>On-Demand Sandboxes:</strong> Practice real-world security scenarios with guided hints, hands-on tasks, and practical learning.
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Track Your Progress:</strong>  Earn points, improve your skills, climb rankings, and track your journey through cybersecurity.
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="#free-challenge"
              className="product-action-btn scale-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home", "free-challenge");
              }}
            >
              <span>Practice</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Card 2: CTF-as-a-Service */}
          <div className="product-card" id="products-ctf">
            <div>
              <div className="product-top-row">
                <span className="product-badge-pill">Core Product</span>
                <button
                  type="button"
                  className="product-addon-btn"
                  onClick={() => setIsAddonsOpen(true)}
                  aria-label="View Add-On Services for CTF-as-a-Service"
                  title="View available tournament Add-On Services"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>Add-On Services</span>
                </button>
              </div>
              <h3 className="product-title">CTF-as-a-Service (CTF-aaS)</h3>
              <p className="product-tagline">// Turnkey Tournament Orchestration</p>
              <p className="product-desc">
                A platform that helps colleges, companies, and cybersecurity communities organize and host CTF competitions with easy setup, automated scoring, and real-time participant tracking.
              </p>

              <ul className="product-features-list">
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Easy Competition setup:</strong> Create and manage CTF events with custom challenges, rules, and difficulty levels..
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Automated Scoring & Ranking:</strong> Track submissions, award points automatically, and display live leaderboards.
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Flexible Event Support:</strong> Host college-level, corporate, community, and online cybersecurity competitions.
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="product-action-btn scale-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
            >
              <span>Host a Competition</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Card 3: Writeup Service */}
          <div className="product-card" id="products-writeups">
            <div>
              <div className="product-top-row">
                <span className="product-badge-pill">Solution</span>
              </div>
              <h3 className="product-title">Writeup Service</h3>
              <p className="product-tagline">// Comprehensive Challenge Exploit Guides</p>
              <p className="product-desc">
                ExoQuest provides detailed solutions and explanations for cybersecurity challenges, helping users understand how vulnerabilities work, how challenges are solved, and how to improve their problem-solving skills.
              </p>

              <ul className="product-features-list">
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>100% Challenge Coverage:</strong> Official, verified writeups covering every challenge from web exploitation and crypto to reverse engineering and pwn.
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Root-Cause &amp; PoC Scripts:</strong> Detailed vulnerability dissection, reproduction steps, attack payload breakdowns, and automated solver scripts.
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Educational Methodology:</strong> Understand the reasoning behind each solution, explore alternative approaches, and learn new techniques from detailed challenge walkthroughs.
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="product-action-btn scale-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
            >
              <span>Writeups</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>
      {/* CTF Add-On Services Modal */}
      {isAddonsOpen && (
        <div
          className="modal-overlay active"
          id="addons-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="addons-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddonsOpen(false);
          }}
        >
          <div className="modal addon-modal-container">
            <button
              className="modal-close"
              aria-label="Close Add-On Services"
              onClick={() => setIsAddonsOpen(false)}
            >
              ✕
            </button>
            <div className="modal-body">
              <div className="addon-modal-header">
                <h2 id="addons-title">Add-On Services</h2>
                <p>
                  Modular competition capabilities engineered to enhance tournament security, candidate engagement, and operational scale.
                </p>
              </div>

              <div className="addon-services-animated-wrap" style={{ margin: "16px 0 20px" }}>
                <AnimatedList
                  items={ADDON_SERVICES}
                  animation="pop"
                  theme="dark"
                  width="100%"
                  maxHeight={380}
                  gap={10}
                  radius={12}
                  frame={false}
                  selectOnHover={true}
                  enableArrowNavigation={true}
                  accentColor="rgba(168, 85, 247, 0.7)"
                />
              </div>

              <div className="addon-modal-footer">
                <button
                  type="button"
                  className="product-action-btn scale-btn"
                  onClick={() => {
                    setIsAddonsOpen(false);
                    onNavigate("contact");
                  }}
                  style={{ width: "auto", padding: "10px 22px" }}
                >
                  <span>Inquire with Add-Ons</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

