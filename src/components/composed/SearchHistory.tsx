import PokemonEvolutionDetail from '@/components/composed/PokemonEvolutionDetail'
import { useActiveId } from '@/hooks/useActiveId'
import { selectRecentAddedList } from '@/store/pokemon/pokemonSlice'
import { useSelector } from 'react-redux'
import styles from './composed.module.css'

export default function SearchHistory() {
  const recent = useSelector(selectRecentAddedList())

  const [currentId, setCurrentId] = useActiveId()
  return (
    <div className={styles.history}>
      <div className='bold'>Recent Searches:</div>
      {recent.map((id) => (
        <PokemonEvolutionDetail onClick={setCurrentId} id={id} key={id} />
      ))}
    </div>
  )
}
