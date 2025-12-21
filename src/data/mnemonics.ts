// Mnemonics and memory tricks for Year 5/6 statutory spellings

export interface Mnemonic {
  word: string;
  tricks: string[];
  tip?: string;
  visual?: string;
}

export const mnemonics: Record<string, Mnemonic> = {
  accommodate: {
    word: "accommodate",
    tricks: [
      "Accommodation has 2 Cs (two cots) and 2 Ms (two mattresses)",
      "A Comfortable Chair Or Mat Makes One Doze And Totally Enjoy",
    ],
    tip: "Two Cs and two Ms - like two beds in a hotel room!",
    visual: "hotel",
  },
  accompany: {
    word: "accompany",
    tricks: [
      "I ACCompany my friend to get COMPANY",
      "Two Cs accompany each other in this word",
    ],
    tip: "Remember: ACC + COMPANY",
  },
  according: {
    word: "according",
    tricks: [
      "ACC-OR-DING - like pressing accord on a keyboard",
      "Two Cs according to the rules",
    ],
    tip: "Double C at the start",
  },
  achieve: {
    word: "achieve",
    tricks: [
      "I before E - ACHIEVE your goal!",
      "A CHef can achIEve great things",
    ],
    tip: "I before E in achieve",
  },
  aggressive: {
    word: "aggressive",
    tricks: [
      "Two Gs are AGGRESSIVE - they're having a fight!",
      "AGG! RESS! IVE! - break it into chunks",
    ],
    tip: "Double G and double S",
    visual: "angry_face",
  },
  amateur: {
    word: "amateur",
    tricks: [
      "AMA-TEUR - An Amateur Makes A Tremendous Effort Using Resources",
      "I AM A TEUR-rible speller but learning!",
    ],
    tip: "Ends in -EUR not -URE",
  },
  ancient: {
    word: "ancient",
    tricks: [
      "AN-C-I-ENT - Ancient Caves In Egypt Need Tourists",
      "I before E except after C... but not here! ANCIENT breaks the rule",
    ],
    tip: "IE comes after C here",
  },
  apparent: {
    word: "apparent",
    tricks: [
      "It's APPARENT that there are two Ps - A PARENT knows!",
      "APP-ARENT - like opening an app to find a parent",
    ],
    tip: "Two Ps, one R, ends in -ENT",
  },
  appreciate: {
    word: "appreciate",
    tricks: [
      "I really APPRECIATE the two Ps in this word",
      "APP-RECIATE - like rating an app you appreciate",
    ],
    tip: "Double P, then -RECIATE",
  },
  attached: {
    word: "attached",
    tricks: [
      "AT-TACHED - double T keeps things firmly attached",
      "Two Ts are attached together",
    ],
    tip: "Double T in the middle",
  },
  available: {
    word: "available",
    tricks: [
      "A-VAIL-ABLE - A Veil Is Available For The Bride",
      "I'm ABLE to get what's AVAIL-ABLE",
    ],
    tip: "A-I-L-A-B-L-E at the end",
  },
  average: {
    word: "average",
    tricks: [
      "AVE-RAGE - on average, I feel rage about spelling!",
      "An AVERAGE person lives on an AVE-nue",
    ],
    tip: "A-V-E at the start",
  },
  awkward: {
    word: "awkward",
    tricks: [
      "AWK-WARD - A Weird Kid Was Acting Really Dumb",
      "The W is AWKWARD - it's silent but there!",
    ],
    tip: "W after A, before K",
    visual: "awkward_person",
  },
  bargain: {
    word: "bargain",
    tricks: [
      "BAR-GAIN - I GAIN a lot at the BAR when prices drop",
      "What a GAIN! What a BAR-GAIN!",
    ],
    tip: "Ends in -AIN not -EN",
  },
  bruise: {
    word: "bruise",
    tricks: [
      "BRU-ISE - U and I get hurt in a bruise",
      "Big Red Ugly Injury Shows Everywhere",
    ],
    tip: "U before I",
    visual: "bruise",
  },
  category: {
    word: "category",
    tricks: [
      "CAT-E-GORY - A CAT in Every GORY category of horror!",
      "CATE loves to GORY-fy things into categories",
    ],
    tip: "E in the middle, not A",
  },
  cemetery: {
    word: "cemetery",
    tricks: [
      "Imagine screaming 'E-E-E!' as you walk past the cemEtEry",
      "Three Es in cEmEtEry - like three gravestones!",
    ],
    tip: "E-E-E - all Es, no As!",
    visual: "gravestones",
  },
  committee: {
    word: "committee",
    tricks: [
      "COMMIT-TEE - The committee must COMMIT to double letters",
      "Double M, double T, double E - committees love pairs!",
    ],
    tip: "MM, TT, EE - all doubles",
  },
  communicate: {
    word: "communicate",
    tricks: [
      "COMMUNI-CATE - Communication starts in your COMMUNITY",
      "Double M to communicate clearly",
    ],
    tip: "Double M, ends in -ATE",
  },
  community: {
    word: "community",
    tricks: [
      "COMM-UNITY - A community has UNITY with double M",
      "MM brings the community together",
    ],
    tip: "Double M, then UNITY",
  },
  competition: {
    word: "competition",
    tricks: [
      "COMPETI-TION - I COMPETE in the competition",
      "PET your ego in a comPETition",
    ],
    tip: "PETITION with COM- prefix",
  },
  conscience: {
    word: "conscience",
    tricks: [
      "CON-SCIENCE - Your conscience has a SCIENCE to it",
      "My conscience tells me there's SCIENCE in decisions",
    ],
    tip: "SCIENCE is hidden inside!",
    visual: "brain",
  },
  conscious: {
    word: "conscious",
    tricks: [
      "SCI in the middle - you need SCIENCE to be conscious",
      "Are you CONSCIOUS of the SCI inside?",
    ],
    tip: "SCI in the middle, -OUS at end",
  },
  controversy: {
    word: "controversy",
    tricks: [
      "CONTRO-VERSY - It's CONTROVERSIAL to go AGAINST (contro) poetry (verse)",
      "OVER a controversy? CONTRO-VERSY!",
    ],
    tip: "CONTRO + VERSY",
  },
  convenience: {
    word: "convenience",
    tricks: [
      "CONVENI-ENCE - It's convenient to remember CONVEN + I + ENCE",
      "For your CONVENIENCE, there's VENI in the middle",
    ],
    tip: "I before ENCE",
  },
  correspond: {
    word: "correspond",
    tricks: [
      "CORRE-SPOND - Two Rs correspond with each other",
      "I'll RESPOND if you CORRESPOND",
    ],
    tip: "Double R, then SPOND",
  },
  criticise: {
    word: "criticise",
    tricks: [
      "CRITIC-ISE - A CRITIC likes to criticISE",
      "Don't criticISE - use ISE not IZE in UK!",
    ],
    tip: "UK spelling uses -ISE",
  },
  curiosity: {
    word: "curiosity",
    tricks: [
      "CURIOS-ITY - CURIOUS things spark curiosity",
      "I get CURIOUS about curiosITY",
    ],
    tip: "Remove the U from CURIOUS, add ITY",
  },
  definite: {
    word: "definite",
    tricks: [
      "There's FINITE in deFINITEly!",
      "DE-FIN-ITE - I FINished, so it's definite",
    ],
    tip: "I not A - deFINITE not definate",
    visual: "checkmark",
  },
  desperate: {
    word: "desperate",
    tricks: [
      "DESPER-ATE - I'm so desperate I ATE everything!",
      "DES-PER-ATE - three clear chunks",
    ],
    tip: "A not E - desperAte not desperEte",
  },
  determined: {
    word: "determined",
    tricks: [
      "DETER-MINED - I'm determined to MINE for success",
      "I'm deTERmined - TER in the middle",
    ],
    tip: "E-R in the middle",
  },
  develop: {
    word: "develop",
    tricks: [
      "DEVELOP has no E at the end - it's still developing!",
      "DE-VEL-OP - Don't add an E!",
    ],
    tip: "No E at the end!",
  },
  dictionary: {
    word: "dictionary",
    tricks: [
      "DICTION-ARY - Good DICTION needs a dictionary",
      "DICT + ION + ARY - speak (dict) well",
    ],
    tip: "DICTION + ARY",
  },
  disastrous: {
    word: "disastrous",
    tricks: [
      "DIS-ASTR-OUS - No E! It's DISASTR-OUS, not disasterous",
      "DISASTER minus ER plus OUS",
    ],
    tip: "No E before OUS!",
  },
  embarrass: {
    word: "embarrass",
    tricks: [
      "I went Really Red And felt So Silly - 2 Rs, 2 Ss!",
      "Two Rs and two Ss - double embarrassment!",
    ],
    tip: "Double R, double S",
    visual: "red_face",
  },
  environment: {
    word: "environment",
    tricks: [
      "There's IRON in the environment - envirONMENt",
      "ENV-IRON-MENT - iron is in our environment",
    ],
    tip: "IRON in the middle, NM together",
  },
  equip: {
    word: "equip",
    tricks: [
      "EQUIP - Every Queen Uses Intelligent Planners",
      "Short and sweet - just EQUIP",
    ],
    tip: "No double letters",
  },
  equipped: {
    word: "equipped",
    tricks: [
      "EQUIP + PED = EQUIPPED - double P when adding -ED",
      "You need double P to be fully equipped",
    ],
    tip: "Double P when adding -ED",
  },
  equipment: {
    word: "equipment",
    tricks: [
      "EQUIP + MENT = EQUIPMENT - no double P here!",
      "Only one P in equipMENT",
    ],
    tip: "Single P with -MENT",
  },
  especially: {
    word: "especially",
    tricks: [
      "ESP-ECIALLY - ESPecially special!",
      "I ESPECIALLY like the ESP at the start",
    ],
    tip: "ESP at start, -ALLY at end",
  },
  exaggerate: {
    word: "exaggerate",
    tricks: [
      "Don't exAGGerate - there are two Gs!",
      "EX-AGGER-ATE - AGGer is in there twice exaggerating!",
    ],
    tip: "Double G in the middle",
  },
  excellent: {
    word: "excellent",
    tricks: [
      "EX-CELL-ENT - An EXCELLENT cell in biology!",
      "Two Ls make it EXCELLENT",
    ],
    tip: "Double L, ends in -ENT",
  },
  existence: {
    word: "existence",
    tricks: [
      "EXIST-ENCE - Things that EXIST have an existENCE",
      "EXIST + ENCE (not ANCE)",
    ],
    tip: "ENCE not ANCE",
  },
  explanation: {
    word: "explanation",
    tricks: [
      "EXPLAN-ATION - I need to EXPLAIN my explanation",
      "EXPLAIN becomes EXPLANATION - the I changes to A",
    ],
    tip: "A not I - explanAtion",
  },
  familiar: {
    word: "familiar",
    tricks: [
      "FAMIL-IAR - Your FAMILY is familiar",
      "A LIAR in my family? That's not familiar!",
    ],
    tip: "FAMIL + IAR",
    visual: "family",
  },
  foreign: {
    word: "foreign",
    tricks: [
      "FOR-EIGN - E before I in FOREIGN (exception to rule!)",
      "It's FOREIGN to have E before I after no C!",
    ],
    tip: "E before I (exception!)",
  },
  forty: {
    word: "forty",
    tricks: [
      "FORTY has no U - it's NOT FOURTY!",
      "FORTY is FOUR minus the U",
    ],
    tip: "No U! Just FORTY",
    visual: "number_40",
  },
  frequently: {
    word: "frequently",
    tricks: [
      "FREQUENT-LY - I FREQUENTLY visit",
      "FRE-QUENT-LY - break it down",
    ],
    tip: "FREQUENT + LY",
  },
  government: {
    word: "government",
    tricks: [
      "GOVERN-MENT - The government must GOVERN",
      "There's an N before M - goverNMent",
    ],
    tip: "Don't forget the N before M!",
  },
  guarantee: {
    word: "guarantee",
    tricks: [
      "GUA-RAN-TEE - I GUARANTEE there's a U after G",
      "Guard your guarantee - GUA at start",
    ],
    tip: "GUA at start, double E at end",
  },
  harass: {
    word: "harass",
    tricks: [
      "HAR-ASS - One R, two Ss - don't harass me!",
      "A donkey (ass) with one R harasses",
    ],
    tip: "One R, two Ss",
  },
  hindrance: {
    word: "hindrance",
    tricks: [
      "HIND-RANCE - What's behind (hind) is a hindrance",
      "No E before RANCE",
    ],
    tip: "RANCE not ERANCE",
  },
  identity: {
    word: "identity",
    tricks: [
      "I-DENT-ITY - Your identity has a DENT in it",
      "ID + ENTITY = IDENTITY (sort of!)",
    ],
    tip: "I at start and end",
  },
  immediate: {
    word: "immediate",
    tricks: [
      "IM-MEDI-ATE - IMMEDIATELY needs double M",
      "MM for immediate action!",
    ],
    tip: "Double M, ends in -ATE",
  },
  immediately: {
    word: "immediately",
    tricks: [
      "IMMEDIATE-LY - Just add LY to immediate",
      "Double M, ends in -ATELY",
    ],
    tip: "IMMEDIATE + LY",
  },
  individual: {
    word: "individual",
    tricks: [
      "IN-DIVID-UAL - DIVIDE people into individuals",
      "Each INDIVIDUAL is not DIVIDED",
    ],
    tip: "DIVID in the middle",
  },
  interfere: {
    word: "interfere",
    tricks: [
      "INTER-FERE - Don't let anyone INTERFERE between (inter) us",
      "INTER + FERE - two Es at the end",
    ],
    tip: "Ends in -ERE not -EAR",
  },
  interrupt: {
    word: "interrupt",
    tricks: [
      "INTER-RUPT - It's RUDE to interrupt!",
      "Double R in the middle - inter-RR-upt",
    ],
    tip: "Double R",
  },
  language: {
    word: "language",
    tricks: [
      "LANGU-AGE - Learning a LANGUAGE takes AGES",
      "Your tongue (lingua) helps with language",
    ],
    tip: "U before A - GUAGE",
  },
  leisure: {
    word: "leisure",
    tricks: [
      "LEI-SURE - I'm SURE I need leisure time",
      "E before I in leisure (another exception!)",
    ],
    tip: "E before I",
  },
  lightning: {
    word: "lightning",
    tricks: [
      "LIGHT-NING - Lightning is LIGHT + NING, no E!",
      "Not lightening (making lighter) - LIGHTNING in sky!",
    ],
    tip: "No E - not lightening!",
    visual: "lightning",
  },
  marvellous: {
    word: "marvellous",
    tricks: [
      "MARVEL-LOUS - MARVEL at the double L!",
      "UK spelling: marveLLous with two Ls",
    ],
    tip: "Double L in UK spelling",
  },
  mischievous: {
    word: "mischievous",
    tricks: [
      "MIS-CHIE-VOUS - MISCHIEF without the F + OUS",
      "No I after V! mis-CHIE-vous, not mischievious",
    ],
    tip: "No I after V - just VOUS",
  },
  muscle: {
    word: "muscle",
    tricks: [
      "MUS-CLE - You need musCLEs to lift!",
      "There's a silent C - musCle",
    ],
    tip: "Silent C before L",
    visual: "muscle_arm",
  },
  necessary: {
    word: "necessary",
    tricks: [
      "A shirt has 1 Collar and 2 Sleeves (1 C and 2 Ss)",
      "Never Eat Crisps, Eat Salad Sandwiches And Remain Young!",
    ],
    tip: "1 C, 2 Ss - like a shirt!",
    visual: "shirt",
  },
  neighbour: {
    word: "neighbour",
    tricks: [
      "NEIGH-BOUR - Your NEIGHBOUR says NEIGH like a horse",
      "E before I in neighbour",
    ],
    tip: "UK spelling with -OUR",
    visual: "horse",
  },
  nuisance: {
    word: "nuisance",
    tricks: [
      "NUI-SANCE - What a NUISANCE to spell!",
      "U before I in nuisance",
    ],
    tip: "U before I",
  },
  occupy: {
    word: "occupy",
    tricks: [
      "OCC-UPY - Two Cs OCCUPY this word",
      "OCCupy has double C",
    ],
    tip: "Double C",
  },
  occur: {
    word: "occur",
    tricks: [
      "OC-CUR - Two Cs OCCUR in occur",
      "Things OCCUR with double C",
    ],
    tip: "Double C",
  },
  opportunity: {
    word: "opportunity",
    tricks: [
      "OP-PORT-UNITY - OPPORTUNITY knocks at your PORT twice (double P)",
      "Two Ps for double opportunity!",
    ],
    tip: "Double P",
    visual: "door",
  },
  parliament: {
    word: "parliament",
    tricks: [
      "PARLIA-MENT - I AM in parliament!",
      "There's an I in parlIAment",
    ],
    tip: "I before A - pariIAment",
  },
  persuade: {
    word: "persuade",
    tricks: [
      "PER-SUADE - I'll PERsonally SUADE you",
      "SUA in the middle - persuAde",
    ],
    tip: "UA in middle, not AU",
  },
  physical: {
    word: "physical",
    tricks: [
      "PHYS-ICAL - PHYSICS is physical",
      "Y after PH - PHYSical",
    ],
    tip: "Y not I after PH",
  },
  prejudice: {
    word: "prejudice",
    tricks: [
      "PRE-JUDICE - To PREJUDGE is prejudice",
      "JUDGE with PRE- prefix",
    ],
    tip: "PRE + JUDICE",
  },
  privilege: {
    word: "privilege",
    tricks: [
      "PRIVI-LEGE - It's a priviLEGE to have two LEGs!",
      "No D - it's not privileDge!",
    ],
    tip: "No D! LEGE not LEDGE",
    visual: "legs",
  },
  profession: {
    word: "profession",
    tricks: [
      "PRO-FESS-ION - PROFESsionals have a profession",
      "One F, double S - profeSSion",
    ],
    tip: "One F, double S",
  },
  programme: {
    word: "programme",
    tricks: [
      "PROG-RAMME - UK spelling has -MME",
      "Double M in UK programme",
    ],
    tip: "UK: double M, ends in -MME",
  },
  pronunciation: {
    word: "pronunciation",
    tricks: [
      "PRO-NUN-CI-ATION - It's proNUNciation, not proNOUNciation!",
      "No O after N - NUN not NOUN!",
    ],
    tip: "NUN not NOUN!",
  },
  queue: {
    word: "queue",
    tricks: [
      "Q-U-E-U-E - Q with 4 silent letters waiting in line!",
      "Only the Q makes a sound - the rest are queuing!",
    ],
    tip: "Q + 4 silent letters",
    visual: "queue",
  },
  recognise: {
    word: "recognise",
    tricks: [
      "RE-COG-NISE - I recognISE the UK spelling",
      "UK uses -ISE not -IZE",
    ],
    tip: "UK spelling: -ISE",
  },
  recommend: {
    word: "recommend",
    tricks: [
      "RE-COMM-END - I RECOMMEND double M",
      "One C, two Ms - recoMMend",
    ],
    tip: "One C, double M",
  },
  relevant: {
    word: "relevant",
    tricks: [
      "REL-EV-ANT - The elephant is relevant!",
      "E not A - relevANT ends in ANT",
    ],
    tip: "Ends in -ANT not -ENT",
  },
  restaurant: {
    word: "restaurant",
    tricks: [
      "REST-AUR-ANT - I REST at a restaurant",
      "AU in the middle - restAUrant",
    ],
    tip: "AU in the middle",
    visual: "restaurant",
  },
  rhyme: {
    word: "rhyme",
    tricks: [
      "RH-YME - Rhythm Helps Your Mind Enjoy rhyme",
      "Silent H after R",
    ],
    tip: "RH at start, Y not I",
  },
  rhythm: {
    word: "rhythm",
    tricks: [
      "Rhythm Helps Your Two Hips Move",
      "R-H-Y-T-H-M - two Hs, no vowels visible!",
    ],
    tip: "No normal vowels!",
    visual: "dancing",
  },
  sacrifice: {
    word: "sacrifice",
    tricks: [
      "SACRI-FICE - I SACRIFICE for my friends",
      "Ends in FICE not FISE",
    ],
    tip: "Ends in -ICE",
  },
  secretary: {
    word: "secretary",
    tricks: [
      "SECRET-ARY - A secretary keeps SECRETS",
      "SECRET + ARY",
    ],
    tip: "SECRET + ARY",
  },
  shoulder: {
    word: "shoulder",
    tricks: [
      "SHOUL-DER - Should I hurt my shoulder?",
      "SHOULD without the D at end, plus ER",
    ],
    tip: "SHOUL + DER",
  },
  signature: {
    word: "signature",
    tricks: [
      "SIGNA-TURE - Your SIGN becomes your signature",
      "SIGN + ATURE",
    ],
    tip: "SIGN + ATURE",
  },
  sincere: {
    word: "sincere",
    tricks: [
      "SIN-CERE - I'm SINCERE, no SIN here!",
      "ERE at the end, not EAR",
    ],
    tip: "Ends in -ERE",
  },
  sincerely: {
    word: "sincerely",
    tricks: [
      "SINCERE-LY - Just add LY to sincere",
      "Keep the E before adding LY",
    ],
    tip: "Keep E + add LY",
  },
  soldier: {
    word: "soldier",
    tricks: [
      "SOLD-IER - A soldier SOLD his soul for duty",
      "DIE is in solDIEr",
    ],
    tip: "SOLD + IER",
    visual: "soldier",
  },
  stomach: {
    word: "stomach",
    tricks: [
      "STO-MACH - My STOMACH is like a MACHINE",
      "ACH at the end, not ACK",
    ],
    tip: "Ends in -ACH",
  },
  sufficient: {
    word: "sufficient",
    tricks: [
      "SUF-FICI-ENT - Double F is sufficient",
      "SUFFICIENT has double F and single C",
    ],
    tip: "Double F, single C",
  },
  suggest: {
    word: "suggest",
    tricks: [
      "SUG-GEST - I SUGGEST double G",
      "Two Gs in suggest",
    ],
    tip: "Double G",
  },
  symbol: {
    word: "symbol",
    tricks: [
      "SYM-BOL - Y not I in symbol",
      "SYMBOL has a Y",
    ],
    tip: "Y not I",
  },
  system: {
    word: "system",
    tricks: [
      "SYS-TEM - Y in system",
      "Two Ys? No! Just one Y at the start",
    ],
    tip: "Y at start only",
  },
  temperature: {
    word: "temperature",
    tricks: [
      "TEMPER-ATURE - I lose my TEMPER in hot temperatures",
      "TEMPER + ATURE",
    ],
    tip: "TEMPER + ATURE",
    visual: "thermometer",
  },
  thorough: {
    word: "thorough",
    tricks: [
      "THOR-OUGH - THOR is THOROUGH in battle!",
      "OUGH at the end, like 'rough'",
    ],
    tip: "OUGH ending",
  },
  twelfth: {
    word: "twelfth",
    tricks: [
      "TWELF-TH - There's an F before the TH",
      "TWELVE becomes TWELFTH - V changes to F",
    ],
    tip: "F before TH",
  },
  variety: {
    word: "variety",
    tricks: [
      "VAR-I-ETY - There's great VARIETY in life",
      "I in the middle, ETY at end",
    ],
    tip: "I-E-T-Y at end",
  },
  vegetable: {
    word: "vegetable",
    tricks: [
      "VEG-ET-ABLE - Get your VEG, you're ABLE!",
      "Three Es in vEgEtablE",
    ],
    tip: "Three Es scattered through",
    visual: "vegetables",
  },
  vehicle: {
    word: "vehicle",
    tricks: [
      "VE-HI-CLE - A VEHICLE takes you HIGH places",
      "HI in the middle",
    ],
    tip: "HI in the middle",
  },
  yacht: {
    word: "yacht",
    tricks: [
      "Y-ACHT - Yelling 'ACH!' on a yacht",
      "Silent CH - weird spelling!",
    ],
    tip: "Silent CH",
    visual: "yacht",
  },
};

// Get mnemonic for a word
export function getMnemonic(word: string): Mnemonic | undefined {
  return mnemonics[word.toLowerCase()];
}

// Get a random mnemonic trick for a word
export function getRandomTrick(word: string): string | undefined {
  const mnemonic = getMnemonic(word);
  if (!mnemonic || mnemonic.tricks.length === 0) return undefined;
  return mnemonic.tricks[Math.floor(Math.random() * mnemonic.tricks.length)];
}


