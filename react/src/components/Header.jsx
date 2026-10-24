import { useEffect, useId, useRef, useState } from 'react'
import LangToggle from './LangToggle.jsx'

export default function Header({ t, lang, onLangChange }) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-extrabold tracking-wide text-ink">{t.edition}</p>
        <LangToggle lang={lang} onChange={onLangChange} label={t.langLabel} />
      </div>

      <h1 className="flex flex-col items-center text-center leading-none uppercase">
        <span className="text-lg font-extrabold tracking-[0.32em] text-ink">{t.title}</span>
        <span className="text-glow mt-1 text-5xl font-black tracking-[0.18em] text-neon">Bingo</span>
      </h1>

      <HowTo t={t} />
    </header>
  )
}

// The how-to text opens as a panel over the card, so the card never resizes
function HowTo({ t }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onPointer = (e) => !rootRef.current?.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative flex flex-col items-center">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-ink/90 transition-colors hover:text-neon focus-visible:outline-2 focus-visible:outline-neon"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M12 11v5.5M12 7.6v.1" />
        </svg>
        {t.howTo}
        <svg
          viewBox="0 0 24 24"
          className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <p className="-mt-1 text-xs font-medium text-muted">{t.disclaimer}</p>

      <div
        id={panelId}
        hidden={!open}
        className="animate-panel-in absolute inset-x-0 top-11 z-30 rounded-2xl border border-neon/50 bg-surface p-4 text-base leading-relaxed text-ink shadow-[0_12px_40px_-8px_rgba(0,0,0,0.9)]"
      >
        {t.intro}
      </div>
    </div>
  )
}
