import { commonMisspellings } from "@/data/spellings";

// Get misspellings for a word, either from database or generate them
export function getMisspellingsForWord(word: string, count: number = 3): string[] {
  const stored = commonMisspellings[word];
  
  if (stored && stored.length >= count) {
    // Shuffle and return requested count
    return shuffleArray([...stored]).slice(0, count);
  }
  
  // Generate misspellings if not enough stored
  const generated = generatePlausibleMisspellings(word);
  const combined = [...(stored || []), ...generated];
  
  // Remove duplicates and the correct spelling
  const unique = [...new Set(combined)].filter(
    (m) => m.toLowerCase() !== word.toLowerCase()
  );
  
  return shuffleArray(unique).slice(0, count);
}

// Generate plausible misspellings for a word
function generatePlausibleMisspellings(word: string): string[] {
  const misspellings: string[] = [];
  const lowerWord = word.toLowerCase();
  
  // Strategy 1: Double a single consonant
  const singleConsonants = lowerWord.match(/([bcdfghjklmnpqrstvwxyz])(?!\1)/g);
  if (singleConsonants) {
    for (const c of singleConsonants.slice(0, 2)) {
      const index = lowerWord.indexOf(c);
      if (index > 0 && index < lowerWord.length - 1) {
        misspellings.push(
          lowerWord.slice(0, index) + c + c + lowerWord.slice(index + 1)
        );
      }
    }
  }
  
  // Strategy 2: Remove a double consonant
  const doubleConsonants = lowerWord.match(/([bcdfghjklmnpqrstvwxyz])\1/g);
  if (doubleConsonants) {
    for (const dc of doubleConsonants) {
      misspellings.push(lowerWord.replace(dc, dc[0]));
    }
  }
  
  // Strategy 3: Swap adjacent vowels (e/i, a/e, etc.)
  const vowelSwaps: [string, string][] = [
    ["ei", "ie"],
    ["ie", "ei"],
    ["ae", "ea"],
    ["ea", "ae"],
    ["ou", "uo"],
  ];
  
  for (const [from, to] of vowelSwaps) {
    if (lowerWord.includes(from)) {
      misspellings.push(lowerWord.replace(from, to));
    }
  }
  
  // Strategy 4: Common letter substitutions
  const substitutions: [string, string][] = [
    ["c", "s"],
    ["s", "c"],
    ["a", "e"],
    ["e", "a"],
    ["i", "e"],
    ["e", "i"],
    ["ant", "ent"],
    ["ent", "ant"],
    ["ance", "ence"],
    ["ence", "ance"],
    ["able", "ible"],
    ["ible", "able"],
    ["tion", "sion"],
    ["sion", "tion"],
  ];
  
  for (const [from, to] of substitutions) {
    if (lowerWord.includes(from)) {
      misspellings.push(lowerWord.replace(from, to));
      break; // Only do one substitution
    }
  }
  
  // Strategy 5: Remove a letter (especially silent letters or vowels)
  if (lowerWord.length > 5) {
    const silentLetterPatterns = ["gh", "kn", "wr", "mb", "mn"];
    for (const pattern of silentLetterPatterns) {
      if (lowerWord.includes(pattern)) {
        misspellings.push(lowerWord.replace(pattern, pattern[0]));
        break;
      }
    }
    
    // Remove a random vowel from the middle
    const middleStart = Math.floor(lowerWord.length / 4);
    const middleEnd = Math.floor((lowerWord.length * 3) / 4);
    for (let i = middleStart; i < middleEnd; i++) {
      if ("aeiou".includes(lowerWord[i])) {
        misspellings.push(lowerWord.slice(0, i) + lowerWord.slice(i + 1));
        break;
      }
    }
  }
  
  // Strategy 6: Add an extra letter
  const extraLetterSpots = [
    { pattern: /([aeiou])([bcdfghjklmnpqrstvwxyz])/, insert: "$1$2$2" },
  ];
  
  for (const { pattern, insert } of extraLetterSpots) {
    if (pattern.test(lowerWord)) {
      misspellings.push(lowerWord.replace(pattern, insert));
      break;
    }
  }
  
  // Filter out any that are the same as the original or empty
  return misspellings.filter(
    (m) => m && m !== lowerWord && m.length >= 3
  );
}

// Shuffle an array (Fisher-Yates)
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Create options for a multiple choice question
export function createMultipleChoiceOptions(
  correctWord: string,
  optionCount: number = 4
): string[] {
  const misspellings = getMisspellingsForWord(correctWord, optionCount - 1);
  const options = [correctWord, ...misspellings];
  return shuffleArray(options);
}

// Create a binary choice (correct vs incorrect)
export function createBinaryChoice(correctWord: string): [string, string] {
  const misspellings = getMisspellingsForWord(correctWord, 1);
  const incorrect = misspellings[0] || generateFallbackMisspelling(correctWord);
  
  // Randomly order them
  return Math.random() > 0.5
    ? [correctWord, incorrect]
    : [incorrect, correctWord];
}

// Fallback misspelling if all else fails
function generateFallbackMisspelling(word: string): string {
  const lowerWord = word.toLowerCase();
  
  // Simple vowel swap
  const vowels = "aeiou";
  for (let i = 1; i < lowerWord.length - 1; i++) {
    if (vowels.includes(lowerWord[i])) {
      const currentVowelIndex = vowels.indexOf(lowerWord[i]);
      const newVowel = vowels[(currentVowelIndex + 1) % vowels.length];
      return lowerWord.slice(0, i) + newVowel + lowerWord.slice(i + 1);
    }
  }
  
  // If no vowels found, double a consonant
  return lowerWord[0] + lowerWord;
}

// Highlight differences between two words (for learning display)
export function highlightDifferences(
  correct: string,
  incorrect: string
): { correct: string[]; incorrect: string[] } {
  const correctChars: string[] = [];
  const incorrectChars: string[] = [];
  
  const maxLength = Math.max(correct.length, incorrect.length);
  
  for (let i = 0; i < maxLength; i++) {
    const c = correct[i] || "";
    const ic = incorrect[i] || "";
    
    if (c.toLowerCase() === ic.toLowerCase()) {
      correctChars.push(c);
      incorrectChars.push(ic);
    } else {
      // Mark differences (could use special markers)
      correctChars.push(`[${c}]`);
      incorrectChars.push(`[${ic}]`);
    }
  }
  
  return {
    correct: correctChars,
    incorrect: incorrectChars,
  };
}


