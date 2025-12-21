"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CircularProgress } from "@/components/ui/ProgressBar";
import { getStatistics, getStreak, type Streak } from "@/lib/db";
import { getTotalStars } from "@/lib/achievements";
import { getCaughtPokemonCount } from "@/lib/pokemonRewards";

interface Statistics {
  mastered: number;
  learning: number;
  needsWork: number;
  notTried: number;
  currentStreak: number;
  longestStreak: number;
  accuracy: number;
}

export default function HomePage() {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [streak, setStreak] = useState<Streak | null>(null);
  const [stars, setStars] = useState(0);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, streakData, starsData, pokemonCountData] = await Promise.all([
          getStatistics(),
          getStreak(),
          getTotalStars(),
          getCaughtPokemonCount(),
        ]);
        setStats(statsData);
        setStreak(streakData);
        setStars(starsData);
        setPokemonCount(pokemonCountData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const totalWords = 100;
  const masteredPercentage = stats ? (stats.mastered / totalWords) * 100 : 0;

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold font-display mb-3"
            >
              Spelling Master
            </motion.h1>
            <p className="text-xl text-white/80">
              Master Year 6 spellings with fun challenges!
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold">
                {isLoading ? "..." : streak?.currentStreak || 0}
              </div>
              <div className="text-sm text-white/70">🔥 Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {isLoading ? "..." : stats?.mastered || 0}
              </div>
              <div className="text-sm text-white/70">⭐ Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {isLoading ? "..." : stars}
              </div>
              <div className="text-sm text-white/70">🏆 Stars</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {isLoading ? "..." : pokemonCount}
              </div>
              <div className="text-sm text-white/70">📖 Pokémon</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Progress Overview */}
        {!isLoading && stats && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <CircularProgress
                  percentage={masteredPercentage}
                  size={120}
                  strokeWidth={10}
                  variant={masteredPercentage >= 50 ? "success" : "default"}
                >
                  <div className="text-center">
                    <span className="text-2xl font-bold text-text-primary">
                      {stats.mastered}
                    </span>
                    <span className="text-sm text-text-muted block">of 100</span>
                  </div>
                </CircularProgress>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold text-text-primary mb-2">
                    Your Progress
                  </h2>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-text-secondary">
                        {stats.mastered} mastered
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-text-secondary">
                        {stats.learning} learning
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-text-secondary">
                        {stats.needsWork} need work
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-gray-300" />
                      <span className="text-text-secondary">
                        {stats.notTried} not tried
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>
        )}

        {/* Main Navigation Cards */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Spelling Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/challenge" className="block h-full">
              <Card
                variant="interactive"
                className="h-full flex flex-col items-center text-center p-8 hover:border-primary"
              >
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-text-primary font-display mb-2">
                  Spelling Challenge
                </h3>
                <p className="text-text-secondary text-sm mb-4 flex-1">
                  Test your knowledge of the 100 statutory Year 6 spellings.
                  Learn from mistakes with memory tricks!
                </p>
                <Button size="lg" fullWidth>
                  Start Challenge
                </Button>
              </Card>
            </Link>
          </motion.div>

          {/* Homophones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/homophones" className="block h-full">
              <Card
                variant="interactive"
                className="h-full flex flex-col items-center text-center p-8 hover:border-success"
              >
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-xl font-bold text-text-primary font-display mb-2">
                  Homophones
                </h3>
                <p className="text-text-secondary text-sm mb-4 flex-1">
                  Master tricky word pairs like their/there/they&apos;re,
                  affect/effect, and more!
                </p>
                <Button variant="success" size="lg" fullWidth>
                  Practice Now
                </Button>
              </Card>
            </Link>
          </motion.div>

          {/* Progress Centre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/progress" className="block h-full">
              <Card
                variant="interactive"
                className="h-full flex flex-col items-center text-center p-8 hover:border-warning"
              >
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-text-primary font-display mb-2">
                  Progress Centre
                </h3>
                <p className="text-text-secondary text-sm mb-4 flex-1">
                  Track your progress, view achievements, and see which words
                  need more practice.
                </p>
                <Button variant="secondary" size="lg" fullWidth>
                  View Progress
                </Button>
              </Card>
            </Link>
          </motion.div>

          {/* Pokédex */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link href="/pokedex" className="block h-full">
              <Card
                variant="interactive"
                className="h-full flex flex-col items-center text-center p-8 hover:border-error bg-gradient-to-br from-red-50 to-blue-50"
              >
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-bold text-text-primary font-display mb-2">
                  Pokédex
                </h3>
                <p className="text-text-secondary text-sm mb-4 flex-1">
                  Catch Pokémon by mastering words! View your collection and track your catches.
                </p>
                <Button className="bg-red-500 hover:bg-red-600 text-white" size="lg" fullWidth>
                  Open Pokédex
                </Button>
              </Card>
            </Link>
          </motion.div>
        </section>

        {/* Tips Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-bold text-text-primary mb-4 font-display">
            💡 Spelling Tips
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold text-text-primary mb-2">
                Use Memory Tricks
              </h4>
              <p className="text-text-secondary text-sm">
                &quot;A shirt has 1 Collar and 2 Sleeves&quot; helps remember
                necess<strong>a</strong>ry has 1 C and 2 Ss!
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold text-text-primary mb-2">
                Look for Patterns
              </h4>
              <p className="text-text-secondary text-sm">
                Words ending in -tion (like competition) always use T, while
                -sion words use S.
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold text-text-primary mb-2">
                Practice Daily
              </h4>
              <p className="text-text-secondary text-sm">
                Even 5 minutes a day builds strong spelling habits. Keep your
                streak going!
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold text-text-primary mb-2">
                Say It Out Loud
              </h4>
              <p className="text-text-secondary text-sm">
                Speaking words while spelling them helps your brain remember
                the letter patterns.
              </p>
            </Card>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-text-muted text-sm">
        <p>Spelling Master - Helping Year 6 students master their spellings! 📚</p>
      </footer>
    </div>
  );
}
