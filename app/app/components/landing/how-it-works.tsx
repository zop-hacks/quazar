"use client";

import { motion } from "framer-motion";
import { FileText, Play, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <FileText className="h-8 w-8 text-purple-600" />,
    title: "Enter Your Topic And Additional Info",
    description:
      "Specify your subject area and learning objectives. The more specific, the better the results.",
    color: "border-purple-200 bg-purple-50  /20",
  },
  {
    icon: <Play className="h-8 w-8 text-indigo-600" />,
    title: "Generate & Customize",
    description:
      "Our specialized AI agents work together to create, verify, and refine quiz questions. The Generator Agent creates questions based on your topic, while the Verifier Agent checks for accuracy, relevance, and educational value. You can then review and customize the questions, answers, and settings to perfectly match your needs.",
    color: "border-indigo-200 bg-indigo-50  /20",
  },
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "Share With Participants",
    description:
      "Share a simple code with participants. They join using any device with a web browser.",
    color: "border-blue-200 bg-blue-50  /20",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-emerald-600" />,
    title: "Play & Analyze",
    description:
      "Host your interactive quiz and review detailed results to understand participant performance.",
    color: "border-emerald-200 bg-emerald-50  /20",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-zinc-50 py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl ">
            How Quazar Works
          </h2>
          <p className="mt-4 text-lg text-zinc-600 ">
            Creating and hosting interactive quizzes has never been easier.
            Follow these simple steps to get started.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-zinc-200 " />

          <div className="relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative mb-12 md:mb-24"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div
                  className={`relative ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  <div
                    className={`absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 ${step.color}`}
                  >
                    {step.icon}
                  </div>

                  <div
                    className={`ml-24 md:mx-0 md:w-5/12 ${
                      index % 2 === 0
                        ? "md:mr-auto md:pr-16"
                        : "md:ml-auto md:pl-16"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-zinc-900 ">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-zinc-600 ">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
