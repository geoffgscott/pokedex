import { KeyOfType } from '@/components/library/types'

/** Capitalize the first letter of a name */
export function capitalizeFirst([first, ...rest]: string): string {
  return [first.toLocaleUpperCase(), ...rest].join('')
}

type SearchMatch = { value: string; idx: number }

/** Searches an array and finds an exact string match if it exists or first partial match if it exists */
export function findMatch(target: string, options: string[]): SearchMatch
export function findMatch<T extends Record<string, unknown>>(
  target: string,
  options: T[],
  valueKey: KeyOfType<T, string>,
): SearchMatch
export function findMatch<T extends Record<string, unknown>>(
  target: string,
  options: T[] | string[],
  valueKey?: KeyOfType<T, string>,
): SearchMatch {
  return options
    .map((e) => {
      if (typeof e === 'string') return e

      if (typeof valueKey === 'undefined') throw new Error('Invalid key')
      const val: string = e[valueKey] as string // Typecast to handle custom keyof type
      return val
    })
    .reduce<SearchMatch>(
      (result, curr, idx) =>
        // Accept the first partial match (when there is no exact match) or an exact match
        (result.idx < 0 && result.value !== target && curr.toLowerCase().includes(target)) || curr === target
          ? { idx, value: curr }
          : result,
      {
        value: '',
        idx: -1,
      },
    )
}

/**
 * Combine React classes with conditional checking
 */
export function combineClass(...entries: (string | boolean | null | undefined)[]): string {
  const className = entries.filter((item) => item && typeof item === 'string').join(' ')
  return className
}
