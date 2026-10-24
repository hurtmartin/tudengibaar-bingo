export const GRID_SIZE = 3

// Win patterns by cell index (0–8). Rows and columns don't count.
export const PATTERNS = {
  'diag-main': [0, 4, 8],
  'diag-anti': [2, 4, 6],
  corners: [0, 2, 6, 8],
}

// Names of every pattern whose cells are all completed
export function completedPatterns(order, completedIds) {
  const done = new Set(completedIds)
  return Object.keys(PATTERNS).filter((name) => PATTERNS[name].every((i) => done.has(order[i])))
}

// Set of cell indexes that belong to at least one completed pattern
export function patternCells(order, completedIds) {
  return new Set(completedPatterns(order, completedIds).flatMap((name) => PATTERNS[name]))
}
