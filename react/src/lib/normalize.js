// Shared by the app and scripts/hash-code.js, so both hash the same string.
// Forgiving: trims, collapses whitespace, lowercases. Keeps õ/ä/ö/ü as typed
// (NFC only unifies composed vs. decomposed forms of the same letter).
export function normalizeCode(input) {
  return input.normalize('NFC').trim().replace(/\s+/g, ' ').toLowerCase()
}
