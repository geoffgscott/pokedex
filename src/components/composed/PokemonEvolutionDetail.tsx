import SkeletonLoader from '@/components/library/SkeletonLoader'
import { capitalizeFirst } from '@/components/library/utility'
import { usePokemon } from '@/hooks/usePokemon'
import { LoadingStatus } from '@/store/constants'

import styles from './composed.module.css'

type Props = {
  id: number
  onClick: (id: number) => void
}

export default function PokemonEvolutionDetail({ id, onClick }: Props) {
  const pokemon = usePokemon(id)
  return (
    <>
      {pokemon.status === LoadingStatus.Fetching && <SkeletonLoader />}
      {pokemon.data && (
        <button type='button' onClick={() => onClick(id)} className={styles.evolutionDetail}>
          <img
            src={pokemon.data?.sprites.front_default ?? pokemon.data?.sprites.other['official-artwork'].front_default}
            alt={`${pokemon.data.name} sprite`}
          />
          {capitalizeFirst(pokemon.data.name)}
        </button>
      )}
    </>
  )
}
