// PokéAPI service for fetching Pokémon data
// Documentation: https://pokeapi.co/docs/v2

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  spriteShiny?: string;
  types: string[];
  height: number; // in decimetres
  weight: number; // in hectograms
  abilities: string[];
  stats: { name: string; value: number }[];
}

export interface PokemonAPIResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  weight: number;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}

/**
 * Fetch Pokémon data from PokéAPI
 */
export async function fetchPokemon(pokemonId: number): Promise<PokemonData> {
  try {
    const response = await fetch(`${POKEAPI_BASE}/pokemon/${pokemonId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon ${pokemonId}: ${response.statusText}`);
    }
    
    const data: PokemonAPIResponse = await response.json();
    
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
      spriteShiny: data.sprites.front_shiny,
      types: data.types.map((t) => t.type.name),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities
        .filter((a) => !a.is_hidden) // Exclude hidden abilities
        .map((a) => a.ability.name),
      stats: data.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  } catch (error) {
    console.error(`Error fetching Pokémon ${pokemonId}:`, error);
    throw error;
  }
}

/**
 * Get cached Pokémon data or fetch from API
 * Uses localStorage to cache data and reduce API calls
 */
export async function getCachedPokemon(pokemonId: number): Promise<PokemonData> {
  const cacheKey = `pokemon_${pokemonId}`;
  
  try {
    // Check localStorage cache first
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
      const cachedData = JSON.parse(cached);
      
      // Check if cache is less than 30 days old
      if (cachedData.cachedAt && Date.now() - cachedData.cachedAt < 30 * 24 * 60 * 60 * 1000) {
        return cachedData.data as PokemonData;
      }
    }
  } catch (error) {
    console.warn(`Error reading cache for Pokémon ${pokemonId}:`, error);
  }
  
  // Fetch fresh data
  const data = await fetchPokemon(pokemonId);
  
  // Cache it
  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data,
        cachedAt: Date.now(),
      })
    );
  } catch (error) {
    console.warn(`Error caching Pokémon ${pokemonId}:`, error);
  }
  
  return data;
}

/**
 * Prefetch multiple Pokémon to warm the cache
 * Useful for preloading common Pokémon
 */
export async function prefetchPokemon(pokemonIds: number[]): Promise<void> {
  const fetchPromises = pokemonIds.map((id) =>
    getCachedPokemon(id).catch((error) => {
      console.warn(`Failed to prefetch Pokémon ${id}:`, error);
      return null;
    })
  );
  
  await Promise.all(fetchPromises);
}

/**
 * Clear Pokémon cache (useful for troubleshooting)
 */
export function clearPokemonCache(): void {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith('pokemon_')) {
      localStorage.removeItem(key);
    }
  });
}

/**
 * Format Pokémon height for display (decimetres to metres/feet)
 */
export function formatHeight(decimetres: number): string {
  const metres = decimetres / 10;
  const feet = Math.floor(metres * 3.28084);
  const inches = Math.round(((metres * 3.28084) - feet) * 12);
  return `${metres.toFixed(1)}m (${feet}'${inches}")`;
}

/**
 * Format Pokémon weight for display (hectograms to kg/lbs)
 */
export function formatWeight(hectograms: number): string {
  const kg = hectograms / 10;
  const lbs = (kg * 2.20462).toFixed(1);
  return `${kg.toFixed(1)}kg (${lbs}lbs)`;
}

/**
 * Format stat name for display
 */
export function formatStatName(statName: string): string {
  const statNames: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed',
  };
  return statNames[statName] || statName;
}

/**
 * Get type color for UI styling
 */
export function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return typeColors[type] || '#68A090';
}

