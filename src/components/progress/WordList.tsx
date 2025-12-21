"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { WordProgress, MasteryStatus } from "@/lib/db";

interface WordListProps {
  words: WordProgress[];
  status: MasteryStatus;
  onPracticeWord?: (word: string) => void;
  onPracticeAll?: () => void;
}

const statusConfig: Record<
  MasteryStatus,
  { icon: string; label: string; color: string; bgColor: string }
> = {
  mastered: {
    icon: "⭐",
    label: "Mastered",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  learning: {
    icon: "📈",
    label: "Learning",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  needs_work: {
    icon: "🔴",
    label: "Needs Work",
    color: "text-error",
    bgColor: "bg-error/10",
  },
  not_tried: {
    icon: "❓",
    label: "Not Tried",
    color: "text-text-muted",
    bgColor: "bg-bg-secondary",
  },
};

export function WordList({
  words,
  status,
  onPracticeWord,
  onPracticeAll,
}: WordListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = statusConfig[status];

  const displayWords = isExpanded ? words : words.slice(0, 6);
  const hasMore = words.length > 6;

  if (words.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="text-4xl mb-3">{config.icon}</div>
        <h3 className="font-semibold text-text-primary mb-1">{config.label}</h3>
        <p className="text-text-muted text-sm">
          {status === "mastered"
            ? "Keep practising to master more words!"
            : status === "not_tried"
            ? "Start a challenge to begin learning!"
            : "No words in this category yet."}
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className={`p-4 ${config.bgColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <h3 className={`font-bold ${config.color}`}>{config.label}</h3>
              <p className="text-sm text-text-muted">
                {words.length} word{words.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {onPracticeAll && words.length > 0 && status !== "mastered" && (
            <Button size="sm" onClick={onPracticeAll}>
              Practice All
            </Button>
          )}
        </div>
      </div>

      {/* Word list */}
      <div className="p-4">
        <div className="space-y-2">
          <AnimatePresence>
            {displayWords.map((wordProgress, index) => (
              <motion.div
                key={wordProgress.word}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: index * 0.03 }}
              >
                <div
                  className={`
                    flex items-center justify-between p-3 rounded-xl
                    ${onPracticeWord ? "hover:bg-bg-secondary cursor-pointer" : ""}
                    transition-colors
                  `}
                  onClick={() => onPracticeWord?.(wordProgress.word)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="font-semibold text-text-primary">
                      {wordProgress.word}
                    </span>
                    {/* Category badge - only show if word has been attempted */}
                    {wordProgress.id && (
                      <span
                        className={`
                          px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap
                          ${
                            wordProgress.category === "homophone"
                              ? "bg-success/10 text-success"
                              : "bg-primary/10 text-primary"
                          }
                        `}
                      >
                        {wordProgress.category === "homophone" ? "🎭 Homophone" : "📚 Spelling"}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Success rate */}
                    <div className="text-sm text-text-muted whitespace-nowrap">
                      {wordProgress.correctCount}/
                      {wordProgress.correctCount + wordProgress.incorrectCount} correct
                    </div>
                    {/* Accuracy indicator */}
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                        ${
                          wordProgress.correctCount + wordProgress.incorrectCount === 0
                            ? "bg-gray-100 text-gray-400"
                            : (wordProgress.correctCount /
                                (wordProgress.correctCount + wordProgress.incorrectCount)) >=
                              0.8
                            ? "bg-success/20 text-success"
                            : "bg-warning/20 text-warning"
                        }
                      `}
                    >
                      {wordProgress.correctCount + wordProgress.incorrectCount === 0
                        ? "-"
                        : Math.round(
                            (wordProgress.correctCount /
                              (wordProgress.correctCount + wordProgress.incorrectCount)) *
                              100
                          )}
                      {wordProgress.correctCount + wordProgress.incorrectCount > 0 && "%"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more/less */}
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-3"
          >
            {isExpanded
              ? "Show less"
              : `Show ${words.length - 6} more words`}
          </Button>
        )}
      </div>
    </Card>
  );
}

export default WordList;

