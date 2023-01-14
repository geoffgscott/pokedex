import { PokemonSearchEntry } from '@/entities/pokemon/types'
import { LoadingStatus } from '@/store/constants'
import { fetchPokeList } from '@/store/pokemon/fetching'
import type { RootState } from '@/store/store'
import { createSlice } from '@reduxjs/toolkit'

type PokeListState = {
  pokemonList: PokemonSearchEntry[]
  status: LoadingStatus
}

const initialState: PokeListState = {
  pokemonList: [],
  status: LoadingStatus.Initial,
}

const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokeList.pending, (state) => {
      state.status = LoadingStatus.Fetching
    })
    builder.addCase(fetchPokeList.fulfilled, (state, { payload }) => {
      if (payload.error) {
        state.status = LoadingStatus.Error
      } else {
        state.status = LoadingStatus.Idle
        state.pokemonList = payload.data.results
      }
    })
    builder.addCase(fetchPokeList.rejected, (state) => {
      state.status = LoadingStatus.Error
    })
  },
})

export const pokemonListReducer = pokemonListSlice.reducer

export const selectPokemonList = (state: RootState) => state.pokemonList
