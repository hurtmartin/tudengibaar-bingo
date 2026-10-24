// v2: squares renamed to task-1…9 and wins tracked per pattern
const STORAGE_KEY = 'tudengibaar-bingo:v2'
const CELEBRATIONS = ['diag-main', 'diag-anti', 'corners', 'full']

function shuffle(items) {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function freshState(squareIds, lang = 'et') {
  return {
    order: shuffle(squareIds),
    completed: [],
    celebrated: [],
    lang,
  }
}

// Keeps saved progress valid if squares were added/removed after it was stored
function reconcile(saved, squareIds) {
  const known = new Set(squareIds)
  const order = saved.order.filter((id) => known.has(id))
  const missing = shuffle(squareIds.filter((id) => !order.includes(id)))
  return {
    order: [...order, ...missing],
    completed: saved.completed.filter((id) => known.has(id)),
    celebrated: Array.isArray(saved.celebrated) ? saved.celebrated.filter((c) => CELEBRATIONS.includes(c)) : [],
    lang: saved.lang === 'en' ? 'en' : 'et',
  }
}

export function loadState(squareIds) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      if (Array.isArray(saved?.order) && Array.isArray(saved?.completed)) {
        return reconcile(saved, squareIds)
      }
    }
  } catch {
    // Storage blocked or corrupt: start fresh
  }
  return freshState(squareIds)
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage blocked: progress lives only in memory this session
  }
}
