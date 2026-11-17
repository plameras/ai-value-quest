import type { Mission } from '../game/types'

export const missions: Mission[] = [
  {
    id: 'cfo',
    persona: 'CFO',
    title: 'Close the reporting gap',
    problem:
      'Manual variance commentary makes monthly financial reporting slow and resource intensive.',
    desiredOutcome:
      'Reducing time spent preparing commentary while keeping explanations accurate and decision-ready.',
    capabilityIds: ['retrieve', 'generate', 'extract'],
    plausibleCapabilityIds: ['predict'],
    primaryValueHorizonIds: ['intelligent-efficiency', 'human-empowerment'],
    kpis: [
      {
        id: 'commentary-cycle-time',
        label: 'Time to produce monthly variance commentary',
        category: 'value',
        unit: 'hours per reporting cycle',
        outcome: 'Faster reporting with finance capacity released for analysis.',
      },
      {
        id: 'commentary-rework',
        label: 'Commentary requiring material correction',
        category: 'quality',
        unit: 'percentage of sampled explanations',
        outcome: 'Ensure faster drafts remain accurate and useful.',
      },
      {
        id: 'ai-drafts',
        label: 'AI-generated commentary drafts',
        category: 'activity',
        unit: 'drafts per reporting cycle',
        outcome: 'Indicates tool activity, not realized business value.',
      },
    ],
  },
  {
    id: 'coo',
    persona: 'COO',
    title: 'Smooth the onboarding journey',
    problem:
      'Customer onboarding contains too many handoffs, delays, and exceptions.',
    desiredOutcome:
      'Moving complete cases through onboarding sooner while resolving exceptions reliably.',
    capabilityIds: ['extract', 'predict', 'decide', 'act'],
    plausibleCapabilityIds: ['retrieve'],
    primaryValueHorizonIds: ['customer-product', 'intelligent-efficiency'],
    kpis: [
      {
        id: 'onboarding-time',
        label: 'Time from onboarding start to activation',
        category: 'value',
        unit: 'calendar days per customer',
        outcome: 'Shorter time to value for customers.',
      },
      {
        id: 'onboarding-exceptions',
        label: 'Cases needing avoidable rework or escalation',
        category: 'quality',
        unit: 'percentage of completed cases',
        outcome: 'Fewer handoff failures without hiding complex cases.',
      },
      {
        id: 'cases-routed',
        label: 'Cases routed by AI',
        category: 'activity',
        unit: 'cases per month',
        outcome: 'Shows workflow activity, not whether onboarding improved.',
      },
    ],
  },
  {
    id: 'chro',
    persona: 'CHRO',
    title: 'Turn access into outcomes',
    problem:
      'Employees have access to an AI copilot, but adoption and measurable outcomes are uncertain.',
    desiredOutcome:
      'Helping employees complete selected work more effectively while maintaining quality.',
    capabilityIds: ['retrieve', 'generate'],
    plausibleCapabilityIds: ['extract', 'predict'],
    primaryValueHorizonIds: ['human-empowerment', 'intelligent-efficiency'],
    kpis: [
      {
        id: 'task-time',
        label: 'Time to complete a selected employee task',
        category: 'value',
        unit: 'minutes per task',
        outcome: 'Shows whether employees gain useful capacity on real work.',
      },
      {
        id: 'task-quality',
        label: 'Tasks meeting the agreed quality standard',
        category: 'quality',
        unit: 'percentage of reviewed tasks',
        outcome: 'Checks that productivity gains do not reduce work quality.',
      },
      {
        id: 'ai-prompts',
        label: 'AI prompts submitted',
        category: 'activity',
        unit: 'prompts per active user',
        outcome: 'Measures usage activity, not employee or business outcomes.',
      },
    ],
  },
  {
    id: 'risk',
    persona: 'Chief Risk Officer',
    title: 'Govern at the pace of AI',
    problem:
      'AI use is increasing faster than governance processes can review it.',
    desiredOutcome:
      'Identifying and assessing AI use cases sooner while maintaining complete, reliable oversight.',
    capabilityIds: ['retrieve', 'extract', 'predict'],
    plausibleCapabilityIds: ['generate', 'decide'],
    primaryValueHorizonIds: ['brand-culture', 'intelligent-efficiency'],
    kpis: [
      {
        id: 'review-lead-time',
        label: 'Time from use-case submission to risk review',
        category: 'value',
        unit: 'business days per use case',
        outcome: 'Governance keeps pace without creating avoidable delays.',
      },
      {
        id: 'review-completeness',
        label: 'Reviews with required evidence and controls documented',
        category: 'quality',
        unit: 'percentage of reviewed use cases',
        outcome: 'Shows that faster reviews remain complete and defensible.',
      },
      {
        id: 'ai-use-cases-logged',
        label: 'AI use cases logged',
        category: 'activity',
        unit: 'use cases per quarter',
        outcome: 'Shows register activity, not whether risk is being controlled.',
      },
    ],
  },
]
