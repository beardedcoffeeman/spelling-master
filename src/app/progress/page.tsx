"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MasteryDashboard } from "@/components/progress/MasteryDashboard";
import { WordList } from "@/components/progress/WordList";
import { AchievementGrid } from "@/components/progress/AchievementGrid";
import { StreakDisplay } from "@/components/progress/StreakDisplay";
import {
  getAllWordProgress,
  getStreak,
  getStatistics,
  type WordProgress,
  type MasteryStatus,
  type Streak,
} from "@/lib/db";
import { getAchievementsWithStatus, getTotalStars } from "@/lib/achievements";
import { statutorySpellings } from "@/data/spellings";

type Tab = "overview" | "words" | "achievements";

export default function ProgressPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Data state
  const [wordProgress, setWordProgress] = useState<WordProgress[]>([]);
  const [streak, setStreak] = useState<Streak | null>(null);
  const [stats, setStats] = useState<{
    mastered: number;
    learning: number;
    needsWork: number;
    notTried: number;
  } | null>(null);
  const [achievements, setAchievements] = useState<
    Awaited<ReturnType<typeof getAchievementsWithStatus>>
  >([]);
  const [stars, setStars] = useState(0);

  // Selected category for word list
  const [selectedCategory, setSelectedCategory] = useState<MasteryStatus | null>(
    null
  );

  useEffect(() => {
    async function loadData() {
      try {
        const [progress, streakData, statsData, achievementsData, starsData] =
          await Promise.all([
            getAllWordProgress(),
            getStreak(),
            getStatistics(),
            getAchievementsWithStatus(),
            getTotalStars(),
          ]);

        setWordProgress(progress);
        setStreak(streakData);
        setStats({
          mastered: statsData.mastered,
          learning: statsData.learning,
          needsWork: statsData.needsWork,
          notTried: statsData.notTried,
        });
        setAchievements(achievementsData);
        setStars(starsData);
      } catch (error) {
        console.error("Failed to load progress data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Group words by status
  const getWordsByStatus = (status: MasteryStatus): WordProgress[] => {
    if (status === "not_tried") {
      // Words not in progress yet
      const triedWords = new Set(wordProgress.map((p) => p.word));
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
    return wordProgress.filter((p) => p.masteryStatus === status);
  };

  const handleCategoryClick = (status: string) => {
    setSelectedCategory(status as MasteryStatus);
    setActiveTab("words");
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "words", label: "Words", icon: "📚" },
    { id: "achievements", label: "Badges", icon: "🏆" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-sm"
            >
              ← Back
            </Button>
            <h1 className="text-xl font-bold text-warning font-display">
              Progress Centre
            </h1>
            <div className="flex items-center gap-1 text-sm font-semibold text-warning">
              <span>⭐</span>
              <span>{stars}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== "words") setSelectedCategory(null);
                }}
                className={`
                  flex-1 py-2 px-4 rounded-xl font-medium text-sm
                  transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? "bg-warning text-white shadow-md"
                      : "bg-bg-secondary text-text-secondary hover:bg-gray-200"
                  }
                `}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Overview Tab */}
        {activeTab === "overview" && stats && streak && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Streak */}
            <StreakDisplay
              currentStreak={streak.currentStreak}
              longestStreak={streak.longestStreak}
              lastPracticeDate={streak.lastPracticeDate}
            />

            {/* Mastery Dashboard */}
            <MasteryDashboard
              mastered={stats.mastered}
              learning={stats.learning}
              needsWork={stats.needsWork}
              notTried={stats.notTried}
              total={100}
              onCategoryClick={handleCategoryClick}
            />

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {wordProgress.reduce((sum, p) => sum + p.correctCount, 0)}
                </div>
                <div className="text-xs text-text-muted">Correct Answers</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-success">
                  {achievements.filter((a) => a.unlocked).length}
                </div>
                <div className="text-xs text-text-muted">Badges Earned</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">{stars}</div>
                <div className="text-xs text-text-muted">Total Stars</div>
              </Card>
            </div>

            {/* Quick actions */}
            <Card className="p-4">
              <h3 className="font-semibold text-text-primary mb-3">
                Quick Actions
              </h3>
              <div className="flex gap-3">
                <Button
                  onClick={() => router.push("/challenge")}
                  size="sm"
                  className="flex-1"
                >
                  📚 Practice Spellings
                </Button>
                <Button
                  onClick={() => router.push("/homophones")}
                  variant="success"
                  size="sm"
                  className="flex-1"
                >
                  🎭 Practice Homophones
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Words Tab */}
        {activeTab === "words" && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Category filter */}
            <div className="flex gap-2 flex-wrap">
              {(
                [
                  { status: null, label: "All" },
                  { status: "mastered", label: "⭐ Mastered" },
                  { status: "learning", label: "📈 Learning" },
                  { status: "needs_work", label: "🔴 Needs Work" },
                  { status: "not_tried", label: "❓ Not Tried" },
                ] as const
              ).map(({ status, label }) => (
                <button
                  key={label}
                  onClick={() => setSelectedCategory(status)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-200
                    ${
                      selectedCategory === status
                        ? "bg-primary text-white"
                        : "bg-bg-secondary text-text-secondary hover:bg-gray-200"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Word lists */}
            {selectedCategory ? (
              <WordList
                words={getWordsByStatus(selectedCategory)}
                status={selectedCategory}
                onPracticeAll={() => router.push("/challenge")}
              />
            ) : (
              <div className="space-y-4">
                <WordList
                  words={getWordsByStatus("mastered")}
                  status="mastered"
                />
                <WordList
                  words={getWordsByStatus("learning")}
                  status="learning"
                  onPracticeAll={() => router.push("/challenge")}
                />
                <WordList
                  words={getWordsByStatus("needs_work")}
                  status="needs_work"
                  onPracticeAll={() => router.push("/challenge")}
                />
                <WordList
                  words={getWordsByStatus("not_tried")}
                  status="not_tried"
                  onPracticeAll={() => router.push("/challenge")}
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AchievementGrid achievements={achievements} />
          </motion.div>
        )}
      </main>
    </div>
  );
}


