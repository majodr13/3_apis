"use client";

import { useEffect, useState } from "react";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
}

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data: PokemonData = await res.json();
        setPokemon(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    }

    fetchPokemon();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height} decimetres</p>
      <p>Weight: {pokemon.weight} hectograms</p>
    </div>
  );
}
