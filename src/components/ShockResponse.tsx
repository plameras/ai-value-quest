import { shocks } from '../data/shocks'
import type { ShockResponseOption } from '../game/types'
import { ChoiceCard } from './ChoiceCard'

interface ShockResponseProps {
  shockId?: string
  selectedResponseId?: string
  onSelect: (response: ShockResponseOption) => void
}

export function ShockResponse({
  shockId,
  selectedResponseId,
  onSelect,
}: ShockResponseProps) {
  const shock = shocks.find((item) => item.id === shockId)

  if (!shock) {
    return <p role="alert">The response options could not be loaded. Restart the game to continue.</p>
  }

  return (
    <section className="stage-content" aria-labelledby="stage-title">
      <p className="eyebrow eyebrow--shock">06 / RESPONSE</p>
      <h1 id="stage-title">How will you respond?</h1>
      <p className="stage-intro">
        A credible business case adapts to new information. Choose a response that
        protects the outcome and earns confidence.
      </p>
      <div className="choice-grid choice-grid--responses">
        {shock.responseOptions.map((response) => (
          <ChoiceCard
            key={response.id}
            title={response.label}
            description={response.description}
            selected={selectedResponseId === response.id}
            onSelect={() => onSelect(response)}
            tag={response.isConstructive ? 'BOARD-READY' : 'RISKY RESPONSE'}
          />
        ))}
      </div>
    </section>
  )
}
