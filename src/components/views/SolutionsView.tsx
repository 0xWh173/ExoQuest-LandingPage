"use client";

import React, { useEffect } from "react";
import { CardSwap } from "../solutions/CardSwap";

interface SolutionsViewProps {
  isActive: boolean;
}

export function SolutionsView({ isActive }: SolutionsViewProps) {
  useEffect(() => {
    if (isActive && typeof window !== "undefined" && (window as any).cardSwapApi) {
      setTimeout(() => {
        (window as any).cardSwapApi.fit?.();
        (window as any).cardSwapApi.refresh?.();
      }, 60);
    }
  }, [isActive]);

  return (
    <div className={`app-view ${isActive ? "active" : ""}`} id="view-solutions" data-view="solutions">
      <section id="solutions" className="solutions-section">
        <h2 className="section-title">
          Solutions by <span className="accent-text">Audience</span>
        </h2>
        <p className="section-subtitle">
          Purpose-built cybersecurity capabilities tailored for every phase — from university classrooms to enterprise
          security teams.
        </p>

        {/* 3D CardSwap Component */}
        <CardSwap />
      </section>
    </div>
  );
}

