import { missions } from '../data/missions'
import type { MissionId } from '../game/types'
import { ChoiceCard } from './ChoiceCard'

interface MissionSelectProps {
  selectedMissionId?: MissionId
  onSelect: (missionId: MissionId) => void
}

export function MissionSelect({ selectedMissionId, onSelect }: MissionSelectProps) {
  return (
    <section className="stage-content" aria-labelledby="stage-title">
      <p className="game-tagline">
        Can you turn an AI idea into a business case that survives the boardroom?
      </p>
      <p className="eyebrow">01 / MISSION</p>
      <h1 id="stage-title">Start with a business problem.</h1>
      <p className="stage-intro">
        Choose the executive challenge. Your job is to make a case for measurable
        value—not just an interesting use of AI.
      </p>
      <div className="choice-grid choice-grid--missions">
        {missions.map((mission) => (
          <ChoiceCard
            key={mission.id}
            title={mission.persona}
            description={mission.problem}
            selected={selectedMissionId === mission.id}
            onSelect={() => onSelect(mission.id)}
            tag="MISSION"
          >
            <span className="choice-card__outcome">
              Intended outcome: {mission.desiredOutcome}
            </span>
          </ChoiceCard>
        ))}
      </div>
      {!selectedMissionId && (
        <p className="selection-hint">Select one mission to continue.</p>
      )}
    </section>
  )
}
