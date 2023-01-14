import { LoadingStatus } from '@/store/constants'
import { fetchPokeList } from '@/store/pokemon/fetching'
import { selectPokemonList } from '@/store/pokemon/pokemonListSlice'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function usePokemonList() {
  const dispatch = useDispatch<AppDispatch>()
  const pokemonList = useSelector(selectPokemonList)

  /**
   * Query the pokemon if it is not cached
   * TODO: Provide re-querying on failure with back-off
   * */
  useEffect(() => {
    if (pokemonList.status === LoadingStatus.Initial) {
      void dispatch(fetchPokeList())
    }
  }, [pokemonList, dispatch])

  return pokemonList
}
