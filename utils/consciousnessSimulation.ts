export type ConsciousnessInputs = {
  conflict: number
  novelty: number
  integration: number
  relevance: number
  urgency: number
  learnedAutomaticity: number
  arousal: number
}

export const logistic = (x: number) => 1 / (1 + Math.exp(-x))
const clamp = (x: number) => Math.max(0, Math.min(1, x))

export const consciousnessPrediction = (p: ConsciousnessInputs) => {
  const arbitrationNeed = clamp(
    (.38 * p.conflict + .27 * p.novelty + .35 * p.integration) * (1 - .72 * p.learnedAutomaticity)
  )
  const motivationalWeight = clamp(.68 * p.relevance + .32 * p.urgency)
  const availability = clamp(.2 + .8 * p.arousal)
  const evidence = 1.65 * arbitrationNeed + 1.25 * motivationalWeight + .7 * p.urgency - 1.45
  const consciousAccess = clamp(logistic(3.1 * evidence) * availability)
  const reportability = clamp(consciousAccess * (.58 + .42 * p.integration) * (.72 + .28 * p.arousal))
  const reactionDelayMs = 190 + 390 * clamp(.2 + .9 * arbitrationNeed - .38 * p.urgency)
  return { arbitrationNeed, motivationalWeight, availability, consciousAccess, reportability, reactionDelayMs }
}

export const activationAt = (timeMs: number, strength: number) => {
  const rise = logistic((timeMs - 210) / 55)
  const fall = 1 - logistic((timeMs - 760) / 120)
  return clamp(strength * rise * fall * 1.18)
}
