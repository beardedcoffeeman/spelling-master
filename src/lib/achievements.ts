import {
  getStatistics,
  getUnlockedAchievements,
  unlockAchievement,
  getStreak,
  getRecentSessions,
} from "./db";

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "words" | "streak" | "special";
  requirement: number;
}

export const achievements: AchievementDefinition[] = [
  // Word mastery achievements
  {
    id: "first_word",
    name: "First Steps",
    description: "Master your first word",
    icon: "🌟",
    category: "words",
    requirement: 1,
  },
  {
    id: "ten_words",
    name: "Getting Started",
    description: "Master 10 words",
    icon: "🥉",
    category: "words",
    requirement: 10,
  },
  {
    id: "twenty_five_words",
    name: "Quarter Way",
    description: "Master 25 words",
    icon: "📚",
    category: "words",
    requirement: 25,
  },
  {
    id: "fifty_words",
    name: "Halfway Hero",
    description: "Master 50 words",
    icon: "🥈",
    category: "words",
    requirement: 50,
  },
  {
    id: "seventy_five_words",
    name: "Almost There",
    description: "Master 75 words",
    icon: "🏆",
    category: "words",
    requirement: 75,
  },
  {
    id: "hundred_words",
    name: "Spelling Master",
    description: "Master all 100 words!",
    icon: "🥇",
    category: "words",
    requirement: 100,
  },

  // Streak achievements
  {
    id: "streak_3",
    name: "On a Roll",
    description: "Practice 3 days in a row",
    icon: "🔥",
    category: "streak",
    requirement: 3,
  },
  {
    id: "streak_7",
    name: "Week Warrior",
    description: "Practice 7 days in a row",
    icon: "📅",
    category: "streak",
    requirement: 7,
  },
  {
    id: "streak_14",
    name: "Fortnight Fighter",
    description: "Practice 14 days in a row",
    icon: "💪",
    category: "streak",
    requirement: 14,
  },
  {
    id: "streak_30",
    name: "Monthly Marvel",
    description: "Practice 30 days in a row",
    icon: "🌙",
    category: "streak",
    requirement: 30,
  },

  // Special achievements
  {
    id: "perfect_round",
    name: "Perfect Round",
    description: "Get all words correct in one challenge",
    icon: "🎯",
    category: "special",
    requirement: 1,
  },
  {
    id: "quick_learner",
    name: "Quick Learner",
    description: "Complete 5 challenges",
    icon: "⚡",
    category: "special",
    requirement: 5,
  },
  {
    id: "dedicated",
    name: "Dedicated Student",
    description: "Complete 20 challenges",
    icon: "📖",
    category: "special",
    requirement: 20,
  },
  {
    id: "homophone_hero",
    name: "Homophone Hero",
    description: "Get 20 homophone questions correct",
    icon: "🎭",
    category: "special",
    requirement: 20,
  },
];

// Get achievement definition by ID
export function getAchievementById(id: string): AchievementDefinition | undefined {
  return achievements.find((a) => a.id === id);
}

// Check and unlock any newly earned achievements
export async function checkAndUnlockAchievements(): Promise<AchievementDefinition[]> {
  const newlyUnlocked: AchievementDefinition[] = [];
  const stats = await getStatistics();
  const streak = await getStreak();
  const sessions = await getRecentSessions(100);

  // Check word mastery achievements
  const wordAchievements = achievements.filter((a) => a.category === "words");
  for (const achievement of wordAchievements) {
    if (stats.mastered >= achievement.requirement) {
      const wasNew = await unlockAchievement(achievement.id);
      if (wasNew) newlyUnlocked.push(achievement);
    }
  }

  // Check streak achievements
  const maxStreak = Math.max(streak.currentStreak, streak.longestStreak);
  const streakAchievements = achievements.filter((a) => a.category === "streak");
  for (const achievement of streakAchievements) {
    if (maxStreak >= achievement.requirement) {
      const wasNew = await unlockAchievement(achievement.id);
      if (wasNew) newlyUnlocked.push(achievement);
    }
  }

  // Check session-based achievements
  const completedSessions = sessions.filter((s) => s.completedAt !== null);
  
  // Quick learner (5 challenges)
  if (completedSessions.length >= 5) {
    const wasNew = await unlockAchievement("quick_learner");
    if (wasNew) {
      const achievement = getAchievementById("quick_learner");
      if (achievement) newlyUnlocked.push(achievement);
    }
  }

  // Dedicated (20 challenges)
  if (completedSessions.length >= 20) {
    const wasNew = await unlockAchievement("dedicated");
    if (wasNew) {
      const achievement = getAchievementById("dedicated");
      if (achievement) newlyUnlocked.push(achievement);
    }
  }

  return newlyUnlocked;
}

// Check if a perfect round was achieved
export async function checkPerfectRound(
  wordsAttempted: number,
  wordsCorrect: number
): Promise<boolean> {
  if (wordsAttempted > 0 && wordsAttempted === wordsCorrect) {
    const wasNew = await unlockAchievement("perfect_round");
    return wasNew;
  }
  return false;
}

// Get all achievements with their unlock status
export async function getAchievementsWithStatus(): Promise<
  (AchievementDefinition & { unlocked: boolean; unlockedAt?: string })[]
> {
  const unlocked = await getUnlockedAchievements();
  const unlockedMap = new Map(unlocked.map((a) => [a.achievementId, a.unlockedAt]));

  return achievements.map((achievement) => ({
    ...achievement,
    unlocked: unlockedMap.has(achievement.id),
    unlockedAt: unlockedMap.get(achievement.id),
  }));
}

// Get count of unlocked achievements
export async function getUnlockedCount(): Promise<{
  unlocked: number;
  total: number;
}> {
  const unlockedAchievements = await getUnlockedAchievements();
  return {
    unlocked: unlockedAchievements.length,
    total: achievements.length,
  };
}

// Calculate total stars (points from achievements)
export async function getTotalStars(): Promise<number> {
  const unlocked = await getUnlockedAchievements();
  let stars = 0;

  for (const achievement of unlocked) {
    const def = getAchievementById(achievement.achievementId);
    if (def) {
      // Award stars based on achievement difficulty
      switch (def.category) {
        case "words":
          stars += def.requirement * 2;
          break;
        case "streak":
          stars += def.requirement * 5;
          break;
        case "special":
          stars += 50;
          break;
      }
    }
  }

  return stars;
}


