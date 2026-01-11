"use client";

import { motion } from "framer-motion";
import { getMnemonic } from "@/data/mnemonics";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface MnemonicCardProps {
  word: string;
  onContinue: () => void;
  yearLevel?: "year2" | "year6";
}

// Visual emojis for different mnemonic visuals
const visualEmojis: Record<string, string> = {
  hotel: "🏨",
  shirt: "👔",
  angry_face: "😠",
  gravestones: "🪦",
  brain: "🧠",
  checkmark: "✅",
  red_face: "😳",
  lightning: "⚡",
  horse: "🐴",
  dancing: "💃",
  legs: "🦵",
  queue: "👥",
  restaurant: "🍽️",
  thermometer: "🌡️",
  soldier: "💂",
  vegetables: "🥕",
  yacht: "⛵",
  island: "🏝️",
  family: "👨‍👩‍👧‍👦",
  bruise: "🩹",
  door: "🚪",
  number_40: "4️⃣0️⃣",
  muscle_arm: "💪",
  awkward_person: "🫣",
};

export function MnemonicCard({ word, onContinue, yearLevel = "year6" }: MnemonicCardProps) {
  const mnemonic = getMnemonic(word, yearLevel);

  if (!mnemonic) {
    // Fallback if no mnemonic found
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
        <Card className="w-full text-center">
          <h2 className="text-2xl font-bold text-primary mb-4 font-display uppercase tracking-wider">
            {word}
          </h2>
          <p className="text-text-secondary mb-4">
            Practice spelling this word by typing it out a few times to help
            remember it.
          </p>
        </Card>
        <Button onClick={onContinue} size="lg">
          Got it! Next →
        </Button>
      </div>
    );
  }

  const visual = mnemonic.visual ? visualEmojis[mnemonic.visual] : "💡";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-5xl mb-3"
        >
          🧠
        </motion.div>
        <p className="text-text-secondary">Memory Trick for:</p>
        <h2 className="text-3xl font-bold text-primary font-display uppercase tracking-wider">
          {word}
        </h2>
      </div>

      {/* Mnemonic card */}
      <Card className="w-full">
        <div className="space-y-4">
          {/* Main tricks */}
          {mnemonic.tricks.map((trick, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="flex items-start gap-3 p-4 bg-bg-secondary rounded-xl"
            >
              <span className="text-2xl flex-shrink-0">{visual}</span>
              <p className="text-lg text-text-primary font-medium leading-relaxed">
                &quot;{trick}&quot;
              </p>
            </motion.div>
          ))}

          {/* Tip */}
          {mnemonic.tip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl border-l-4 border-primary"
            >
              <span className="text-xl">💡</span>
              <p className="text-primary font-semibold">{mnemonic.tip}</p>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Word breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center gap-1"
      >
        {word.split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            className="
              w-10 h-12 flex items-center justify-center
              text-xl font-bold text-primary
              bg-primary/10 rounded-lg border-2 border-primary/30
              uppercase
            "
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full"
      >
        <Button onClick={onContinue} size="lg" fullWidth>
          Got it! Next word →
        </Button>
      </motion.div>
    </motion.div>
  );
}

// Compact version for quick reference
interface MnemonicTipProps {
  word: string;
}

export function MnemonicTip({ word }: MnemonicTipProps) {
  const mnemonic = getMnemonic(word);

  if (!mnemonic) return null;

  return (
    <div className="p-3 bg-warning/10 rounded-xl text-sm">
      <span className="font-semibold text-warning">💡 Tip: </span>
      <span className="text-text-secondary">
        {mnemonic.tip || mnemonic.tricks[0]}
      </span>
    </div>
  );
}

export default MnemonicCard;


