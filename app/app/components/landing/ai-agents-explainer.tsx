"use client"

import { motion } from "framer-motion"
import { Brain, Shield, Sparkles, RefreshCw, Search, FileCheck, AlertCircle, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AIAgentsExplainer() {
  const agents = [
    {
      icon: <Shield className="h-10 w-10 text-purple-600" />,
      title: "Val - The Validator",
      description:
        "Validates that your quiz details aren't inappropriate, NSFW, dangerous, or gibberish, ensuring all content meets educational standards.",
      color: "border-purple-200 bg-purple-50 dark:border-purple-900/30 dark:bg-purple-950/20",
    },
    {
      icon: <Brain className="h-10 w-10 text-indigo-600" />,
      title: "Sam - The Structurer",
      description:
        "Summarizes and structures your quiz details into a well-organized format with title, summary, audience, and learning objectives for downstream agents.",
      color: "border-indigo-200 bg-indigo-50 dark:border-indigo-900/30 dark:bg-indigo-950/20",
    },
    {
      icon: <Search className="h-10 w-10 text-blue-600" />,
      title: "Roby - The Researcher",
      description:
        "Researches and expands on the topic to produce a rich, cohesive background including key concepts, theories, and real-world applications.",
      color: "border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-950/20",
    },
    {
      icon: <Zap className="h-10 w-10 text-amber-600" />,
      title: "Nandy - The Creator",
      description:
        "Generates the initial set of question-answer pairs based on the researched content, tailored to your specified learning objectives.",
      color: "border-amber-200 bg-amber-50 dark:border-amber-900/30 dark:bg-amber-950/20",
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-emerald-600" />,
      title: "Mal - The Refiner",
      description:
        "Transforms raw questions into polished multiple-choice format—improving wording, adding distractors, and setting appropriate display times.",
      color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-950/20",
    },
    {
      icon: <AlertCircle className="h-10 w-10 text-rose-600" />,
      title: "Blip - The Reviewer",
      description:
        "Reviews each question for clarity, conciseness, and audience appropriateness, flagging any that need improvement to ensure quality.",
      color: "border-rose-200 bg-rose-50 dark:border-rose-900/30 dark:bg-rose-950/20",
    },
  ]

  return (
    <section className="bg-white py-16 dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            <span>AI-Powered Question Generation</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Intelligent Agents Working Together
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Quazar uses a sophisticated system of specialized AI agents that collaborate to create high-quality,
            educational quiz content.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card
                className={`h-full border-2 ${agent.color} shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-zinc-900">
                    {agent.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">{agent.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{agent.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col items-center text-center md:flex-row md:text-left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300 md:mb-0 md:mr-6">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                Comprehensive Quality Assurance
              </h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Our multi-agent system includes built-in redundancy and fallback mechanisms. If any question doesn't
                meet our quality standards, agents like Nan automatically create replacements, ensuring you always
                receive the highest quality quiz content possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
