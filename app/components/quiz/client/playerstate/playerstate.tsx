"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { H2, H1 } from "@/components/ui/utypography";
import { CurrentPlayerState } from "@/app/types";

interface PlayerStateProps {
  state: CurrentPlayerState;
  score: number;
  place: string;
  streakCount?: number;
}

export const PlayerState = ({
  state,
  score,
  place,
  streakCount = 0,
}: PlayerStateProps) => {
  const stateConfig = {
    correct: {
      icon: CheckCircle,
      title: "Correct!",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      animation: "pulse",
    },
    wrong: {
      icon: XCircle,
      title: "Wrong!",
      color: "text-rose-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      animation: "shake",
    },
    time_up: {
      icon: Clock,
      title: "Time's up!",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      animation: "fadeIn",
    },
  };

  const config = stateConfig[state];
  const Icon = config.icon;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      transition: { repeat: 2, duration: 0.6 },
    },
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
    fadeIn: {
      opacity: [0, 1],
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card
          className={`p-8 border-2 ${config.borderColor} ${config.bgColor} shadow-lg`}
        >
          {/* Status Icon */}
          <motion.div
            className="flex justify-center mb-6"
            variants={itemVariants}
            animate={config.animation}
            custom={iconVariants[config.animation as keyof typeof iconVariants]}
          >
            <div
              className={`rounded-full p-4 ${config.bgColor} ${config.color}`}
            >
              <Icon size={80} strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Status Title */}
          <motion.div className="text-center mb-6" variants={itemVariants}>
            <H1 className={`${config.color} mb-0`}>{config.title}</H1>
          </motion.div>

          {/* Score Section */}
          <motion.div
            className="bg-white rounded-lg p-4 mb-4 border border-zinc-200 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center">
              <span className="text-zinc-600 font-medium">Your Score</span>
              <H2 className="text-zinc-800 m-0">{score}</H2>
            </div>
          </motion.div>

          {/* Rank Badge */}
          <motion.div
            className="flex justify-center mb-4"
            variants={itemVariants}
          >
            <Badge
              variant="outline"
              className="px-4 py-2 text-lg font-medium border-zinc-300 bg-white"
            >
              Rank: {place}
            </Badge>
          </motion.div>

          {/* Streak Counter - only show if there's a streak */}
          {streakCount > 1 && (
            <motion.div
              className="text-center text-zinc-600"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="inline-flex items-center gap-1">
                <span className="text-amber-500">🔥</span>
                {streakCount} correct in a row!
              </span>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};
