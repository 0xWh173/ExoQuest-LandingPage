// src/modules/home/components/FeatureGrid.tsx
import { Container } from "@/shared/components/layout/Container";
import { Card } from "@/shared/components/ui/Card";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { Zap, Shield, Trophy, FlaskConical, BarChart3, Users } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-World Challenges",
    description:
      "Tackle CTF challenges modelled after actual CVEs, breaches, and attack scenarios.",
  },
  {
    icon: Shield,
    title: "Community Writeups",
    description:
      "Share and study community-driven walkthroughs and solutions.",
  },
  {
    icon: Trophy,
    title: "Live Competitions",
    description:
      "Compete in timed events against thousands of hackers worldwide.",
  },
  {
    icon: FlaskConical,
    title: "Lab Environments",
    description:
      "Spin up isolated sandboxes instantly — no setup, no risk to your machine.",
  },
  {
    icon: BarChart3,
    title: "Skill Analytics",
    description:
      "Track your progress across MITRE ATT&CK categories and see exactly where to improve.",
  },
  {
    icon: Users,
    title: "Team Mode",
    description:
      "Form squads, share findings, and climb the team leaderboard together.",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle
          title="Everything You Need to Level Up"
          subtitle="A complete platform built for serious cybersecurity professionals and competitors."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="p-6">
              <f.icon size={28} className="text-purple-400" />
              <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {f.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}