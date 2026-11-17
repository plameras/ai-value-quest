import { useReducer } from 'react'
import { CapabilitySelect } from './components/CapabilitySelect'
import { Debrief } from './components/Debrief'
import { EvidenceBuilder } from './components/EvidenceBuilder'
import { GameHeader } from './components/GameHeader'
import { MissionSelect } from './components/MissionSelect'
import { ProgressBar } from './components/ProgressBar'
import { ScoreBoard } from './components/ScoreBoard'
import { ShockEvent } from './components/ShockEvent'
import { ShockResponse } from './components/ShockResponse'
import { ValueCase } from './components/ValueCase'
import { ValueCompass } from './components/ValueCompass'
import { missions } from './data/missions'
import { shocks } from './data/shocks'
import { gameReducer, initialGameState, toBusinessCase } from './game/gameState'
import { scoreBusinessCase } from './game/scoring'
import type { ShockResponseOption } from './game/types'
import './styles.css'

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)
  const mission = missions.find((item) => item.id === state.missionId)
  const shock = shocks.find((item) => item.id === state.shockId)
  const selectedResponse: ShockResponseOption | undefined = shock?.responseOptions.find(
    (response) => response.id === state.shockResponseId,
  )
  const businessCase = toBusinessCase(state)
  const canContinue =
    state.stage === 'mission'
      ? Boolean(state.missionId)
      : state.stage === 'ai-move'
        ? Boolean(state.capabilityId && state.humanRoleId)
        : state.stage === 'value-bet'
          ? Boolean(state.valueHorizonId)
          : state.stage === 'prove-it' || state.stage === 'revision'
            ? Boolean(
                state.kpiId &&
                  state.baseline.trim() &&
                  state.target.trim() &&
                  state.evidenceSourceId,
              )
            : state.stage === 'shock'
              ? true
              : state.stage === 'response'
                ? Boolean(state.shockResponseId)
                : false

  const continueLabel =
    state.stage === 'mission'
      ? 'Build the AI move'
      : state.stage === 'ai-move'
        ? 'Place a value bet'
        : state.stage === 'value-bet'
          ? 'Build the proof'
          : state.stage === 'prove-it'
            ? 'Commit the business case'
            : state.stage === 'shock'
              ? 'Respond to the board'
              : 'Continue'

  function continueStage() {
    if (state.stage === 'prove-it') {
      const shockId = shocks[Math.floor(Math.random() * shocks.length)]?.id
      if (shockId) dispatch({ type: 'commit-case', shockId })
      return
    }
    dispatch({ type: 'continue' })
  }

  function renderStage() {
    switch (state.stage) {
      case 'mission':
        return (
          <MissionSelect
            selectedMissionId={state.missionId}
            onSelect={(missionId) => dispatch({ type: 'select-mission', missionId })}
          />
        )
      case 'ai-move':
        return mission ? (
          <CapabilitySelect
            capabilityId={state.capabilityId}
            humanRoleId={state.humanRoleId}
            recommendedCapabilityIds={mission.capabilityIds}
            plausibleCapabilityIds={mission.plausibleCapabilityIds}
            onSelectCapability={(capabilityId) =>
              dispatch({ type: 'select-capability', capabilityId })
            }
            onSelectHumanRole={(humanRoleId) =>
              dispatch({ type: 'select-human-role', humanRoleId })
            }
          />
        ) : null
      case 'value-bet':
        return mission ? (
          <ValueCompass
            selectedId={state.valueHorizonId}
            primaryIds={mission.primaryValueHorizonIds}
            onSelect={(valueHorizonId) =>
              dispatch({ type: 'select-value-horizon', valueHorizonId })
            }
          />
        ) : null
      case 'prove-it':
      case 'revision':
        return mission ? (
          <EvidenceBuilder
            missionId={mission.id}
            selectedKpiId={state.kpiId}
            baseline={state.baseline}
            target={state.target}
            evidenceSourceId={state.evidenceSourceId}
            revision={state.stage === 'revision'}
            shockLabel={shock?.label}
            onSelectKpi={(kpiId) => dispatch({ type: 'select-kpi', kpiId })}
            onSetBaseline={(value) => dispatch({ type: 'set-baseline', value })}
            onSetTarget={(value) => dispatch({ type: 'set-target', value })}
            onSelectEvidence={(evidenceSourceId) =>
              dispatch({ type: 'select-evidence', evidenceSourceId })
            }
          />
        ) : null
      case 'shock':
        return <ShockEvent shockId={state.shockId} />
      case 'response':
        return (
          <ShockResponse
            shockId={state.shockId}
            selectedResponseId={state.shockResponseId}
            onSelect={(response) => dispatch({ type: 'select-response', response })}
          />
        )
      case 'results':
        return businessCase ? (
          <div className="results-layout">
            <ValueCase choices={businessCase} />
            <ScoreBoard breakdown={scoreBusinessCase(businessCase)} />
            <Debrief onRestart={() => dispatch({ type: 'restart' })} />
          </div>
        ) : (
          <section className="stage-content">
            <p role="alert">Your case is incomplete. Return to the previous step or restart.</p>
            <button className="button button--secondary" onClick={() => dispatch({ type: 'restart' })}>
              Restart game
            </button>
          </section>
        )
    }
  }

  return (
    <div className="app">
      <GameHeader />
      <main className="game-main">
        <ProgressBar stage={state.stage} />
        {state.stage === 'results' ? (
          <div className="results-heading">
            <p className="eyebrow">BOARDROOM DECISION</p>
            <h1>Can your AI case stand up?</h1>
            <p>Here is what your decisions add up to—and where the board may push back.</p>
          </div>
        ) : null}
        {renderStage()}
        {state.stage === 'response' && selectedResponse ? (
          <div className="stage-actions stage-actions--response">
            <button
              className="button button--secondary"
              type="button"
              onClick={() => dispatch({ type: 'back' })}
            >
              Back to shock
            </button>
            {selectedResponse.allowsRevision ? (
              <button
                className="button button--secondary"
                type="button"
                onClick={() => dispatch({ type: 'revise-proof' })}
              >
                Revise KPI or evidence
              </button>
            ) : null}
            <button
              className="button button--primary"
              type="button"
              onClick={() => dispatch({ type: 'finalize' })}
            >
              Take it to the board
            </button>
          </div>
        ) : null}
        {state.stage === 'revision' ? (
          <div className="stage-actions">
            <button
              className="button button--secondary"
              type="button"
              onClick={() => dispatch({ type: 'back' })}
            >
              Back to response
            </button>
            <button
              className="button button--primary"
              type="button"
              disabled={!canContinue}
              onClick={() => dispatch({ type: 'finalize' })}
            >
              Save revisions &amp; decide
            </button>
          </div>
        ) : null}
        {['mission', 'ai-move', 'value-bet', 'prove-it', 'shock'].includes(state.stage) ? (
          <div className="stage-actions">
            {state.stage !== 'mission' && state.stage !== 'shock' ? (
              <button
                className="button button--secondary"
                type="button"
                onClick={() => dispatch({ type: 'back' })}
              >
                Back
              </button>
            ) : <span />}
            <button
              className="button button--primary"
              type="button"
              disabled={!canContinue}
              onClick={continueStage}
            >
              {continueLabel}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : null}
      </main>
      <footer className="site-footer">
        <span>AI VALUE QUEST</span>
        <span>A business case is a chain of evidence—not an AI demo.</span>
      </footer>
    </div>
  )
}

export default App
