import { shocks } from '../data/shocks'

interface ShockEventProps {
  shockId?: string
}

export function ShockEvent({ shockId }: ShockEventProps) {
  const shock = shocks.find((item) => item.id === shockId)

  if (!shock) {
    return <p role="alert">The boardroom shock could not be loaded. Restart the game to continue.</p>
  }

  return (
    <section className="stage-content" aria-labelledby="stage-title">
      <p className="eyebrow eyebrow--shock">05 / BOARDROOM SHOCK</p>
      <div className="shock-panel">
        <span className="shock-panel__label">NEW INFORMATION</span>
        <h1 id="stage-title">{shock.label}</h1>
        <p className="shock-panel__fact">{shock.description}</p>
        <div className="shock-panel__impact">
          <strong>What this puts at risk</strong>
          <p>{shock.impact}</p>
        </div>
      </div>
      <p className="stage-intro">
        The board has heard your case. Now decide what you will do with this new evidence.
      </p>
    </section>
  )
}
