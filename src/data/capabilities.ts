import type { Capability, HumanRole } from '../game/types'

export const capabilities: Capability[] = [
  {
    id: 'retrieve',
    label: 'Retrieve',
    description: 'Find relevant information from trusted sources.',
    example: 'Surface the policy, prior report, or case record a person needs.',
  },
  {
    id: 'extract',
    label: 'Extract',
    description: 'Identify and structure facts from documents or other inputs.',
    example: 'Turn invoices or onboarding forms into validated data fields.',
  },
  {
    id: 'generate',
    label: 'Generate',
    description: 'Draft new content from supplied information and instructions.',
    example: 'Create a first draft of a variance explanation for review.',
  },
  {
    id: 'predict',
    label: 'Predict',
    description: 'Estimate a likely future outcome from historical patterns.',
    example: 'Flag cases at risk of delay so teams can intervene earlier.',
  },
  {
    id: 'decide',
    label: 'Decide',
    description: 'Classify or recommend an outcome against defined criteria.',
    example: 'Recommend a route for a case that meets documented rules.',
  },
  {
    id: 'act',
    label: 'Act',
    description: 'Carry out a bounded task in a connected workflow.',
    example: 'Route a complete case to the next queue after required checks.',
  },
]

export const humanRoles: HumanRole[] = [
  {
    id: 'review',
    label: 'Review',
    description: 'Check AI output for accuracy and context before it is used.',
  },
  {
    id: 'approve',
    label: 'Approve',
    description: 'Authorize a recommendation or action before it proceeds.',
  },
  {
    id: 'investigate',
    label: 'Investigate exceptions',
    description: 'Resolve unusual, low-confidence, or out-of-policy cases.',
  },
  {
    id: 'final-decision',
    label: 'Make the final decision',
    description: 'Retain accountability for consequential decisions.',
  },
]
