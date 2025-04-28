"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Quazar generate quiz questions?",
    answer:
      "Quazar uses advanced AI language models to generate quiz questions based on the topics and learning objectives you provide. The AI understands educational concepts and creates relevant, challenging questions that test understanding rather than just memorization.",
  },
  {
    question: "Can I edit the AI-generated questions?",
    answer:
      "Of course, While our AI creates high-quality questions, you have full control to edit, modify, or replace any question or answer. You can also adjust difficulty levels, question types, and time limits to suit your needs.",
  },
  {
    question: "How do participants join a quiz?",
    answer:
      "Participants join by entering a unique code on the Quazar website or app. No account creation is required for participants, making it easy for anyone to join instantly from any device with a web browser.",
  },
  {
    question: "Is Quazar suitable for educational institutions?",
    answer:
      "Yes, Quazar is designed with educators in mind. It's used by teachers, professors, and trainers at all levels of education. Our Team plan includes features specifically for schools and universities, such as SSO integration and advanced analytics.",
  },
  {
    question: "Can I use Quazar for remote learning?",
    answer:
      "Definitely! Quazar works perfectly for remote and hybrid learning environments. Participants can join from anywhere with an internet connection, making it ideal for distance education, virtual classrooms, and distributed teams.",
  },
  {
    question: "How secure is my quiz data?",
    answer:
      "We take data security seriously. All quiz data is encrypted, and we follow industry best practices for data protection. We never share your content or participant data with third parties, and you retain full ownership of all your quizzes.",
  },
];

export function FAQ() {
  return (
    <section className="bg-white py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl ">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-zinc-600 ">
            Have questions about Quazar? Find answers to common questions below.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-lg border border-zinc-200 "
                >
                  <AccordionTrigger className="px-6 py-4 text-left text-zinc-900 ">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-zinc-600 ">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-600 ">
            Still have questions? We're here to help.
          </p>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <a
              href="#contact"
              className="inline-flex items-center text-purple-600 hover:text-purple-700  :text-purple-300"
            >
              Contact our support team
              <ChevronDown className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
