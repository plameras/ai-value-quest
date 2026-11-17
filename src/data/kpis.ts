import type { EvidenceSource } from '../game/types'

export const evidenceSources: EvidenceSource[] = [
  {
    id: 'system-records',
    label: 'Operational system records',
    description:
      'Timestamped workflow, finance, or service records covering the defined population.',
    credibility: 'credible',
  },
  {
    id: 'quality-audit',
    label: 'Quality audit or sampled case review',
    description:
      'A documented sample assessed against a consistent quality rubric.',
    credibility: 'credible',
  },
  {
    id: 'controlled-pilot',
    label: 'Controlled pilot with a comparison group',
    description:
      'A pilot measured against a comparable group or a clearly defined pre-pilot period.',
    credibility: 'credible',
  },
  {
    id: 'employee-survey',
    label: 'Employee or customer survey',
    description:
      'Structured feedback with a known question, response rate, and audience.',
    credibility: 'credible',
  },
  {
    id: 'owner-estimate',
    label: 'Owner estimate',
    description:
      'An informal estimate from the project or process owner, not independently validated.',
    credibility: 'weak',
  },
  {
    id: 'usage-dashboard',
    label: 'AI usage dashboard',
    description:
      'Prompt, session, or active-user counts that indicate adoption but not business impact.',
    credibility: 'weak',
  },
]
