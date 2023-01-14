import { LoadingStatus } from '@/store/constants'
import { pokemonDataSlices } from '@/store/pokemon/pokemonDataSlices'
import { AppDispatch } from '@/store/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function useEvolution(url: string) {
  const dispatch = useDispatch<AppDispatch>()
  const evolution = useSelector(pokemonDataSlices.evolution.select(url))

  /**
   * Query the pokemon if it is not cached
   * TODO: Provide re-querying on failure with back-off
   * */
  useEffect(() => {
    if (evolution.status === LoadingStatus.Initial && url) {
      void dispatch(pokemonDataSlices.evolution.actionGenerator(url))
    }
  }, [url, evolution, dispatch])

  return evolution
}
