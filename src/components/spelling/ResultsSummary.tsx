"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CircularProgress } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";

interface ResultsSummaryProps {
  correct: number;
  total: number;
  incorrectWords: string[];
  onLearnWords: () => void;
  onGoHome: () => void;
  onPlayAgain: () => void;
}

export function ResultsSummary({
  correct,
  total,
  incorrectWords,
  onLearnWords,
  onGoHome,
  onPlayAgain,
}: ResultsSummaryProps) {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const isPerfect = correct === total;
  const isGreat = percentage >= 80;
  const isGood = percentage >= 60;

  const getMessage = () => {
    if (isPerfect) return { emoji: "🎉", title: "Perfect Score!", subtitle: "You're a spelling superstar!" };
    if (isGreat) return { emoji: "⭐", title: "Excellent Work!", subtitle: "Almost perfect - keep it up!" };
    if (isGood) return { emoji: "👍", title: "Good Job!", subtitle: "You're making great progress!" };
    return { emoji: "💪", title: "Keep Practising!", subtitle: "Every attempt makes you better!" };
  };

  const message = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto px-4"
    >
      {/* Celebration emoji */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        className="text-7xl"
      >
        {message.emoji}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-text-primary font-display mb-2">
          {message.title}
        </h1>
        <p className="text-text-secondary">{message.subtitle}</p>
      </motion.div>

      {/* Score circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <CircularProgress
          percentage={percentage}
          size={160}
          strokeWidth={12}
          variant={isPerfect ? "success" : isGood ? "default" : "warning"}
        >
          <div className="text-center">
            <span className="text-4xl font-bold text-text-primary">{correct}</span>
            <span className="text-xl text-text-muted">/{total}</span>
          </div>
        </CircularProgress>
      </motion.div>

      {/* Incorrect words (if any) */}
      {incorrectWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <Card className="w-full">
            <h3 className="font-semibold text-text-primary mb-3">
              Words to learn ({incorrectWords.length}):
            </h3>
            <div className="flex flex-wrap gap-2">
              {incorrectWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="
                    px-3 py-1.5 rounded-full
                    bg-error/10 text-error
                    text-sm font-medium
                  "
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full space-y-3"
      >
        {incorrectWords.length > 0 ? (
          <Button onClick={onLearnWords} size="lg" fullWidth>
            Continue to Learning
          </Button>
        ) : (
          <Button onClick={onPlayAgain} variant="primary" size="lg" fullWidth>
            Play Again
          </Button>
        )}

        <Button onClick={onGoHome} variant="ghost" size="lg" fullWidth>
          Back to Home
        </Button>
      </motion.div>

      {/* Fun stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-6 text-center text-sm text-text-muted"
      >
        <div>
          <span className="text-2xl">✅</span>
          <p>{correct} correct</p>
        </div>
        <div>
          <span className="text-2xl">{percentage >= 70 ? "🔥" : "📚"}</span>
          <p>{percentage}% accuracy</p>
        </div>
        <div>
          <span className="text-2xl">⭐</span>
          <p>+{correct * 10} points</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ResultsSummary;

