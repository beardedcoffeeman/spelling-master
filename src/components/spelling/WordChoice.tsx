"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface WordChoiceProps {
  word: string;
  isCorrectSpelling: boolean;
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export function WordChoice({
  word,
  isCorrectSpelling,
  onAnswer,
  disabled = false,
}: WordChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (userSaysCorrect: boolean) => {
    if (disabled || showResult) return;

    setSelectedAnswer(userSaysCorrect);
    setShowResult(true);

    // User is correct if they said "correct" for a correct spelling, or "incorrect" for an incorrect spelling
    const isCorrect = userSaysCorrect === isCorrectSpelling;

    // Delay before calling onAnswer to show feedback
    setTimeout(() => {
      onAnswer(isCorrect);
      // Reset state after parent handles answer
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowResult(false);
      }, 100);
    }, 1200);
  };

  const getButtonVariant = (answer: boolean) => {
    if (!showResult) return "secondary";
    
    // If this is the button they clicked
    if (selectedAnswer === answer) {
      // They were correct
      if (selectedAnswer === isCorrectSpelling) {
        return "success";
      }
      // They were wrong
      return "danger";
    }
    
    return "secondary";
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-text-secondary text-center"
      >
        Is this spelling <span className="text-primary font-bold">correct</span>?
      </motion.h2>

      {/* The word to judge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`
          px-12 py-8 rounded-3xl text-4xl font-bold tracking-wider uppercase
          border-4 transition-all duration-300
          ${
            showResult
              ? isCorrectSpelling
                ? "bg-success/10 border-success text-success"
                : "bg-error/10 border-error text-error"
              : "bg-bg-card border-gray-200 text-text-primary shadow-lg"
          }
        `}
      >
        {word}
      </motion.div>

      {/* Yes/No buttons */}
      <div className="flex gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={() => handleAnswer(true)}
            disabled={disabled || showResult}
            variant={getButtonVariant(true)}
            size="lg"
            className="min-w-[140px]"
          >
            ✓ Correct
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={() => handleAnswer(false)}
            disabled={disabled || showResult}
            variant={getButtonVariant(false)}
            size="lg"
            className="min-w-[140px]"
          >
            ✗ Incorrect
          </Button>
        </motion.div>
      </div>

      {/* Feedback message */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`
              text-lg font-semibold text-center px-6 py-3 rounded-xl
              ${
                selectedAnswer === isCorrectSpelling
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }
            `}
          >
            {selectedAnswer === isCorrectSpelling ? (
              <span className="flex items-center gap-2">
                <span>✓</span> {isCorrectSpelling ? "Yes, that's correct!" : "Right! That was wrong!"}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>✗</span> {isCorrectSpelling ? `Actually, "${word}" is the correct spelling` : `Actually, "${word}" is spelled incorrectly`}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Multiple choice version for retest (keep this as is)
interface MultipleChoiceProps {
  correctWord: string;
  options: string[];
  onAnswer: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export function MultipleChoice({
  correctWord,
  options,
  onAnswer,
  disabled = false,
}: MultipleChoiceProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (word: string) => {
    if (disabled || showResult) return;

    setSelectedWord(word);
    setShowResult(true);

    const isCorrect = word === correctWord;

    setTimeout(() => {
      onAnswer(isCorrect);
      setTimeout(() => {
        setSelectedWord(null);
        setShowResult(false);
      }, 100);
    }, 800);
  };

  const getWordState = (word: string) => {
    if (!showResult) {
      return selectedWord === word ? "selected" : "default";
    }
    if (word === correctWord) {
      return "correct";
    }
    if (word === selectedWord && word !== correctWord) {
      return "incorrect";
    }
    return "default";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-text-secondary text-center"
      >
        Choose the <span className="text-primary font-bold">correct</span> spelling:
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map((word, index) => (
          <motion.button
            key={word}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={!showResult && !disabled ? { scale: 1.05 } : {}}
            whileTap={!showResult && !disabled ? { scale: 0.98 } : {}}
            onClick={() => handleSelect(word)}
            disabled={disabled || showResult}
            className={`
              px-6 py-4 rounded-xl font-bold text-lg
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
              disabled:cursor-not-allowed
              ${
                getWordState(word) === "default"
                  ? "bg-bg-card border-2 border-gray-200 hover:border-primary-light hover:shadow-md text-text-primary"
                  : getWordState(word) === "selected"
                  ? "bg-primary-light/20 border-2 border-primary text-primary-dark"
                  : getWordState(word) === "correct"
                  ? "bg-success/10 border-2 border-success text-success"
                  : "bg-error/10 border-2 border-error text-error"
              }
            `}
          >
            {word}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`
              text-lg font-semibold text-center px-6 py-3 rounded-xl
              ${
                selectedWord === correctWord
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }
            `}
          >
            {selectedWord === correctWord ? (
              <span className="flex items-center justify-center gap-2">
                <span>✓</span> Correct!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>✗</span> The answer is <strong>{correctWord}</strong>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WordChoice;
