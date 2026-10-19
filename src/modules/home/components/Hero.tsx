"use client";

import { Container } from "@/shared/components/layout/Container";
import { GridBackground } from "@/shared/components/effects/GridBackground";
import { PRACTICES_URL } from "@/shared/lib/config";
import { InteractiveTerminal } from "./InteractiveTerminal";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <GridBackground />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Copy */}
          <div>
            <h1 className="text-7xl font-black leading-[1.05] tracking-tight text-white">
              Explore.<br />
              Exploit.<br />
              Conquer.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-400">
              ExoQuest is a modern cybersecurity playground designed for hackers,
              professionals, and elite competitors. Solve real-world challenges across
              Web, Crypto, Pwn, Reverse Engineering, and more.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`${PRACTICES_URL}/register`}
                className="group relative rounded-xl bg-purple-600 px-7 py-3.5 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-purple-500 active:scale-95"
              >
                Start Exploiting
              </a>
              <a
                href={`${PRACTICES_URL}/dashboard/challenges`}
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all hover:scale-105 hover:border-purple-500/30 hover:bg-white/10 active:scale-95"
              >
                Explore Challenges
              </a>
            </div>
          </div>

          {/* Right — Terminal */}
          <div className="w-full overflow-hidden lg-block">
            <InteractiveTerminal />
          </div>
        </div>
      </Container>
    </section>
  );
}
