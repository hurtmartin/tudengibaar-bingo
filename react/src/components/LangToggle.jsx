export default function LangToggle({ lang, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full border border-white/15 bg-surface/80 p-1">
      {['et', 'en'].map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(code)}
            className={`min-h-9 min-w-11 rounded-full px-3 text-sm font-bold uppercase tracking-wider transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon ${
              active ? 'bg-neon text-space' : 'text-muted hover:text-ink'
            }`}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
