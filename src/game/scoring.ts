import { capabilities, humanRoles } from '../data/capabilities'
import { evidenceSources } from '../data/kpis'
import { missions } from '../data/missions'
import { shocks } from '../data/shocks'
import { valueHorizons } from '../data/valueHorizons'
import type { BusinessCaseChoices, GameScore, KpiOption } from './types'

export interface ScoreBreakdown {
  score: GameScore
  aiFitReason: string
  valueLinkReason: string
  proofReason: string
  boardDecision: {
    title: string
    rationale: string
  }
}

export function scoreBusinessCase(choices: BusinessCaseChoices): ScoreBreakdown {
  const mission = missions.find((item) => item.id === choices.missionId)
  const capability = capabilities.find((item) => item.id === choices.capabilityId)
  const humanRole = humanRoles.find((item) => item.id === choices.humanRoleId)
  const horizon = valueHorizons.find((item) => item.id === choices.valueHorizonId)
  const evidence = evidenceSources.find((item) => item.id === choices.evidenceSourceId)
  const shock = shocks.find((item) => item.id === choices.shockId)
  const response = shock?.responseOptions.find(
    (item) => item.id === choices.shockResponseId,
  )

  if (!mission || !capability || !humanRole || !horizon || !evidence || !shock || !response) {
    throw new Error('The saved business case contains an unknown game option.')
  }

  const kpi = mission.kpis.find((item) => item.id === choices.kpiId)
  if (!kpi) {
    throw new Error('The saved business case contains an unknown KPI.')
  }

  const aiFit: GameScore['aiFit'] = mission.capabilityIds.includes(capability.id)
    ? 2
    : mission.plausibleCapabilityIds.includes(capability.id)
      ? 1
      : 0
  const aiFitReason =
    aiFit === 2
      ? `${capability.label} directly supports the work in this mission. ${humanRole.label} keeps an accountable person involved.`
      : aiFit === 1
        ? `${capability.label} could help, but it is not the clearest fit for this problem. ${humanRole.label} provides a useful human check.`
        : `${capability.label} does not clearly address the stated problem. Revisit the job AI should perform.`

  const horizonIndex = mission.primaryValueHorizonIds.indexOf(horizon.id)
  const valueLink: GameScore['valueLink'] =
    horizonIndex === 0 ? 2 : horizonIndex === 1 ? 1 : 0
  const valueLinkReason =
    valueLink === 2
      ? `${horizon.label} is the strongest match for the mission's intended business outcome: ${mission.desiredOutcome}`
      : valueLink === 1
        ? `${horizon.label} is a plausible secondary benefit, but another horizon connects more directly to the intended outcome.`
        : `${horizon.label} is not clearly connected to the business outcome in this mission.`

  const hasCompleteMeasure =
    Boolean(choices.baseline.trim()) && Boolean(choices.target.trim())
  const proof: GameScore['proof'] =
    kpi.category === 'activity'
      ? 0
      : hasCompleteMeasure && evidence.credibility === 'credible'
        ? 2
        : 1
  const proofReason =
    proof === 2
      ? `${kpi.label} measures an outcome, and you defined a baseline, target, and credible evidence source.`
      : proof === 1
        ? `${kpi.category === 'activity' ? `${kpi.label} tracks activity rather than business value` : 'The KPI is outcome-oriented'}, but the proof is incomplete or relies on a weak source.`
        : `${kpi.label} measures activity, not whether the business outcome improved. Choose an outcome or quality measure.`

  const score = { aiFit, valueLink, proof, total: aiFit + valueLink + proof }
  const boardDecision = !response.isConstructive
    ? {
        title: 'Hold: resolve the boardroom shock',
        rationale: `Your response leaves the concern about ${shock.label.toLowerCase()} unresolved. Address it before asking to proceed.`,
      }
    : score.total >= 5
      ? {
          title: 'Proceed to a measured pilot',
          rationale:
            'The case has a strong value-and-evidence chain. Validate the outcome in a controlled pilot before scaling.',
        }
      : score.total >= 3
        ? {
            title: 'Revise the case before scaling',
            rationale:
              'Some links are credible, but strengthen the weaker choices and test the assumptions before investing further.',
          }
        : {
            title: 'Do not invest at scale yet',
            rationale:
              'The problem-to-value chain is not strong enough to support investment. Rework the capability, outcome, and proof.',
          }

  return {
    score,
    aiFitReason,
    valueLinkReason,
    proofReason,
    boardDecision,
  }
}

export function findKpi(
  missionId: BusinessCaseChoices['missionId'],
  kpiId: string,
): KpiOption | undefined {
  return missions.find((mission) => mission.id === missionId)?.kpis.find(
    (kpi) => kpi.id === kpiId,
  )
}
