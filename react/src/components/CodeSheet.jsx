import { useEffect, useId, useRef, useState } from 'react'
import { checkCode } from '../lib/hash.js'

export default function CodeSheet({ square, done, lang, t, onSuccess, onClose }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)
  const inputRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()
  const inputId = useId()
  const errorId = useId()

  // Esc closes, background scroll locked, focus returns to the square on close
  useEffect(() => {
    const previouslyFocused = document.activeElement
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    ;(done ? closeRef : inputRef).current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previouslyFocused?.focus?.()
    }
  }, [done, onClose])

  async function handleSubmit(e) {
    e.preventDefault()
    if (checking) return
    if (!code.trim()) {
      setError(t.emptyCode)
      setShakeKey((k) => k + 1)
      inputRef.current?.focus()
      return
    }
    setChecking(true)
    const ok = await checkCode(code, square.hash)
    setChecking(false)
    if (ok) {
      onSuccess(square.id)
      onClose()
    } else {
      setError(t.wrongCode)
      setShakeKey((k) => k + 1)
      inputRef.current?.select()
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <div className="animate-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-sheet-in relative w-full max-w-md rounded-t-3xl border-t border-x border-neon/40 bg-surface px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_-10px_rgba(52,200,108,0.35)]"
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/20" aria-hidden="true" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neon">{t.sheetTask}</p>
            <h2 id={titleId} className="mt-1 text-2xl font-extrabold text-ink">
              {square.title[lang]}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="-mr-2 flex size-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-ink focus-visible:outline-2 focus-visible:outline-neon"
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <p className="mt-3 text-base leading-relaxed text-ink/90">{square.task[lang]}</p>

        {done ? (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-neon/50 bg-neon/10 p-4">
            <svg viewBox="0 0 24 24" className="size-7 shrink-0 text-neon" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12.5 10 17.5 19 7" />
            </svg>
            <div>
              <p className="font-extrabold text-neon">{t.doneTitle}</p>
              <p className="text-sm text-muted">{t.doneText}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3" noValidate>
            <label htmlFor={inputId} className="text-sm font-bold text-ink">
              {t.codeLabel}
            </label>
            <div key={shakeKey} className={shakeKey ? 'animate-shake' : ''}>
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                  if (error) setError('')
                }}
                placeholder={t.codePlaceholder}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="done"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={`h-13 w-full rounded-xl border-2 bg-space px-4 text-base font-semibold text-ink placeholder:text-white/35 outline-none transition-colors focus:border-neon ${
                  error ? 'border-danger' : 'border-white/15'
                }`}
              />
            </div>
            <p id={errorId} role="alert" className="min-h-5 text-sm font-semibold text-danger">
              {error}
            </p>
            <button
              type="submit"
              disabled={checking}
              className="h-13 rounded-xl bg-neon text-base font-extrabold uppercase tracking-wider text-space transition-[transform,opacity] duration-150 active:scale-[0.98] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon"
            >
              {checking ? t.checking : t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
