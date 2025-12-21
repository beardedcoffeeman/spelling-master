"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaughtPokemon } from "@/lib/db";
import { Modal } from "@/components/ui/Modal";

interface CatchAnimationProps {
  pokemon: CaughtPokemon | null;
  onClose: () => void;
}

type AnimationStage = 'shake' | 'open' | 'reveal' | 'details';

export function CatchAnimation({ pokemon, onClose }: CatchAnimationProps) {
  const [stage, setStage] = useState<AnimationStage>('shake');
  
  useEffect(() => {
    if (!pokemon) {
      setStage('shake');
      return;
    }
    
    // Animation sequence
    const shakeTimer = setTimeout(() => setStage('open'), 2000);
    const openTimer = setTimeout(() => setStage('reveal'), 3000);
    const revealTimer = setTimeout(() => setStage('details'), 4500);
    
    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(openTimer);
      clearTimeout(revealTimer);
    };
  }, [pokemon]);
  
  if (!pokemon) return null;
  
  return (
    <Modal isOpen={!!pokemon} onClose={() => {}} showCloseButton={false}>
      <div className="text-center p-8 space-y-6">
        <AnimatePresence mode="wait">
          {/* Stage 1: Shaking Pokéball */}
          {stage === 'shake' && (
            <motion.div
              key="shake"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, -15, 15, -15, 15, -10, 10, -5, 5, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                rotate: { 
                  repeat: Infinity, 
                  duration: 0.8,
                  ease: "easeInOut"
                },
                scale: { duration: 0.3 }
              }}
              className="text-9xl"
            >
              ⚪
            </motion.div>
          )}
          
          {/* Stage 2: Pokéball opening */}
          {stage === 'open' && (
            <motion.div
              key="open"
              initial={{ scale: 1, rotate: 0 }}
              animate={{ 
                scale: [1, 1.3, 1.5, 0],
                rotate: [0, 90, 180],
                opacity: [1, 1, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-9xl"
            >
              ⚪
            </motion.div>
          )}
          
          {/* Stage 3: Pokémon revealed */}
          {stage === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15 
              }}
              className="space-y-4"
            >
              {/* Sparkles effect */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                  className="absolute inset-0 text-6xl opacity-50"
                >
                  ✨
                </motion.div>
                
                <motion.img
                  src={pokemon.pokemonSprite}
                  alt={pokemon.pokemonName}
                  className="w-48 h-48 mx-auto pixelated"
                  style={{ imageRendering: 'pixelated' }}
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-display capitalize text-primary-dark"
              >
                {pokemon.pokemonName}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-text-secondary"
              >
                Gotcha! {pokemon.pokemonName} was caught!
              </motion.p>
            </motion.div>
          )}
          
          {/* Stage 4: Details */}
          {stage === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <img
                src={pokemon.pokemonSprite}
                alt={pokemon.pokemonName}
                className="w-48 h-48 mx-auto pixelated"
                style={{ imageRendering: 'pixelated' }}
              />
              
              <div>
                <h2 className="text-4xl font-display capitalize text-primary-dark mb-2">
                  {pokemon.pokemonName}
                </h2>
                <p className="text-sm text-text-muted">
                  No. {pokemon.pokemonId.toString().padStart(3, '0')}
                </p>
              </div>
              
              {/* Types */}
              <div className="flex gap-2 justify-center">
                {pokemon.types.map(type => (
                  <span 
                    key={type} 
                    className="px-4 py-2 rounded-full text-white font-semibold capitalize text-sm"
                    style={{ backgroundColor: getTypeColor(type) }}
                  >
                    {type}
                  </span>
                ))}
              </div>
              
              {/* Tier badge */}
              <div className="flex justify-center">
                <span className={`
                  px-4 py-2 rounded-full font-bold text-sm
                  ${pokemon.tier === 'legendary' ? 'bg-warning text-white' : ''}
                  ${pokemon.tier === 'rare' ? 'bg-primary/20 text-primary' : ''}
                  ${pokemon.tier === 'uncommon' ? 'bg-success/20 text-success' : ''}
                  ${pokemon.tier === 'common' ? 'bg-text-muted/20 text-text-muted' : ''}
                `}>
                  {pokemon.tier === 'legendary' && '⭐ '}
                  {pokemon.tier.charAt(0).toUpperCase() + pokemon.tier.slice(1)}
                  {pokemon.tier === 'legendary' && ' ⭐'}
                </span>
              </div>
              
              {/* Reward text */}
              <div className="bg-success/10 rounded-lg p-4">
                <p className="text-text-secondary">
                  <span className="font-semibold text-success">Reward for mastering:</span>
                  <br />
                  <span className="text-lg font-bold text-text-primary">{pokemon.word}</span>
                </p>
              </div>
              
              {/* Continue button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl transition-colors"
              >
                Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}

// Helper function for type colors
function getTypeColor(type: string): string {
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

