import PokemonImage from '@/components/composed/PokemonImage'
import PokemonInfo from '@/components/composed/PokemonInfo'
import SearchHistory from '@/components/composed/SearchHistory'
import PokeLoader from '@/components/library/PokeLoader'
import SearchInput from '@/components/library/SearchInput'
import { useActiveId } from '@/hooks/useActiveId'
import { usePokemon } from '@/hooks/usePokemon'
import { usePokemonList } from '@/hooks/usePokemonList'
import { LoadingStatus } from '@/store/constants'
import { useMemo } from 'react'
import styles from './MainPokedex.module.css'

export default function MainPokedex() {
  const { pokemonList, status } = usePokemonList()

  const searchOptions = useMemo(() => pokemonList.map((p) => ({ name: p.name, value: p.id })), [pokemonList])

  const [currentId, setCurrentId] = useActiveId()

  const handleSearchSelect = (id: number) => setCurrentId(id)

  const { data: pokemon, status: pokemonStatus } = usePokemon(currentId)

  return (
    <div className={styles.page}>
      <div className={styles.pokedex}>
        <header className={styles.header}>
          <svg viewBox='0 0 600 52' xmlns='http://www.w3.org/2000/svg'>
            <path d='M 0 50 L 400 50 L 470 10 L 700 10' vectorEffect='non-scaling-stroke' />
          </svg>
          <span className={styles.onLight} />
          <h1 className='h1'>Pokedex</h1>
        </header>
        <div className={styles.displaySection}>
          <div className={styles.screenBorder}>
            <div className={styles.screen}>
              {pokemon ? (
                <PokemonImage pokemon={pokemon} />
              ) : (
                <PokeLoader isLoading={[pokemonStatus, status].includes(LoadingStatus.Fetching)} altLoader />
              )}
            </div>
          </div>
          <div>
            <SearchInput options={searchOptions} onSelect={handleSearchSelect} />
            <SearchHistory />
          </div>
        </div>
        <div className={styles.infoSection}>
          <div className={styles.infoContent}>{pokemon && <PokemonInfo pokemon={pokemon} />}</div>
        </div>
      </div>
    </div>
  )
}
