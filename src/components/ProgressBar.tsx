import type { GameStage } from '../game/types'

const steps = [
  { stage: 'mission', label: 'Mission' },
  { stage: 'ai-move', label: 'AI move' },
  { stage: 'value-bet', label: 'Value bet' },
  { stage: 'prove-it', label: 'Prove it' },
  { stage: 'shock', label: 'Shock' },
  { stage: 'response', label: 'Response' },
  { stage: 'results', label: 'Decision' },
] as const

interface ProgressBarProps {
  stage: GameStage
}

export function ProgressBar({ stage }: ProgressBarProps) {
  const activeStage = stage === 'revision' ? 'response' : stage
  const activeIndex = steps.findIndex((step) => step.stage === activeStage)

  return (
    <nav className="progress" aria-label="Game progress">
      <ol className="progress__steps">
        {steps.map((step, index) => {
          const status =
            index < activeIndex ? 'complete' : index === activeIndex ? 'current' : 'upcoming'
          return (
            <li
              className={`progress__step progress__step--${status}`}
              key={step.stage}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              <span className="progress__number" aria-hidden="true">
                {index < activeIndex ? '✓' : index + 1}
              </span>
              <span className="progress__label">{step.label}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
