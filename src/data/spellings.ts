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

// Get a random selection of words for a challenge
export function getRandomWords(count: number, exclude: string[] = []): string[] {
  const available = statutorySpellings.filter((word) => !exclude.includes(word));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get misspellings for a word (for multiple choice questions)
export function getMisspellings(word: string): string[] {
  return commonMisspellings[word] || generateMisspellings(word);
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


