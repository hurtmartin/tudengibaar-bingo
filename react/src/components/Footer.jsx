import { useEffect, useState } from 'react'
import itukLogo from '../assets/logo-ituk-white.svg'
import insukLogo from '../assets/logo-insuk-white.svg'

export default function Footer({ t, onReset }) {
  const [armed, setArmed] = useState(false)

  // Second tap within 4s confirms the reset
  useEffect(() => {
    if (!armed) return
    const timer = setTimeout(() => setArmed(false), 4000)
    return () => clearTimeout(timer)
  }, [armed])

  return (
    <footer className="flex items-center justify-between gap-3 border-t border-white/10 pt-1">
      <div className="flex items-center gap-4 opacity-80" aria-label={t.footerOrganizers} role="group">
        <img src={itukLogo} alt="IT-teaduskonna üliõpilaskogu" className="h-5 w-auto" width="80" height="20" />
        <img src={insukLogo} alt="Inseneriteaduskonna üliõpilaskogu" className="h-5 w-auto" width="95" height="20" />
      </div>

      <button
        type="button"
        onClick={() => {
          if (armed) {
            setArmed(false)
            onReset()
          } else {
            setArmed(true)
          }
        }}
        className={`min-h-11 shrink-0 rounded-full px-2 text-xs font-semibold underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-neon ${
          armed ? 'text-danger' : 'text-muted'
        }`}
      >
        {armed ? t.resetConfirm : t.reset}
      </button>
    </footer>
  )
}
