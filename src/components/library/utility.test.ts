import { findMatch } from '@/components/library/utility'
import { describe, test, expect } from 'vitest'

describe('List searching for string match', () => {
  test('Finds an exact match', () => {
    const options = ['one', 'two', 'three']

    expect(findMatch('two', options)).toEqual({
      idx: 1,
      value: 'two',
    })
  })

  test('Finds the first partial match', () => {
    const options = ['one', 'twosome', 'three', 'two', 'twomore']

    expect(findMatch('tw', options)).toEqual({
      idx: 1,
      value: 'twosome',
    })
  })

  test('Finds an exact match between partials', () => {
    const options = ['one', 'twosome', 'two', 'twomore', 'three']

    expect(findMatch('two', options)).toEqual({
      idx: 2,
      value: 'two',
    })
  })

  test('Finds a nested key match', () => {
    const options = [{ name: 'one' }, { name: 'two' }, { name: 'three' }]

    expect(findMatch('two', options, 'name')).toEqual({
      idx: 1,
      value: 'two',
    })
  })
})
