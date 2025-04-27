"use client"

import { HeroSection } from "@/app/components/landing/hero-section"
import { FeaturesSection } from "@/app/components/landing/features-section"
import { HowItWorks } from "@/app/components/landing/how-it-works"
import { FAQ } from "@/app/components/landing/faq"
import { CTASection } from "@/app/components/landing/cta-section"

import { Footer } from "@/app/components/landing/footer"
import { AIAgentsExplainer } from "@/app/components/landing/ai-agents-explainer"

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

        <section id="sign-up" className="bg-zinc-50 py-24 dark:bg-zinc-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                Join Quazar Today
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                Create your free account and start generating engaging quizzes in minutes.
              </p>
            </div>

          </div>
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
