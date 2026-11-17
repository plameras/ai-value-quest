import type { ReactNode } from 'react'

interface ChoiceCardProps {
  title: string
  description: string
  selected: boolean
  onSelect: () => void
  tag?: string
  children?: ReactNode
}

export function ChoiceCard({
  title,
  description,
  selected,
  onSelect,
  tag,
  children,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      className={`choice-card${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="choice-card__topline">
        <span className="choice-card__title">{title}</span>
        {tag && <span className="choice-card__tag">{tag}</span>}
      </span>
      <span className="choice-card__description">{description}</span>
      {children}
    </button>
  )
}
