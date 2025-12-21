"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface TypeWordProps {
  word: string;
  onComplete: () => void;
  showHint?: boolean;
}

export function TypeWord({ word, onComplete, showHint = true }: TypeWordProps) {
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset when word changes
  useEffect(() => {
    setInput("");
    setIsCorrect(null);
    setAttempts(0);
    inputRef.current?.focus();
  }, [word]);

  const handleSubmit = useCallback(() => {
    const trimmedInput = input.trim().toLowerCase();
    const correct = trimmedInput === word.toLowerCase();

    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);

    if (correct) {
      // Show success then continue
      setTimeout(() => {
        onComplete();
      }, 1000);
    } else {
      // Clear input after showing error
      setTimeout(() => {
        setInput("");
        setIsCorrect(null);
        inputRef.current?.focus();
      }, 1500);
    }
  }, [input, word, onComplete]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.length > 0) {
      handleSubmit();
    }
  };

  // Get hint text (first few letters)
  const hintLength = Math.min(3, Math.floor(word.length / 2));
  const hintText = word.slice(0, hintLength);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-text-secondary mb-2">Type the word:</p>
        <h2 className="text-3xl font-bold text-primary font-display uppercase tracking-wider">
          {word}
        </h2>
      </motion.div>

      {/* Input field styled as letter boxes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={showHint && attempts > 0 ? `${hintText}...` : "Type here..."}
            className={`
              w-full px-6 py-4 text-2xl font-bold text-center
              border-2 rounded-2xl
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              transition-all duration-200
              tracking-widest uppercase
              ${
                isCorrect === true
                  ? "border-success bg-success/10 text-success"
                  : isCorrect === false
                  ? "border-error bg-error/10 text-error"
                  : "border-gray-200 bg-bg-card text-text-primary"
              }
            `}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label={`Type the word ${word}`}
          />

          {/* Character count */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted">
            {input.length}/{word.length}
          </div>
        </div>

        {/* Letter guide */}
        <div className="flex justify-center gap-1 mt-4">
          {word.split("").map((letter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`
                w-8 h-10 flex items-center justify-center
                text-lg font-bold rounded-lg
                ${
                  input[index]?.toLowerCase() === letter.toLowerCase()
                    ? "bg-success/20 text-success border-2 border-success"
                    : input[index]
                    ? "bg-error/20 text-error border-2 border-error"
                    : "bg-bg-secondary text-text-muted border-2 border-transparent"
                }
              `}
            >
              {input[index] || "_"}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Feedback */}
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`
              text-lg font-semibold px-6 py-3 rounded-xl text-center
              ${isCorrect ? "bg-success/10 text-success" : "bg-error/10 text-error"}
            `}
          >
            {isCorrect ? (
              <span className="flex items-center gap-2">
                <span>✓</span> Perfect! You spelled it correctly!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>✗</span> Not quite, try again!
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint after multiple attempts */}
      <AnimatePresence>
        {attempts >= 2 && !isCorrect && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-text-secondary text-center"
          >
            💡 Hint: The word starts with &quot;<strong>{hintText}</strong>&quot; and has{" "}
            <strong>{word.length}</strong> letters.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <Button
        onClick={handleSubmit}
        disabled={input.length === 0 || isCorrect === true}
        size="lg"
        fullWidth
      >
        Check Spelling
      </Button>
    </div>
  );
}

export default TypeWord;


