const questions = [
  'Why was this AI capability appropriate for the problem?',
  'Why is this Value Compass horizon the primary value?',
  'What evidence would make you confident enough to invest?',
]

interface DebriefProps {
  onRestart: () => void
}

export function Debrief({ onRestart }: DebriefProps) {
  return (
    <section className="debrief" aria-labelledby="debrief-title">
      <p className="eyebrow">TAKE IT BACK TO WORK</p>
      <h2 id="debrief-title">Three questions for your next AI idea.</h2>
      <ol>
        {questions.map((question) => <li key={question}>{question}</li>)}
      </ol>
      <button className="button button--secondary" type="button" onClick={onRestart}>
        Play another mission
      </button>
    </section>
  )
}
