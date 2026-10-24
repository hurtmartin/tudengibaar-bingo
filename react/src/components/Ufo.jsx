// Placeholder saucer until the UFO cutout arrives
export default function Ufo({ className = '' }) {
  return (
    <svg viewBox="0 0 120 64" fill="none" className={className} aria-hidden="true">
      <path d="M58 46 38 64h44L62 46Z" fill="#34c86c" opacity=".18" />
      <path d="M36 28a24 20 0 0 1 48 0" fill="#262626" stroke="#34c86c" strokeWidth="2.5" />
      <path d="M44 22a16 12 0 0 1 14-10" stroke="#f5f5f5" strokeWidth="2" strokeLinecap="round" opacity=".5" />
      <ellipse cx="60" cy="34" rx="56" ry="13" fill="#1c1c1c" stroke="#34c86c" strokeWidth="2.5" />
      <ellipse cx="60" cy="31" rx="40" ry="5" fill="#2e2e2e" />
      {[22, 41, 60, 79, 98].map((cx) => (
        <circle key={cx} cx={cx} cy="37" r="2.6" fill="#f5f5f5" />
      ))}
    </svg>
  )
}
