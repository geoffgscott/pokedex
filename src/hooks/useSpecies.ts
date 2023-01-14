import { LoadingStatus } from '@/store/constants'
import { pokemonDataSlices } from '@/store/pokemon/pokemonDataSlices'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useSpecies(url: string) {
  const dispatch = useDispatch<AppDispatch>()
  const species = useSelector(pokemonDataSlices.species.select(url))

  /**
   * Query the pokemon if it is not cached
   * TODO: Provide re-querying on failure with back-off
   * */
  useEffect(() => {
    if (species.status === LoadingStatus.Initial && url) {
      void dispatch(pokemonDataSlices.species.actionGenerator(url))
    }
  }, [url, species, dispatch])

  return species
}
