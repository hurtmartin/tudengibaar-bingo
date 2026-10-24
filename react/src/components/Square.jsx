export default function Square({ title, done, inWin, label, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className={`relative flex min-h-0 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl p-1.5 text-center transition-[transform,background-color,box-shadow] duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon ${
        done
          ? `bg-neon/10 ${inWin ? 'glow-neon' : 'border border-neon/60'}`
          : 'border border-white/15 bg-surface-2/80 hover:border-white/30 hover:bg-surface-2'
      }`}
    >
      {done && (
        <span
          className="animate-stamp flex size-9 rotate-[-8deg] items-center justify-center rounded-full border-[3px] border-neon text-neon shadow-[0_0_14px_-2px_var(--color-neon)]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5 10 17.5 19 7" />
          </svg>
        </span>
      )}
      <span className={`text-sm leading-tight font-bold break-words hyphens-auto ${done ? 'text-neon' : 'text-ink'}`}>
        {title}
      </span>
    </button>
  )
}
