"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface SentenceCompleteProps {
  sentence: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
  onAnswer: (isCorrect: boolean) => void;
}

export function SentenceComplete({
  sentence,
  options,
  correctAnswer,
  hint,
  onAnswer,
}: SentenceCompleteProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSelect = (option: string) => {
    if (showResult) return;

    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option.toLowerCase() === correctAnswer.toLowerCase();

    setTimeout(() => {
      onAnswer(isCorrect);
      // Reset for next question
      setTimeout(() => {
        setSelectedOption(null);
        setShowResult(false);
        setShowHint(false);
      }, 100);
    }, 1200);
  };

  const getOptionState = (option: string) => {
    if (!showResult) {
      return selectedOption === option ? "selected" : "default";
    }
    if (option.toLowerCase() === correctAnswer.toLowerCase()) {
      return "correct";
    }
    if (option === selectedOption && option.toLowerCase() !== correctAnswer.toLowerCase()) {
      return "incorrect";
    }
    return "default";
  };

  const stateStyles = {
    default:
      "bg-bg-card border-2 border-gray-200 hover:border-primary-light hover:shadow-md text-text-primary",
    selected: "bg-primary-light/20 border-2 border-primary text-primary-dark",
    correct: "bg-success/10 border-2 border-success text-success",
    incorrect: "bg-error/10 border-2 border-error text-error",
  };

  // Parse sentence to show blank
  const parts = sentence.split("_____");

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Sentence with blank */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xl text-text-primary leading-relaxed">
          {parts[0]}
          <span className="inline-block min-w-[100px] mx-2 px-4 py-1 bg-primary/10 border-b-2 border-primary rounded text-primary font-bold">
            {showResult ? correctAnswer : "?????"}
          </span>
          {parts[1]}
        </p>
      </motion.div>

      {/* Hint toggle */}
      {hint && !showHint && !showResult && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowHint(true)}
          className="text-text-muted"
        >
          💡 Need a hint?
        </Button>
      )}

      {/* Hint display */}
      <AnimatePresence>
        {showHint && !showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 py-2 bg-warning/10 rounded-xl text-sm text-warning-light"
          >
            💡 <strong>Hint:</strong> {hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Options */}
      <div className="flex flex-wrap justify-center gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!showResult ? { scale: 1.05 } : {}}
            whileTap={!showResult ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(option)}
            disabled={showResult}
            className={`
              px-6 py-3 rounded-xl font-bold text-lg
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
              disabled:cursor-not-allowed
              ${stateStyles[getOptionState(option)]}
            `}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`
              text-lg font-semibold px-6 py-3 rounded-xl text-center
              ${
                selectedOption?.toLowerCase() === correctAnswer.toLowerCase()
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }
            `}
          >
            {selectedOption?.toLowerCase() === correctAnswer.toLowerCase() ? (
              <span className="flex items-center justify-center gap-2">
                <span>✓</span> Correct! Well done!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>✗</span> The answer is <strong>{correctAnswer}</strong>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SentenceComplete;


