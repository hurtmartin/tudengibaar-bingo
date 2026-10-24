// Fixed decorative star layer. Positions are deterministic so they don't jump between renders.
const STARS = Array.from({ length: 42 }, (_, i) => ({
  left: (i * 37.7) % 100,
  top: (i * 61.3) % 100,
  size: i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
  delay: (i % 9) * 0.45,
  twinkle: i % 4 === 0,
}))

export default function Starfield() {
  return (
    <div className="chalk-bg pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      {STARS.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-white ${s.twinkle ? 'animate-twinkle' : 'opacity-40'}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
