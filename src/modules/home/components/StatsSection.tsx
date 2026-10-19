"use client";

import { useEffect, useState } from "react";
import CountUp from "@/shared/components/effects/CountUp";
import { API_BASE_URL } from "@/shared/lib/config";

export function StatsSection() {
  const [stats, setStats] = useState({ users: 1200, challenges: 80, countries: 45 });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/stats`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.users === "number" && data.users > 0) {
          setStats({
            users: data.users,
            challenges: data.challenges ?? 80,
            countries: data.countries ?? 45,
          });
        }
      })
      .catch(() => {});
  }, []);

  const items = [
    { value: stats.users, label: "Registered Hackers" },
    { value: stats.challenges, label: "Active Challenges" },
    { value: stats.countries, label: "Countries Represented" },
  ];

  return (
    <section className="border-y border-white/5 bg-[#0a0c10] py-16">
      <div className="mx-auto flex max-w-5xl items-center justify-around gap-8 px-6">
        {items.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-4xl font-black text-purple-500 flex items-center justify-center">
              <CountUp from={0} to={s.value} duration={1.5} separator="," />+
            </p>
            <p className="mt-2 text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
