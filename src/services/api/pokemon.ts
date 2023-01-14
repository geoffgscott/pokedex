import { pokemonSchema, pokemonListResponseSchema } from '@/entities/pokemon/schemas'
import { request } from '@/services/request'
import { formatApiError, formatApiResponse } from '@/services/utility'
import { ZodSchema, ZodTypeDef } from 'zod'

export const pokemonApi = {
  /** Get the complete list of pokemon names to populate a search list */
  getSearchList() {
    return request({
      url: '/v2/pokemon?offset=0&limit=5000',
      method: 'get',
    })
      .then((res) => formatApiResponse(res, pokemonListResponseSchema))
      .catch((err) => formatApiError(err))
  },

  /** Get a single pokemon record */
  getPokemon(id: number) {
    return request({
      url: `/v2/pokemon/${id}`,
      method: 'get',
    })
      .then((res) => formatApiResponse(res, pokemonSchema))
      .catch((err) => formatApiError(err))
  },

  /** Get a single pokemon data record using url expansion approach */
  getDataFromUrl<T>(url: string, schema: ZodSchema<T, ZodTypeDef, unknown>) {
    return request({
      url: `${url}`,
      method: 'get',
    })
      .then((res) => formatApiResponse(res, schema))
      .catch((err) => formatApiError(err))
  },
}
