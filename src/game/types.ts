export type MissionId = 'cfo' | 'coo' | 'chro' | 'risk'

export type CapabilityId =
  | 'retrieve'
  | 'extract'
  | 'generate'
  | 'predict'
  | 'decide'
  | 'act'

export type HumanRoleId =
  | 'review'
  | 'approve'
  | 'investigate'
  | 'final-decision'

export type ValueHorizonId =
  | 'intelligent-efficiency'
  | 'customer-product'
  | 'human-empowerment'
  | 'brand-culture'

export type KpiCategory = 'value' | 'quality' | 'activity'

export type EvidenceCredibility = 'credible' | 'weak'

export interface Capability {
  id: CapabilityId
  label: string
  description: string
  example: string
}

export interface HumanRole {
  id: HumanRoleId
  label: string
  description: string
}

export interface ValueHorizon {
  id: ValueHorizonId
  label: string
  description: string
}

export interface KpiOption {
  id: string
  label: string
  category: KpiCategory
  unit: string
  outcome: string
}

export interface EvidenceSource {
  id: string
  label: string
  description: string
  credibility: EvidenceCredibility
}

export interface Mission {
  id: MissionId
  persona: string
  title: string
  problem: string
  desiredOutcome: string
  capabilityIds: CapabilityId[]
  plausibleCapabilityIds: CapabilityId[]
  primaryValueHorizonIds: ValueHorizonId[]
  kpis: KpiOption[]
}

export interface ShockResponseOption {
  id: string
  label: string
  description: string
  isConstructive: boolean
  allowsRevision?: boolean
}

export interface Shock {
  id: string
  label: string
  description: string
  impact: string
  responseOptions: ShockResponseOption[]
}

export interface BusinessCaseChoices {
  missionId: MissionId
  capabilityId: CapabilityId
  humanRoleId: HumanRoleId
  valueHorizonId: ValueHorizonId
  kpiId: string
  baseline: string
  target: string
  evidenceSourceId: string
  shockId: string
  shockResponseId: string
}

export interface GameScore {
  aiFit: 0 | 1 | 2
  valueLink: 0 | 1 | 2
  proof: 0 | 1 | 2
  total: number
}

export type GameStage =
  | 'mission'
  | 'ai-move'
  | 'value-bet'
  | 'prove-it'
  | 'shock'
  | 'response'
  | 'revision'
  | 'results'

export interface GameState {
  stage: GameStage
  missionId?: MissionId
  capabilityId?: CapabilityId
  humanRoleId?: HumanRoleId
  valueHorizonId?: ValueHorizonId
  kpiId?: string
  baseline: string
  target: string
  evidenceSourceId?: string
  shockId?: string
  shockResponseId?: string
}
