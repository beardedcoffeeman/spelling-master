"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import type { AchievementDefinition } from "@/lib/achievements";

interface AchievementWithStatus extends AchievementDefinition {
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementGridProps {
  achievements: AchievementWithStatus[];
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  // Group by category
  const wordAchievements = achievements.filter((a) => a.category === "words");
  const streakAchievements = achievements.filter((a) => a.category === "streak");
  const specialAchievements = achievements.filter((a) => a.category === "special");

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary font-display">
              Achievements
            </h2>
            <p className="text-text-muted">
              {unlockedCount} of {achievements.length} unlocked
            </p>
          </div>
          <div className="text-5xl">🏆</div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-3 bg-bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(unlockedCount / achievements.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-warning to-amber-400 rounded-full"
            />
          </div>
        </div>
      </Card>

      {/* Word Mastery Achievements */}
      <AchievementCategory
        title="Word Mastery"
        icon="📚"
        achievements={wordAchievements}
      />

      {/* Streak Achievements */}
      <AchievementCategory
        title="Streaks"
        icon="🔥"
        achievements={streakAchievements}
      />

      {/* Special Achievements */}
      <AchievementCategory
        title="Special"
        icon="✨"
        achievements={specialAchievements}
      />
    </div>
  );
}

interface AchievementCategoryProps {
  title: string;
  icon: string;
  achievements: AchievementWithStatus[];
}

function AchievementCategory({
  title,
  icon,
  achievements,
}: AchievementCategoryProps) {
  if (achievements.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <AchievementBadge achievement={achievement} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface AchievementBadgeProps {
  achievement: AchievementWithStatus;
}

function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const { unlocked, icon, name, description, unlockedAt } = achievement;

  return (
    <Card
      className={`
        p-4 text-center transition-all
        ${
          unlocked
            ? "bg-gradient-to-br from-warning/10 to-amber-50 border-warning/30"
            : "bg-bg-secondary/50 opacity-60 grayscale"
        }
      `}
    >
      <motion.div
        className="text-4xl mb-2"
        animate={unlocked ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {unlocked ? icon : "🔒"}
      </motion.div>
      <h4
        className={`
          font-semibold text-sm
          ${unlocked ? "text-text-primary" : "text-text-muted"}
        `}
      >
        {name}
      </h4>
      <p className="text-xs text-text-muted mt-1">{description}</p>
      {unlocked && unlockedAt && (
        <p className="text-xs text-success mt-2">
          Unlocked {new Date(unlockedAt).toLocaleDateString()}
        </p>
      )}
    </Card>
  );
}

export default AchievementGrid;


