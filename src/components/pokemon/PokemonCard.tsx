"use client";

import { motion } from "framer-motion";
import { CaughtPokemon } from "@/lib/db";
import { getTypeColor } from "@/lib/pokeapi";

interface PokemonCardProps {
  pokemon: CaughtPokemon;
  onClick?: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-4 shadow-md
        ${onClick ? 'cursor-pointer' : ''}
        border-2 border-transparent hover:border-primary/30
        transition-all duration-200
      `}
    >
      {/* Pokemon Image */}
      <div className="relative aspect-square mb-2">
        <img
          src={pokemon.pokemonSprite}
          alt={pokemon.pokemonName}
          className="w-full h-full object-contain pixelated"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Tier Badge */}
        <div className="absolute top-0 right-0">
          <span className={`
            inline-block px-2 py-1 rounded-full text-xs font-bold
            ${pokemon.tier === 'legendary' ? 'bg-warning text-white' : ''}
            ${pokemon.tier === 'rare' ? 'bg-primary/20 text-primary' : ''}
            ${pokemon.tier === 'uncommon' ? 'bg-success/20 text-success' : ''}
            ${pokemon.tier === 'common' ? 'bg-text-muted/20 text-text-muted' : ''}
          `}>
            {pokemon.tier === 'legendary' && '⭐'}
            {pokemon.tier === 'rare' && '💎'}
            {pokemon.tier === 'uncommon' && '✨'}
            {pokemon.tier === 'common' && '🔵'}
          </span>
        </div>
        
        {/* Year Level Badge */}
        <div className="absolute top-0 left-0">
          <span className="inline-block px-2 py-1 rounded-full text-xs font-bold bg-white/90">
            {pokemon.yearLevel === 'year2' ? '🧚' : '📖'}
          </span>
        </div>
      </div>
      
      {/* Pokemon Info */}
      <div className="text-center space-y-1">
        <p className="text-xs text-text-muted">
          No. {pokemon.pokemonId.toString().padStart(3, '0')}
        </p>
        <h3 className="font-display text-lg capitalize text-text-primary">
          {pokemon.pokemonName}
        </h3>
        
        {/* Types */}
        <div className="flex gap-1 justify-center flex-wrap">
          {pokemon.types.map(type => (
            <span
              key={type}
              className="px-2 py-0.5 rounded text-white text-xs font-semibold capitalize"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>
        
        {/* Word Association */}
        <p className="text-xs text-text-muted mt-2">
          {pokemon.word}
        </p>
      </div>
    </motion.div>
  );
}

