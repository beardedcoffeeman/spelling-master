"use client";

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/db";
import { PokemonCard } from "./PokemonCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type FilterType = 'all' | 'spelling' | 'homophone';
type FilterTier = 'all' | 'common' | 'uncommon' | 'rare' | 'legendary';
type FilterYear = 'all' | 'year2' | 'year6';

export function Pokedex() {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterTier, setFilterTier] = useState<FilterTier>('all');
  const [filterYear, setFilterYear] = useState<FilterYear>('all');
  const [sortBy, setSortBy] = useState<'number' | 'recent' | 'name'>('number');

  // Fetch all caught Pokemon
  const allPokemon = useLiveQuery(() => db.caughtPokemon.toArray());

  // Apply filters
  const filteredPokemon = allPokemon?.filter(pokemon => {
    if (filterType !== 'all' && pokemon.category !== filterType) return false;
    if (filterTier !== 'all' && pokemon.tier !== filterTier) return false;
    if (filterYear !== 'all' && pokemon.yearLevel !== filterYear) return false;
    return true;
  });

  // Apply sorting
  const sortedPokemon = [...(filteredPokemon || [])].sort((a, b) => {
    switch (sortBy) {
      case 'number':
        return a.pokemonId - b.pokemonId;
      case 'recent':
        return new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime();
      case 'name':
        return a.pokemonName.localeCompare(b.pokemonName);
      default:
        return 0;
    }
  });

  const total = 318; // 100 year6 + 18 homophones + 200 year2
  const caught = allPokemon?.length || 0;
  const percentage = Math.round((caught / total) * 100);
  
  // Count by year
  const yearCounts = {
    year2: allPokemon?.filter(p => p.yearLevel === 'year2').length || 0,
    year6: allPokemon?.filter(p => p.yearLevel === 'year6').length || 0,
  };

  // Count by tier
  const tierCounts = {
    common: allPokemon?.filter(p => p.tier === 'common').length || 0,
    uncommon: allPokemon?.filter(p => p.tier === 'uncommon').length || 0,
    rare: allPokemon?.filter(p => p.tier === 'rare').length || 0,
    legendary: allPokemon?.filter(p => p.tier === 'legendary').length || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="p-6 text-center bg-gradient-to-br from-primary to-primary-dark text-white">
        <h1 className="text-4xl font-display mb-2">Creature Collection</h1>
        <p className="text-sm opacity-75 mb-3">Pokémon & Fairies</p>
        <p className="text-5xl font-bold mb-1">
          {caught} / {total}
        </p>
        <p className="text-xl opacity-90">
          {percentage}% Complete
        </p>
        
        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-white h-full rounded-full"
          />
        </div>
        
        {/* Year breakdown */}
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="opacity-75">Year 6 Pokémon</p>
            <p className="text-2xl font-bold">{yearCounts.year6}</p>
          </div>
          <div>
            <p className="opacity-75">Year 2 Fairies</p>
            <p className="text-2xl font-bold">{yearCounts.year2}</p>
          </div>
        </div>
      </Card>

      {/* Tier Counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">🔵</div>
          <p className="text-2xl font-bold text-text-primary">{tierCounts.common}</p>
          <p className="text-sm text-text-muted">Common</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">✨</div>
          <p className="text-2xl font-bold text-text-primary">{tierCounts.uncommon}</p>
          <p className="text-sm text-text-muted">Uncommon</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">💎</div>
          <p className="text-2xl font-bold text-text-primary">{tierCounts.rare}</p>
          <p className="text-sm text-text-muted">Rare</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl mb-1">⭐</div>
          <p className="text-2xl font-bold text-text-primary">{tierCounts.legendary}</p>
          <p className="text-sm text-text-muted">Legendary</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          {/* Year Filter */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Filter by Year Level
            </label>
            <div className="flex gap-2">
              <Button
                variant={filterYear === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterYear('all')}
              >
                All
              </Button>
              <Button
                variant={filterYear === 'year2' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterYear('year2')}
              >
                🧚 Year 2 Fairies
              </Button>
              <Button
                variant={filterYear === 'year6' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterYear('year6')}
              >
                📖 Year 6 Pokémon
              </Button>
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Filter by Source
            </label>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'spelling' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterType('spelling')}
              >
                📚 Spellings
              </Button>
              <Button
                variant={filterType === 'homophone' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterType('homophone')}
              >
                🎭 Homophones
              </Button>
            </div>
          </div>

          {/* Tier Filter */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Filter by Rarity
            </label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filterTier === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterTier('all')}
              >
                All
              </Button>
              <Button
                variant={filterTier === 'common' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterTier('common')}
              >
                🔵 Common
              </Button>
              <Button
                variant={filterTier === 'uncommon' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterTier('uncommon')}
              >
                ✨ Uncommon
              </Button>
              <Button
                variant={filterTier === 'rare' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterTier('rare')}
              >
                💎 Rare
              </Button>
              <Button
                variant={filterTier === 'legendary' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilterTier('legendary')}
              >
                ⭐ Legendary
              </Button>
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Sort by
            </label>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'number' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSortBy('number')}
              >
                # Number
              </Button>
              <Button
                variant={sortBy === 'recent' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSortBy('recent')}
              >
                🕐 Recent
              </Button>
              <Button
                variant={sortBy === 'name' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSortBy('name')}
              >
                🔤 Name
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Pokemon Grid */}
      {sortedPokemon.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-2xl font-display text-text-primary mb-2">
            No Pokémon Yet!
          </h3>
          <p className="text-text-secondary">
            Master words in the spelling challenges to catch Pokémon!
          </p>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence>
            {sortedPokemon.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.03 }}
              >
                <PokemonCard pokemon={pokemon} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Showing count */}
      {sortedPokemon.length > 0 && (
        <p className="text-center text-text-muted">
          Showing {sortedPokemon.length} of {caught} caught Pokémon
        </p>
      )}
    </div>
  );
}

