import { valueHorizons } from '../data/valueHorizons'
import type { ValueHorizonId } from '../game/types'
import { ChoiceCard } from './ChoiceCard'

interface ValueCompassProps {
  selectedId?: ValueHorizonId
  primaryIds: ValueHorizonId[]
  onSelect: (id: ValueHorizonId) => void
}

export function ValueCompass({ selectedId, primaryIds, onSelect }: ValueCompassProps) {
  return (
    <section className="stage-content" aria-labelledby="stage-title">
      <p className="eyebrow">03 / VALUE BET</p>
      <h1 id="stage-title">What value are you betting on?</h1>
      <p className="stage-intro">
        Choose one primary value horizon. A focused investment case is easier to
        measure and defend than a promise to improve everything.
      </p>
      <div className="choice-grid choice-grid--values">
        {valueHorizons.map((horizon) => (
          <ChoiceCard
            key={horizon.id}
            title={horizon.label}
            description={horizon.description}
            selected={selectedId === horizon.id}
            onSelect={() => onSelect(horizon.id)}
            tag={primaryIds[0] === horizon.id ? 'CLOSEST OUTCOME' : undefined}
          />
        ))}
      </div>
      <p className="selection-hint">One horizon only. You can describe other benefits later.</p>
    </section>
  )
}
