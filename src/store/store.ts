import { pokemonDataSlices } from '@/store/pokemon/pokemonDataSlices'
import { configureStore } from '@reduxjs/toolkit'
import { pokemonListReducer } from '@/store/pokemon/pokemonListSlice'
import { PokemonDataTypes } from '@/store/constants'
import { pokemonReducer } from '@/store/pokemon/pokemonSlice'

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
    pokemon: pokemonReducer,
    [PokemonDataTypes.Evolution]: pokemonDataSlices.evolution.reducer,
    [PokemonDataTypes.Species]: pokemonDataSlices.species.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
