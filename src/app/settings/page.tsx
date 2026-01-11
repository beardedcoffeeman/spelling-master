"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getUserSettings, updateUserSettings, clearAllData } from "@/lib/db";
import type { UserSettings } from "@/lib/db";

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const currentSettings = await getUserSettings();
        setSettings(currentSettings);
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleYearLevelChange = async (yearLevel: "year2" | "year6") => {
    if (!settings) return;

    setIsSaving(true);
    try {
      await updateUserSettings({ yearLevel });
      setSettings({ ...settings, yearLevel });
      setSaveMessage("Year level updated!");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch (error) {
      console.error("Failed to update year level:", error);
      setSaveMessage("Error updating settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSoundToggle = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const newValue = !settings.soundEnabled;
      await updateUserSettings({ soundEnabled: newValue });
      setSettings({ ...settings, soundEnabled: newValue });
      setSaveMessage("Sound setting updated!");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch (error) {
      console.error("Failed to update sound:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDyslexiaModeToggle = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const newValue = !settings.dyslexiaMode;
      await updateUserSettings({ dyslexiaMode: newValue });
      setSettings({ ...settings, dyslexiaMode: newValue });
      setSaveMessage("Dyslexia mode updated!");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch (error) {
      console.error("Failed to update dyslexia mode:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearData = async () => {
    try {
      await clearAllData();
      setSaveMessage("All data cleared!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Failed to clear data:", error);
      setSaveMessage("Error clearing data");
    }
    setShowClearConfirm(false);
  };

  if (isLoading || !settings) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-muted">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-white hover:bg-white/10"
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-bold font-display">Settings</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Save message */}
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-success/10 border border-success text-success px-4 py-3 rounded-lg text-center"
          >
            {saveMessage}
          </motion.div>
        )}

        {/* Year Level Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-2 font-display">
            Year Level
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            Choose which spelling list you want to practice
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleYearLevelChange("year2")}
              disabled={isSaving}
              className={`p-6 rounded-lg border-2 transition-all ${
                settings.yearLevel === "year2"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🧚</div>
                <div className="font-bold text-text-primary">Year 2</div>
                <div className="text-sm text-text-muted mt-1">
                  200 words • Fairy rewards
                </div>
              </div>
            </button>

            <button
              onClick={() => handleYearLevelChange("year6")}
              disabled={isSaving}
              className={`p-6 rounded-lg border-2 transition-all ${
                settings.yearLevel === "year6"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-2">📖</div>
                <div className="font-bold text-text-primary">Year 6</div>
                <div className="text-sm text-text-muted mt-1">
                  100 words • Pokémon rewards
                </div>
              </div>
            </button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> You can practice both year levels! Switch
              between them anytime. Your progress is saved separately for each year.
            </p>
          </div>
        </Card>

        {/* Sound Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-2 font-display">
            Sound Effects
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            Enable or disable sound effects in the app
          </p>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-text-primary">Sound Effects</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={handleSoundToggle}
                disabled={isSaving}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </Card>

        {/* Dyslexia Mode */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-text-primary mb-2 font-display">
            Dyslexia-Friendly Mode
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            Uses OpenDyslexic font and increased letter spacing
          </p>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-text-primary">Dyslexia Mode</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.dyslexiaMode}
                onChange={handleDyslexiaModeToggle}
                disabled={isSaving}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
            </div>
          </label>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-error">
          <h2 className="text-xl font-bold text-error mb-2 font-display">
            Danger Zone
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            Clear all your progress and start fresh
          </p>

          {!showClearConfirm ? (
            <Button
              variant="ghost"
              onClick={() => setShowClearConfirm(true)}
              className="text-error hover:bg-error/10"
            >
              Clear All Data
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-error/10 border border-error rounded-lg">
                <p className="text-sm text-error font-semibold">
                  ⚠️ Are you sure? This will delete:
                </p>
                <ul className="text-sm text-error ml-6 mt-2 list-disc">
                  <li>All word progress for both Year 2 and Year 6</li>
                  <li>Your streak and achievements</li>
                  <li>All caught Pokémon and Fairies</li>
                  <li>All session history</li>
                </ul>
                <p className="text-sm text-error mt-2 font-semibold">
                  This action cannot be undone!
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClearData}
                  className="flex-1 bg-error hover:bg-error/90 text-white"
                >
                  Yes, Clear Everything
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Info */}
        <div className="text-center text-text-muted text-sm">
          <p>Spelling Master v2.0</p>
          <p className="mt-1">Supporting Year 2 and Year 6 learners</p>
        </div>
      </main>
    </div>
  );
}
