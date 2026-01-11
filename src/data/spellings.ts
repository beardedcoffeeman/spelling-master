// Year level type
export type YearLevel = 'year2' | 'year6';

// Year 2 Spelling List (200+ words)
export const year2Spellings = [
  "wood", "afraid", "coin", "week", "bright", "coach", "group", "search", "before", "scared",
  "annoying", "thirsty", "statue", "whisper", "phone", "morning", "drew", "tomatoes", "haunted", "Thursday",
  "key", "monkey", "chimney", "valley", "money", "alley", "honey", "trolley", "door", "because",
  "word", "worse", "world", "war", "warmer", "ball", "walk", "beanstalk", "find", "child",
  "wasp", "wallet", "squash", "wander", "other", "brother", "nothing", "mother", "wild", "climb",
  "wrap", "wreck", "knock", "knight", "knit", "gnome", "gnaw", "sign", "gold", "everybody",
  "badge", "sledge", "village", "cage", "gem", "energy", "jam", "jacket", "even", "only",
  "cereal", "ice", "race", "circus", "cinema", "city", "bicycle", "fancy", "behind", "floor",
  "cry", "fly", "dry", "reply", "flies", "dries", "copies", "babies", "break", "poor",
  "copying", "copied", "crying", "cried", "replying", "replied", "drying", "dried", "kind", "hold",
  "donkeys", "worth", "towards", "hall", "watch", "come", "wrote", "design", "fudge", "decide",
  "spy", "spies", "try", "tries", "parties", "fry", "fries", "why", "steak", "pretty",
  "wriggle", "nettle", "sizzle", "beetle", "table", "steeple", "crumple", "candle", "beautiful", "fast",
  "medal", "capital", "hospital", "animal", "national", "fossil", "April", "pencil", "grass", "bath",
  "spied", "happier", "funnier", "chilliest", "luckiest", "frying", "skiing", "happiest", "hour", "eye",
  "sliding", "hiking", "completed", "amazed", "timer", "ripest", "shiny", "smiled", "plant", "path",
  "rubbing", "hugged", "runner", "biggest", "runny", "swimming", "clapped", "planned", "improve", "sugar",
  "can't", "don't", "won't", "you've", "he'll", "you're", "couldn't", "haven't", "pass", "move",
  "mind", "children", "most", "cold", "great", "told", "prove", "last", "sure", "after",
  "bubble", "tumble", "pedal", "ladies", "happiest", "baking", "closest", "hummed", "wouldn't", "won't",
  "freshness", "sickness", "enjoyment", "treatment", "movement", "brightness", "payment", "happiness", "would", "who",
  "forgetful", "joyful", "playful", "painless", "fearless", "hopeless", "plentiful", "useless", "whole", "any",
  "television", "treasure", "usual", "measure", "leisure", "pleasure", "pressure", "unsure", "many", "clothes",
  "whiteboard", "butterfly", "handbag", "lighthouse", "rainbow", "moonlight", "flowerpot", "goldfish", "busy", "people",
  "there", "their", "they're", "here", "hear", "quite", "quiet", "one", "won", "water",
  "station", "fiction", "section", "motion", "position", "relation", "fraction", "nation", "again", "half",
  "sister's", "brother's", "girl's", "child's", "man's", "boy's", "woman's", "grandfather's", "Mr", "Mrs",
  "money", "parents", "rock", "both", "should", "plant", "habitat", "food", "air", "metal",
  "number", "twenty", "plastic", "brick", "squashing", "bending", "twisting", "stretching", "cardboard", "forty",
] as const;

export type Year2Spelling = (typeof year2Spellings)[number];

// Year 5/6 Statutory Spelling List (100 words)
// From the UK National Curriculum

export const statutorySpellings = [
  "accommodate",
  "accompany",
  "according",
  "achieve",
  "aggressive",
  "amateur",
  "ancient",
  "apparent",
  "appreciate",
  "attached",
  "available",
  "average",
  "awkward",
  "bargain",
  "bruise",
  "category",
  "cemetery",
  "committee",
  "communicate",
  "community",
  "competition",
  "conscience",
  "conscious",
  "controversy",
  "convenience",
  "correspond",
  "criticise",
  "curiosity",
  "definite",
  "desperate",
  "determined",
  "develop",
  "dictionary",
  "disastrous",
  "embarrass",
  "environment",
  "equip",
  "equipped",
  "equipment",
  "especially",
  "exaggerate",
  "excellent",
  "existence",
  "explanation",
  "familiar",
  "foreign",
  "forty",
  "frequently",
  "government",
  "guarantee",
  "harass",
  "hindrance",
  "identity",
  "immediate",
  "immediately",
  "individual",
  "interfere",
  "interrupt",
  "language",
  "leisure",
  "lightning",
  "marvellous",
  "mischievous",
  "muscle",
  "necessary",
  "neighbour",
  "nuisance",
  "occupy",
  "occur",
  "opportunity",
  "parliament",
  "persuade",
  "physical",
  "prejudice",
  "privilege",
  "profession",
  "programme",
  "pronunciation",
  "queue",
  "recognise",
  "recommend",
  "relevant",
  "restaurant",
  "rhyme",
  "rhythm",
  "sacrifice",
  "secretary",
  "shoulder",
  "signature",
  "sincere",
  "sincerely",
  "soldier",
  "stomach",
  "sufficient",
  "suggest",
  "symbol",
  "system",
  "temperature",
  "thorough",
  "twelfth",
  "variety",
  "vegetable",
  "vehicle",
  "yacht",
] as const;

export type StatutorySpelling = (typeof statutorySpellings)[number];

// Common misspellings for each word (used to generate incorrect options)
export const commonMisspellings: Record<string, string[]> = {
  accommodate: ["accomodate", "acommodate", "acomodate"],
  accompany: ["accompeny", "acompany", "accompany"],
  according: ["acording", "accordding", "accourding"],
  achieve: ["acheive", "acheve", "acheeve"],
  aggressive: ["agressive", "aggresive", "agresive"],
  amateur: ["amature", "amatuer", "amater"],
  ancient: ["anciant", "anceint", "anciont"],
  apparent: ["apparant", "aparent", "apparrent"],
  appreciate: ["apreciate", "appriciate", "appreciat"],
  attached: ["atached", "attatch", "attatchd"],
  available: ["availible", "avaliable", "availble"],
  average: ["avrage", "averige", "avarage"],
  awkward: ["akward", "awkard", "aukward"],
  bargain: ["bargin", "bargian", "bargan"],
  bruise: ["bruse", "bruze", "broose"],
  category: ["catagory", "categary", "categorey"],
  cemetery: ["cemetary", "cematery", "cemetry"],
  committee: ["comittee", "commitee", "committe"],
  communicate: ["comunicate", "communciate", "communicat"],
  community: ["comunity", "communtiy", "comunaty"],
  competition: ["competion", "compitition", "competiton"],
  conscience: ["concience", "consience", "concsience"],
  conscious: ["concious", "consious", "consciuos"],
  controversy: ["contraversy", "controversey", "controvesy"],
  convenience: ["convienience", "conveniance", "conveniece"],
  correspond: ["corespond", "correspont", "corrispond"],
  criticise: ["critisize", "criticize", "critisise"],
  curiosity: ["curiousity", "curiosty", "curoisity"],
  definite: ["definate", "definit", "deffinite"],
  desperate: ["desparate", "desprate", "despirate"],
  determined: ["determed", "determind", "detirmined"],
  develop: ["develope", "devolop", "develep"],
  dictionary: ["dictonary", "dictionery", "dictionnary"],
  disastrous: ["disasterous", "disastrus", "disastorous"],
  embarrass: ["embarass", "embarras", "embaress"],
  environment: ["enviroment", "enviornment", "enviromnent"],
  equip: ["equipe", "equib", "equpp"],
  equipped: ["equiped", "equippd", "equippt"],
  equipment: ["equipement", "equiptment", "equpiment"],
  especially: ["especailly", "especialy", "espesially"],
  exaggerate: ["exagerate", "exaggarate", "exadgerate"],
  excellent: ["excelent", "excellant", "exellent"],
  existence: ["existance", "existense", "existince"],
  explanation: ["explaination", "explination", "explantion"],
  familiar: ["familar", "familliar", "familier"],
  foreign: ["foriegn", "foregn", "foren"],
  forty: ["fourty", "fortey", "fourtie"],
  frequently: ["frequantly", "frequentley", "frequintly"],
  government: ["goverment", "governmant", "govermant"],
  guarantee: ["garantee", "guarentee", "gaurantee"],
  harass: ["harrass", "harras", "haras"],
  hindrance: ["hinderance", "hindrence", "hindrace"],
  identity: ["identidy", "idendity", "identitey"],
  immediate: ["immedate", "immediat", "imediate"],
  immediately: ["immediatly", "imediately", "immediatley"],
  individual: ["indavidual", "individuall", "individuel"],
  interfere: ["interfear", "interfer", "intarfere"],
  interrupt: ["interupt", "interuupt", "interrup"],
  language: ["langauge", "languge", "languege"],
  leisure: ["liesure", "lesure", "leizure"],
  lightning: ["lightening", "lightnin", "ligtning"],
  marvellous: ["marvelous", "marvellus", "marveleous"],
  mischievous: ["mischevious", "mischivous", "mischeivous"],
  muscle: ["muscel", "mussle", "muscl"],
  necessary: ["neccessary", "necessery", "neccesary"],
  neighbour: ["nieghbour", "neigbour", "neighbur"],
  nuisance: ["nuisence", "nusiance", "nuisanse"],
  occupy: ["ocupy", "occopy", "occupi"],
  occur: ["ocur", "occure", "ocurr"],
  opportunity: ["oportunity", "oppertunity", "opportunaty"],
  parliament: ["parliment", "parlaiment", "parlament"],
  persuade: ["pursuade", "persaude", "perswade"],
  physical: ["phisical", "physicle", "physacal"],
  prejudice: ["predjudice", "prejudis", "prejudace"],
  privilege: ["priviledge", "privelege", "privelige"],
  profession: ["proffession", "profesion", "proffesion"],
  programme: ["program", "programe", "programm"],
  pronunciation: ["pronounciation", "prononciation", "pronunciaton"],
  queue: ["que", "queu", "qeue"],
  recognise: ["reconise", "recoginse", "recognice"],
  recommend: ["recomend", "reccommend", "reccomend"],
  relevant: ["relevent", "relavent", "relevnt"],
  restaurant: ["restarant", "resturant", "restraunt"],
  rhyme: ["ryme", "rhym", "rime"],
  rhythm: ["rythm", "rhythym", "rythym"],
  sacrifice: ["sacrifise", "sacrefice", "sacrific"],
  secretary: ["secratary", "secretery", "secretry"],
  shoulder: ["sholder", "shouder", "shouldar"],
  signature: ["signiture", "signiature", "signatue"],
  sincere: ["sincear", "sincer", "sinscere"],
  sincerely: ["sincerly", "sinceerly", "sincerelley"],
  soldier: ["solider", "soldiar", "soilder"],
  stomach: ["stomache", "stomack", "stomech"],
  sufficient: ["sufficent", "sufficiant", "sufficinet"],
  suggest: ["suggesttt", "sugest", "sugggest"],
  symbol: ["simbole", "symble", "symbel"],
  system: ["systam", "sistem", "systm"],
  temperature: ["temprature", "temperture", "tempature"],
  thorough: ["thourough", "thorogh", "thurugh"],
  twelfth: ["twelth", "twelvth", "twelfeth"],
  variety: ["varity", "variaty", "varieity"],
  vegetable: ["vegatable", "vegetible", "vegtable"],
  vehicle: ["vehical", "vehicel", "vehiclle"],
  yacht: ["yatch", "yaht", "yaucht"],
};

// Common misspellings for Year 2 words
export const commonMisspellingsYear2: Record<string, string[]> = {
  afraid: ["affraid", "afrade", "afrayd"],
  because: ["becaus", "becuase", "becoz"],
  beautiful: ["butiful", "beutiful", "beautifull"],
  before: ["befor", "befour", "befoar"],
  bright: ["brite", "brigt", "bryght"],
  brother: ["bruther", "brohter", "brothar"],
  butterfly: ["butterflie", "buterfly", "butterflye"],
  children: ["childern", "childran", "childs"],
  chimney: ["chimny", "chimmney", "chimnie"],
  clothes: ["cloths", "cloathes", "cloes"],
  could: ["cood", "culd", "coulld"],
  "couldn't": ["couldnt", "coodnt", "cudnt"],
  "don't": ["dont", "do'nt", "doent"],
  energy: ["energey", "enrgy", "enerji"],
  everybody: ["evrybody", "everybodey", "evreybody"],
  friend: ["freind", "frend", "friand"],
  gnome: ["nome", "gnom", "noam"],
  great: ["grate", "greet", "graat"],
  happiness: ["happyness", "hapiness", "happines"],
  hospital: ["hospitol", "hospitel", "hospitall"],
  morning: ["moring", "mourning", "morninng"],
  mother: ["muther", "mothar", "mothur"],
  national: ["nashional", "nationl", "natinal"],
  people: ["peeple", "peopel", "peple"],
  pretty: ["pritty", "prety", "prettie"],
  should: ["shood", "shoud", "shuld"],
  station: ["stashun", "stasion", "stattion"],
  television: ["telavision", "televishun", "televison"],
  "they're": ["their", "there", "theyre"],
  treasure: ["tresure", "treasur", "treshure"],
  village: ["vilage", "villij", "villige"],
  whisper: ["wisper", "whissper", "whispur"],
  would: ["wood", "wuld", "woud"],
  "wouldn't": ["wouldnt", "woodnt", "wudnt"],
  "you're": ["your", "youre", "yr"],
};

// Get a random selection of words for a challenge
export function getRandomWords(count: number, exclude: string[] = []): string[] {
  const available = statutorySpellings.filter((word) => !exclude.includes(word));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get random words by year level
export function getRandomWordsByYear(
  yearLevel: YearLevel,
  count: number,
  exclude: string[] = []
): string[] {
  const wordList = yearLevel === 'year2' ? year2Spellings : statutorySpellings;
  const available = wordList.filter((word) => !exclude.includes(word));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get misspellings for a word (for multiple choice questions)
export function getMisspellings(word: string): string[] {
  // Check both Year 6 and Year 2 misspellings
  return commonMisspellings[word] || commonMisspellingsYear2[word] || generateMisspellings(word);
}

// Generate plausible misspellings if not in database
function generateMisspellings(word: string): string[] {
  const misspellings: string[] = [];
  
  // Double a consonant
  const consonants = word.match(/[bcdfghjklmnpqrstvwxyz]/gi);
  if (consonants && consonants.length > 0) {
    const randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
    misspellings.push(word.replace(randomConsonant, randomConsonant + randomConsonant));
  }
  
  // Swap vowels
  const vowelSwaps: Record<string, string> = { a: "e", e: "i", i: "e", o: "a", u: "o" };
  const vowels = word.match(/[aeiou]/gi);
  if (vowels && vowels.length > 0) {
    const randomVowel = vowels[Math.floor(Math.random() * vowels.length)].toLowerCase();
    if (vowelSwaps[randomVowel]) {
      misspellings.push(word.replace(new RegExp(randomVowel, "i"), vowelSwaps[randomVowel]));
    }
  }
  
  // Remove a letter
  if (word.length > 4) {
    const pos = Math.floor(Math.random() * (word.length - 2)) + 1;
    misspellings.push(word.slice(0, pos) + word.slice(pos + 1));
  }
  
  return misspellings;
}


