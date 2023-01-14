import { z, ZodSchema, ZodTypeDef } from 'zod'
import {
  Pokemon,
  PokemonEvolutionChain,
  PokemonEvolutionLink,
  PokemonSearchEntry,
  PokemonSpecies,
} from '@/entities/pokemon/types'

const nameUrlSchema = z.object({
  name: z.string(),
  url: z.string(),
})

const pokemonSearchListEntrySchema = z.object({
  name: z.string(),
  url: z.string(),
  /** Parse the Id from the url */
  id: z.coerce.number(),
})

export const pokemonSearchListSchema: ZodSchema<PokemonSearchEntry[], ZodTypeDef, unknown> = z
  .preprocess((arg) => {
    // Parse the id from the url for each entry
    const data = arg as { name: string; url: string }
    return {
      ...data,
      id: typeof data.url === 'string' ? data.url.split('/').at(-2) : arg,
    }
  }, pokemonSearchListEntrySchema)
  .array()

export const pokemonListResponseSchema: ZodSchema<
  { count: number; results: PokemonSearchEntry[] },
  ZodTypeDef,
  unknown
> = z.object({
  count: z.number(),
  results: pokemonSearchListSchema,
})

export const pokemonSchema: ZodSchema<Pokemon, ZodTypeDef, unknown> = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  order: z.number(),
  sprites: z.object({
    back_default: z.string().optional().nullable(),
    front_default: z.string().optional().nullable(),
    other: z.object({
      'official-artwork': z.object({
        front_default: z.string().optional().nullable(),
        front_shiny: z.string().optional().nullable().default(''),
      }),
    }),
  }),
  species: nameUrlSchema,
  stats: z
    .object({
      base_stat: z.number(),
      effort: z.number(),
      stat: nameUrlSchema,
    })
    .array(),
  types: z
    .object({
      slot: z.number(),
      type: nameUrlSchema,
    })
    .array(),
  moves: z
    .object({
      move: nameUrlSchema,
    })
    .array(),
})

export const pokemonSpeciesSchema: ZodSchema<PokemonSpecies, ZodTypeDef, unknown> = z.object({
  id: z.number(),
  name: z.string(),
  evolution_chain: z.object({ url: z.string() }),
  is_legendary: z.boolean(),
  is_mythical: z.boolean(),
  flavor_text_entries: z
    .object({
      flavor_text: z.preprocess((arg) => {
        // Text requires removal of special characters
        // See: https://github.com/veekun/pokedex/issues/218#issuecomment-339841781
        if (typeof arg === 'string')
          return arg
            .replace('POKéMON', 'Pokémon')
            .replace('\f', '\n')
            .replace('\u00ad\n', '')
            .replace('\u00ad', '')
            .replace(' -\n', ' - ')
            .replace('-\n', '-')
            .replace('\n', ' ')

        return arg
      }, z.string()),
      language: z.object({ name: z.string() }),
    })
    .array(),
})

export const pokemonEvolutionLinkSchema: ZodSchema<PokemonEvolutionLink, ZodTypeDef, unknown> = z.lazy(() =>
  z.object({
    species: nameUrlSchema,
    is_baby: z.boolean(),
    evolves_to: z.array(pokemonEvolutionLinkSchema),
  }),
)

export const pokemonEvolutionChainSchema: ZodSchema<PokemonEvolutionChain, ZodTypeDef, unknown> = z.object({
  id: z.number(),
  chain: pokemonEvolutionLinkSchema,
})
