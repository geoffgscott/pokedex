import { capitalizeFirst, findMatch } from '@/components/library/utility'
import { useMemo, useRef, useState } from 'react'
import styles from './SearchInput.module.css'

type OptionProps = {
  label: string
  onClick?: () => void
  onFocus?: () => void
}
function OptionButton({ label, onClick, onFocus }: OptionProps) {
  return (
    <button className={styles.dropdownEntry} onFocus={onFocus} onClick={onClick} type='button'>
      {label}
    </button>
  )
}

type Props = {
  options: { name: string; value: number }[]
  onSelect: (e: number) => void
}

export default function SearchInput({ options, onSelect }: Props) {
  const listRef = useRef<HTMLDivElement | null>(null)

  const [search, setSearch] = useState('')
  const [focusedIdx, setFocusedIdx] = useState(-1)

  const sanitizedOptions = useMemo(
    () => options.map((o) => ({ name: o.name.toLowerCase(), value: o.value })),
    [options],
  )

  // Basic filtering and formatting. Could be optimized.
  const filteredOptions = sanitizedOptions
    .filter((e) => e.name.includes(search.toLowerCase()))
    .map((o) => ({ name: capitalizeFirst(o.name), value: o.value }))
    .sort()

  /** Handle arrow key navigation of list */
  const handleKeyPress: React.KeyboardEventHandler<HTMLDivElement> = (evt) => {
    switch (evt.code) {
      case 'ArrowUp': {
        evt.preventDefault()
        const nextIdx = focusedIdx - 1 < 0 ? 0 : focusedIdx - 1
        if (listRef.current) {
          const button = listRef.current.children[nextIdx] as HTMLButtonElement
          button?.focus?.()
        }
        break
      }
      case 'ArrowDown': {
        evt.preventDefault()
        const nextIdx = focusedIdx + 1 >= filteredOptions.length ? focusedIdx : focusedIdx + 1
        if (listRef.current) {
          const button = listRef.current.children[nextIdx] as HTMLButtonElement
          button?.focus?.()
        }
        break
      }
      default:
        break
    }
  }

  const handleInputKeypress: React.KeyboardEventHandler<HTMLInputElement> = (evt) => {
    if (evt.code === 'Enter') {
      // Attempt to find a match and submit
      const match = findMatch(search, filteredOptions, 'name')
      if (match.idx >= 0) {
        onSelect(filteredOptions[match.idx].value)
        // Reset
        setSearch('')
        const input = evt.target as HTMLInputElement
        input?.blur?.()
      }
    }
  }

  const handleListSelect = (idx: number) => {
    onSelect(filteredOptions[idx].value)
    setSearch('')
    if (listRef.current) {
      const button = listRef.current.children[focusedIdx] as HTMLButtonElement
      button?.blur?.()
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.dropdownCont} onKeyDown={handleKeyPress}>
      <input
        autoComplete='none'
        placeholder='Search...'
        className={styles.input}
        value={search}
        onKeyDown={handleInputKeypress}
        onChange={(evt) => setSearch(evt.target.value.trim())}
        onFocus={() => setFocusedIdx(-1)}
      />
      <div role='menu' className={styles.dropdown} ref={listRef}>
        {filteredOptions.map((o, idx) => (
          <OptionButton
            key={o.value}
            label={o.name}
            onClick={() => handleListSelect(idx)}
            onFocus={() => setFocusedIdx(idx)}
          />
        ))}
        {filteredOptions.length === 0 && <span className={styles.noMatch}>No matching pokemon</span>}
      </div>
    </div>
  )
}
