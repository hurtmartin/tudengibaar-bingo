import { useEffect, useRef } from 'react'
import Ufo from './Ufo.jsx'

// Cell centers as a % of the grid, for drawing over the squares
const C = [16.7, 50, 83.3]

export function Toast({ message, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3600)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <div
        role="status"
        className="animate-toast-in glow-neon rounded-2xl bg-surface px-5 py-3 text-center text-base font-extrabold tracking-wide text-neon"
      >
        {message}
      </div>
    </div>
  )
}

// A beam is drawn corner to corner while the UFO flies along it
export function DiagonalEffect({ kind }) {
  const [x1, x2] = kind === 'diag-main' ? [C[0], C[2]] : [C[2], C[0]]
  return (
    <div className="pointer-events-none absolute -inset-2.5 z-10 overflow-hidden rounded-3xl" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-2.5 size-[calc(100%-1.25rem)]">
        <line
          x1={x1}
          y1={C[0]}
          x2={x2}
          y2={C[2]}
          pathLength="1"
          strokeDasharray="1"
          className="animate-beam"
          stroke="var(--color-neon)"
          strokeWidth="5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: 'drop-shadow(0 0 6px var(--color-neon))' }}
        />
      </svg>
      <div
        className={`absolute inset-2.5 flex items-center justify-center ${
          kind === 'diag-main' ? 'animate-ufo-diag-main' : 'animate-ufo-diag-anti'
        }`}
      >
        <Ufo className="w-[38%] drop-shadow-[0_0_14px_rgba(52,200,108,0.7)]" />
      </div>
    </div>
  )
}

// Rings burst out of each corner square in turn, clockwise from top left
const CORNERS = [
  [C[0], C[0]],
  [C[2], C[0]],
  [C[2], C[2]],
  [C[0], C[2]],
]

export function CornersEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      {[0, 1].flatMap((wave) =>
        CORNERS.map(([left, top], i) => (
          <span
            key={`${wave}-${i}`}
            className="animate-corner-burst absolute aspect-square w-[30%] rounded-full border-[3px] border-neon shadow-[0_0_18px_var(--color-neon),inset_0_0_18px_var(--color-neon)]"
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${wave * 650 + i * 140}ms` }}
          />
        )),
      )}
    </div>
  )
}

export function FullCelebration({ t, onClose }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="full-title"
      className="animate-fade-in fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-space/95 px-6 text-center backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 24 }, (_, i) => (
          <span
            key={i}
            className="animate-twinkle absolute size-1.5 rounded-full bg-neon"
            style={{ left: `${(i * 41) % 100}%`, top: `${(i * 67) % 100}%`, animationDelay: `${(i % 6) * 0.3}s` }}
          />
        ))}
      </div>

      <Ufo className="animate-float relative w-44 drop-shadow-[0_0_24px_rgba(52,200,108,0.7)]" />
      <h2 id="full-title" className="text-glow relative text-5xl font-black tracking-wider text-neon">
        {t.fullTitle}
      </h2>
      <p className="relative max-w-xs text-lg font-semibold leading-relaxed text-ink">{t.fullText}</p>
      <button
        ref={buttonRef}
        type="button"
        onClick={onClose}
        className="relative h-13 rounded-xl bg-neon px-8 text-base font-extrabold uppercase tracking-wider text-space transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon"
      >
        {t.fullClose}
      </button>
    </div>
  )
}
