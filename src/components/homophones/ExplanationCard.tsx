"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { HomophoneSet } from "@/data/homophones";

interface ExplanationCardProps {
  homophoneSet: HomophoneSet;
  onContinue: () => void;
}

export function ExplanationCard({ homophoneSet, onContinue }: ExplanationCardProps) {
  const { words } = homophoneSet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-5xl mb-3"
        >
          🎓
        </motion.div>
        <h2 className="text-2xl font-bold text-text-primary font-display">
          Understanding the Difference
        </h2>
        <p className="text-text-secondary mt-2">
          These words sound the same but have different meanings and spellings!
        </p>
      </div>

      {/* Word explanations */}
      <div className="space-y-4">
        {words.map((wordInfo, index) => (
          <motion.div
            key={wordInfo.word}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.15 }}
          >
            <Card className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Word highlight */}
                <div className="sm:w-32 bg-primary/10 p-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary uppercase tracking-wider">
                    {wordInfo.word}
                  </span>
                </div>

                {/* Explanation */}
                <div className="flex-1 p-4 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Meaning
                    </span>
                    <p className="text-text-primary font-medium">
                      {wordInfo.meaning}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Example
                    </span>
                    <p className="text-text-secondary italic">
                      &quot;{wordInfo.example}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                    <span className="text-lg">💡</span>
                    <p className="text-sm text-success font-medium">
                      {wordInfo.tip}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Memory tip summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-4 bg-warning/5 border-l-4 border-warning">
          <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
            <span>🧠</span> Quick Memory Tips
          </h4>
          <ul className="text-sm text-text-secondary space-y-1">
            {words.map((wordInfo) => (
              <li key={wordInfo.word} className="flex items-start gap-2">
                <span className="font-bold text-primary">{wordInfo.word}:</span>
                <span>{wordInfo.tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={onContinue} size="lg" fullWidth>
          Got it! Let&apos;s Practice →
        </Button>
      </motion.div>
    </motion.div>
  );
}

// Compact explanation for quick reference during practice
interface QuickExplanationProps {
  word: string;
  meaning: string;
  tip: string;
}

export function QuickExplanation({ word, meaning, tip }: QuickExplanationProps) {
  return (
    <div className="p-4 bg-bg-secondary rounded-xl">
      <div className="flex items-center gap-3 mb-2">
        <span className="px-3 py-1 bg-primary/10 rounded-lg text-primary font-bold uppercase">
          {word}
        </span>
        <span className="text-text-secondary">{meaning}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span>💡</span>
        <span className="text-success">{tip}</span>
      </div>
    </div>
  );
}

export default ExplanationCard;


