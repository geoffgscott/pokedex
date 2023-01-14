import { pokemonEvolutionChainSchema, pokemonSpeciesSchema } from '@/entities/pokemon/schemas'
import { PokemonDataTypes } from '@/store/constants'
import { pokeDataFactory } from '@/store/pokeDataFactory'

/** Expandable to any URL linked resource with a defined schema */
export const pokemonDataSlices = {
  [PokemonDataTypes.Evolution]: pokeDataFactory(PokemonDataTypes.Evolution, pokemonEvolutionChainSchema),
  [PokemonDataTypes.Species]: pokeDataFactory(PokemonDataTypes.Species, pokemonSpeciesSchema),
} as const
