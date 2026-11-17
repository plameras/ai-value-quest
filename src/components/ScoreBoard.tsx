import type { ScoreBreakdown } from '../game/scoring'

interface ScoreBoardProps {
  breakdown: ScoreBreakdown
}

export function ScoreBoard({ breakdown }: ScoreBoardProps) {
  const rows = [
    { label: 'AI Fit', score: breakdown.score.aiFit, reason: breakdown.aiFitReason },
    { label: 'Value Link', score: breakdown.score.valueLink, reason: breakdown.valueLinkReason },
    { label: 'Proof', score: breakdown.score.proof, reason: breakdown.proofReason },
  ]

  return (
    <section className="scoreboard" aria-labelledby="score-title">
      <div className="scoreboard__heading">
        <div>
          <p className="eyebrow">BOARDROOM SCORE</p>
          <h2 id="score-title">The case, examined.</h2>
        </div>
        <p className="scoreboard__total" aria-label={`Total ${breakdown.score.total} out of 6`}>
          {breakdown.score.total}<span>/6</span>
        </p>
      </div>
      <div className="board-decision" aria-label="Board decision">
        <p className="board-decision__label">BOARD DECISION</p>
        <h3>{breakdown.boardDecision.title}</h3>
        <p>{breakdown.boardDecision.rationale}</p>
      </div>
      <div className="scoreboard__rows">
        {rows.map((row) => (
          <article className="score-row" key={row.label}>
            <div className="score-row__top">
              <h3>{row.label}</h3>
              <p>{row.score}<span>/2</span></p>
            </div>
            <p className="score-row__reason">{row.reason}</p>
          </article>
        ))}
      </div>
      <p className="scoreboard__note">
        Your score reflects the quality of the business case—not how many steps you completed.
      </p>
    </section>
  )
}
