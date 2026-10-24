import { normalizeCode } from './normalize.js'

export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

export async function checkCode(input, expectedHash) {
  const normalized = normalizeCode(input)
  if (!normalized) return false
  return (await sha256Hex(normalized)) === expectedHash
}
