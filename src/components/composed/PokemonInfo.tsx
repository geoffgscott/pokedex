import SkeletonLoader from '@/components/library/SkeletonLoader'
import { capitalizeFirst } from '@/components/library/utility'
import { Pokemon } from '@/entities/pokemon/types'
import { useSpecies } from '@/hooks/useSpecies'
import { LoadingStatus } from '@/store/constants'
import { useEvolution } from '@/hooks/useEvolution'

import PokemonEvolutionStage from '@/components/composed/PokemonEvolutionStage'
import styles from './composed.module.css'

type Props = {
  pokemon: Pokemon
}

export default function PokemonInfo({ pokemon }: Props) {
  const { data: species, status: speciesStatus } = useSpecies(pokemon.species.url)

  const evoUrl = species?.evolution_chain.url

  const { data: evolution, status: evolutionStatus } = useEvolution(evoUrl ?? '')

  const description =
    species?.flavor_text_entries.find((e) => e.language.name === 'en')?.flavor_text ?? 'No description available.'

  return (
    <>
      <div>
        <h2>{capitalizeFirst(pokemon.name)}</h2>
        <div className={styles.infoSegment}>
          {speciesStatus === LoadingStatus.Fetching ? <SkeletonLoader /> : <span>{description}</span>}
        </div>
      </div>
      <div>
        {[speciesStatus, evolutionStatus].includes(LoadingStatus.Fetching) ? (
          <SkeletonLoader />
        ) : (
          evolution?.chain && species?.name && <PokemonEvolutionStage name={species.name} link={evolution.chain} />
        )}
      </div>
    </>
  )
}
