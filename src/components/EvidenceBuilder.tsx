import { evidenceSources } from '../data/kpis'
import { missions } from '../data/missions'
import type { EvidenceSource, KpiOption, MissionId } from '../game/types'
import { ChoiceCard } from './ChoiceCard'

interface EvidenceBuilderProps {
  missionId: MissionId
  selectedKpiId?: string
  baseline: string
  target: string
  evidenceSourceId?: string
  revision: boolean
  shockLabel?: string
  onSelectKpi: (id: string) => void
  onSetBaseline: (value: string) => void
  onSetTarget: (value: string) => void
  onSelectEvidence: (id: EvidenceSource['id']) => void
}

function kpiTag(kpi: KpiOption) {
  if (kpi.category === 'activity') return 'ACTIVITY ONLY'
  if (kpi.category === 'quality') return 'QUALITY'
  return 'BUSINESS OUTCOME'
}

export function EvidenceBuilder({
  missionId,
  selectedKpiId,
  baseline,
  target,
  evidenceSourceId,
  revision,
  shockLabel,
  onSelectKpi,
  onSetBaseline,
  onSetTarget,
  onSelectEvidence,
}: EvidenceBuilderProps) {
  const mission = missions.find((item) => item.id === missionId)
  const proofGaps = [
    !selectedKpiId && 'a KPI',
    !baseline.trim() && 'a baseline',
    !target.trim() && 'a target',
    !evidenceSourceId && 'an evidence source',
  ].filter(Boolean)

  if (!mission) {
    return <p role="alert">This mission could not be loaded. Restart the game to continue.</p>
  }

  return (
    <section className="stage-content" aria-labelledby="stage-title">
      <p className="eyebrow">{revision ? '06 / REVISE THE CASE' : '04 / PROVE IT'}</p>
      <h1 id="stage-title">
        {revision ? 'Strengthen your proof.' : 'Make the value measurable.'}
      </h1>
      <p className="stage-intro">
        {revision
          ? `After “${shockLabel},” revisit your KPI, baseline, target, or evidence before the board decides.`
          : 'Select an outcome measure and define where you are starting, where you want to get, and how you will verify it.'}
      </p>
      <h2 className="section-title">Select a KPI <span>Value beats activity</span></h2>
      <div className="choice-grid choice-grid--kpis">
        {mission.kpis.map((kpi) => (
          <ChoiceCard
            key={kpi.id}
            title={kpi.label}
            description={`${kpi.outcome} Measure in ${kpi.unit}.`}
            selected={selectedKpiId === kpi.id}
            onSelect={() => onSelectKpi(kpi.id)}
            tag={kpiTag(kpi)}
          />
        ))}
      </div>
      <div className="measure-fields">
        <label className="field">
          <span>Baseline <span className="field__hint">Where are you now?</span></span>
          <input
            value={baseline}
            onChange={(event) => onSetBaseline(event.target.value)}
            placeholder="e.g. 12 hours per cycle"
            maxLength={100}
          />
        </label>
        <label className="field">
          <span>Target <span className="field__hint">What change do you expect?</span></span>
          <input
            value={target}
            onChange={(event) => onSetTarget(event.target.value)}
            placeholder="e.g. 8 hours per cycle by Q3"
            maxLength={100}
          />
        </label>
      </div>
      <h2 className="section-title section-title--spaced">
        Evidence source <span>How will you know?</span>
      </h2>
      <div className="choice-grid choice-grid--evidence">
        {evidenceSources.map((source) => (
          <ChoiceCard
            key={source.id}
            title={source.label}
            description={source.description}
            selected={evidenceSourceId === source.id}
            onSelect={() => onSelectEvidence(source.id)}
            tag={source.credibility === 'credible' ? 'CREDIBLE' : 'WEAK PROXY'}
          />
        ))}
      </div>
      {proofGaps.length > 0 && (
        <p className="selection-hint" role="status">
          Still needed: {proofGaps.join(', ')}.
        </p>
      )}
    </section>
  )
}
