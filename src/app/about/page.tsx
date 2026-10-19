"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { Container } from "@/shared/components/layout/Container";
import { GridBackground } from "@/shared/components/effects/GridBackground";
import { ExternalLink } from "lucide-react";
import { API_BASE_URL } from "@/shared/lib/config";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  country: string;
  profileUrl: string;
  avatarUrl: string;
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/about/team`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTeam(data);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <GridBackground />

      {/* Hero */}
      <section className="py-32 text-center">
        <Container>
          <h1 className="mt-4 text-5xl font-black text-white">
            Built by Hackers,{" "}
            <span className="text-purple-400">for Hackers</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            ExoQuest was born out of frustration with outdated, toy-like CTF
            platforms. We built the environment we always wanted — realistic,
            fast, and endlessly challenging.
          </p>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Our Mission",
                body: "Make elite cybersecurity education accessible to everyone — from curious beginners to seasoned pentesters.",
              },
              {
                title: "Our Platform",
                body: "Every challenge runs in an isolated Docker container. Real environments, real exploits, zero risk to your machine.",
              },
              {
                title: "Our Community",
                body: "Operators across the globe collaborate, compete, and share knowledge every day on ExoQuest.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <h3 className="text-lg font-bold text-purple-400">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team — fetched from DB, managed by super admins */}
      <section className="py-24">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-black text-white">The Team</h2>
          {team.length === 0 ? (
            <p className="text-center text-sm text-gray-600">
              Team members will appear here once added by the platform administrators.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => {
                const card = (
                  <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6 text-center transition-all hover:border-purple-500/30 hover:bg-purple-500/5">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 overflow-hidden">
                      {member.avatarUrl ? (
                        <Image
                          src={member.avatarUrl}
                          alt={member.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-purple-300">
                          {member.country || member.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="font-mono font-bold text-white">{member.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{member.role}</p>
                    {member.profileUrl && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[10px] text-purple-400">
                        <ExternalLink size={9} /> Portfolio
                      </span>
                    )}
                  </div>
                );

                return member.profileUrl ? (
                  <a
                    key={member.id}
                    href={member.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    {card}
                  </a>
                ) : (
                  <div key={member.id}>{card}</div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </main>
  );
}
