// Pokémon rewards system - handles catching Pokémon when words are mastered

import { db, CaughtPokemon } from './db';
import { getPokemonForWord, homophonePokemonMap } from '@/data/pokemonMappings';
import { getCachedPokemon } from './pokeapi';

/**
 * Check if a word/homophone should reward a Pokémon catch
 * Returns the caught Pokémon data if successful, null if already caught or no mapping
 */
export async function checkAndCatchPokemon(
  word: string,
  category: 'spelling' | 'homophone',
  yearLevel: 'year2' | 'year6' = 'year6',
  homophoneSetId?: string
): Promise<CaughtPokemon | null> {
  try {
    // Get the Pokemon mapping for this word
    let mapping;
    if (category === 'spelling') {
      mapping = getPokemonForWord(word, yearLevel);
    } else {
      mapping = homophonePokemonMap[homophoneSetId || ''];
    }
    
    if (!mapping) {
      console.warn(`No Pokémon mapping found for: ${word} (${category}, ${yearLevel})`);
      return null;
    }
    
    // Check if already caught (by word, category, and year level)
    const existing = await db.caughtPokemon
      .where({ word: mapping.word, category, yearLevel })
      .first();
    
    if (existing) {
      console.log(`Pokémon already caught for: ${word} (${yearLevel})`);
      return null; // Already caught this Pokémon
    }
    
    // Fetch Pokemon data from API
    const pokemonData = await getCachedPokemon(mapping.pokemonId);
    
    // Create caught Pokemon record
    const caught: CaughtPokemon = {
      pokemonId: pokemonData.id,
      pokemonName: pokemonData.name,
      pokemonSprite: pokemonData.sprite,
      word: mapping.word,
      category,
      yearLevel,
      tier: mapping.tier,
      caughtAt: new Date().toISOString(),
      masteryDate: new Date().toISOString(),
      types: pokemonData.types,
      height: pokemonData.height,
      weight: pokemonData.weight,
      abilities: pokemonData.abilities,
      stats: pokemonData.stats,
    };
    
    // Save to database
    const id = await db.caughtPokemon.add(caught);
    caught.id = id;
    
    const creatureType = yearLevel === 'year2' ? 'Fairy' : 'Pokémon';
    console.log(`✨ Caught ${creatureType} ${pokemonData.name} for mastering: ${word}`);
    
    return caught;
  } catch (error) {
    console.error('Error in checkAndCatchPokemon:', error);
    return null;
  }
}

/**
 * Get all caught Pokémon
 */
export async function getAllCaughtPokemon(): Promise<CaughtPokemon[]> {
  return await db.caughtPokemon.toArray();
}

/**
 * Get caught Pokémon by category
 */
export async function getCaughtPokemonByCategory(
  category: 'spelling' | 'homophone'
): Promise<CaughtPokemon[]> {
  return await db.caughtPokemon.where({ category }).toArray();
}

/**
 * Get caught Pokémon by year level
 */
export async function getCaughtPokemonByYear(
  yearLevel: 'year2' | 'year6'
): Promise<CaughtPokemon[]> {
  return await db.caughtPokemon.where({ yearLevel }).toArray();
}

/**
 * Get caught Pokémon by tier
 */
export async function getCaughtPokemonByTier(
  tier: 'common' | 'uncommon' | 'rare' | 'legendary'
): Promise<CaughtPokemon[]> {
  return await db.caughtPokemon.where({ tier }).toArray();
}

/**
 * Get a specific caught Pokémon by word
 */
export async function getCaughtPokemonByWord(
  word: string,
  category: 'spelling' | 'homophone',
  yearLevel?: 'year2' | 'year6'
): Promise<CaughtPokemon | undefined> {
  if (yearLevel) {
    return await db.caughtPokemon.where({ word, category, yearLevel }).first();
  }
  return await db.caughtPokemon.where({ word, category }).first();
}

/**
 * Get total count of caught Pokémon
 */
export async function getCaughtPokemonCount(): Promise<number> {
  return await db.caughtPokemon.count();
}

/**
 * Get count by tier
 */
export async function getCaughtPokemonCountByTier(): Promise<{
  common: number;
  uncommon: number;
  rare: number;
  legendary: number;
  total: number;
}> {
  const all = await db.caughtPokemon.toArray();
  
  return {
    common: all.filter(p => p.tier === 'common').length,
    uncommon: all.filter(p => p.tier === 'uncommon').length,
    rare: all.filter(p => p.tier === 'rare').length,
    legendary: all.filter(p => p.tier === 'legendary').length,
    total: all.length,
  };
}

/**
 * Check if a Pokémon has been caught for a specific word
 */
export async function hasCaughtPokemonForWord(
  word: string,
  category: 'spelling' | 'homophone',
  yearLevel?: 'year2' | 'year6'
): Promise<boolean> {
  if (yearLevel) {
    const count = await db.caughtPokemon.where({ word, category, yearLevel }).count();
    return count > 0;
  }
  const count = await db.caughtPokemon.where({ word, category }).count();
  return count > 0;
}

/**
 * Get the most recently caught Pokémon
 */
export async function getRecentlyCaughtPokemon(limit: number = 5): Promise<CaughtPokemon[]> {
  const all = await db.caughtPokemon.toArray();
  return all
    .sort((a, b) => new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime())
    .slice(0, limit);
}

/**
 * Get completion percentage
 */
export async function getPokemonCompletionPercentage(): Promise<number> {
  const total = 118; // 100 spellings + 18 homophones
  const caught = await getCaughtPokemonCount();
  return Math.round((caught / total) * 100);
}

/**
 * Export caught Pokémon data (for backup/transfer)
 */
export async function exportCaughtPokemon(): Promise<string> {
  const pokemon = await getAllCaughtPokemon();
  return JSON.stringify(pokemon, null, 2);
}

/**
 * Import caught Pokémon data (for restore/transfer)
 */
export async function importCaughtPokemon(jsonData: string): Promise<number> {
  try {
    const pokemon: CaughtPokemon[] = JSON.parse(jsonData);
    let imported = 0;
    
    for (const p of pokemon) {
      // Check if already exists
      const existing = await db.caughtPokemon
        .where({ word: p.word, category: p.category })
        .first();
      
      if (!existing) {
        await db.caughtPokemon.add(p);
        imported++;
      }
    }
    
    return imported;
  } catch (error) {
    console.error('Error importing Pokémon:', error);
    throw error;
  }
}

