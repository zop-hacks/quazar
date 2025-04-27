"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Countdown = ({
  initialSeconds,
  finishQuestion,
}: {
  initialSeconds: number;
  finishQuestion: () => void;
}) => {
  if (initialSeconds > 0) {
    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    // Calculate percentage of time remaining
    const percentageLeft = (timeLeft / initialSeconds) * 100;

    useEffect(() => {
      if (timeLeft <= 0) {
        finishQuestion();
        return;
      }

      // Set a timeout to decrement the timer every second
      const timerId = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }, [timeLeft, finishQuestion]);

    return (
      <div className="w-full max-w-md mx-auto mt-8">
        <div className="relative">
          {/* Circular timer */}
          <div className="w-24 h-24 mx-auto relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />

              {/* Timer circle that decreases */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={
                  percentageLeft > 60
                    ? "#10b981"
                    : percentageLeft > 30
                    ? "#f59e0b"
                    : "#ef4444"
                }
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset={283 * (1 - percentageLeft / 100)}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                initial={false}
                animate={{
                  strokeDashoffset: 283 * (1 - percentageLeft / 100),
                }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>

            {/* Timer number */}
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
            >
              {timeLeft}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
};
