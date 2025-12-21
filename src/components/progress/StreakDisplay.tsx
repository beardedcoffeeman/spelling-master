"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}

export function StreakDisplay({
  currentStreak,
  longestStreak,
  lastPracticeDate,
}: StreakDisplayProps) {
  const isActiveToday =
    lastPracticeDate === new Date().toISOString().split("T")[0];

  // Generate flame intensity based on streak
  const getFlameSize = () => {
    if (currentStreak >= 30) return "text-7xl";
    if (currentStreak >= 14) return "text-6xl";
    if (currentStreak >= 7) return "text-5xl";
    if (currentStreak >= 3) return "text-4xl";
    return "text-3xl";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-100">
      <div className="flex items-center gap-6">
        {/* Flame animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={getFlameSize()}
        >
          {currentStreak > 0 ? "🔥" : "💤"}
        </motion.div>

        {/* Streak info */}
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-orange-600">
              {currentStreak}
            </span>
            <span className="text-text-secondary">
              day{currentStreak !== 1 ? "s" : ""} streak
            </span>
          </div>

          <p className="text-sm text-text-muted mt-1">
            {isActiveToday
              ? "You've practised today! 🎉"
              : currentStreak > 0
              ? "Keep going - don't break your streak!"
              : "Start practising to build your streak!"}
          </p>
        </div>

        {/* Best streak */}
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">
            {longestStreak}
          </div>
          <div className="text-xs text-text-muted">Best streak</div>
        </div>
      </div>

      {/* Weekly view */}
      <div className="mt-6">
        <WeekView currentStreak={currentStreak} lastPracticeDate={lastPracticeDate} />
      </div>
    </Card>
  );
}

interface WeekViewProps {
  currentStreak: number;
  lastPracticeDate: string | null;
}

function WeekView({ currentStreak, lastPracticeDate }: WeekViewProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const todayDay = today.getDay();
  const adjustedTodayIndex = todayDay === 0 ? 6 : todayDay - 1; // Adjust for Mon=0

  // Calculate which days in the current week were practiced
  // This is a simplified version - in reality you'd track each day
  const getPracticedDays = () => {
    const practiced: boolean[] = new Array(7).fill(false);
    
    // If practiced today
    const todayStr = today.toISOString().split("T")[0];
    if (lastPracticeDate === todayStr) {
      practiced[adjustedTodayIndex] = true;
    }

    // Mark previous days based on streak (simplified)
    for (let i = 1; i <= Math.min(currentStreak - 1, adjustedTodayIndex); i++) {
      practiced[adjustedTodayIndex - i] = true;
    }

    return practiced;
  };

  const practicedDays = getPracticedDays();

  return (
    <div className="flex justify-between gap-2">
      {days.map((day, index) => {
        const isPastOrToday = index <= adjustedTodayIndex;
        const isPracticed = practicedDays[index];
        const isToday = index === adjustedTodayIndex;

        return (
          <div key={day} className="flex-1 text-center">
            <div className="text-xs text-text-muted mb-2">{day}</div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`
                w-8 h-8 mx-auto rounded-full flex items-center justify-center
                ${
                  isPracticed
                    ? "bg-orange-500 text-white"
                    : isToday
                    ? "bg-orange-100 border-2 border-orange-300"
                    : isPastOrToday
                    ? "bg-gray-100"
                    : "bg-gray-50 border border-dashed border-gray-200"
                }
              `}
            >
              {isPracticed ? "✓" : isToday ? "•" : ""}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default StreakDisplay;


