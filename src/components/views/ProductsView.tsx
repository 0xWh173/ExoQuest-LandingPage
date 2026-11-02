"use client";

import React from "react";
import { NavRoute } from "../layout/SiteHeader";

interface ProductsViewProps {
  isActive: boolean;
  onNavigate: (route: NavRoute, targetId?: string) => void;
}

export function ProductsView({ isActive, onNavigate }: ProductsViewProps) {
  return (
    <div className={`app-view ${isActive ? "active" : ""}`} id="view-products" data-view="products">
      <section id="products" className="products-section">
        <h2 className="section-title">
          Built for Hackers. <span className="accent-text">Engineered for Scale.</span>
        </h2>
        <p className="section-subtitle">
          Two specialized cybersecurity platforms powering hands-on skill acceleration and enterprise competition
          orchestration — with interactive <strong>Learn</strong> pathways coming soon.
        </p>

        <div className="products-grid">
          {/* Card 1: Practice Platform */}
          <div className="product-card" id="products-practice">
            <div>
              <div className="product-top-row">
                <span className="product-badge-pill">Core Product</span>
                <div className="product-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m9 8 3 3-3 3" />
                    <line x1="15" x2="15.01" y1="16" y2="16" />
                  </svg>
                </div>
              </div>
              <h3 className="product-title">Practice Platform</h3>
              <p className="product-tagline">// Hands-On Vulnerability Mastery</p>
              <p className="product-desc">
                A comprehensive offensive security playground engineered with isolated target sandboxes,
                multi-disciplinary challenge tracks, and deep progression analytics.
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
                    <strong>On-Demand Sandboxes:</strong> Ephemeral, disposable container targets spawned in seconds per user with zero cross-solver interference.
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Advanced Telemetry:</strong> Radar mastery charts, solve velocity percentiles, hint penalty calculations, and verified solver records.
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="#free-challenge"
              className="product-action-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home", "free-challenge");
              }}
            >
              <span>Explore Practice Sandbox</span>
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
                <span className="product-badge-pill">Enterprise Infrastructure</span>
                <div className="product-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="product-title">CTF-as-a-Service (CTF-aaS)</h3>
              <p className="product-tagline">// Turnkey Tournament Orchestration</p>
              <p className="product-desc">
                Battle-tested competition management and automated scoring infrastructure built to run seamless
                collegiate, corporate, and global hacking tournaments.
              </p>

              <ul className="product-features-list">
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>High-Concurrency Cluster:</strong> Architected to sustain 2,000+ simultaneous contestants with zero latency spikes or platform downtime.
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Dynamic Scoring &amp; Anti-Cheat:</strong> Automated decay formulas, submission velocity throttling, and anomalous flag leak telemetry.
                  </span>
                </li>
                <li className="product-feature-item">
                  <span className="product-feature-bullet">▸</span>
                  <span className="product-feature-text">
                    <strong>Jeopardy</strong> Native support for Jeopardy boards,  and various formats.
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="product-action-btn"
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

          {/* Card 3: Learn (Coming Soon) */}
          <div className="product-card product-card--future product-card--learn-coming-soon" id="products-learn">
            <div className="learn-placeholder-wrap">
              <div
                className="product-icon-wrap"
                style={{
                  color: "#fbbf24",
                  borderColor: "rgba(251, 191, 36, 0.3)",
                  margin: "0 auto 18px",
                  width: "54px",
                  height: "54px",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                  <path d="M8 11h8" />
                  <path d="M8 7h6" />
                </svg>
              </div>
              <h3 className="product-title" style={{ marginBottom: "8px", fontSize: "1.5rem" }}>
                Learn
              </h3>
              <p
                className="product-tagline"
                style={{
                  color: "#fbbf24",
                  margin: 0,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                // Feature Coming Soon
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

