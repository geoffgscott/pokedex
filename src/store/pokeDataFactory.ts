/**
 * Because the majority of the pokemon associated data endpoints the same query structure (just taking `url`)
 * we can reduce a lot of boilerplate by creating a slice factory. This depends on exact typing of the store
 * The non-factory template for this can be found in src/store/pokemon/pokeDataSlice.ts
 */

import { pokemonApi } from '@/services/api/pokemon'
import { LoadingStatus, PokemonDataTypes } from '@/store/constants'
import type { RootState } from '@/store/store'
import { createSlice, Draft, createAsyncThunk } from '@reduxjs/toolkit'

import { ZodSchema, ZodTypeDef } from 'zod'

type PokeDataRecord<T> = {
  data: T | null
  status: LoadingStatus
}
/** Record keyed from URL */
export type PokeDataState<T> = Record<string, PokeDataRecord<T> | undefined>

export function pokeDataFactory<T, K extends PokemonDataTypes>(name: K, schema: ZodSchema<T, ZodTypeDef, unknown>) {
  const initialState: PokeDataState<T> = {}

  // Dynamically generate the thunk
  const thunk = createAsyncThunk(`pokemon/${name}`, async (url: string) => pokemonApi.getDataFromUrl(url, schema))

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(thunk.pending, (state, { meta }) => {
        state[meta.arg] = {
          status: LoadingStatus.Fetching,
          data: null,
        }
      })
      builder.addCase(thunk.fulfilled, (state, { payload, meta }) => {
        if (!payload.error) {
          state[meta.arg] = {
            // TODO: Decide if typecasting to any is acceptable or we need an alternative type injection approach
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            data: payload.data as unknown as Draft<T>,
            status: LoadingStatus.Idle,
          }
        } else {
          state[meta.arg] = {
            data: null,
            status: LoadingStatus.Error,
          }
        }
      })
      builder.addCase(thunk.rejected, (state, { meta }) => {
        state[meta.arg] = {
          data: null,
          status: LoadingStatus.Error,
        }
      })
    },
  })

  const fallback: PokeDataRecord<T> = { data: null, status: LoadingStatus.Initial }

  return {
    actionGenerator: thunk,
    reducer: slice.reducer,
    select: (url: string) => (state: RootState) => (state[name][url] as RootState[K][string]) ?? fallback,
  }
}
