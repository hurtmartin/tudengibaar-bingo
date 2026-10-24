import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { SQUARE_IDS } from '../data/squares.js'
import { completedPatterns, patternCells } from '../lib/lines.js'
import { freshState, loadState, saveState } from '../lib/storage.js'

function reducer(state, action) {
  switch (action.type) {
    case 'complete':
      if (state.completed.includes(action.id)) return state
      return { ...state, completed: [...state.completed, action.id] }
    case 'celebrated':
      return { ...state, celebrated: [...new Set([...state.celebrated, ...action.kinds])] }
    case 'lang':
      return { ...state, lang: action.lang }
    case 'reset':
      return freshState(SQUARE_IDS, state.lang)
    default:
      return state
  }
}

export function useBingo() {
  const [state, dispatch] = useReducer(reducer, SQUARE_IDS, loadState)
  // Celebrations waiting to be shown; the first one is on screen.
  // 'diag-main' | 'diag-anti' | 'corners' | 'full'
  const [queue, setQueue] = useState([])

  useEffect(() => saveState(state), [state])

  useEffect(() => {
    document.documentElement.lang = state.lang
  }, [state.lang])

  const winCells = useMemo(
    () => patternCells(state.order, state.completed),
    [state.order, state.completed],
  )
  const isFull = state.completed.length === state.order.length

  // Stable so the toast's auto-dismiss timer isn't restarted on every render
  const dismissCelebration = useCallback(() => setQueue((q) => q.slice(1)), [])

  // Each celebration fires once per card; the flags are persisted.
  // The full card replaces any pattern wins it completes at the same time.
  function complete(id) {
    if (state.completed.includes(id)) return
    const next = [...state.completed, id]
    dispatch({ type: 'complete', id })
    const won = next.length === state.order.length ? ['full'] : completedPatterns(state.order, next)
    const fresh = won.filter((kind) => !state.celebrated.includes(kind))
    if (fresh.length === 0) return
    dispatch({ type: 'celebrated', kinds: fresh })
    setQueue((q) => [...q, ...fresh])
  }

  return {
    state,
    winCells,
    isFull,
    celebration: queue[0] ?? null,
    dismissCelebration,
    complete,
    setLang: (lang) => dispatch({ type: 'lang', lang }),
    reset: () => {
      setQueue([])
      dispatch({ type: 'reset' })
    },
  }
}
