import PokemonEvolutionDetail from '@/components/composed/PokemonEvolutionDetail'
import { PokemonEvolutionLink } from '@/entities/pokemon/types'
import { useActiveId } from '@/hooks/useActiveId'

import styles from './composed.module.css'

type Props = {
  link: PokemonEvolutionLink
  name: string
}

/**
 * Find the pokemon above and below in the current evolution chain
 * TODO: Needs testing
 */
function recursiveFind(
  chain: PokemonEvolutionLink,
  name: string,
  bounds = { before: '', after: [] },
): { before: string; after: string[] } | undefined {
  if (chain.species.name === name) {
    return { before: bounds.before, after: chain.evolves_to.map((e) => e.species.url) }
  }

  const options = chain.evolves_to.map((e) => recursiveFind(e, name, { before: chain.species.url, after: [] }))
  return options.find((e) => e)
}

/** Provide argument defaulting for the recursive find */
function findInChain(chain: PokemonEvolutionLink, name: string) {
  return recursiveFind(chain, name, { before: '', after: [] }) ?? { before: '', after: [] }
}

function speciesUrlToId(url: string) {
  return parseInt(
    url
      .split('/')
      .filter((e) => e)
      .at(-1) ?? '-1',
    10,
  )
}

export default function PokemonEvolutionStage({ link, name }: Props) {
  const bounds = findInChain(link, name)

  const [activeId, setActiveId] = useActiveId()
  return (
    <>
      {bounds.before && (
        <>
          <h3>Evolves From:</h3>
          <div className={styles.evolutionStage}>
            <PokemonEvolutionDetail onClick={setActiveId} id={speciesUrlToId(bounds.before)} />
          </div>
        </>
      )}
      {bounds.after.length > 0 && (
        <>
          <h3>Evolves To:</h3>
          <div className={styles.evolutionStage}>
            {bounds.after.map((afterUrl) => (
              <PokemonEvolutionDetail onClick={setActiveId} key={afterUrl} id={speciesUrlToId(afterUrl)} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
