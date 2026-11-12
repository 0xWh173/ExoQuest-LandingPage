"use client";

import React from "react";
import { FuzzyText } from "../effects/FuzzyText";
import { InteractiveTerminal } from "../sandbox/InteractiveTerminal";
import { CircularGallery } from "../events/CircularGallery";
import { NavRoute } from "../layout/SiteHeader";

interface HomeViewProps {
  isActive: boolean;
  onNavigate: (route: NavRoute, targetId?: string) => void;
  onShowToast?: (msg: string) => void;
}

export function HomeView({ isActive, onNavigate, onShowToast }: HomeViewProps) {
  return (
    <div className={`app-view ${isActive ? "active" : ""}`} id="view-home" data-view="home">
      {/* ======================================= */}
      {/*  HERO SECTION                           */}
      {/* ======================================= */}
      <section id="home" className="hero-section">
        <div className="hero-inner">
          {/* Left content */}
          <div className="hero-content">
            <h1 className="hero-title hero-fuzzy-title" aria-label="Explore. Exploit. Conquer.">
              <span className="hero-fuzzy-word">
                <FuzzyText
                  fontSize="clamp(2.4rem, 4.4vw, 3.8rem)"
                  fontWeight={800}
                  fontFamily="'Space Grotesk', -apple-system, sans-serif"
                  color="#ffffff"
                  enableHover={true}
                  baseIntensity={0.16}
                  hoverIntensity={0.55}
                  fuzzRange={24}
                  className="fuzzy-text-canvas"
                >
                  Explore.
                </FuzzyText>
              </span>
              <span className="hero-fuzzy-word">
                <FuzzyText
                  fontSize="clamp(2.4rem, 4.4vw, 3.8rem)"
                  fontWeight={800}
                  fontFamily="'Space Grotesk', -apple-system, sans-serif"
                  color="#ffffff"
                  enableHover={true}
                  baseIntensity={0.16}
                  hoverIntensity={0.55}
                  fuzzRange={24}
                  className="fuzzy-text-canvas"
                >
                  Exploit.
                </FuzzyText>
              </span>
              <span className="hero-fuzzy-word">
                <FuzzyText
                  fontSize="clamp(2.4rem, 4.4vw, 3.8rem)"
                  fontWeight={800}
                  fontFamily="'Space Grotesk', -apple-system, sans-serif"
                  color="hsl(270, 95%, 65%)"
                  enableHover={true}
                  baseIntensity={0.18}
                  hoverIntensity={0.6}
                  fuzzRange={24}
                  className="fuzzy-text-canvas"
                >
                  Conquer.
                </FuzzyText>
              </span>
            </h1>

            <p className="hero-desc">
              The modern cybersecurity <strong>Practice Platform</strong> and turnkey <strong>CTF-as-a-Service</strong>
              {" "}— empowering ethical hackers, universities, and enterprises with hands-on practice environments and scalable
              competition infrastructure.
            </p>

            {/* Two CTAs explicitly naming both actions */}
            <div className="hero-cta-wrap">
              <a
                href="#free-challenge"
                className="hero-cta-secondary scale-btn"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("free-challenge");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
                <span>Start Practicing</span>
              </a>

              <a
                href="#contact"
                className="hero-cta-secondary scale-btn"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("contact");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                  <path d="M14 14.66v1.626a2 2 0 0 1 .976 1.696A5 5 0 0 1 17 21.978" />
                  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                </svg>
                <span>Host a Competition</span>
              </a>
            </div>

            {/* Real Verified Stats */}
            <div className="hero-stats">
              <div className="hero-stat hero-stat-static scale-button">
                <span className="stat-number" style={{ color: "white" }}>100+</span>
                <span className="stat-label">Handcrafted Cyber Challenges</span>
              </div>
              <div className="hero-stat hero-stat-static scale-button">
                <span className="stat-number" style={{ color: "var(--accent)" }}>15+</span>
                <span className="stat-label">Events &amp; Competitions Supported</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Terminal */}
          <div className="hero-sandbox-panel w-full" id="free-challenge">
            <InteractiveTerminal />
          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/*  COMPANY & ABOUT SECTION                */}
      {/* ======================================= */}
      <section id="about" className="about-section">
        <h2 className="section-title">
          About Our <span className="accent-text">Organization</span>
        </h2>

        <div className="about-badges">
          <div className="accent-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="accent-icon">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
              <path d="M8 11h8" />
              <path d="M8 7h6" />
            </svg>
            <span className="accent-text">1 Year Experience</span>
          </div>
          <div className="accent-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="accent-icon">
              <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
              <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
              <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
              <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
            </svg>
            <span className="accent-text">2+ Events Supported</span>
          </div>
          <div className="accent-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="accent-icon">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span className="accent-text">6 Core Operatives</span>
          </div>
        </div>

        <div className="about-cards">
          {/* Vision Card */}
          <div className="about-card about-card-static scale-button">
            <div className="card-blur"></div>
            <div className="card-content">
              <div className="card-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="accent-icon card-icon">
                  <path d="M10 10h4" />
                  <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
                  <path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z" />
                  <path d="M 22 16 L 2 16" />
                  <path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z" />
                  <path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" />
                </svg>
                <h3 className="card-title" style={{ color: "white" }}>Vision</h3>
              </div>
              <ul className="card-list">
                <li>
                  <span className="accent-text card-bullet">⁕</span> Our vision is to establish ExoQuest as the premier student-driven cybersecurity organization advancing ethical hacking, vulnerability research, and practical defense.
                </li>
                <li>
                  <span className="accent-text card-bullet">⁕</span> We aim to build an active international community where learning goes beyond classrooms into real-world adversary scenarios.
                </li>
                <li>
                  <span className="accent-text card-bullet">⁕</span> Every member gains the freedom to experiment with emerging technologies, exploit realistic vectors, and conquer new cyber frontiers.
                </li>
              </ul>
            </div>
          </div>

          {/* Mission Card */}
          <div className="about-card about-card-static scale-button">
            <div className="card-blur"></div>
            <div className="card-content">
              <div className="card-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="accent-icon card-icon">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
                <h3 className="card-title" style={{ color: "white" }}>Mission</h3>
              </div>
              <ul className="card-list">
                <li>
                  <span className="accent-text card-bullet">⁕</span> <span className="accent-text-bold">IM1:</span> Empower students and professionals with hands-on offensive security, reverse engineering, and cloud defense skills.
                </li>
                <li>
                  <span className="accent-text card-bullet">⁕</span> <span className="accent-text-bold">IM2:</span> Foster an inclusive, high-performance community that sparks collaborative problem-solving and open-source tooling.
                </li>
                <li>
                  <span className="accent-text card-bullet">⁕</span> <span className="accent-text-bold">IM3:</span> Provide universities and companies with production-grade CTF infrastructure that removes operational overhead.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================= */}
      {/*  TRUST / EVENTS SECTION                 */}
      {/* ======================================= */}
      <section id="trust" className="trust-section">
        <h2 className="section-title">Events</h2>
        <p className="section-subtitle">
          Authentic competition track record under live tournament pressure.
        </p>

        {/* React Bits CircularGallery Component */}
        <div className="events-gallery-wrap">
          <CircularGallery />
        </div>
      </section>
    </div>
  );
}

