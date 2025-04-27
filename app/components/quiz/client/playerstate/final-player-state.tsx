"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Medal,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getOrdinal } from "@/app/utils/get-ordinal";
import type { CurrentPlayerState } from "@/app/types";

export function ShowFinalPlayerState({
  state,
  score,
  place,
  username,
}: {
  state: CurrentPlayerState;
  score: number;
  place: number;
  username: string;
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
    
  // Staggered animations
  useEffect(() => {
    // Show confetti first
    setShowConfetti(true);

    // Show content after a delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    // Show final message after another delay
    const messageTimer = setTimeout(() => {
      setShowFinalMessage(true);
    }, 2500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(messageTimer);
    };
  }, []);

  // Generate initials from username
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get trophy/medal component based on position
  const getAward = (position: number) => {
    if (position === 1) return <Trophy className="h-16 w-16 text-amber-500" />;
    if (position === 2) return <Medal className="h-16 w-16 text-zinc-400" />;
    if (position === 3) return <Medal className="h-16 w-16 text-amber-700" />;
    return <Award className="h-16 w-16 text-blue-500" />;
  };

  // Get award label based on position
  const getAwardLabel = (position: number) => {
    if (position === 1) return "Champion!";
    if (position === 2) return "Silver Medal!";
    if (position === 3) return "Bronze Medal!";
    return `${getOrdinal(position)} Place`;
  };

  // Get avatar color based on position
  const getAvatarColor = (position: number) => {
    if (position === 1) return "bg-amber-100 text-amber-700 border-amber-300"; // Gold
    if (position === 2) return "bg-zinc-100 text-zinc-700 border-zinc-300"; // Silver
    if (position === 3)
      return "bg-orange-100 text-orange-700 border-orange-300"; // Bronze
    return "bg-blue-100 text-blue-700 border-blue-300"; // Others
  };

  // Get background gradient based on position
  const getBackgroundGradient = (position: number) => {
    if (position === 1) return "from-amber-50 to-white"; // Gold
    if (position === 2) return "from-zinc-50 to-white"; // Silver
    if (position === 3) return "from-orange-50 to-white"; // Bronze
    return "from-blue-50 to-white"; // Others
  };

  // Get state icon and color
  const getStateInfo = (stateValue: CurrentPlayerState) => {
    if (stateValue === "correct")
      return {
        icon: CheckCircle,
        color: "text-emerald-500",
        label: "Your last answer was correct!",
      };
    if (stateValue === "wrong")
      return {
        icon: XCircle,
        color: "text-rose-500",
        label: "Your last answer was wrong",
      };
    return {
      icon: Clock,
      color: "text-amber-500",
      label: "Time's up on your last answer",
    };
  };

  const stateInfo = getStateInfo(state);
  const StateIcon = stateInfo.icon;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b ${getBackgroundGradient(
        place
      )} p-4`}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute rounded-sm"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  top: "-20px",
                  backgroundColor:
                    i % 5 === 0
                      ? "#fbbf24"
                      : // amber
                      i % 4 === 0
                      ? "#a1a1aa"
                      : // zinc
                      i % 3 === 0
                      ? "#f97316"
                      : // orange
                      i % 2 === 0
                      ? "#3b82f6"
                      : // blue
                        "#ef4444", // red
                }}
                initial={{ y: -20, opacity: 0, rotate: 0 }}
                animate={{
                  y: "100vh",
                  opacity: [0, 1, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: animationDuration,
                  delay: delay,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 5,
                }}
              />
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showContent && (
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", damping: 15 }}
          >
            <Card className="border-2 shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Congratulations message */}
                  <motion.h1
                    className="text-3xl font-bold mb-2 text-zinc-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Bravo!
                  </motion.h1>

                  <motion.p
                    className="text-zinc-600 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    You finished the quiz!
                  </motion.p>

                  {/* Trophy/Medal */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.6,
                      type: "spring",
                      stiffness: 300,
                      damping: 10,
                    }}
                    className="mb-4"
                  >
                    {getAward(place)}
                  </motion.div>

                  {/* Player Avatar */}
                  <Avatar
                    className={`h-20 w-20 border-2 ${getAvatarColor(
                      place
                    )} mb-4`}
                  >
                    <AvatarFallback>{getInitials(username)}</AvatarFallback>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${username}`}
                    />
                  </Avatar>

                  {/* Place */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-2"
                  >
                    <Badge
                      className={`px-4 py-1 text-lg ${
                        place === 1
                          ? "bg-amber-500 hover:bg-amber-600"
                          : place === 2
                          ? "bg-zinc-400 hover:bg-zinc-500"
                          : place === 3
                          ? "bg-amber-700 hover:bg-amber-800"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white`}
                    >
                      {getAwardLabel(place)}
                    </Badge>
                  </motion.div>

                  {/* Score */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="text-zinc-500 text-sm mb-1">
                      Final Score
                    </div>
                    <div className="text-4xl font-bold text-zinc-800">
                      {score}
                      <span className="text-zinc-400 text-lg ml-1">pts</span>
                    </div>
                  </motion.div>

                  {/* Last answer state */}
                  <motion.div
                    className={`flex items-center gap-2 ${stateInfo.color} mb-4`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <StateIcon className="h-5 w-5" />
                    <span>{stateInfo.label}</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final message */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            className="mt-6 text-center text-zinc-600 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
