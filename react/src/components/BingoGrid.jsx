import { SQUARES_BY_ID } from '../data/squares.js'
import { CornersEffect, DiagonalEffect } from './Celebration.jsx'
import Square from './Square.jsx'

export default function BingoGrid({ order, completed, winCells, celebration, lang, t, onOpen }) {
  const done = new Set(completed)
  return (
    <div className="bingo-card rounded-3xl p-2.5">
      <div className="relative grid aspect-square grid-cols-3 grid-rows-3 gap-2">
        {order.map((id, index) => {
          const square = SQUARES_BY_ID[id]
          const title = square.title[lang]
          const isDone = done.has(id)
          return (
            <Square
              key={id}
              title={title}
              done={isDone}
              inWin={winCells.has(index)}
              label={isDone ? t.squareDone(title) : t.squareOpen(title)}
              onOpen={() => onOpen(id)}
            />
          )
        })}

        {(celebration === 'diag-main' || celebration === 'diag-anti') && (
          <DiagonalEffect key={celebration} kind={celebration} />
        )}
        {celebration === 'corners' && <CornersEffect />}
      </div>
    </div>
  )
}
