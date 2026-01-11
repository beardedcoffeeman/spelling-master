"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card } from "@/components/ui/Card";
import { SentenceComplete } from "@/components/homophones/SentenceComplete";
import { ExplanationCard } from "@/components/homophones/ExplanationCard";
import { homophones, getRandomHomophoneSets, type HomophoneSet } from "@/data/homophones";
import { recordHomophoneAttempt, recordWordAttempt, type CaughtPokemon } from "@/lib/db";
import { checkAndCatchPokemon } from "@/lib/pokemonRewards";
import { CatchAnimation } from "@/components/pokemon";

type Phase = "start" | "challenge" | "results" | "learning" | "retest" | "complete";

interface ChallengeResult {
  setId: string;
  sentence: string;
  answer: string;
  correct: boolean;
}

const CHALLENGE_SIZE = 10; // Number of sentences per challenge

export default function HomophonesPage() {
  const router = useRouter();
  
  const [phase, setPhase] = useState<Phase>("start");
  const [selectedSets, setSelectedSets] = useState<HomophoneSet[]>([]);
  const [sentences, setSentences] = useState<Array<{
    set: HomophoneSet;
    sentence: (typeof homophones)[0]["sentences"][0];
  }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<ChallengeResult[]>([]);
  
  // Learning phase
  const [incorrectSets, setIncorrectSets] = useState<HomophoneSet[]>([]);
  const [learningIndex, setLearningIndex] = useState(0);
  
  // Retest phase
  const [retestSentences, setRetestSentences] = useState<Array<{
    set: HomophoneSet;
    sentence: (typeof homophones)[0]["sentences"][0];
  }>>([]);
  const [retestIndex, setRetestIndex] = useState(0);
  const [retestResults, setRetestResults] = useState<ChallengeResult[]>([]);
  
  // Pokemon catch state
  const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon | null>(null);

  // Start a new challenge
  const startChallenge = useCallback(() => {
    // Get random homophone sets
    const sets = getRandomHomophoneSets(5);
    setSelectedSets(sets);
    
    // Generate sentences from these sets
    const allSentences: typeof sentences = [];
    sets.forEach((set) => {
      // Get 2 random sentences from each set
      const shuffledSentences = [...set.sentences].sort(() => Math.random() - 0.5);
      shuffledSentences.slice(0, 2).forEach((sentence) => {
        allSentences.push({ set, sentence });
      });
    });
    
    // Shuffle all sentences
    const shuffled = allSentences.sort(() => Math.random() - 0.5).slice(0, CHALLENGE_SIZE);
    setSentences(shuffled);
    
    setCurrentIndex(0);
    setResults([]);
    setIncorrectSets([]);
    setLearningIndex(0);
    setPhase("challenge");
  }, []);

  // Handle answer in challenge
  const handleAnswer = useCallback(async (isCorrect: boolean) => {
    const current = sentences[currentIndex];
    
    // Record result
    const result: ChallengeResult = {
      setId: current.set.id,
      sentence: current.sentence.text,
      answer: current.sentence.answer,
      correct: isCorrect,
    };
    setResults((prev) => [...prev, result]);
    
    // Record in database and check for Pokemon catch
    const { wasJustMastered } = await recordHomophoneAttempt(current.set.id, isCorrect);
    await recordWordAttempt(current.sentence.answer, isCorrect, "homophone");
    
    if (wasJustMastered) {
      // Homophone set was just mastered! Try to catch a Pokemon
      const caught = await checkAndCatchPokemon(current.set.id, 'homophone', 'year6', current.set.id);
      if (caught) {
        setCaughtPokemon(caught);
      }
    }
    
    // Move to next or results/learning
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate incorrect sets for learning
      const allResults = [...results, result];
      const incorrectSetIds = new Set(
        allResults.filter((r) => !r.correct).map((r) => r.setId)
      );
      const setsToLearn = selectedSets.filter((s) => incorrectSetIds.has(s.id));
      
      if (setsToLearn.length > 0) {
        setIncorrectSets(setsToLearn);
        // Show results briefly then auto-transition to learning
        setPhase("results");
        setTimeout(() => {
          setLearningIndex(0);
          setPhase("learning");
        }, 3000);
      } else {
        // Perfect score - just show results
        setPhase("results");
      }
    }
  }, [currentIndex, sentences, results, selectedSets]);

  // Handle learning completion
  const handleLearnComplete = useCallback(() => {
    if (learningIndex < incorrectSets.length - 1) {
      setLearningIndex((prev) => prev + 1);
    } else {
      // Learning complete - prepare retest with different sentences
      const retestSentencesList: typeof retestSentences = [];
      
      incorrectSets.forEach((set) => {
        // Find sentences from this set that weren't used in the original challenge
        const usedSentences = new Set(
          sentences
            .filter((s) => s.set.id === set.id)
            .map((s) => s.sentence.text)
        );
        
        // Get unused sentences, or reuse if all were used
        const availableSentences = set.sentences.filter(
          (s) => !usedSentences.has(s.text)
        );
        
        // Pick one sentence for retest (prefer unused, fallback to any)
        const sentenceToUse = 
          availableSentences.length > 0
            ? availableSentences[Math.floor(Math.random() * availableSentences.length)]
            : set.sentences[Math.floor(Math.random() * set.sentences.length)];
        
        retestSentencesList.push({ set, sentence: sentenceToUse });
      });
      
      setRetestSentences(retestSentencesList);
      setRetestIndex(0);
      setRetestResults([]);
      setPhase("retest");
    }
  }, [learningIndex, incorrectSets, sentences, retestSentences]);

  // Handle retest answer
  const handleRetestAnswer = useCallback(async (isCorrect: boolean) => {
    const current = retestSentences[retestIndex];
    
    // Record the result
    const result: ChallengeResult = {
      setId: current.set.id,
      sentence: current.sentence.text,
      answer: current.sentence.answer,
      correct: isCorrect,
    };
    setRetestResults((prev) => [...prev, result]);
    
    // Record in database and check for Pokemon catch
    const { wasJustMastered } = await recordHomophoneAttempt(current.set.id, isCorrect);
    await recordWordAttempt(current.sentence.answer, isCorrect, "homophone");
    
    if (wasJustMastered) {
      // Homophone set was just mastered! Try to catch a Pokemon
      const caught = await checkAndCatchPokemon(current.set.id, 'homophone', 'year6', current.set.id);
      if (caught) {
        setCaughtPokemon(caught);
      }
    }
    
    // If incorrect, go back to learning for this set
    if (!isCorrect) {
      // Find the index of this set in incorrectSets
      const setIndex = incorrectSets.findIndex((s) => s.id === current.set.id);
      if (setIndex >= 0) {
        setLearningIndex(setIndex);
        setPhase("learning");
        return;
      }
    }
    
    // Move to next or complete
    if (retestIndex < retestSentences.length - 1) {
      setRetestIndex((prev) => prev + 1);
    } else {
      setPhase("complete");
    }
  }, [retestIndex, retestSentences, incorrectSets]);

  // Calculate stats
  const correctCount = useMemo(
    () => results.filter((r) => r.correct).length,
    [results]
  );
  const percentage = results.length > 0
    ? Math.round((correctCount / results.length) * 100)
    : 0;

  const currentSentence = sentences[currentIndex];
  const currentLearningSet = incorrectSets[learningIndex];
  const currentRetestSentence = retestSentences[retestIndex];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/")} className="text-sm">
              ← Back
            </Button>
            <h1 className="text-xl font-bold text-success font-display">
              Homophones
            </h1>
            <div className="w-16" />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Start Screen */}
          {phase === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-8xl"
              >
                🎭
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold text-text-primary font-display mb-3">
                  Homophone Challenge
                </h2>
                <p className="text-text-secondary max-w-md">
                  Words that sound the same but have different meanings and
                  spellings. Can you choose the right one?
                </p>
              </div>

              {/* Example */}
              <Card className="max-w-sm w-full p-4">
                <p className="text-sm text-text-muted mb-2">Example:</p>
                <p className="text-lg text-text-primary">
                  &quot;Put it over <span className="text-success font-bold">there</span>.&quot;
                </p>
                <p className="text-sm text-text-muted mt-2">
                  <span className="font-semibold">their</span> vs{" "}
                  <span className="font-semibold">there</span> vs{" "}
                  <span className="font-semibold">they&apos;re</span>
                </p>
              </Card>

              <div className="space-y-4 w-full max-w-xs">
                <Button onClick={startChallenge} variant="success" size="lg" fullWidth>
                  Start Challenge
                </Button>
                <Button variant="ghost" onClick={() => router.push("/")} fullWidth>
                  Maybe Later
                </Button>
              </div>

              <div className="flex gap-6 text-sm text-text-muted">
                <span>📝 {CHALLENGE_SIZE} sentences</span>
                <span>💡 Hints available</span>
                <span>🧠 Learn as you go</span>
              </div>
            </motion.div>
          )}

          {/* Challenge Phase */}
          {phase === "challenge" && currentSentence && (
            <motion.div
              key={`challenge-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <ProgressBar
                current={currentIndex + 1}
                total={sentences.length}
                variant="success"
              />

              <div className="text-center text-text-muted">
                Question {currentIndex + 1} of {sentences.length}
              </div>

              <SentenceComplete
                sentence={currentSentence.sentence.text}
                options={currentSentence.set.words.map((w) => w.word)}
                correctAnswer={currentSentence.sentence.answer}
                hint={currentSentence.sentence.hint}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}

          {/* Learning Phase */}
          {phase === "learning" && currentLearningSet && (
            <motion.div
              key={`learn-${learningIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <ProgressBar
                current={learningIndex + 1}
                total={incorrectSets.length}
                variant="warning"
              />

              <div className="text-center text-text-muted">
                Learning {learningIndex + 1} of {incorrectSets.length}
              </div>

              <ExplanationCard
                homophoneSet={currentLearningSet}
                onContinue={handleLearnComplete}
              />
            </motion.div>
          )}

          {/* Retest Phase */}
          {phase === "retest" && currentRetestSentence && (
            <motion.div
              key={`retest-${retestIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <ProgressBar
                current={retestIndex + 1}
                total={retestSentences.length}
                variant="success"
                showLabel
              />

              <div className="text-center">
                <p className="text-text-muted">
                  Let&apos;s check what you learned!
                </p>
                <p className="text-sm text-text-muted">
                  Word {retestIndex + 1} of {retestSentences.length}
                </p>
              </div>

              <SentenceComplete
                sentence={currentRetestSentence.sentence.text}
                options={currentRetestSentence.set.words.map((w) => w.word)}
                correctAnswer={currentRetestSentence.sentence.answer}
                hint={currentRetestSentence.sentence.hint}
                onAnswer={handleRetestAnswer}
              />
            </motion.div>
          )}

          {/* Complete Phase */}
          {phase === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-8xl"
              >
                🏆
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold text-text-primary font-display mb-3">
                  Challenge Complete!
                </h2>
                <p className="text-text-secondary max-w-md">
                  Great job! You&apos;ve finished the homophone challenge and learned the tricky pairs.
                </p>
              </div>

              <div className="space-y-4 w-full max-w-xs">
                <Button onClick={startChallenge} variant="success" size="lg" fullWidth>
                  Play Again
                </Button>
                <Button variant="secondary" onClick={() => router.push("/")} fullWidth>
                  Back to Home
                </Button>
              </div>
            </motion.div>
          )}

          {/* Results Phase */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-7xl"
              >
                {percentage === 100 ? "🎉" : percentage >= 70 ? "⭐" : "💪"}
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold text-text-primary font-display mb-2">
                  {percentage === 100
                    ? "Perfect Score!"
                    : percentage >= 70
                    ? "Great Job!"
                    : "Keep Practising!"}
                </h2>
                <p className="text-4xl font-bold text-success mb-2">
                  {correctCount}/{results.length}
                </p>
                <p className="text-text-secondary">
                  You got {percentage}% correct!
                </p>
              </div>

              {/* Show which homophones need learning */}
              {incorrectSets.length > 0 && (
                <>
                  <Card className="max-w-sm w-full p-4">
                    <h4 className="font-semibold text-text-primary mb-2">
                      Tricky pairs to learn:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {incorrectSets.map((set) => (
                        <span
                          key={set.id}
                          className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium"
                        >
                          {set.words.map((w) => w.word).join(" / ")}
                        </span>
                      ))}
                    </div>
                  </Card>
                  <p className="text-sm text-text-muted animate-pulse">
                    Moving to learning phase in a moment...
                  </p>
                </>
              )}

              <div className="space-y-4 w-full max-w-xs">
                <Button onClick={startChallenge} variant="success" size="lg" fullWidth>
                  Play Again
                </Button>
                <Button variant="secondary" onClick={() => router.push("/")} fullWidth>
                  Back to Home
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Homophone pairs reference (collapsed at bottom) */}
      {phase === "start" && (
        <section className="max-w-2xl mx-auto px-4 pb-8">
          <details className="group">
            <summary className="cursor-pointer text-text-muted text-sm font-medium flex items-center gap-2 py-2">
              <span className="group-open:rotate-90 transition-transform">▶</span>
              View all homophone pairs ({homophones.length} sets)
            </summary>
            <div className="mt-4 grid gap-2">
              {homophones.map((set) => (
                <Card key={set.id} className="p-3 text-sm">
                  <span className="font-semibold text-primary">
                    {set.words.map((w) => w.word).join(" / ")}
                  </span>
                </Card>
              ))}
            </div>
          </details>
        </section>
      )}
      
      {/* Pokemon Catch Animation */}
      <CatchAnimation 
        pokemon={caughtPokemon} 
        onClose={() => setCaughtPokemon(null)} 
      />
    </div>
  );
}


