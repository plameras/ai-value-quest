import { capabilities, humanRoles } from '../data/capabilities'
import type { CapabilityId, HumanRoleId } from '../game/types'
import { ChoiceCard } from './ChoiceCard'

interface CapabilitySelectProps {
  capabilityId?: CapabilityId
  humanRoleId?: HumanRoleId
  recommendedCapabilityIds: CapabilityId[]
  plausibleCapabilityIds: CapabilityId[]
  onSelectCapability: (id: CapabilityId) => void
  onSelectHumanRole: (id: HumanRoleId) => void
}

export function CapabilitySelect({
  capabilityId,
  humanRoleId,
  recommendedCapabilityIds,
  plausibleCapabilityIds,
  onSelectCapability,
  onSelectHumanRole,
}: CapabilitySelectProps) {
  return (
    <section className="stage-content" aria-labelledby="stage-title">
      <p className="eyebrow">02 / AI MOVE</p>
      <h1 id="stage-title">What job should AI do?</h1>
      <p className="stage-intro">
        Choose one capability that addresses the problem. Keep a person accountable
        for how the output is used.
      </p>
      <h2 className="section-title">AI capability <span>Choose one</span></h2>
      <div className="choice-grid choice-grid--capabilities">
        {capabilities.map((capability) => {
          const fit = recommendedCapabilityIds.includes(capability.id)
            ? 'STRONG FIT'
            : plausibleCapabilityIds.includes(capability.id)
              ? 'POSSIBLE'
              : 'WEAK FIT'
          return (
            <ChoiceCard
              key={capability.id}
              title={capability.label}
              description={capability.description}
              selected={capabilityId === capability.id}
              onSelect={() => onSelectCapability(capability.id)}
              tag={fit}
            >
              <span className="choice-card__outcome">{capability.example}</span>
            </ChoiceCard>
          )
        })}
      </div>
      <h2 className="section-title section-title--spaced">
        Human role <span>Choose one</span>
      </h2>
      <div className="choice-grid choice-grid--roles">
        {humanRoles.map((role) => (
          <ChoiceCard
            key={role.id}
            title={role.label}
            description={role.description}
            selected={humanRoleId === role.id}
            onSelect={() => onSelectHumanRole(role.id)}
          />
        ))}
      </div>
    </section>
  )
}
