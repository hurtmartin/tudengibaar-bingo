// Usage: npm run hash -- "zip zap zup"
import { createHash } from 'node:crypto'
import { normalizeCode } from '../src/lib/normalize.js'

const input = process.argv.slice(2).join(' ')
if (!input.trim()) {
  console.error('Usage: npm run hash -- "your code"')
  process.exit(1)
}

const normalized = normalizeCode(input)
console.log(`normalized: "${normalized}"`)
console.log(`hash:       ${createHash('sha256').update(normalized).digest('hex')}`)
