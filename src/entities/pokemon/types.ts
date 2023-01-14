type ApiPokemonListEntry = {
  name: string
  url: string
}

/** Expand the search entries client side to include Id for convenience */
export type PokemonSearchEntry = {
  id: number
} & ApiPokemonListEntry

type NameUrlRecord = {
  name: string
  url: string
}

export type Pokemon = {
  id: number
  height: number
  weight: number
  name: string
  order: number
  sprites: {
    back_default?: string | null
    front_default?: string | null
    other: {
      'official-artwork': {
        front_default?: string | null
        front_shiny?: string | null
      }
    }
  }
  species: NameUrlRecord
  stats: {
    base_stat: number
    effort: number
    stat: NameUrlRecord
  }[]
  types: {
    slot: number
    type: NameUrlRecord
  }[]
  moves: {
    move: NameUrlRecord
  }[]
}

export type PokemonSpecies = {
  id: number
  name: string
  is_legendary: boolean
  is_mythical: boolean
  evolution_chain: { url: string }
  flavor_text_entries: {
    flavor_text: string
    language: { name: string }
  }[]
}

export type PokemonEvolutionLink = {
  evolves_to: PokemonEvolutionLink[]
  species: NameUrlRecord
  is_baby: boolean
}

export type PokemonEvolutionChain = {
  id: number
  chain: PokemonEvolutionLink
}
