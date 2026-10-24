export default function Progress({ done, total, label, completeLabel }) {
  const full = done === total
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex flex-1 gap-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={label}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
              i < done ? 'bg-neon shadow-[0_0_8px_var(--color-neon)]' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <span
        className={`text-sm font-bold tabular-nums ${full ? 'text-glow text-neon' : 'text-ink'}`}
        aria-hidden="true"
      >
        {full ? completeLabel : `${done}/${total}`}
      </span>
    </div>
  )
}
