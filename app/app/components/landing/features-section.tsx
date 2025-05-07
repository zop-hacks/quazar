"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Users, Clock, BarChart, Sparkles, Speaker, Mic } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-6 w-6 text-purple-600" />,
    title: "AI-Powered Generation",
    description:
      "Generate quizzes on any topic using advanced LLM agents.",
  },
  {
    icon: <Clock className="h-6 w-6 text-indigo-600" />,
    title: "Save Time",
    description:
      "Create quizzes in seconds instead of hours. Focus on teaching, not quiz creation.",
  },
  {
    icon: <Users className="h-6 w-6 text-blue-600" />,
    title: "Interactive Multiplayer",
    description:
      "Host live quiz sessions where participants join via their devices, compete, learn, and have fun in real-time.",
  },
  // { note: add me :)
  //   icon: <Mic className="h-6 w-6 text-amber-600" />,
  //   title: "Speak to generate",
  //   description:
  //     "Generate quizzes by speaking to an LLM assistant",
  // },
  {
    icon: <BarChart className="h-6 w-6 text-emerald-600" />,
    title: "Detailed Analytics",
    description:
      "Track your class's performance with comprehensive analytics to identify knowledge gaps, and quiz effectiveness.",
  },
];

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl ">
            Everything You Need to Create Amazing Quizzes
          </h2>
          <p className="mt-4 text-lg text-zinc-600 ">
            Quazar combines powerful LLMs with intuitive design to make quiz
            creation and delivery fast and easy.
          </p>
        </div>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-200 hover:shadow-md  "
              variants={itemVariants}
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 ">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-zinc-900 ">
                {feature.title}
              </h3>
              <p className="text-zinc-600 ">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
