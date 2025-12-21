"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/ProgressBar";

interface MasteryCategory {
  status: "mastered" | "learning" | "needs_work" | "not_tried";
  count: number;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface MasteryDashboardProps {
  mastered: number;
  learning: number;
  needsWork: number;
  notTried: number;
  total: number;
  onCategoryClick?: (status: string) => void;
}

export function MasteryDashboard({
  mastered,
  learning,
  needsWork,
  notTried,
  total,
  onCategoryClick,
}: MasteryDashboardProps) {
  const categories: MasteryCategory[] = [
    {
      status: "mastered",
      count: mastered,
      label: "Mastered",
      icon: "⭐",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      status: "learning",
      count: learning,
      label: "Learning",
      icon: "📈",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      status: "needs_work",
      count: needsWork,
      label: "Needs Work",
      icon: "🔴",
      color: "text-error",
      bgColor: "bg-error/10",
    },
    {
      status: "not_tried",
      count: notTried,
      label: "Not Tried",
      icon: "❓",
      color: "text-text-muted",
      bgColor: "bg-bg-secondary",
    },
  ];

  const masteredPercentage = total > 0 ? (mastered / total) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Overall progress circle */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <CircularProgress
            percentage={masteredPercentage}
            size={140}
            strokeWidth={12}
            variant={masteredPercentage >= 50 ? "success" : "default"}
          >
            <div className="text-center">
              <span className="text-3xl font-bold text-text-primary">
                {Math.round(masteredPercentage)}%
              </span>
              <span className="text-xs text-text-muted block">mastered</span>
            </div>
          </CircularProgress>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-text-primary font-display mb-2">
              Your Progress
            </h2>
            <p className="text-text-secondary">
              {mastered === total
                ? "Amazing! You've mastered all words! 🎉"
                : mastered > total / 2
                ? "Great progress! Keep going! 💪"
                : mastered > 0
                ? "You're on your way! Keep practising! 📚"
                : "Start your spelling journey today! 🚀"}
            </p>
            <p className="text-sm text-text-muted mt-2">
              {mastered} of {total} words mastered
            </p>
          </div>
        </div>
      </Card>

      {/* Category breakdown */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              variant={onCategoryClick ? "interactive" : "default"}
              onClick={() => onCategoryClick?.(category.status)}
              className={`p-4 ${onCategoryClick ? "cursor-pointer" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center
                    text-2xl ${category.bgColor}
                  `}
                >
                  {category.icon}
                </div>
                <div className="flex-1">
                  <div className={`text-2xl font-bold ${category.color}`}>
                    {category.count}
                  </div>
                  <div className="text-sm text-text-muted">{category.label}</div>
                </div>
              </div>

              {/* Progress bar for this category */}
              <div className="mt-3">
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(category.count / total) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={`h-full rounded-full ${
                      category.status === "mastered"
                        ? "bg-success"
                        : category.status === "learning"
                        ? "bg-primary"
                        : category.status === "needs_work"
                        ? "bg-error"
                        : "bg-gray-300"
                    }`}
                  />
                </div>
                <div className="text-xs text-text-muted mt-1 text-right">
                  {Math.round((category.count / total) * 100)}%
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MasteryDashboard;


