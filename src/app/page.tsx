import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { Hero } from "@/modules/home/components/Hero";
import { StatsSection } from "@/modules/home/components/StatsSection";
import { FeatureGrid } from "@/modules/home/components/FeatureGrid";
import { CTASection } from "@/modules/home/components/CTASection";
import { GridBackground } from "@/shared/components/effects/GridBackground";

export default function HomePage() {
  return (
    <main className="relative">
      <GridBackground />
      <Navbar />
      <Hero />
      <StatsSection />
      <FeatureGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
