import PokeLoader from '@/components/library/PokeLoader'
import { combineClass } from '@/components/library/utility'
import { Pokemon } from '@/entities/pokemon/types'
import { useState } from 'react'
import styles from './composed.module.css'

type Props = {
  pokemon: Pokemon
}

export default function PokemonImage({ pokemon }: Props) {
  const [isLoading, setIsLoaded] = useState(true)
  return (
    <>
      <img
        className={combineClass(styles.pokemonImage, isLoading && styles.hide)}
        onLoad={() => setIsLoaded(false)}
        src={pokemon.sprites.other['official-artwork'].front_default ?? 'pokeball.svg'}
        alt={`${pokemon.name} sprite`}
      />
      {isLoading && <PokeLoader isLoading />}
    </>
  )
}
