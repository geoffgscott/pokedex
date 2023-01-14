import { Pokemon } from '@/entities/pokemon/types'
import { LoadingStatus } from '@/store/constants'
import { fetchPokemon } from '@/store/pokemon/fetching'
import type { RootState } from '@/store/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PokeDataState = {
  activeId: number
  enteredOrder: number[]
  pokemon: Record<
    number,
    | {
        data: Pokemon | null
        status: LoadingStatus
      }
    | undefined
  >
}

const initialState: PokeDataState = {
  activeId: -1,
  enteredOrder: [],
  pokemon: {},
}

const pokeDataSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<number>) => {
      state.activeId = action.payload
      state.enteredOrder.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state, { meta }) => {
      state.pokemon[meta.arg] = {
        status: LoadingStatus.Fetching,
        data: null,
      }
    })
    builder.addCase(fetchPokemon.fulfilled, (state, { payload, meta }) => {
      if (!payload.error) {
        state.pokemon[meta.arg] = {
          data: payload.data,
          status: LoadingStatus.Idle,
        }
      } else {
        state.pokemon[meta.arg] = {
          data: null,
          status: LoadingStatus.Error,
        }
      }
    })
    builder.addCase(fetchPokemon.rejected, (state, { meta }) => {
      state.pokemon[meta.arg] = {
        data: null,
        status: LoadingStatus.Error,
      }
    })
  },
})

export const { setActiveId } = pokeDataSlice.actions
export const pokemonReducer = pokeDataSlice.reducer

// Return either the cached pokemon or a fallback
export const selectPokemon = (id: number) => (state: RootState) =>
  state.pokemon.pokemon[id] ?? { data: null, status: LoadingStatus.Initial }

export const selectRecentAddedList = () => (state: RootState) =>
  [...new Set(state.pokemon.enteredOrder)].slice(-8, -1).reverse()
export const selectActiveId = () => (state: RootState) => state.pokemon.activeId
