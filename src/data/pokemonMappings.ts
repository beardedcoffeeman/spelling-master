// Pokemon mappings for all spelling words and homophones
// Each word/homophone set is assigned a unique Pokemon based on difficulty tier

export interface PokemonMapping {
  word: string;
  pokemonId: number;
  tier: 'common' | 'uncommon' | 'rare' | 'legendary';
  category: 'spelling' | 'homophone';
  homophoneSetId?: string;
}

// Tier 1 - Common (20 words): Pokemon 1-20 (Kanto starters and common)
// Tier 2 - Uncommon (40 words): Pokemon 21-60 (Popular Kanto Pokemon)
// Tier 3 - Rare (25 words): Pokemon 61-85 (Evolved forms and rare Kanto)
// Tier 4 - Legendary (15 words): Pokemon 144-151 (Legendary birds, Mewtwo, etc)

export const spellingPokemonMap: Record<string, PokemonMapping> = {
  // TIER 1 - COMMON (20 words) - Easy/shorter words
  "ancient": { word: "ancient", pokemonId: 1, tier: "common", category: "spelling" }, // Bulbasaur
  "attached": { word: "attached", pokemonId: 2, tier: "common", category: "spelling" }, // Ivysaur
  "average": { word: "average", pokemonId: 4, tier: "common", category: "spelling" }, // Charmander
  "awkward": { word: "awkward", pokemonId: 5, tier: "common", category: "spelling" }, // Charmeleon
  "bargain": { word: "bargain", pokemonId: 7, tier: "common", category: "spelling" }, // Squirtle
  "bruise": { word: "bruise", pokemonId: 8, tier: "common", category: "spelling" }, // Wartortle
  "forty": { word: "forty", pokemonId: 10, tier: "common", category: "spelling" }, // Caterpie
  "muscle": { word: "muscle", pokemonId: 13, tier: "common", category: "spelling" }, // Weedle
  "queue": { word: "queue", pokemonId: 16, tier: "common", category: "spelling" }, // Pidgey
  "shoulder": { word: "shoulder", pokemonId: 19, tier: "common", category: "spelling" }, // Rattata
  "stomach": { word: "stomach", pokemonId: 21, tier: "common", category: "spelling" }, // Spearow
  "symbol": { word: "symbol", pokemonId: 23, tier: "common", category: "spelling" }, // Ekans
  "system": { word: "system", pokemonId: 27, tier: "common", category: "spelling" }, // Sandshrew
  "twelfth": { word: "twelfth", pokemonId: 29, tier: "common", category: "spelling" }, // Nidoran♀
  "variety": { word: "variety", pokemonId: 32, tier: "common", category: "spelling" }, // Nidoran♂
  "vegetable": { word: "vegetable", pokemonId: 35, tier: "common", category: "spelling" }, // Clefairy
  "vehicle": { word: "vehicle", pokemonId: 37, tier: "common", category: "spelling" }, // Vulpix
  "yacht": { word: "yacht", pokemonId: 39, tier: "common", category: "spelling" }, // Jigglypuff
  "according": { word: "according", pokemonId: 41, tier: "common", category: "spelling" }, // Zubat
  "equip": { word: "equip", pokemonId: 43, tier: "common", category: "spelling" }, // Oddish

  // TIER 2 - UNCOMMON (40 words) - Medium difficulty
  "accommodate": { word: "accommodate", pokemonId: 11, tier: "uncommon", category: "spelling" }, // Metapod
  "accompany": { word: "accompany", pokemonId: 12, tier: "uncommon", category: "spelling" }, // Butterfree
  "achieve": { word: "achieve", pokemonId: 14, tier: "uncommon", category: "spelling" }, // Kakuna
  "aggressive": { word: "aggressive", pokemonId: 15, tier: "uncommon", category: "spelling" }, // Beedrill
  "amateur": { word: "amateur", pokemonId: 17, tier: "uncommon", category: "spelling" }, // Pidgeotto
  "apparent": { word: "apparent", pokemonId: 18, tier: "uncommon", category: "spelling" }, // Pidgeot
  "appreciate": { word: "appreciate", pokemonId: 20, tier: "uncommon", category: "spelling" }, // Raticate
  "available": { word: "available", pokemonId: 22, tier: "uncommon", category: "spelling" }, // Fearow
  "category": { word: "category", pokemonId: 24, tier: "uncommon", category: "spelling" }, // Arbok
  "cemetery": { word: "cemetery", pokemonId: 25, tier: "uncommon", category: "spelling" }, // Pikachu
  "committee": { word: "committee", pokemonId: 26, tier: "uncommon", category: "spelling" }, // Raichu
  "communicate": { word: "communicate", pokemonId: 28, tier: "uncommon", category: "spelling" }, // Sandslash
  "community": { word: "community", pokemonId: 30, tier: "uncommon", category: "spelling" }, // Nidorina
  "competition": { word: "competition", pokemonId: 31, tier: "uncommon", category: "spelling" }, // Nidorino
  "convenience": { word: "convenience", pokemonId: 33, tier: "uncommon", category: "spelling" }, // Nidoqueen
  "correspond": { word: "correspond", pokemonId: 34, tier: "uncommon", category: "spelling" }, // Nidoking
  "curiosity": { word: "curiosity", pokemonId: 36, tier: "uncommon", category: "spelling" }, // Clefable
  "definite": { word: "definite", pokemonId: 38, tier: "uncommon", category: "spelling" }, // Ninetales
  "desperate": { word: "desperate", pokemonId: 40, tier: "uncommon", category: "spelling" }, // Wigglytuff
  "determined": { word: "determined", pokemonId: 42, tier: "uncommon", category: "spelling" }, // Golbat
  "develop": { word: "develop", pokemonId: 44, tier: "uncommon", category: "spelling" }, // Gloom
  "dictionary": { word: "dictionary", pokemonId: 45, tier: "uncommon", category: "spelling" }, // Vileplume
  "equipped": { word: "equipped", pokemonId: 46, tier: "uncommon", category: "spelling" }, // Paras
  "equipment": { word: "equipment", pokemonId: 47, tier: "uncommon", category: "spelling" }, // Parasect
  "especially": { word: "especially", pokemonId: 48, tier: "uncommon", category: "spelling" }, // Venonat
  "excellent": { word: "excellent", pokemonId: 49, tier: "uncommon", category: "spelling" }, // Venomoth
  "existence": { word: "existence", pokemonId: 50, tier: "uncommon", category: "spelling" }, // Diglett
  "explanation": { word: "explanation", pokemonId: 51, tier: "uncommon", category: "spelling" }, // Dugtrio
  "familiar": { word: "familiar", pokemonId: 52, tier: "uncommon", category: "spelling" }, // Meowth
  "foreign": { word: "foreign", pokemonId: 53, tier: "uncommon", category: "spelling" }, // Persian
  "frequently": { word: "frequently", pokemonId: 54, tier: "uncommon", category: "spelling" }, // Psyduck
  "government": { word: "government", pokemonId: 55, tier: "uncommon", category: "spelling" }, // Golduck
  "guarantee": { word: "guarantee", pokemonId: 56, tier: "uncommon", category: "spelling" }, // Mankey
  "identity": { word: "identity", pokemonId: 57, tier: "uncommon", category: "spelling" }, // Primeape
  "individual": { word: "individual", pokemonId: 58, tier: "uncommon", category: "spelling" }, // Growlithe
  "language": { word: "language", pokemonId: 59, tier: "uncommon", category: "spelling" }, // Arcanine
  "leisure": { word: "leisure", pokemonId: 60, tier: "uncommon", category: "spelling" }, // Poliwag
  "opportunity": { word: "opportunity", pokemonId: 61, tier: "uncommon", category: "spelling" }, // Poliwhirl
  "recognise": { word: "recognise", pokemonId: 62, tier: "uncommon", category: "spelling" }, // Poliwrath
  "sincere": { word: "sincere", pokemonId: 63, tier: "uncommon", category: "spelling" }, // Abra

  // TIER 3 - RARE (25 words) - Hard words
  "conscience": { word: "conscience", pokemonId: 64, tier: "rare", category: "spelling" }, // Kadabra
  "conscious": { word: "conscious", pokemonId: 65, tier: "rare", category: "spelling" }, // Alakazam
  "controversy": { word: "controversy", pokemonId: 66, tier: "rare", category: "spelling" }, // Machop
  "criticise": { word: "criticise", pokemonId: 67, tier: "rare", category: "spelling" }, // Machoke
  "disastrous": { word: "disastrous", pokemonId: 68, tier: "rare", category: "spelling" }, // Machamp
  "embarrass": { word: "embarrass", pokemonId: 69, tier: "rare", category: "spelling" }, // Bellsprout
  "environment": { word: "environment", pokemonId: 70, tier: "rare", category: "spelling" }, // Weepinbell
  "exaggerate": { word: "exaggerate", pokemonId: 71, tier: "rare", category: "spelling" }, // Victreebel
  "harass": { word: "harass", pokemonId: 72, tier: "rare", category: "spelling" }, // Tentacool
  "hindrance": { word: "hindrance", pokemonId: 73, tier: "rare", category: "spelling" }, // Tentacruel
  "interfere": { word: "interfere", pokemonId: 74, tier: "rare", category: "spelling" }, // Geodude
  "interrupt": { word: "interrupt", pokemonId: 75, tier: "rare", category: "spelling" }, // Graveler
  "lightning": { word: "lightning", pokemonId: 76, tier: "rare", category: "spelling" }, // Golem
  "marvellous": { word: "marvellous", pokemonId: 77, tier: "rare", category: "spelling" }, // Ponyta
  "mischievous": { word: "mischievous", pokemonId: 78, tier: "rare", category: "spelling" }, // Rapidash
  "necessary": { word: "necessary", pokemonId: 79, tier: "rare", category: "spelling" }, // Slowpoke
  "neighbour": { word: "neighbour", pokemonId: 80, tier: "rare", category: "spelling" }, // Slowbro
  "nuisance": { word: "nuisance", pokemonId: 81, tier: "rare", category: "spelling" }, // Magnemite
  "occupy": { word: "occupy", pokemonId: 82, tier: "rare", category: "spelling" }, // Magneton
  "occur": { word: "occur", pokemonId: 83, tier: "rare", category: "spelling" }, // Farfetch'd
  "parliament": { word: "parliament", pokemonId: 84, tier: "rare", category: "spelling" }, // Doduo
  "persuade": { word: "persuade", pokemonId: 85, tier: "rare", category: "spelling" }, // Dodrio
  "physical": { word: "physical", pokemonId: 86, tier: "rare", category: "spelling" }, // Seel
  "prejudice": { word: "prejudice", pokemonId: 87, tier: "rare", category: "spelling" }, // Dewgong
  "privilege": { word: "privilege", pokemonId: 88, tier: "rare", category: "spelling" }, // Grimer

  // TIER 4 - LEGENDARY (15 words) - Hardest words
  "immediate": { word: "immediate", pokemonId: 89, tier: "legendary", category: "spelling" }, // Muk
  "immediately": { word: "immediately", pokemonId: 90, tier: "legendary", category: "spelling" }, // Shellder
  "profession": { word: "profession", pokemonId: 91, tier: "legendary", category: "spelling" }, // Cloyster
  "programme": { word: "programme", pokemonId: 92, tier: "legendary", category: "spelling" }, // Gastly
  "pronunciation": { word: "pronunciation", pokemonId: 144, tier: "legendary", category: "spelling" }, // Articuno
  "recommend": { word: "recommend", pokemonId: 145, tier: "legendary", category: "spelling" }, // Zapdos
  "relevant": { word: "relevant", pokemonId: 146, tier: "legendary", category: "spelling" }, // Moltres
  "restaurant": { word: "restaurant", pokemonId: 150, tier: "legendary", category: "spelling" }, // Mewtwo
  "rhyme": { word: "rhyme", pokemonId: 151, tier: "legendary", category: "spelling" }, // Mew
  "rhythm": { word: "rhythm", pokemonId: 243, tier: "legendary", category: "spelling" }, // Raikou
  "sacrifice": { word: "sacrifice", pokemonId: 244, tier: "legendary", category: "spelling" }, // Entei
  "secretary": { word: "secretary", pokemonId: 245, tier: "legendary", category: "spelling" }, // Suicune
  "signature": { word: "signature", pokemonId: 249, tier: "legendary", category: "spelling" }, // Lugia
  "sincerely": { word: "sincerely", pokemonId: 250, tier: "legendary", category: "spelling" }, // Ho-Oh
  "soldier": { word: "soldier", pokemonId: 251, tier: "legendary", category: "spelling" }, // Celebi
  "sufficient": { word: "sufficient", pokemonId: 93, tier: "legendary", category: "spelling" }, // Haunter
  "suggest": { word: "suggest", pokemonId: 94, tier: "legendary", category: "spelling" }, // Gengar
  "temperature": { word: "temperature", pokemonId: 95, tier: "legendary", category: "spelling" }, // Onix
  "thorough": { word: "thorough", pokemonId: 96, tier: "legendary", category: "spelling" }, // Drowzee
};

// Year 2 words mapped to Fairy-type Pokemon (290 words)
// Using Fairy-type Pokemon across generations
export const fairyPokemonMap: Record<string, PokemonMapping> = {
  // TIER 1 - COMMON (60 words) - Simple/shorter Year 2 words
  "wood": { word: "wood", pokemonId: 35, tier: "common", category: "spelling" }, // Clefairy
  "week": { word: "week", pokemonId: 39, tier: "common", category: "spelling" }, // Jigglypuff
  "coin": { word: "coin", pokemonId: 173, tier: "common", category: "spelling" }, // Cleffa
  "key": { word: "key", pokemonId: 174, tier: "common", category: "spelling" }, // Igglybuff
  "door": { word: "door", pokemonId: 175, tier: "common", category: "spelling" }, // Togepi
  "gold": { word: "gold", pokemonId: 183, tier: "common", category: "spelling" }, // Marill
  "kind": { word: "kind", pokemonId: 280, tier: "common", category: "spelling" }, // Ralts
  "hold": { word: "hold", pokemonId: 439, tier: "common", category: "spelling" }, // Mime Jr.
  "find": { word: "find", pokemonId: 682, tier: "common", category: "spelling" }, // Spritzee
  "wild": { word: "wild", pokemonId: 684, tier: "common", category: "spelling" }, // Swirlix
  "even": { word: "even", pokemonId: 669, tier: "common", category: "spelling" }, // Flabébé
  "only": { word: "only", pokemonId: 702, tier: "common", category: "spelling" }, // Dedenne
  "word": { word: "word", pokemonId: 703, tier: "common", category: "spelling" }, // Carbink
  "come": { word: "come", pokemonId: 755, tier: "common", category: "spelling" }, // Morelull
  "move": { word: "move", pokemonId: 785, tier: "common", category: "spelling" }, // Tapu Koko
  "mind": { word: "mind", pokemonId: 786, tier: "common", category: "spelling" }, // Tapu Lele
  "cold": { word: "cold", pokemonId: 787, tier: "common", category: "spelling" }, // Tapu Bulu
  "told": { word: "told", pokemonId: 788, tier: "common", category: "spelling" }, // Tapu Fini
  "last": { word: "last", pokemonId: 858, tier: "common", category: "spelling" }, // Hatterene
  "sure": { word: "sure", pokemonId: 868, tier: "common", category: "spelling" }, // Milcery
  "fast": { word: "fast", pokemonId: 869, tier: "common", category: "spelling" }, // Alcremie
  "most": { word: "most", pokemonId: 876, tier: "common", category: "spelling" }, // Indeedee
  "pass": { word: "pass", pokemonId: 887, tier: "common", category: "spelling" }, // Dragapult
  "both": { word: "both", pokemonId: 888, tier: "common", category: "spelling" }, // Zacian
  "half": { word: "half", pokemonId: 36, tier: "common", category: "spelling" }, // Clefable
  "walk": { word: "walk", pokemonId: 40, tier: "common", category: "spelling" }, // Wigglytuff
  "ball": { word: "ball", pokemonId: 176, tier: "common", category: "spelling" }, // Togetic
  "hall": { word: "hall", pokemonId: 184, tier: "common", category: "spelling" }, // Azumarill
  "cry": { word: "cry", pokemonId: 281, tier: "common", category: "spelling" }, // Kirlia
  "fly": { word: "fly", pokemonId: 282, tier: "common", category: "spelling" }, // Gardevoir
  "dry": { word: "dry", pokemonId: 303, tier: "common", category: "spelling" }, // Mawile
  "try": { word: "try", pokemonId: 670, tier: "common", category: "spelling" }, // Floette
  "why": { word: "why", pokemonId: 671, tier: "common", category: "spelling" }, // Florges
  "spy": { word: "spy", pokemonId: 683, tier: "common", category: "spelling" }, // Aromatisse
  "fry": { word: "fry", pokemonId: 685, tier: "common", category: "spelling" }, // Slurpuff
  "one": { word: "one", pokemonId: 756, tier: "common", category: "spelling" }, // Shiinotic
  "won": { word: "won", pokemonId: 860, tier: "common", category: "spelling" }, // Morgrem
  "air": { word: "air", pokemonId: 889, tier: "common", category: "spelling" }, // Zamazenta
  "eye": { word: "eye", pokemonId: 122, tier: "common", category: "spelling" }, // Mr. Mime
  "jam": { word: "jam", pokemonId: 35, tier: "common", category: "spelling" }, // Clefairy (duplicate mapping ok)
  "ice": { word: "ice", pokemonId: 39, tier: "common", category: "spelling" }, // Jigglypuff (duplicate ok)
  "gem": { word: "gem", pokemonId: 173, tier: "common", category: "spelling" }, // Cleffa
  "cage": { word: "cage", pokemonId: 174, tier: "common", category: "spelling" }, // Igglybuff
  "race": { word: "race", pokemonId: 175, tier: "common", category: "spelling" }, // Togepi
  "city": { word: "city", pokemonId: 183, tier: "common", category: "spelling" }, // Marill
  "path": { word: "path", pokemonId: 280, tier: "common", category: "spelling" }, // Ralts
  "bath": { word: "bath", pokemonId: 439, tier: "common", category: "spelling" }, // Mime Jr.
  "rock": { word: "rock", pokemonId: 682, tier: "common", category: "spelling" }, // Spritzee
  "food": { word: "food", pokemonId: 684, tier: "common", category: "spelling" }, // Swirlix
  "here": { word: "here", pokemonId: 669, tier: "common", category: "spelling" }, // Flabébé
  "hear": { word: "hear", pokemonId: 702, tier: "common", category: "spelling" }, // Dedenne
  "Mr": { word: "Mr", pokemonId: 703, tier: "common", category: "spelling" }, // Carbink
  "Mrs": { word: "Mrs", pokemonId: 755, tier: "common", category: "spelling" }, // Morelull
  "sign": { word: "sign", pokemonId: 785, tier: "common", category: "spelling" }, // Tapu Koko
  "drew": { word: "drew", pokemonId: 786, tier: "common", category: "spelling" }, // Tapu Lele
  "any": { word: "any", pokemonId: 787, tier: "common", category: "spelling" }, // Tapu Bulu
  "who": { word: "who", pokemonId: 788, tier: "common", category: "spelling" }, // Tapu Fini
  "war": { word: "war", pokemonId: 858, tier: "common", category: "spelling" }, // Hatterene
  "was": { word: "was", pokemonId: 868, tier: "common", category: "spelling" }, // Milcery

  // TIER 2 - UNCOMMON (80 words) - Medium difficulty Year 2 words
  "afraid": { word: "afraid", pokemonId: 869, tier: "uncommon", category: "spelling" }, // Alcremie
  "before": { word: "before", pokemonId: 876, tier: "uncommon", category: "spelling" }, // Indeedee
  "bright": { word: "bright", pokemonId: 887, tier: "uncommon", category: "spelling" }, // Dragapult
  "coach": { word: "coach", pokemonId: 888, tier: "uncommon", category: "spelling" }, // Zacian
  "group": { word: "group", pokemonId: 36, tier: "uncommon", category: "spelling" }, // Clefable
  "search": { word: "search", pokemonId: 40, tier: "uncommon", category: "spelling" }, // Wigglytuff
  "scared": { word: "scared", pokemonId: 176, tier: "uncommon", category: "spelling" }, // Togetic
  "monkey": { word: "monkey", pokemonId: 184, tier: "uncommon", category: "spelling" }, // Azumarill
  "chimney": { word: "chimney", pokemonId: 281, tier: "uncommon", category: "spelling" }, // Kirlia
  "valley": { word: "valley", pokemonId: 282, tier: "uncommon", category: "spelling" }, // Gardevoir
  "money": { word: "money", pokemonId: 303, tier: "uncommon", category: "spelling" }, // Mawile
  "alley": { word: "alley", pokemonId: 670, tier: "uncommon", category: "spelling" }, // Floette
  "honey": { word: "honey", pokemonId: 671, tier: "uncommon", category: "spelling" }, // Florges
  "trolley": { word: "trolley", pokemonId: 683, tier: "uncommon", category: "spelling" }, // Aromatisse
  "because": { word: "because", pokemonId: 685, tier: "uncommon", category: "spelling" }, // Slurpuff
  "worse": { word: "worse", pokemonId: 756, tier: "uncommon", category: "spelling" }, // Shiinotic
  "world": { word: "world", pokemonId: 860, tier: "uncommon", category: "spelling" }, // Morgrem
  "warmer": { word: "warmer", pokemonId: 889, tier: "uncommon", category: "spelling" }, // Zamazenta
  "beanstalk": { word: "beanstalk", pokemonId: 122, tier: "uncommon", category: "spelling" }, // Mr. Mime
  "child": { word: "child", pokemonId: 35, tier: "uncommon", category: "spelling" }, // Clefairy
  "wasp": { word: "wasp", pokemonId: 39, tier: "uncommon", category: "spelling" }, // Jigglypuff
  "wallet": { word: "wallet", pokemonId: 173, tier: "uncommon", category: "spelling" }, // Cleffa
  "squash": { word: "squash", pokemonId: 174, tier: "uncommon", category: "spelling" }, // Igglybuff
  "wander": { word: "wander", pokemonId: 175, tier: "uncommon", category: "spelling" }, // Togepi
  "other": { word: "other", pokemonId: 183, tier: "uncommon", category: "spelling" }, // Marill
  "brother": { word: "brother", pokemonId: 280, tier: "uncommon", category: "spelling" }, // Ralts
  "nothing": { word: "nothing", pokemonId: 439, tier: "uncommon", category: "spelling" }, // Mime Jr.
  "mother": { word: "mother", pokemonId: 682, tier: "uncommon", category: "spelling" }, // Spritzee
  "climb": { word: "climb", pokemonId: 684, tier: "uncommon", category: "spelling" }, // Swirlix
  "wrap": { word: "wrap", pokemonId: 669, tier: "uncommon", category: "spelling" }, // Flabébé
  "wreck": { word: "wreck", pokemonId: 702, tier: "uncommon", category: "spelling" }, // Dedenne
  "knock": { word: "knock", pokemonId: 703, tier: "uncommon", category: "spelling" }, // Carbink
  "knight": { word: "knight", pokemonId: 755, tier: "uncommon", category: "spelling" }, // Morelull
  "knit": { word: "knit", pokemonId: 785, tier: "uncommon", category: "spelling" }, // Tapu Koko
  "gnome": { word: "gnome", pokemonId: 786, tier: "uncommon", category: "spelling" }, // Tapu Lele
  "gnaw": { word: "gnaw", pokemonId: 787, tier: "uncommon", category: "spelling" }, // Tapu Bulu
  "everybody": { word: "everybody", pokemonId: 788, tier: "uncommon", category: "spelling" }, // Tapu Fini
  "badge": { word: "badge", pokemonId: 858, tier: "uncommon", category: "spelling" }, // Hatterene
  "sledge": { word: "sledge", pokemonId: 868, tier: "uncommon", category: "spelling" }, // Milcery
  "village": { word: "village", pokemonId: 869, tier: "uncommon", category: "spelling" }, // Alcremie
  "energy": { word: "energy", pokemonId: 876, tier: "uncommon", category: "spelling" }, // Indeedee
  "jacket": { word: "jacket", pokemonId: 887, tier: "uncommon", category: "spelling" }, // Dragapult
  "cereal": { word: "cereal", pokemonId: 888, tier: "uncommon", category: "spelling" }, // Zacian
  "circus": { word: "circus", pokemonId: 36, tier: "uncommon", category: "spelling" }, // Clefable
  "cinema": { word: "cinema", pokemonId: 40, tier: "uncommon", category: "spelling" }, // Wigglytuff
  "bicycle": { word: "bicycle", pokemonId: 176, tier: "uncommon", category: "spelling" }, // Togetic
  "fancy": { word: "fancy", pokemonId: 184, tier: "uncommon", category: "spelling" }, // Azumarill
  "behind": { word: "behind", pokemonId: 281, tier: "uncommon", category: "spelling" }, // Kirlia
  "floor": { word: "floor", pokemonId: 282, tier: "uncommon", category: "spelling" }, // Gardevoir
  "reply": { word: "reply", pokemonId: 303, tier: "uncommon", category: "spelling" }, // Mawile
  "flies": { word: "flies", pokemonId: 670, tier: "uncommon", category: "spelling" }, // Floette
  "dries": { word: "dries", pokemonId: 671, tier: "uncommon", category: "spelling" }, // Florges
  "copies": { word: "copies", pokemonId: 683, tier: "uncommon", category: "spelling" }, // Aromatisse
  "babies": { word: "babies", pokemonId: 685, tier: "uncommon", category: "spelling" }, // Slurpuff
  "break": { word: "break", pokemonId: 756, tier: "uncommon", category: "spelling" }, // Shiinotic
  "poor": { word: "poor", pokemonId: 860, tier: "uncommon", category: "spelling" }, // Morgrem
  "copying": { word: "copying", pokemonId: 889, tier: "uncommon", category: "spelling" }, // Zamazenta
  "copied": { word: "copied", pokemonId: 122, tier: "uncommon", category: "spelling" }, // Mr. Mime
  "crying": { word: "crying", pokemonId: 35, tier: "uncommon", category: "spelling" }, // Clefairy
  "cried": { word: "cried", pokemonId: 39, tier: "uncommon", category: "spelling" }, // Jigglypuff
  "replying": { word: "replying", pokemonId: 173, tier: "uncommon", category: "spelling" }, // Cleffa
  "replied": { word: "replied", pokemonId: 174, tier: "uncommon", category: "spelling" }, // Igglybuff
  "drying": { word: "drying", pokemonId: 175, tier: "uncommon", category: "spelling" }, // Togepi
  "dried": { word: "dried", pokemonId: 183, tier: "uncommon", category: "spelling" }, // Marill
  "donkeys": { word: "donkeys", pokemonId: 280, tier: "uncommon", category: "spelling" }, // Ralts
  "worth": { word: "worth", pokemonId: 439, tier: "uncommon", category: "spelling" }, // Mime Jr.
  "towards": { word: "towards", pokemonId: 682, tier: "uncommon", category: "spelling" }, // Spritzee
  "watch": { word: "watch", pokemonId: 684, tier: "uncommon", category: "spelling" }, // Swirlix
  "wrote": { word: "wrote", pokemonId: 669, tier: "uncommon", category: "spelling" }, // Flabébé
  "design": { word: "design", pokemonId: 702, tier: "uncommon", category: "spelling" }, // Dedenne
  "fudge": { word: "fudge", pokemonId: 703, tier: "uncommon", category: "spelling" }, // Carbink
  "decide": { word: "decide", pokemonId: 755, tier: "uncommon", category: "spelling" }, // Morelull
  "spies": { word: "spies", pokemonId: 785, tier: "uncommon", category: "spelling" }, // Tapu Koko
  "tries": { word: "tries", pokemonId: 786, tier: "uncommon", category: "spelling" }, // Tapu Lele
  "parties": { word: "parties", pokemonId: 787, tier: "uncommon", category: "spelling" }, // Tapu Bulu
  "fries": { word: "fries", pokemonId: 788, tier: "uncommon", category: "spelling" }, // Tapu Fini
  "steak": { word: "steak", pokemonId: 858, tier: "uncommon", category: "spelling" }, // Hatterene
  "pretty": { word: "pretty", pokemonId: 868, tier: "uncommon", category: "spelling" }, // Milcery

  // TIER 3 - RARE (40 words) - More challenging Year 2 words
  "wriggle": { word: "wriggle", pokemonId: 869, tier: "rare", category: "spelling" }, // Alcremie
  "nettle": { word: "nettle", pokemonId: 876, tier: "rare", category: "spelling" }, // Indeedee
  "sizzle": { word: "sizzle", pokemonId: 887, tier: "rare", category: "spelling" }, // Dragapult
  "beetle": { word: "beetle", pokemonId: 888, tier: "rare", category: "spelling" }, // Zacian
  "table": { word: "table", pokemonId: 36, tier: "rare", category: "spelling" }, // Clefable
  "steeple": { word: "steeple", pokemonId: 40, tier: "rare", category: "spelling" }, // Wigglytuff
  "crumple": { word: "crumple", pokemonId: 176, tier: "rare", category: "spelling" }, // Togetic
  "candle": { word: "candle", pokemonId: 184, tier: "rare", category: "spelling" }, // Azumarill
  "beautiful": { word: "beautiful", pokemonId: 281, tier: "rare", category: "spelling" }, // Kirlia
  "medal": { word: "medal", pokemonId: 282, tier: "rare", category: "spelling" }, // Gardevoir
  "capital": { word: "capital", pokemonId: 303, tier: "rare", category: "spelling" }, // Mawile
  "hospital": { word: "hospital", pokemonId: 670, tier: "rare", category: "spelling" }, // Floette
  "animal": { word: "animal", pokemonId: 671, tier: "rare", category: "spelling" }, // Florges
  "national": { word: "national", pokemonId: 683, tier: "rare", category: "spelling" }, // Aromatisse
  "fossil": { word: "fossil", pokemonId: 685, tier: "rare", category: "spelling" }, // Slurpuff
  "April": { word: "April", pokemonId: 756, tier: "rare", category: "spelling" }, // Shiinotic
  "pencil": { word: "pencil", pokemonId: 860, tier: "rare", category: "spelling" }, // Morgrem
  "grass": { word: "grass", pokemonId: 889, tier: "rare", category: "spelling" }, // Zamazenta
  "spied": { word: "spied", pokemonId: 122, tier: "rare", category: "spelling" }, // Mr. Mime
  "happier": { word: "happier", pokemonId: 35, tier: "rare", category: "spelling" }, // Clefairy
  "funnier": { word: "funnier", pokemonId: 39, tier: "rare", category: "spelling" }, // Jigglypuff
  "chilliest": { word: "chilliest", pokemonId: 173, tier: "rare", category: "spelling" }, // Cleffa
  "luckiest": { word: "luckiest", pokemonId: 174, tier: "rare", category: "spelling" }, // Igglybuff
  "frying": { word: "frying", pokemonId: 175, tier: "rare", category: "spelling" }, // Togepi
  "skiing": { word: "skiing", pokemonId: 183, tier: "rare", category: "spelling" }, // Marill
  "happiest": { word: "happiest", pokemonId: 280, tier: "rare", category: "spelling" }, // Ralts
  "hour": { word: "hour", pokemonId: 439, tier: "rare", category: "spelling" }, // Mime Jr.
  "sliding": { word: "sliding", pokemonId: 682, tier: "rare", category: "spelling" }, // Spritzee
  "hiking": { word: "hiking", pokemonId: 684, tier: "rare", category: "spelling" }, // Swirlix
  "completed": { word: "completed", pokemonId: 669, tier: "rare", category: "spelling" }, // Flabébé
  "amazed": { word: "amazed", pokemonId: 702, tier: "rare", category: "spelling" }, // Dedenne
  "timer": { word: "timer", pokemonId: 703, tier: "rare", category: "spelling" }, // Carbink
  "ripest": { word: "ripest", pokemonId: 755, tier: "rare", category: "spelling" }, // Morelull
  "shiny": { word: "shiny", pokemonId: 785, tier: "rare", category: "spelling" }, // Tapu Koko
  "smiled": { word: "smiled", pokemonId: 786, tier: "rare", category: "spelling" }, // Tapu Lele
  "plant": { word: "plant", pokemonId: 787, tier: "rare", category: "spelling" }, // Tapu Bulu
  "rubbing": { word: "rubbing", pokemonId: 788, tier: "rare", category: "spelling" }, // Tapu Fini
  "hugged": { word: "hugged", pokemonId: 858, tier: "rare", category: "spelling" }, // Hatterene
  "runner": { word: "runner", pokemonId: 868, tier: "rare", category: "spelling" }, // Milcery
  "biggest": { word: "biggest", pokemonId: 869, tier: "rare", category: "spelling" }, // Alcremie

  // TIER 4 - LEGENDARY (20 words) - Most challenging Year 2 words
  "runny": { word: "runny", pokemonId: 876, tier: "legendary", category: "spelling" }, // Indeedee
  "swimming": { word: "swimming", pokemonId: 887, tier: "legendary", category: "spelling" }, // Dragapult
  "clapped": { word: "clapped", pokemonId: 888, tier: "legendary", category: "spelling" }, // Zacian
  "planned": { word: "planned", pokemonId: 36, tier: "legendary", category: "spelling" }, // Clefable
  "improve": { word: "improve", pokemonId: 40, tier: "legendary", category: "spelling" }, // Wigglytuff
  "sugar": { word: "sugar", pokemonId: 176, tier: "legendary", category: "spelling" }, // Togetic
  "can't": { word: "can't", pokemonId: 184, tier: "legendary", category: "spelling" }, // Azumarill
  "don't": { word: "don't", pokemonId: 281, tier: "legendary", category: "spelling" }, // Kirlia
  "won't": { word: "won't", pokemonId: 282, tier: "legendary", category: "spelling" }, // Gardevoir
  "you've": { word: "you've", pokemonId: 303, tier: "legendary", category: "spelling" }, // Mawile
  "he'll": { word: "he'll", pokemonId: 670, tier: "legendary", category: "spelling" }, // Floette
  "you're": { word: "you're", pokemonId: 671, tier: "legendary", category: "spelling" }, // Florges
  "couldn't": { word: "couldn't", pokemonId: 683, tier: "legendary", category: "spelling" }, // Aromatisse
  "haven't": { word: "haven't", pokemonId: 685, tier: "legendary", category: "spelling" }, // Slurpuff
  "children": { word: "children", pokemonId: 756, tier: "legendary", category: "spelling" }, // Shiinotic
  "great": { word: "great", pokemonId: 860, tier: "legendary", category: "spelling" }, // Morgrem
  "prove": { word: "prove", pokemonId: 889, tier: "legendary", category: "spelling" }, // Zamazenta
  "after": { word: "after", pokemonId: 122, tier: "legendary", category: "spelling" }, // Mr. Mime
  "bubble": { word: "bubble", pokemonId: 35, tier: "legendary", category: "spelling" }, // Clefairy
  "tumble": { word: "tumble", pokemonId: 39, tier: "legendary", category: "spelling" }, // Jigglypuff
  "pedal": { word: "pedal", pokemonId: 173, tier: "legendary", category: "spelling" }, // Cleffa
  "ladies": { word: "ladies", pokemonId: 174, tier: "legendary", category: "spelling" }, // Igglybuff
  "baking": { word: "baking", pokemonId: 175, tier: "legendary", category: "spelling" }, // Togepi
  "closest": { word: "closest", pokemonId: 183, tier: "legendary", category: "spelling" }, // Marill
  "hummed": { word: "hummed", pokemonId: 280, tier: "legendary", category: "spelling" }, // Ralts
  "wouldn't": { word: "wouldn't", pokemonId: 439, tier: "legendary", category: "spelling" }, // Mime Jr.
  "freshness": { word: "freshness", pokemonId: 682, tier: "legendary", category: "spelling" }, // Spritzee
  "sickness": { word: "sickness", pokemonId: 684, tier: "legendary", category: "spelling" }, // Swirlix
  "enjoyment": { word: "enjoyment", pokemonId: 669, tier: "legendary", category: "spelling" }, // Flabébé
  "treatment": { word: "treatment", pokemonId: 702, tier: "legendary", category: "spelling" }, // Dedenne
  "movement": { word: "movement", pokemonId: 703, tier: "legendary", category: "spelling" }, // Carbink
  "brightness": { word: "brightness", pokemonId: 755, tier: "legendary", category: "spelling" }, // Morelull
  "payment": { word: "payment", pokemonId: 785, tier: "legendary", category: "spelling" }, // Tapu Koko
  "happiness": { word: "happiness", pokemonId: 786, tier: "legendary", category: "spelling" }, // Tapu Lele
  "would": { word: "would", pokemonId: 787, tier: "legendary", category: "spelling" }, // Tapu Bulu
  "whole": { word: "whole", pokemonId: 788, tier: "legendary", category: "spelling" }, // Tapu Fini
  "forgetful": { word: "forgetful", pokemonId: 858, tier: "legendary", category: "spelling" }, // Hatterene
  "joyful": { word: "joyful", pokemonId: 868, tier: "legendary", category: "spelling" }, // Milcery
  "playful": { word: "playful", pokemonId: 869, tier: "legendary", category: "spelling" }, // Alcremie
  "painless": { word: "painless", pokemonId: 876, tier: "legendary", category: "spelling" }, // Indeedee
  "fearless": { word: "fearless", pokemonId: 887, tier: "legendary", category: "spelling" }, // Dragapult
  "hopeless": { word: "hopeless", pokemonId: 888, tier: "legendary", category: "spelling" }, // Zacian
  "plentiful": { word: "plentiful", pokemonId: 36, tier: "legendary", category: "spelling" }, // Clefable
  "useless": { word: "useless", pokemonId: 40, tier: "legendary", category: "spelling" }, // Wigglytuff
  "television": { word: "television", pokemonId: 176, tier: "legendary", category: "spelling" }, // Togetic
  "treasure": { word: "treasure", pokemonId: 184, tier: "legendary", category: "spelling" }, // Azumarill
  "usual": { word: "usual", pokemonId: 281, tier: "legendary", category: "spelling" }, // Kirlia
  "measure": { word: "measure", pokemonId: 282, tier: "legendary", category: "spelling" }, // Gardevoir
  "leisure": { word: "leisure", pokemonId: 303, tier: "legendary", category: "spelling" }, // Mawile
  "pleasure": { word: "pleasure", pokemonId: 670, tier: "legendary", category: "spelling" }, // Floette
  "pressure": { word: "pressure", pokemonId: 671, tier: "legendary", category: "spelling" }, // Florges
  "unsure": { word: "unsure", pokemonId: 683, tier: "legendary", category: "spelling" }, // Aromatisse
  "many": { word: "many", pokemonId: 685, tier: "legendary", category: "spelling" }, // Slurpuff
  "clothes": { word: "clothes", pokemonId: 756, tier: "legendary", category: "spelling" }, // Shiinotic
  "whiteboard": { word: "whiteboard", pokemonId: 860, tier: "legendary", category: "spelling" }, // Morgrem
  "butterfly": { word: "butterfly", pokemonId: 889, tier: "legendary", category: "spelling" }, // Zamazenta
  "handbag": { word: "handbag", pokemonId: 122, tier: "legendary", category: "spelling" }, // Mr. Mime
  "lighthouse": { word: "lighthouse", pokemonId: 35, tier: "legendary", category: "spelling" }, // Clefairy
  "rainbow": { word: "rainbow", pokemonId: 39, tier: "legendary", category: "spelling" }, // Jigglypuff
  "moonlight": { word: "moonlight", pokemonId: 173, tier: "legendary", category: "spelling" }, // Cleffa
  "flowerpot": { word: "flowerpot", pokemonId: 174, tier: "legendary", category: "spelling" }, // Igglybuff
  "goldfish": { word: "goldfish", pokemonId: 175, tier: "legendary", category: "spelling" }, // Togepi
  "busy": { word: "busy", pokemonId: 183, tier: "legendary", category: "spelling" }, // Marill
  "people": { word: "people", pokemonId: 280, tier: "legendary", category: "spelling" }, // Ralts
  "there": { word: "there", pokemonId: 439, tier: "legendary", category: "spelling" }, // Mime Jr.
  "their": { word: "their", pokemonId: 682, tier: "legendary", category: "spelling" }, // Spritzee
  "they're": { word: "they're", pokemonId: 684, tier: "legendary", category: "spelling" }, // Swirlix
  "quite": { word: "quite", pokemonId: 669, tier: "legendary", category: "spelling" }, // Flabébé
  "quiet": { word: "quiet", pokemonId: 702, tier: "legendary", category: "spelling" }, // Dedenne
  "water": { word: "water", pokemonId: 703, tier: "legendary", category: "spelling" }, // Carbink
  "station": { word: "station", pokemonId: 755, tier: "legendary", category: "spelling" }, // Morelull
  "fiction": { word: "fiction", pokemonId: 785, tier: "legendary", category: "spelling" }, // Tapu Koko
  "section": { word: "section", pokemonId: 786, tier: "legendary", category: "spelling" }, // Tapu Lele
  "motion": { word: "motion", pokemonId: 787, tier: "legendary", category: "spelling" }, // Tapu Bulu
  "position": { word: "position", pokemonId: 788, tier: "legendary", category: "spelling" }, // Tapu Fini
  "relation": { word: "relation", pokemonId: 858, tier: "legendary", category: "spelling" }, // Hatterene
  "fraction": { word: "fraction", pokemonId: 868, tier: "legendary", category: "spelling" }, // Milcery
  "nation": { word: "nation", pokemonId: 869, tier: "legendary", category: "spelling" }, // Alcremie
  "again": { word: "again", pokemonId: 876, tier: "legendary", category: "spelling" }, // Indeedee
  "sister's": { word: "sister's", pokemonId: 887, tier: "legendary", category: "spelling" }, // Dragapult
  "brother's": { word: "brother's", pokemonId: 888, tier: "legendary", category: "spelling" }, // Zacian
  "girl's": { word: "girl's", pokemonId: 36, tier: "legendary", category: "spelling" }, // Clefable
  "child's": { word: "child's", pokemonId: 40, tier: "legendary", category: "spelling" }, // Wigglytuff
  "man's": { word: "man's", pokemonId: 176, tier: "legendary", category: "spelling" }, // Togetic
  "boy's": { word: "boy's", pokemonId: 184, tier: "legendary", category: "spelling" }, // Azumarill
  "woman's": { word: "woman's", pokemonId: 281, tier: "legendary", category: "spelling" }, // Kirlia
  "grandfather's": { word: "grandfather's", pokemonId: 282, tier: "legendary", category: "spelling" }, // Gardevoir
  "parents": { word: "parents", pokemonId: 303, tier: "legendary", category: "spelling" }, // Mawile
  "should": { word: "should", pokemonId: 670, tier: "legendary", category: "spelling" }, // Floette
  "habitat": { word: "habitat", pokemonId: 671, tier: "legendary", category: "spelling" }, // Florges
  "metal": { word: "metal", pokemonId: 683, tier: "legendary", category: "spelling" }, // Aromatisse
  "number": { word: "number", pokemonId: 685, tier: "legendary", category: "spelling" }, // Slurpuff
  "twenty": { word: "twenty", pokemonId: 756, tier: "legendary", category: "spelling" }, // Shiinotic
  "plastic": { word: "plastic", pokemonId: 860, tier: "legendary", category: "spelling" }, // Morgrem
  "brick": { word: "brick", pokemonId: 889, tier: "legendary", category: "spelling" }, // Zamazenta
  "squashing": { word: "squashing", pokemonId: 122, tier: "legendary", category: "spelling" }, // Mr. Mime
  "bending": { word: "bending", pokemonId: 35, tier: "legendary", category: "spelling" }, // Clefairy
  "twisting": { word: "twisting", pokemonId: 39, tier: "legendary", category: "spelling" }, // Jigglypuff
  "stretching": { word: "stretching", pokemonId: 173, tier: "legendary", category: "spelling" }, // Cleffa
  "cardboard": { word: "cardboard", pokemonId: 174, tier: "legendary", category: "spelling" }, // Igglybuff
  "forty": { word: "forty", pokemonId: 175, tier: "legendary", category: "spelling" }, // Togepi
  "annoying": { word: "annoying", pokemonId: 183, tier: "legendary", category: "spelling" }, // Marill
  "thirsty": { word: "thirsty", pokemonId: 280, tier: "legendary", category: "spelling" }, // Ralts
  "statue": { word: "statue", pokemonId: 439, tier: "legendary", category: "spelling" }, // Mime Jr.
  "whisper": { word: "whisper", pokemonId: 682, tier: "legendary", category: "spelling" }, // Spritzee
  "phone": { word: "phone", pokemonId: 684, tier: "legendary", category: "spelling" }, // Swirlix
  "morning": { word: "morning", pokemonId: 669, tier: "legendary", category: "spelling" }, // Flabébé
  "tomatoes": { word: "tomatoes", pokemonId: 702, tier: "legendary", category: "spelling" }, // Dedenne
  "haunted": { word: "haunted", pokemonId: 703, tier: "legendary", category: "spelling" }, // Carbink
  "Thursday": { word: "Thursday", pokemonId: 755, tier: "legendary", category: "spelling" }, // Morelull
};

// Homophones mapped to Pokemon (18 sets)
export const homophonePokemonMap: Record<string, PokemonMapping> = {
  "their_there_theyre": { word: "their/there/they're", pokemonId: 100, tier: "uncommon", category: "homophone", homophoneSetId: "their_there_theyre" }, // Voltorb
  "your_youre": { word: "your/you're", pokemonId: 101, tier: "uncommon", category: "homophone", homophoneSetId: "your_youre" }, // Electrode
  "to_too_two": { word: "to/too/two", pokemonId: 102, tier: "uncommon", category: "homophone", homophoneSetId: "to_too_two" }, // Exeggcute
  "its_its": { word: "its/it's", pokemonId: 103, tier: "uncommon", category: "homophone", homophoneSetId: "its_its" }, // Exeggutor
  "hear_here": { word: "hear/here", pokemonId: 104, tier: "common", category: "homophone", homophoneSetId: "hear_here" }, // Cubone
  "affect_effect": { word: "affect/effect", pokemonId: 133, tier: "rare", category: "homophone", homophoneSetId: "affect_effect" }, // Eevee
  "practice_practise": { word: "practice/practise", pokemonId: 106, tier: "uncommon", category: "homophone", homophoneSetId: "practice_practise" }, // Hitmonlee
  "advice_advise": { word: "advice/advise", pokemonId: 107, tier: "uncommon", category: "homophone", homophoneSetId: "advice_advise" }, // Hitmonchan
  "stationary_stationery": { word: "stationary/stationery", pokemonId: 108, tier: "rare", category: "homophone", homophoneSetId: "stationary_stationery" }, // Lickitung
  "principal_principle": { word: "principal/principle", pokemonId: 109, tier: "rare", category: "homophone", homophoneSetId: "principal_principle" }, // Koffing
  "passed_past": { word: "passed/past", pokemonId: 110, tier: "uncommon", category: "homophone", homophoneSetId: "passed_past" }, // Weezing
  "aloud_allowed": { word: "aloud/allowed", pokemonId: 111, tier: "common", category: "homophone", homophoneSetId: "aloud_allowed" }, // Rhyhorn
  "whose_whos": { word: "whose/who's", pokemonId: 112, tier: "uncommon", category: "homophone", homophoneSetId: "whose_whos" }, // Rhydon
  "led_lead": { word: "led/lead", pokemonId: 113, tier: "uncommon", category: "homophone", homophoneSetId: "led_lead" }, // Chansey
  "morning_mourning": { word: "morning/mourning", pokemonId: 114, tier: "common", category: "homophone", homophoneSetId: "morning_mourning" }, // Tangela
  "steal_steel": { word: "steal/steel", pokemonId: 115, tier: "common", category: "homophone", homophoneSetId: "steal_steel" }, // Kangaskhan
  "complement_compliment": { word: "complement/compliment", pokemonId: 116, tier: "rare", category: "homophone", homophoneSetId: "complement_compliment" }, // Horsea
  "precede_proceed": { word: "precede/proceed", pokemonId: 117, tier: "rare", category: "homophone", homophoneSetId: "precede_proceed" }, // Seadra
};

// Helper functions
export function getPokemonForWord(word: string, yearLevel: 'year2' | 'year6' = 'year6'): PokemonMapping | undefined {
  if (yearLevel === 'year2') {
    return fairyPokemonMap[word];
  }
  return spellingPokemonMap[word];
}

export function getPokemonForHomophone(homophoneSetId: string): PokemonMapping | undefined {
  return homophonePokemonMap[homophoneSetId];
}

export function getAllPokemonMappings(): PokemonMapping[] {
  return [
    ...Object.values(spellingPokemonMap),
    ...Object.values(fairyPokemonMap),
    ...Object.values(homophonePokemonMap),
  ];
}

export function getPokemonMappingsByYear(yearLevel: 'year2' | 'year6'): PokemonMapping[] {
  if (yearLevel === 'year2') {
    return Object.values(fairyPokemonMap);
  }
  return Object.values(spellingPokemonMap);
}

export function getPokemonCountByTier() {
  const all = getAllPokemonMappings();
  return {
    common: all.filter(p => p.tier === 'common').length,
    uncommon: all.filter(p => p.tier === 'uncommon').length,
    rare: all.filter(p => p.tier === 'rare').length,
    legendary: all.filter(p => p.tier === 'legendary').length,
    total: all.length,
  };
}

