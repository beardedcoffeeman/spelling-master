// Homophones and commonly confused words for Year 5/6

export interface HomophoneWord {
  word: string;
  meaning: string;
  example: string;
  tip: string;
}

export interface HomophoneSet {
  id: string;
  words: HomophoneWord[];
  sentences: {
    text: string;
    answer: string;
    hint?: string;
  }[];
}

export const homophones: HomophoneSet[] = [
  {
    id: "their_there_theyre",
    words: [
      {
        word: "their",
        meaning: "Belonging to them (possessive)",
        example: "That is their house.",
        tip: "THEIR has HEIR in it - an heir inherits things!",
      },
      {
        word: "there",
        meaning: "A place or position",
        example: "Put it over there.",
        tip: "THERE has HERE in it - both are places!",
      },
      {
        word: "they're",
        meaning: "They are (contraction)",
        example: "They're coming to the party.",
        tip: "Can you replace it with 'they are'? If yes, use they're!",
      },
    ],
    sentences: [
      { text: "The children put _____ coats on.", answer: "their", hint: "Think about ownership" },
      { text: "I left my bag over _____.", answer: "there", hint: "Think about a place" },
      { text: "_____ going to be late!", answer: "They're", hint: "Can you say 'they are'?" },
      { text: "Is that _____ car?", answer: "their", hint: "Who owns the car?" },
      { text: "_____ is a spider on the ceiling!", answer: "There", hint: "Where is the spider?" },
      { text: "I think _____ lost.", answer: "they're", hint: "They are..." },
    ],
  },
  {
    id: "your_youre",
    words: [
      {
        word: "your",
        meaning: "Belonging to you (possessive)",
        example: "Is this your book?",
        tip: "YOUR shows ownership - your things!",
      },
      {
        word: "you're",
        meaning: "You are (contraction)",
        example: "You're going to love this!",
        tip: "Can you replace it with 'you are'? If yes, use you're!",
      },
    ],
    sentences: [
      { text: "Is this _____ pencil?", answer: "your", hint: "Who owns the pencil?" },
      { text: "_____ the best speller in class!", answer: "You're", hint: "You are..." },
      { text: "I love _____ new shoes.", answer: "your", hint: "Whose shoes?" },
      { text: "_____ going to win!", answer: "You're", hint: "You are..." },
      { text: "What's _____ favourite colour?", answer: "your", hint: "Belongs to you" },
    ],
  },
  {
    id: "to_too_two",
    words: [
      {
        word: "to",
        meaning: "Direction or infinitive verb marker",
        example: "I went to the shop. / I want to play.",
        tip: "TO shows direction or before a verb",
      },
      {
        word: "too",
        meaning: "Also, or excessively",
        example: "Me too! / It's too hot.",
        tip: "TOO has an extra O because it means 'extra' or 'also'!",
      },
      {
        word: "two",
        meaning: "The number 2",
        example: "I have two apples.",
        tip: "TWO is a number - think 'twin'!",
      },
    ],
    sentences: [
      { text: "I'm going _____ the park.", answer: "to", hint: "Direction" },
      { text: "Can I come _____?", answer: "too", hint: "Also/as well" },
      { text: "I have _____ sisters.", answer: "two", hint: "A number" },
      { text: "This soup is _____ hot!", answer: "too", hint: "Excessively" },
      { text: "I want _____ learn to swim.", answer: "to", hint: "Before a verb" },
      { text: "She ate _____ biscuits.", answer: "two", hint: "How many?" },
    ],
  },
  {
    id: "its_its",
    words: [
      {
        word: "its",
        meaning: "Belonging to it (possessive)",
        example: "The dog wagged its tail.",
        tip: "ITS shows ownership - no apostrophe needed!",
      },
      {
        word: "it's",
        meaning: "It is or it has (contraction)",
        example: "It's raining outside.",
        tip: "Can you replace it with 'it is'? If yes, use it's!",
      },
    ],
    sentences: [
      { text: "The cat licked _____ paws.", answer: "its", hint: "Belonging to the cat" },
      { text: "_____ going to rain today.", answer: "It's", hint: "It is..." },
      { text: "The tree lost _____ leaves.", answer: "its", hint: "Belonging to the tree" },
      { text: "_____ been a lovely day.", answer: "It's", hint: "It has..." },
      { text: "The bird built _____ nest.", answer: "its", hint: "Whose nest?" },
    ],
  },
  {
    id: "hear_here",
    words: [
      {
        word: "hear",
        meaning: "To perceive sound with your ears",
        example: "I can hear music.",
        tip: "HEAR has EAR in it - you hear with your ear!",
      },
      {
        word: "here",
        meaning: "In this place",
        example: "Come over here!",
        tip: "HERE is a place - 'here' and 'there' rhyme!",
      },
    ],
    sentences: [
      { text: "Can you _____ that noise?", answer: "hear", hint: "Use your ears" },
      { text: "Please sit _____.", answer: "here", hint: "This place" },
      { text: "I can't _____ you!", answer: "hear", hint: "Listening..." },
      { text: "The treasure is buried _____.", answer: "here", hint: "In this spot" },
      { text: "Did you _____ the news?", answer: "hear", hint: "About sound" },
    ],
  },
  {
    id: "affect_effect",
    words: [
      {
        word: "affect",
        meaning: "To influence something (verb)",
        example: "The weather will affect our plans.",
        tip: "Affect = Action (both start with A) - it's a verb!",
      },
      {
        word: "effect",
        meaning: "The result of something (noun)",
        example: "The effect of the rain was flooding.",
        tip: "Effect = End result (both start with E) - it's usually a noun!",
      },
    ],
    sentences: [
      { text: "The cold weather will _____ the crops.", answer: "affect", hint: "A verb - to influence" },
      { text: "What was the _____ of the medicine?", answer: "effect", hint: "A noun - the result" },
      { text: "Lack of sleep can _____ your concentration.", answer: "affect", hint: "A verb - to influence" },
      { text: "The sound _____ was amazing!", answer: "effect", hint: "A noun - type of result" },
      { text: "How will this _____ the game?", answer: "affect", hint: "To change or influence" },
    ],
  },
  {
    id: "practice_practise",
    words: [
      {
        word: "practice",
        meaning: "The noun - a thing you do",
        example: "I have football practice.",
        tip: "PractiCE is a noun - like iCE (also a noun)!",
      },
      {
        word: "practise",
        meaning: "The verb - the action of doing it",
        example: "I need to practise my spelling.",
        tip: "PractiSE is a verb - like adviSE (also a verb)!",
      },
    ],
    sentences: [
      { text: "I need more _____ with fractions.", answer: "practice", hint: "A thing/noun" },
      { text: "Can you _____ your times tables?", answer: "practise", hint: "An action/verb" },
      { text: "The doctor opened her own _____.", answer: "practice", hint: "A place/thing" },
      { text: "I _____ piano every day.", answer: "practise", hint: "What you do" },
      { text: "Spelling _____ is important.", answer: "practice", hint: "A noun" },
    ],
  },
  {
    id: "advice_advise",
    words: [
      {
        word: "advice",
        meaning: "The noun - suggestions given",
        example: "She gave me good advice.",
        tip: "AdviCE is a noun (like iCE) - advice is a thing!",
      },
      {
        word: "advise",
        meaning: "The verb - to give suggestions",
        example: "I advise you to study hard.",
        tip: "AdviSE is a verb (like riSE) - to advise is an action!",
      },
    ],
    sentences: [
      { text: "Can you give me some _____?", answer: "advice", hint: "A thing/noun" },
      { text: "I _____ you to be careful.", answer: "advise", hint: "An action/verb" },
      { text: "That was excellent _____!", answer: "advice", hint: "Something given" },
      { text: "The teacher will _____ us.", answer: "advise", hint: "What the teacher does" },
      { text: "I need your _____ on this.", answer: "advice", hint: "A noun" },
    ],
  },
  {
    id: "stationary_stationery",
    words: [
      {
        word: "stationary",
        meaning: "Not moving, standing still",
        example: "The car was stationary at the lights.",
        tip: "StationARY - A for 'At rest' - not moving!",
      },
      {
        word: "stationery",
        meaning: "Paper, pens, office supplies",
        example: "I bought some stationery for school.",
        tip: "StationERY - E for 'Envelopes and pens'!",
      },
    ],
    sentences: [
      { text: "The bike was _____ at the traffic lights.", answer: "stationary", hint: "Not moving" },
      { text: "Mum bought new _____ for my pencil case.", answer: "stationery", hint: "Pens and paper" },
      { text: "The train remained _____.", answer: "stationary", hint: "Standing still" },
      { text: "I love collecting _____.", answer: "stationery", hint: "Writing supplies" },
      { text: "The queue was completely _____.", answer: "stationary", hint: "Not moving at all" },
    ],
  },
  {
    id: "principal_principle",
    words: [
      {
        word: "principal",
        meaning: "Main/chief, or head of a school",
        example: "The principal reason is safety.",
        tip: "The principAL is your PAL - and the main person!",
      },
      {
        word: "principle",
        meaning: "A rule or belief",
        example: "It's against my principles.",
        tip: "A principLE is a ruLE - both end in LE!",
      },
    ],
    sentences: [
      { text: "The _____ called an assembly.", answer: "principal", hint: "Head of school" },
      { text: "Honesty is an important _____.", answer: "principle", hint: "A belief or rule" },
      { text: "The _____ ingredient is flour.", answer: "principal", hint: "Main/chief" },
      { text: "It's a matter of _____.", answer: "principle", hint: "About beliefs" },
      { text: "Our school _____ is very kind.", answer: "principal", hint: "The head teacher" },
    ],
  },
  {
    id: "passed_past",
    words: [
      {
        word: "passed",
        meaning: "Verb - went by, or succeeded",
        example: "She passed the test. / Time passed quickly.",
        tip: "PASSED is always a verb - an action word!",
      },
      {
        word: "past",
        meaning: "Noun/preposition - time gone by, or beyond",
        example: "In the past... / Walk past the shop.",
        tip: "PAST is never a verb - it's a time or position!",
      },
    ],
    sentences: [
      { text: "The car drove _____ our house.", answer: "past", hint: "Position - beyond" },
      { text: "She _____ all her exams!", answer: "passed", hint: "A verb - succeeded" },
      { text: "In the _____, people had no phones.", answer: "past", hint: "Time gone by" },
      { text: "He _____ the ball to me.", answer: "passed", hint: "A verb - threw" },
      { text: "It's half _____ three.", answer: "past", hint: "Part of telling time" },
    ],
  },
  {
    id: "aloud_allowed",
    words: [
      {
        word: "aloud",
        meaning: "Out loud, audibly",
        example: "Please read aloud.",
        tip: "ALOUD = A LOUD voice - speaking out!",
      },
      {
        word: "allowed",
        meaning: "Permitted",
        example: "Dogs are not allowed here.",
        tip: "ALLOWED = permission granted!",
      },
    ],
    sentences: [
      { text: "Please read the poem _____.", answer: "aloud", hint: "Out loud" },
      { text: "Are we _____ to play outside?", answer: "allowed", hint: "Permitted" },
      { text: "She laughed _____ at the joke.", answer: "aloud", hint: "So others can hear" },
      { text: "Swimming is not _____ here.", answer: "allowed", hint: "Not permitted" },
      { text: "Think it, don't say it _____.", answer: "aloud", hint: "Spoken out" },
    ],
  },
  {
    id: "whose_whos",
    words: [
      {
        word: "whose",
        meaning: "Belonging to whom (possessive)",
        example: "Whose book is this?",
        tip: "WHOSE shows ownership - whose thing?",
      },
      {
        word: "who's",
        meaning: "Who is or who has (contraction)",
        example: "Who's coming to the party?",
        tip: "Can you say 'who is'? Then use who's!",
      },
    ],
    sentences: [
      { text: "_____ bag is this?", answer: "Whose", hint: "Ownership" },
      { text: "_____ at the door?", answer: "Who's", hint: "Who is..." },
      { text: "I know _____ responsible.", answer: "who's", hint: "Who is..." },
      { text: "_____ turn is it?", answer: "Whose", hint: "Belonging to whom" },
      { text: "_____ been eating my porridge?", answer: "Who's", hint: "Who has..." },
    ],
  },
  {
    id: "led_lead",
    words: [
      {
        word: "led",
        meaning: "Past tense of 'lead' (to guide)",
        example: "She led the team to victory.",
        tip: "LED is past tense - it already happened!",
      },
      {
        word: "lead",
        meaning: "To guide (present), or a heavy metal",
        example: "I will lead the way. / Lead pipes.",
        tip: "LEAD (present) rhymes with 'need'. LEAD (metal) rhymes with 'bed'!",
      },
    ],
    sentences: [
      { text: "Yesterday, she _____ the parade.", answer: "led", hint: "Past tense" },
      { text: "Can you _____ us to safety?", answer: "lead", hint: "Present tense - guide" },
      { text: "The captain _____ his team well.", answer: "led", hint: "Past tense" },
      { text: "I will _____ the discussion.", answer: "lead", hint: "Present/future" },
      { text: "The path _____ to the castle.", answer: "led", hint: "Past tense" },
    ],
  },
  {
    id: "morning_mourning",
    words: [
      {
        word: "morning",
        meaning: "Early part of the day",
        example: "Good morning!",
        tip: "MORNING is when you wake up - no U!",
      },
      {
        word: "mourning",
        meaning: "Grieving for someone who died",
        example: "They were mourning their loss.",
        tip: "MOURNING has U for Unhappy - grieving!",
      },
    ],
    sentences: [
      { text: "I wake up early every _____.", answer: "morning", hint: "Time of day" },
      { text: "The family was _____ their grandmother.", answer: "mourning", hint: "Grieving" },
      { text: "Good _____, everyone!", answer: "morning", hint: "A greeting" },
      { text: "She wore black while _____.", answer: "mourning", hint: "Showing grief" },
      { text: "The _____ sun was bright.", answer: "morning", hint: "Early day" },
    ],
  },
  {
    id: "steal_steel",
    words: [
      {
        word: "steal",
        meaning: "To take something without permission",
        example: "Don't steal my idea!",
        tip: "STEAL is to take - stEAl has 'take' letters rearranged!",
      },
      {
        word: "steel",
        meaning: "A strong metal alloy",
        example: "The bridge is made of steel.",
        tip: "STEEL is metal - it has two Es like 'metal' has two Es!",
      },
    ],
    sentences: [
      { text: "The thief tried to _____ the jewels.", answer: "steal", hint: "To take" },
      { text: "The gate is made of _____.", answer: "steel", hint: "A metal" },
      { text: "Cats sometimes _____ food.", answer: "steal", hint: "Take without asking" },
      { text: "_____ is very strong.", answer: "Steel", hint: "The metal" },
      { text: "Never _____ from others.", answer: "steal", hint: "Take wrongly" },
    ],
  },
  {
    id: "complement_compliment",
    words: [
      {
        word: "complement",
        meaning: "Something that completes or goes well with",
        example: "The wine complements the meal.",
        tip: "ComplementE - E for 'complEte'!",
      },
      {
        word: "compliment",
        meaning: "A nice comment or praise",
        example: "She gave me a lovely compliment.",
        tip: "ComplIment - I for 'I like you'!",
      },
    ],
    sentences: [
      { text: "That scarf _____ your outfit.", answer: "complements", hint: "Goes well with" },
      { text: "Thank you for the kind _____!", answer: "compliment", hint: "Nice words" },
      { text: "Red and green _____ each other.", answer: "complement", hint: "Complete each other" },
      { text: "I want to _____ your work.", answer: "compliment", hint: "Praise" },
      { text: "The sauce is a perfect _____.", answer: "complement", hint: "Addition that completes" },
    ],
  },
  {
    id: "precede_proceed",
    words: [
      {
        word: "precede",
        meaning: "To come before",
        example: "Thunder precedes lightning... wait, no!",
        tip: "PREcede = PRE means before!",
      },
      {
        word: "proceed",
        meaning: "To continue or go forward",
        example: "Please proceed to the exit.",
        tip: "PROceed = PRO means forward!",
      },
    ],
    sentences: [
      { text: "A usually _____ B in the alphabet.", answer: "precedes", hint: "Comes before" },
      { text: "You may _____ with the test.", answer: "proceed", hint: "Continue" },
      { text: "Spring _____ summer.", answer: "precedes", hint: "Comes before" },
      { text: "Please _____ to gate 5.", answer: "proceed", hint: "Go forward to" },
      { text: "The introduction _____ the main text.", answer: "precedes", hint: "Comes before" },
    ],
  },
];

// Get all homophone words as a flat list
export function getAllHomophoneWords(): string[] {
  const words: string[] = [];
  homophones.forEach((set) => {
    set.words.forEach((w) => {
      if (!words.includes(w.word)) {
        words.push(w.word);
      }
    });
  });
  return words;
}

// Get a homophone set by ID
export function getHomophoneSet(id: string): HomophoneSet | undefined {
  return homophones.find((set) => set.id === id);
}

// Get random homophone sets for a challenge
export function getRandomHomophoneSets(count: number): HomophoneSet[] {
  const shuffled = [...homophones].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get a random sentence from a homophone set
export function getRandomSentence(setId: string): HomophoneSet["sentences"][0] | undefined {
  const set = getHomophoneSet(setId);
  if (!set || set.sentences.length === 0) return undefined;
  return set.sentences[Math.floor(Math.random() * set.sentences.length)];
}


