import { selectActiveId, setActiveId } from '@/store/pokemon/pokemonSlice'
import { AppDispatch } from '@/store/store'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/** Convenience wrapper to use activeId in the useState pattern with fewer imports */
export function useActiveId(): [number, (id: number) => void] {
  const currentId = useSelector(selectActiveId())
  const dispatch = useDispatch<AppDispatch>()

  const setCurrentId = useCallback(
    (id: number) => {
      dispatch(setActiveId(id))
    },
    [dispatch],
  )

  return [currentId, setCurrentId]
}
