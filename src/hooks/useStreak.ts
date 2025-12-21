"use client";

import { useState, useEffect, useCallback } from "react";
import { getStreak, updateStreak, type Streak } from "@/lib/db";

export function useStreak() {
  const [streak, setStreak] = useState<Streak | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStreak = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getStreak();
      setStreak(data);
    } catch (error) {
      console.error("Failed to load streak:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStreak();
  }, [loadStreak]);

  const recordPractice = useCallback(async () => {
    try {
      const updated = await updateStreak();
      setStreak(updated);
      return updated;
    } catch (error) {
      console.error("Failed to update streak:", error);
      return null;
    }
  }, []);

  const isActiveToday =
    streak?.lastPracticeDate === new Date().toISOString().split("T")[0];

  return {
    streak,
    isLoading,
    isActiveToday,
    currentStreak: streak?.currentStreak || 0,
    longestStreak: streak?.longestStreak || 0,
    recordPractice,
    refresh: loadStreak,
  };
}

export default useStreak;


