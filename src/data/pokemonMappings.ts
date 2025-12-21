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
export function getPokemonForWord(word: string): PokemonMapping | undefined {
  return spellingPokemonMap[word];
}

export function getPokemonForHomophone(homophoneSetId: string): PokemonMapping | undefined {
  return homophonePokemonMap[homophoneSetId];
}

export function getAllPokemonMappings(): PokemonMapping[] {
  return [
    ...Object.values(spellingPokemonMap),
    ...Object.values(homophonePokemonMap),
  ];
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

