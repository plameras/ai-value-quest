import { capabilities, humanRoles } from '../data/capabilities'
import { evidenceSources } from '../data/kpis'
import { missions } from '../data/missions'
import { shocks } from '../data/shocks'
import { valueHorizons } from '../data/valueHorizons'
import type { BusinessCaseChoices } from '../game/types'
import { findKpi } from '../game/scoring'

interface ValueCaseProps {
  choices: BusinessCaseChoices
}

export function ValueCase({ choices }: ValueCaseProps) {
  const mission = missions.find((item) => item.id === choices.missionId)
  const capability = capabilities.find((item) => item.id === choices.capabilityId)
  const humanRole = humanRoles.find((item) => item.id === choices.humanRoleId)
  const horizon = valueHorizons.find((item) => item.id === choices.valueHorizonId)
  const kpi = findKpi(choices.missionId, choices.kpiId)
  const evidence = evidenceSources.find((item) => item.id === choices.evidenceSourceId)
  const shock = shocks.find((item) => item.id === choices.shockId)
  const response = shock?.responseOptions.find(
    (item) => item.id === choices.shockResponseId,
  )

  if (!mission || !capability || !humanRole || !horizon || !kpi || !evidence || !shock || !response) {
    return <p role="alert">The final case could not be assembled. Restart the game to continue.</p>
  }

  return (
    <section className="value-case" aria-labelledby="case-title">
      <p className="eyebrow">YOUR INVESTMENT THESIS</p>
      <h2 id="case-title">AI Value Case</h2>
      <p className="value-case__statement">
        For <strong>{mission.persona}</strong>, we use AI to{' '}
        <strong>{capability.label.toLowerCase()}</strong>, with a person to{' '}
        <strong>{humanRole.label.toLowerCase()}</strong>.
        <br />
        This creates <strong>{horizon.label}</strong> by {mission.desiredOutcome.toLowerCase()}
        <br />
        We will know it works when <strong>{kpi.label}</strong> moves from{' '}
        <strong>{choices.baseline}</strong> to <strong>{choices.target}</strong>, evidenced by{' '}
        <strong>{evidence.label}</strong>.
        <br />
        Following <strong>{shock.label.toLowerCase()}</strong>, we decided to{' '}
        <strong>{response.label.toLowerCase()}</strong>.
      </p>
      <p className="value-case__footnote">
        Mission: {mission.title} <span aria-hidden="true">·</span> KPI type: {kpi.category}
      </p>
    </section>
  )
}
