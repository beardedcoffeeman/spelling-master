"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAllWordProgress,
  getWordProgress,
  getWordsByStatus,
  recordWordAttempt,
  type WordProgress,
  type MasteryStatus,
} from "@/lib/db";
import { statutorySpellings } from "@/data/spellings";
import { checkAndUnlockAchievements } from "@/lib/achievements";

export function useWordProgress() {
  const [progress, setProgress] = useState<WordProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load initial progress
  const loadProgress = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAllWordProgress();
      setProgress(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load progress"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Record an attempt and update local state
  const recordAttempt = useCallback(
    async (word: string, correct: boolean) => {
      try {
        await recordWordAttempt(word, correct);
        
        // Refresh local state
        const updated = await getWordProgress(word);
        if (updated) {
          setProgress((prev) => {
            const existing = prev.findIndex((p) => p.word === word);
            if (existing >= 0) {
              const newProgress = [...prev];
              newProgress[existing] = updated;
              return newProgress;
            }
            return [...prev, updated];
          });
        }

        // Check for new achievements
        await checkAndUnlockAchievements();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to record attempt"));
      }
    },
    []
  );

  // Get words by mastery status
  const getByStatus = useCallback(
    (status: MasteryStatus): WordProgress[] => {
      if (status === "not_tried") {
        const triedWords = new Set(progress.map((p) => p.word));
        return statutorySpellings
          .filter((word) => !triedWords.has(word))
          .map((word) => ({
            word,
            category: "statutory" as const,
            correctCount: 0,
            incorrectCount: 0,
            lastAttemptAt: null,
            masteryStatus: "not_tried" as MasteryStatus,
          }));
      }
      return progress.filter((p) => p.masteryStatus === status);
    },
    [progress]
  );

  // Get random words with weighting (words needing work appear more often)
  const getWeightedRandomWords = useCallback(
    (count: number, excludeMastered = false): string[] => {
      let availableWords = [...statutorySpellings];

      if (excludeMastered) {
        const masteredWords = new Set(
          progress.filter((p) => p.masteryStatus === "mastered").map((p) => p.word)
        );
        availableWords = availableWords.filter((w) => !masteredWords.has(w));
      }

      // Weight words that need work higher
      const needsWorkWords = new Set(
        progress.filter((p) => p.masteryStatus === "needs_work").map((p) => p.word)
      );

      // Create weighted array (needs_work words appear 3x)
      const weighted: string[] = [];
      availableWords.forEach((word) => {
        weighted.push(word);
        if (needsWorkWords.has(word)) {
          weighted.push(word, word); // Add 2 more times
        }
      });

      // Shuffle and dedupe
      const shuffled = weighted.sort(() => Math.random() - 0.5);
      const selected: string[] = [];
      const seen = new Set<string>();

      for (const word of shuffled) {
        if (!seen.has(word)) {
          selected.push(word);
          seen.add(word);
          if (selected.length >= count) break;
        }
      }

      return selected;
    },
    [progress]
  );

  // Calculate stats
  const stats = {
    mastered: getByStatus("mastered").length,
    learning: getByStatus("learning").length,
    needsWork: getByStatus("needs_work").length,
    notTried: getByStatus("not_tried").length,
    total: statutorySpellings.length,
  };

  return {
    progress,
    isLoading,
    error,
    recordAttempt,
    getByStatus,
    getWeightedRandomWords,
    stats,
    refresh: loadProgress,
  };
}

export default useWordProgress;


