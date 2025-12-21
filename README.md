# Spelling Master

An engaging spelling learning application for Year 6 students (ages 10-11) in the UK. Master the 100 statutory spellings from the UK National Curriculum, plus homophones and commonly confused words.

## Features

### Spelling Challenge
- Test your knowledge of 100 statutory Year 6 spellings
- Pick the correct spelling from two options
- Learn from mistakes with memorable mnemonics
- Retest words you got wrong with multiple choice
- Track progress with mastery levels

### Homophones Practice
- Master tricky word pairs (their/there/they're, affect/effect, etc.)
- Fill-in-the-blank sentence completion
- Learn the differences with helpful tips
- 18+ homophone sets with practice sentences

### Progress Centre
- Track your progress across all words
- View words by mastery status (Mastered, Learning, Needs Work, Not Tried)
- Build and maintain daily practice streaks
- Unlock achievements and earn stars

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Dexie.js (IndexedDB)
- **Fonts**: Nunito (primary), Fredoka (display)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The app runs on `http://localhost:3000` by default.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── challenge/          # Spelling challenge page
│   ├── homophones/         # Homophones practice page
│   └── progress/           # Progress centre page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── spelling/           # Spelling challenge components
│   ├── homophones/         # Homophone practice components
│   └── progress/           # Progress tracking components
├── data/
│   ├── spellings.ts        # 100 statutory words
│   ├── mnemonics.ts        # Memory tricks for all words
│   └── homophones.ts       # Homophone sets and sentences
├── hooks/                  # Custom React hooks
└── lib/
    ├── db.ts               # IndexedDB database setup
    ├── wordUtils.ts        # Word manipulation utilities
    └── achievements.ts     # Achievement definitions
```

## Word Mastery Levels

Words are tracked with four mastery levels:

- **Mastered**: 5+ attempts with 90%+ accuracy
- **Learning**: 50-89% accuracy
- **Needs Work**: Below 50% accuracy
- **Not Tried**: No attempts yet

## Accessibility

- Full keyboard navigation
- ARIA labels on interactive elements
- Minimum 4.5:1 contrast ratio
- Large touch targets (44px minimum)
- Screen reader compatible

## License

MIT
