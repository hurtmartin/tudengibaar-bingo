import { useCallback, useState } from 'react'
import BingoGrid from './components/BingoGrid.jsx'
import { FullCelebration, Toast } from './components/Celebration.jsx'
import CodeSheet from './components/CodeSheet.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Progress from './components/Progress.jsx'
import Starfield from './components/Starfield.jsx'
import { SQUARES_BY_ID } from './data/squares.js'
import { useBingo } from './hooks/useBingo.js'
import { STRINGS } from './i18n.js'
import "react-dev-qr/auto"

export default function App() {
  const { state, winCells, celebration, dismissCelebration, complete, setLang, reset } = useBingo()
  const [openId, setOpenId] = useState(null)
  const t = STRINGS[state.lang]
  const closeSheet = useCallback(() => setOpenId(null), [])
  const toast = { 'diag-main': t.diagToast, 'diag-anti': t.diagToast, corners: t.cornersToast }[celebration]
  const done = state.completed.length
  const total = state.order.length

  return (
    <>
      <Starfield />
      {/* One screen on mobile: header, then the card fills what's left above the footer */}
      <main className="mx-auto flex h-dvh min-h-[34rem] w-full max-w-md flex-col gap-3 overflow-x-clip px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.25rem,env(safe-area-inset-bottom))]">
        <Header t={t} lang={state.lang} onLangChange={setLang} />

        <section className="flex min-h-0 flex-1 items-center justify-center [container-type:size]">
          {/* Square card sized to whichever is smaller: the width, or the height minus the progress row */}
          <div className="flex w-[min(100cqw,calc(100cqh-2.25rem))] flex-col gap-4">
            <BingoGrid
              order={state.order}
              completed={state.completed}
              winCells={winCells}
              celebration={celebration}
              lang={state.lang}
              t={t}
              onOpen={setOpenId}
            />
            <Progress done={done} total={total} label={t.progress(done, total)} completeLabel={t.cardComplete} />
          </div>
        </section>

        <Footer t={t} onReset={reset} />
      </main>

      {openId && (
        <CodeSheet
          key={openId}
          square={SQUARES_BY_ID[openId]}
          done={state.completed.includes(openId)}
          lang={state.lang}
          t={t}
          onSuccess={complete}
          onClose={closeSheet}
        />
      )}

      {toast && <Toast key={celebration} message={toast} onDone={dismissCelebration} />}
      {celebration === 'full' && <FullCelebration t={t} onClose={dismissCelebration} />}
    </>
  )
}
