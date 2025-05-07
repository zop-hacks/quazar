"use client";

import { HeroSection } from "@/app/components/landing/hero-section";
import { FeaturesSection } from "@/app/components/landing/features-section";
import { HowItWorks } from "@/app/components/landing/how-it-works";
import { FAQ } from "@/app/components/landing/faq";
import { CTASection } from "@/app/components/landing/cta-section";

import { Footer } from "@/app/components/landing/footer";
import { AIAgentsExplainer } from "@/app/components/landing/ai-agents-explainer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />

        <section id="features">
          <FeaturesSection />
        </section>

        <section id="how-it-works">
          <HowItWorks />
          <AIAgentsExplainer />
        </section>


        <section id="faq">
          <FAQ />
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
