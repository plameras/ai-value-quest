import type { Shock } from '../game/types'

export const shocks: Shock[] = [
  {
    id: 'low-adoption',
    label: 'Low adoption',
    description: 'Only 35% of intended users use the solution.',
    impact:
      'The expected benefit may not reach enough of the workflow to support the original business case.',
    responseOptions: [
      {
        id: 'investigate-barriers',
        label: 'Investigate barriers and run a focused adoption pilot',
        description:
          'Find out why use is low, then measure outcomes with the users and tasks the solution can genuinely support.',
        isConstructive: true,
        allowsRevision: true,
      },
      {
        id: 'count-logins',
        label: 'Report logins as proof of value',
        description:
          'Treating access or login activity as an outcome does not establish business impact.',
        isConstructive: false,
      },
      {
        id: 'force-rollout',
        label: 'Mandate use across every team immediately',
        description:
          'A broad mandate may increase activity without resolving barriers or proving outcomes.',
        isConstructive: false,
      },
    ],
  },
  {
    id: 'cost-overrun',
    label: 'Cost overrun',
    description: 'Implementation cost has doubled.',
    impact:
      'The investment case needs to be reassessed against the full cost and credible benefits.',
    responseOptions: [
      {
        id: 'reassess-case',
        label: 'Reassess total cost, benefits, and scope before proceeding',
        description:
          'Update the case with the new cost and continue only if measurable benefits still justify investment.',
        isConstructive: true,
        allowsRevision: true,
      },
      {
        id: 'ignore-overrun',
        label: 'Keep the original business case unchanged',
        description:
          'Ignoring a material cost change makes the investment case less credible.',
        isConstructive: false,
      },
      {
        id: 'add-benefits',
        label: 'Increase the forecast benefits to offset the cost',
        description:
          'Raising an unsupported forecast does not resolve the changed economics.',
        isConstructive: false,
      },
    ],
  },
  {
    id: 'weak-evidence',
    label: 'Weak evidence',
    description:
      'The baseline came from estimates rather than operational evidence.',
    impact:
      'Without a reliable baseline, it is difficult to know whether the AI solution changed the outcome.',
    responseOptions: [
      {
        id: 'establish-baseline',
        label: 'Establish a measured baseline before scaling',
        description:
          'Use operational records or a documented sample to validate the starting point and compare results.',
        isConstructive: true,
        allowsRevision: true,
      },
      {
        id: 'keep-estimate',
        label: 'Keep the estimate because it supports the target',
        description:
          'A convenient estimate is not a substitute for evidence of the actual starting performance.',
        isConstructive: false,
      },
      {
        id: 'use-usage',
        label: 'Use AI usage counts as the new baseline',
        description:
          'Usage can help assess adoption, but it does not establish the business outcome baseline.',
        isConstructive: false,
      },
    ],
  },
  {
    id: 'quality-warning',
    label: 'Quality warning',
    description: 'Speed improved, but errors increased.',
    impact:
      'The efficiency gain may be undermined by rework, customer harm, or control failures.',
    responseOptions: [
      {
        id: 'pause-and-review',
        label: 'Pause expansion, investigate errors, and add a quality guardrail',
        description:
          'Understand the error pattern, protect affected work, and measure speed and quality together.',
        isConstructive: true,
        allowsRevision: true,
      },
      {
        id: 'report-speed',
        label: 'Report the time saved and defer quality review',
        description:
          'Speed alone is not a credible outcome if error rates or downstream rework are rising.',
        isConstructive: false,
      },
      {
        id: 'remove-review',
        label: 'Remove human review to recover the time savings',
        description:
          'Removing a safeguard without understanding the errors could increase risk and harm.',
        isConstructive: false,
      },
    ],
  },
]
