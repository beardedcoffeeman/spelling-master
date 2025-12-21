import Dexie, { type EntityTable } from "dexie";

// Types for database tables
export type MasteryStatus = "mastered" | "learning" | "needs_work" | "not_tried";

export interface WordProgress {
  id?: number;
  word: string;
  category: "statutory" | "homophone";
  correctCount: number;
  incorrectCount: number;
  lastAttemptAt: string | null;
  masteryStatus: MasteryStatus;
}

export interface HomophoneProgress {
  id?: number;
  homophoneSetId: string;
  correctCount: number;
  incorrectCount: number;
  lastAttemptAt: string | null;
}

export interface Session {
  id?: number;
  startedAt: string;
  completedAt: string | null;
  wordsAttempted: number;
  wordsCorrect: number;
  type: "spelling" | "homophone";
}

export interface Achievement {
  id?: number;
  achievementId: string;
  unlockedAt: string;
}

export interface Streak {
  id?: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
}

export interface UserSettings {
  id?: number;
  soundEnabled: boolean;
  dyslexiaMode: boolean;
  createdAt: string;
  lastActiveAt: string;
}

// Database class
class SpellingMasterDB extends Dexie {
  wordProgress!: EntityTable<WordProgress, "id">;
  homophoneProgress!: EntityTable<HomophoneProgress, "id">;
  sessions!: EntityTable<Session, "id">;
  achievements!: EntityTable<Achievement, "id">;
  streaks!: EntityTable<Streak, "id">;
  userSettings!: EntityTable<UserSettings, "id">;

  constructor() {
    super("SpellingMasterDB");

    this.version(1).stores({
      wordProgress: "++id, word, category, masteryStatus, lastAttemptAt",
      homophoneProgress: "++id, homophoneSetId, lastAttemptAt",
      sessions: "++id, startedAt, completedAt, type",
      achievements: "++id, achievementId, unlockedAt",
      streaks: "++id, lastPracticeDate",
      userSettings: "++id",
    });
  }
}

// Create database instance
export const db = new SpellingMasterDB();

// Calculate mastery status based on attempts
export function calculateMasteryStatus(
  correctCount: number,
  incorrectCount: number
): MasteryStatus {
  const totalAttempts = correctCount + incorrectCount;

  if (totalAttempts === 0) return "not_tried";

  const correctPercentage = (correctCount / totalAttempts) * 100;

  // Need at least 5 attempts and 90%+ correct for mastery
  if (totalAttempts >= 5 && correctPercentage >= 90) return "mastered";

  // Less than 50% correct = needs work
  if (correctPercentage < 50) return "needs_work";

  // Everything else is "learning"
  return "learning";
}

// Word Progress Functions
export async function getWordProgress(word: string): Promise<WordProgress | undefined> {
  return db.wordProgress.where("word").equals(word).first();
}

export async function getAllWordProgress(): Promise<WordProgress[]> {
  return db.wordProgress.toArray();
}

export async function getWordsByStatus(status: MasteryStatus): Promise<WordProgress[]> {
  return db.wordProgress.where("masteryStatus").equals(status).toArray();
}

export async function recordWordAttempt(
  word: string,
  correct: boolean,
  category: "statutory" | "homophone" = "statutory"
): Promise<void> {
  const existing = await getWordProgress(word);
  const now = new Date().toISOString();

  if (existing) {
    const newCorrect = existing.correctCount + (correct ? 1 : 0);
    const newIncorrect = existing.incorrectCount + (correct ? 0 : 1);
    const newStatus = calculateMasteryStatus(newCorrect, newIncorrect);

    await db.wordProgress.update(existing.id!, {
      correctCount: newCorrect,
      incorrectCount: newIncorrect,
      lastAttemptAt: now,
      masteryStatus: newStatus,
    });
  } else {
    const correctCount = correct ? 1 : 0;
    const incorrectCount = correct ? 0 : 1;

    await db.wordProgress.add({
      word,
      category,
      correctCount,
      incorrectCount,
      lastAttemptAt: now,
      masteryStatus: calculateMasteryStatus(correctCount, incorrectCount),
    });
  }

  // Update streak
  await updateStreak();
}

// Homophone Progress Functions
export async function getHomophoneProgress(
  setId: string
): Promise<HomophoneProgress | undefined> {
  return db.homophoneProgress.where("homophoneSetId").equals(setId).first();
}

export async function recordHomophoneAttempt(
  setId: string,
  correct: boolean
): Promise<void> {
  const existing = await getHomophoneProgress(setId);
  const now = new Date().toISOString();

  if (existing) {
    await db.homophoneProgress.update(existing.id!, {
      correctCount: existing.correctCount + (correct ? 1 : 0),
      incorrectCount: existing.incorrectCount + (correct ? 0 : 1),
      lastAttemptAt: now,
    });
  } else {
    await db.homophoneProgress.add({
      homophoneSetId: setId,
      correctCount: correct ? 1 : 0,
      incorrectCount: correct ? 0 : 1,
      lastAttemptAt: now,
    });
  }

  await updateStreak();
}

// Session Functions
export async function startSession(type: "spelling" | "homophone"): Promise<number> {
  const id = await db.sessions.add({
    startedAt: new Date().toISOString(),
    completedAt: null,
    wordsAttempted: 0,
    wordsCorrect: 0,
    type,
  });
  return id as number;
}

export async function updateSession(
  sessionId: number,
  wordsAttempted: number,
  wordsCorrect: number
): Promise<void> {
  await db.sessions.update(sessionId, {
    wordsAttempted,
    wordsCorrect,
  });
}

export async function completeSession(sessionId: number): Promise<void> {
  await db.sessions.update(sessionId, {
    completedAt: new Date().toISOString(),
  });
}

export async function getRecentSessions(limit: number = 10): Promise<Session[]> {
  return db.sessions.orderBy("startedAt").reverse().limit(limit).toArray();
}

// Streak Functions
export async function getStreak(): Promise<Streak> {
  const existing = await db.streaks.toCollection().first();
  if (existing) return existing;

  // Create default streak
  const id = await db.streaks.add({
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
  });

  return {
    id: id as number,
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
  };
}

export async function updateStreak(): Promise<Streak> {
  const streak = await getStreak();
  const today = new Date().toISOString().split("T")[0];

  if (streak.lastPracticeDate === today) {
    // Already practiced today, no change needed
    return streak;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  let newStreak = streak.currentStreak;

  if (streak.lastPracticeDate === yesterday) {
    // Continuing streak
    newStreak = streak.currentStreak + 1;
  } else if (streak.lastPracticeDate !== today) {
    // Streak broken or first time
    newStreak = 1;
  }

  const newLongest = Math.max(streak.longestStreak, newStreak);

  await db.streaks.update(streak.id!, {
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastPracticeDate: today,
  });

  return {
    ...streak,
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastPracticeDate: today,
  };
}

// Achievement Functions
export async function getUnlockedAchievements(): Promise<Achievement[]> {
  return db.achievements.toArray();
}

export async function isAchievementUnlocked(achievementId: string): Promise<boolean> {
  const achievement = await db.achievements
    .where("achievementId")
    .equals(achievementId)
    .first();
  return !!achievement;
}

export async function unlockAchievement(achievementId: string): Promise<boolean> {
  const alreadyUnlocked = await isAchievementUnlocked(achievementId);
  if (alreadyUnlocked) return false;

  await db.achievements.add({
    achievementId,
    unlockedAt: new Date().toISOString(),
  });

  return true;
}

// User Settings Functions
export async function getUserSettings(): Promise<UserSettings> {
  const existing = await db.userSettings.toCollection().first();
  if (existing) return existing;

  // Create default settings
  const now = new Date().toISOString();
  const id = await db.userSettings.add({
    soundEnabled: false, // Off by default
    dyslexiaMode: false,
    createdAt: now,
    lastActiveAt: now,
  });

  return {
    id: id as number,
    soundEnabled: false,
    dyslexiaMode: false,
    createdAt: now,
    lastActiveAt: now,
  };
}

export async function updateUserSettings(
  settings: Partial<Pick<UserSettings, "soundEnabled" | "dyslexiaMode">>
): Promise<void> {
  const current = await getUserSettings();
  await db.userSettings.update(current.id!, {
    ...settings,
    lastActiveAt: new Date().toISOString(),
  });
}

// Statistics Functions
export async function getStatistics() {
  const allProgress = await getAllWordProgress();
  const streak = await getStreak();
  const sessions = await getRecentSessions(100);

  const mastered = allProgress.filter((p) => p.masteryStatus === "mastered").length;
  const learning = allProgress.filter((p) => p.masteryStatus === "learning").length;
  const needsWork = allProgress.filter((p) => p.masteryStatus === "needs_work").length;
  const notTried = 100 - allProgress.length; // 100 statutory words

  const totalAttempts = allProgress.reduce(
    (sum, p) => sum + p.correctCount + p.incorrectCount,
    0
  );
  const totalCorrect = allProgress.reduce((sum, p) => sum + p.correctCount, 0);

  return {
    mastered,
    learning,
    needsWork,
    notTried,
    totalAttempts,
    totalCorrect,
    accuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    totalSessions: sessions.length,
  };
}

// Clear all data (for testing or reset)
export async function clearAllData(): Promise<void> {
  await db.wordProgress.clear();
  await db.homophoneProgress.clear();
  await db.sessions.clear();
  await db.achievements.clear();
  await db.streaks.clear();
  await db.userSettings.clear();
}


