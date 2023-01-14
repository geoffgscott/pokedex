import { pokemonApi } from '@/services/api/pokemon'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPokeList = createAsyncThunk('pokemon/fetchList', async () => pokemonApi.getSearchList())

export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async (id: number) => pokemonApi.getPokemon(id))
