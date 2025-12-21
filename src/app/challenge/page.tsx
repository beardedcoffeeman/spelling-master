"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProgressBar, StepIndicator } from "@/components/ui/ProgressBar";
import { WordChoice, MultipleChoice } from "@/components/spelling/WordChoice";
import { TypeWord } from "@/components/spelling/TypeWord";
import { MnemonicCard } from "@/components/spelling/MnemonicCard";
import { ResultsSummary } from "@/components/spelling/ResultsSummary";
import { getRandomWords } from "@/data/spellings";
import { createMultipleChoiceOptions, getMisspellingsForWord } from "@/lib/wordUtils";
import { recordWordAttempt, startSession, updateSession, completeSession } from "@/lib/db";
import { checkAndUnlockAchievements, checkPerfectRound } from "@/lib/achievements";

// Helper to get misspellings
function getMisspellings(word: string): string[] {
  return getMisspellingsForWord(word, 3);
}

type ChallengePhase = "start" | "quiz" | "results" | "learning" | "retest" | "complete";

interface QuizResult {
  word: string;
  correct: boolean;
  incorrectChoice?: string;
}

const QUIZ_SIZE = 30;
const STEPS = ["Quiz", "Results", "Learn", "Retest"];

export default function ChallengePage() {
  const router = useRouter();
  
  // Session state
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [phase, setPhase] = useState<ChallengePhase>("start");
  const [currentStep, setCurrentStep] = useState(0);
  
  // Quiz state
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);
  
  // Learning state
  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
  const [learningIndex, setLearningIndex] = useState(0);
  const [learningPhase, setLearningPhase] = useState<"mnemonic" | "type">("mnemonic");
  
  // Retest state
  const [retestIndex, setRetestIndex] = useState(0);
  const [retestResults, setRetestResults] = useState<QuizResult[]>([]);

  // Start a new challenge
  const startChallenge = useCallback(async () => {
    const newWords = getRandomWords(QUIZ_SIZE);
    setWords(newWords);
    setCurrentIndex(0);
    setResults([]);
    setIncorrectWords([]);
    setLearningIndex(0);
    setRetestIndex(0);
    setRetestResults([]);
    setPhase("quiz");
    setCurrentStep(0);
    
    // Start a new session in the database
    const id = await startSession("spelling");
    setSessionId(id);
  }, []);

  // Handle quiz answer
  const handleQuizAnswer = useCallback(async (isCorrect: boolean) => {
    const currentWord = words[currentIndex];
    
    // Record the result
    const result: QuizResult = {
      word: currentWord,
      correct: isCorrect,
    };
    setResults((prev) => [...prev, result]);
    
    // Record in database
    await recordWordAttempt(currentWord, isCorrect);
    
    // Update session
    if (sessionId) {
      const newResults = [...results, result];
      const correctCount = newResults.filter((r) => r.correct).length;
      await updateSession(sessionId, newResults.length, correctCount);
    }
    
    // Move to next word or results
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Quiz complete - calculate incorrect words
      const allResults = [...results, result];
      const incorrect = allResults
        .filter((r) => !r.correct)
        .map((r) => r.word);
      setIncorrectWords(incorrect);
      
      // If there are incorrect words, go straight to learning after a brief results display
      if (incorrect.length > 0) {
        setPhase("results");
        setCurrentStep(1);
        // Auto-transition to learning after showing results
        setTimeout(() => {
          setLearningIndex(0);
          setLearningPhase("mnemonic");
          setPhase("learning");
          setCurrentStep(2);
        }, 3000);
      } else {
        // Perfect score - just show results
        setPhase("results");
        setCurrentStep(1);
      }
    }
  }, [currentIndex, words, results, sessionId]);

  // Start learning phase
  const startLearning = useCallback(() => {
    if (incorrectWords.length === 0) {
      // Perfect score - go to complete
      handleComplete();
      return;
    }
    setLearningIndex(0);
    setLearningPhase("mnemonic");
    setPhase("learning");
    setCurrentStep(2);
  }, [incorrectWords]);

  // Handle learning progress
  const handleMnemonicComplete = useCallback(() => {
    setLearningPhase("type");
  }, []);

  const handleTypeComplete = useCallback(() => {
    if (learningIndex < incorrectWords.length - 1) {
      setLearningIndex((prev) => prev + 1);
      setLearningPhase("mnemonic");
    } else {
      // Learning complete - move to retest
      setRetestIndex(0);
      setRetestResults([]);
      setPhase("retest");
      setCurrentStep(3);
    }
  }, [learningIndex, incorrectWords.length]);

  // Handle retest answer
  const handleRetestAnswer = useCallback(async (isCorrect: boolean) => {
    const currentWord = incorrectWords[retestIndex];
    
    // Record the result
    const result: QuizResult = {
      word: currentWord,
      correct: isCorrect,
    };
    setRetestResults((prev) => [...prev, result]);
    
    // Record in database
    await recordWordAttempt(currentWord, isCorrect);
    
    if (!isCorrect) {
      // Word still not learned - they need to learn it again
      // For now, just move on. Could loop back to learning in future.
    }
    
    // Move to next word or complete
    if (retestIndex < incorrectWords.length - 1) {
      setRetestIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  }, [retestIndex, incorrectWords]);

  // Complete the challenge
  const handleComplete = useCallback(async () => {
    setPhase("complete");
    
    // Complete session
    if (sessionId) {
      await completeSession(sessionId);
    }
    
    // Check for achievements
    const correctCount = results.filter((r) => r.correct).length;
    await checkPerfectRound(results.length, correctCount);
    await checkAndUnlockAchievements();
  }, [sessionId, results]);

  // Play again
  const handlePlayAgain = useCallback(() => {
    setPhase("start");
  }, []);

  // Go home
  const handleGoHome = useCallback(() => {
    router.push("/");
  }, [router]);

  // Get current word for quiz - randomly show correct or incorrect spelling
  const currentWord = words[currentIndex];
  const [currentDisplay, setCurrentDisplay] = useState<{
    word: string;
    isCorrect: boolean;
  } | null>(null);

  // Generate the word to display when currentIndex changes
  useEffect(() => {
    if (!currentWord) {
      setCurrentDisplay(null);
      return;
    }

    // 50/50 chance of showing correct or incorrect spelling
    const showCorrect = Math.random() > 0.5;
    
    if (showCorrect) {
      setCurrentDisplay({ word: currentWord, isCorrect: true });
    } else {
      const misspellings = getMisspellings(currentWord);
      const incorrectSpelling = misspellings[0] || currentWord + "e";
      setCurrentDisplay({ word: incorrectSpelling, isCorrect: false });
    }
  }, [currentWord, currentIndex]);

  // Get current word for learning/retest
  const currentLearningWord = incorrectWords[learningIndex];
  const currentRetestWord = incorrectWords[retestIndex];
  const retestOptions = currentRetestWord
    ? createMultipleChoiceOptions(currentRetestWord, 4)
    : [];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleGoHome} className="text-sm">
              ← Back
            </Button>
            <h1 className="text-xl font-bold text-primary font-display">
              Spelling Challenge
            </h1>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
          
          {phase !== "start" && phase !== "complete" && (
            <StepIndicator steps={STEPS} currentStep={currentStep} />
          )}
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
                📚
              </motion.div>
              
              <div>
                <h2 className="text-3xl font-bold text-text-primary font-display mb-3">
                  Ready to Test Your Spelling?
                </h2>
                <p className="text-text-secondary max-w-md">
                  You&apos;ll see {QUIZ_SIZE} words. For each one, pick the correct spelling.
                  Then learn any words you got wrong!
                </p>
              </div>

              <div className="space-y-4 w-full max-w-xs">
                <Button onClick={startChallenge} size="lg" fullWidth>
                  Start Challenge
                </Button>
                <Button variant="ghost" onClick={handleGoHome} fullWidth>
                  Maybe Later
                </Button>
              </div>

              <div className="flex gap-6 text-sm text-text-muted">
                <span>📝 {QUIZ_SIZE} words</span>
                <span>⏱️ No time limit</span>
                <span>🧠 Learn as you go</span>
              </div>
            </motion.div>
          )}

          {/* Quiz Phase */}
          {phase === "quiz" && currentWord && currentDisplay && (
            <motion.div
              key={`quiz-${currentIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <ProgressBar
                current={currentIndex + 1}
                total={words.length}
                variant="gradient"
              />
              
              <div className="text-center text-text-muted">
                Word {currentIndex + 1} of {words.length}
              </div>

              <WordChoice
                word={currentDisplay.word}
                isCorrectSpelling={currentDisplay.isCorrect}
                onAnswer={handleQuizAnswer}
              />
            </motion.div>
          )}

          {/* Results Phase - Auto-continue if there are incorrect words */}
          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsSummary
                correct={results.filter((r) => r.correct).length}
                total={results.length}
                incorrectWords={incorrectWords}
                onLearnWords={() => {
                  // Auto-start learning after a brief delay
                  setTimeout(() => {
                    startLearning();
                  }, 1500);
                }}
                onGoHome={handleGoHome}
                onPlayAgain={handlePlayAgain}
              />
            </motion.div>
          )}

          {/* Learning Phase */}
          {phase === "learning" && currentLearningWord && (
            <motion.div
              key={`learn-${learningIndex}-${learningPhase}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <ProgressBar
                current={learningIndex + 1}
                total={incorrectWords.length}
                variant="warning"
                showLabel
              />

              <div className="text-center text-text-muted">
                Learning word {learningIndex + 1} of {incorrectWords.length}
              </div>

              {learningPhase === "mnemonic" ? (
                <MnemonicCard
                  word={currentLearningWord}
                  onContinue={handleMnemonicComplete}
                />
              ) : (
                <TypeWord
                  word={currentLearningWord}
                  onComplete={handleTypeComplete}
                />
              )}
            </motion.div>
          )}

          {/* Retest Phase */}
          {phase === "retest" && currentRetestWord && (
            <motion.div
              key={`retest-${retestIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <ProgressBar
                current={retestIndex + 1}
                total={incorrectWords.length}
                variant="success"
                showLabel
              />

              <div className="text-center">
                <p className="text-text-muted">
                  Let&apos;s check what you learned!
                </p>
                <p className="text-sm text-text-muted">
                  Word {retestIndex + 1} of {incorrectWords.length}
                </p>
              </div>

              <MultipleChoice
                correctWord={currentRetestWord}
                options={retestOptions}
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
                  Great job! You&apos;ve finished this spelling challenge.
                  Keep practising to master all 100 words!
                </p>
              </div>

              <div className="space-y-4 w-full max-w-xs">
                <Button onClick={handlePlayAgain} size="lg" fullWidth>
                  Play Again
                </Button>
                <Button variant="secondary" onClick={handleGoHome} fullWidth>
                  Back to Home
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

