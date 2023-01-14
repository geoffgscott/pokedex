import { LoadingStatus } from '@/store/constants'
import { fetchPokemon } from '@/store/pokemon/fetching'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPokemon } from '@/store/pokemon/pokemonSlice'

export function usePokemon(id: number) {
  const dispatch = useDispatch<AppDispatch>()
  const pokemon = useSelector(selectPokemon(id))

  /**
   * Query the pokemon if it is not cached
   * TODO: Provide re-querying on failure with back-off
   * */
  useEffect(() => {
    if (pokemon.status === LoadingStatus.Initial && id >= 0) {
      void dispatch(fetchPokemon(id))
    }
  }, [id, pokemon, dispatch])

  return pokemon
}
