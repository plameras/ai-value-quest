import type {
  BusinessCaseChoices,
  GameState,
  GameStage,
  MissionId,
  ShockResponseOption,
} from './types'

export const initialGameState: GameState = {
  stage: 'mission',
  baseline: '',
  target: '',
}

export type GameAction =
  | { type: 'select-mission'; missionId: MissionId }
  | { type: 'select-capability'; capabilityId: NonNullable<GameState['capabilityId']> }
  | { type: 'select-human-role'; humanRoleId: NonNullable<GameState['humanRoleId']> }
  | { type: 'select-value-horizon'; valueHorizonId: NonNullable<GameState['valueHorizonId']> }
  | { type: 'select-kpi'; kpiId: string }
  | { type: 'set-baseline'; value: string }
  | { type: 'set-target'; value: string }
  | { type: 'select-evidence'; evidenceSourceId: NonNullable<GameState['evidenceSourceId']> }
  | { type: 'commit-case'; shockId: string }
  | { type: 'select-response'; response: ShockResponseOption }
  | { type: 'continue' }
  | { type: 'back' }
  | { type: 'revise-proof' }
  | { type: 'finalize' }
  | { type: 'restart' }

const stages: GameStage[] = [
  'mission',
  'ai-move',
  'value-bet',
  'prove-it',
  'shock',
  'response',
  'revision',
  'results',
]

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'select-mission':
      return { ...initialGameState, missionId: action.missionId }
    case 'select-capability':
      return { ...state, capabilityId: action.capabilityId }
    case 'select-human-role':
      return { ...state, humanRoleId: action.humanRoleId }
    case 'select-value-horizon':
      return { ...state, valueHorizonId: action.valueHorizonId }
    case 'select-kpi':
      return { ...state, kpiId: action.kpiId }
    case 'set-baseline':
      return { ...state, baseline: action.value }
    case 'set-target':
      return { ...state, target: action.value }
    case 'select-evidence':
      return { ...state, evidenceSourceId: action.evidenceSourceId }
    case 'commit-case':
      return { ...state, stage: 'shock', shockId: action.shockId }
    case 'select-response':
      return { ...state, shockResponseId: action.response.id }
    case 'continue': {
      const currentIndex = stages.indexOf(state.stage)
      const nextStage = stages[currentIndex + 1]
      return nextStage ? { ...state, stage: nextStage } : state
    }
    case 'back': {
      const previousStages: Partial<Record<GameStage, GameStage>> = {
        'ai-move': 'mission',
        'value-bet': 'ai-move',
        'prove-it': 'value-bet',
        response: 'shock',
        revision: 'response',
      }
      const previousStage = previousStages[state.stage]
      return previousStage ? { ...state, stage: previousStage } : state
    }
    case 'revise-proof':
      return { ...state, stage: 'revision' }
    case 'finalize':
      return { ...state, stage: 'results' }
    case 'restart':
      return initialGameState
  }
}

export function toBusinessCase(state: GameState): BusinessCaseChoices | null {
  if (
    !state.missionId ||
    !state.capabilityId ||
    !state.humanRoleId ||
    !state.valueHorizonId ||
    !state.kpiId ||
    !state.baseline.trim() ||
    !state.target.trim() ||
    !state.evidenceSourceId ||
    !state.shockId ||
    !state.shockResponseId
  ) {
    return null
  }

  return {
    missionId: state.missionId,
    capabilityId: state.capabilityId,
    humanRoleId: state.humanRoleId,
    valueHorizonId: state.valueHorizonId,
    kpiId: state.kpiId,
    baseline: state.baseline.trim(),
    target: state.target.trim(),
    evidenceSourceId: state.evidenceSourceId,
    shockId: state.shockId,
    shockResponseId: state.shockResponseId,
  }
}
