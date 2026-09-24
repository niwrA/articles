export type Point = { year: number; value: number }

export function annuity(capexTrillion: number, ratePct: number, life: number) {
  const r = ratePct / 100
  const annual = r === 0 ? capexTrillion / life : capexTrillion * r / (1 - (1 + r) ** -life)
  return { annual, requiredRevenue: annual }
}

export function sCurve(year: number, horizon: number) {
  const x = year / Math.max(1, horizon)
  const raw = 1 / (1 + Math.exp(-10 * (x - .5)))
  const lo = 1 / (1 + Math.exp(5))
  const hi = 1 / (1 + Math.exp(-5))
  return (raw - lo) / (hi - lo)
}

export function distributionPath(input: {
  labourIncome: number; displacedPct: number; aiCostPct: number; labourMpc: number; capitalMpc: number;
  reemployedPct: number; replacementWagePct: number; horizon?: number
}) {
  const horizon = input.horizon ?? 10
  return Array.from({ length: horizon + 1 }, (_, year) => {
    const adoption = sCurve(year, horizon)
    const displaced = input.labourIncome * input.displacedPct / 100 * adoption
    const recovered = displaced * input.reemployedPct / 100 * input.replacementWagePct / 100
    const aiCost = displaced * input.aiCostPct / 100
    const labour = input.labourIncome - displaced + recovered
    const companySavings = Math.max(0, displaced - recovered - aiCost)
    const capital = aiCost + companySavings
    const consumption = labour * input.labourMpc / 100 + capital * input.capitalMpc / 100
    const initialConsumption = input.labourIncome * input.labourMpc / 100
    return { year, adoption, labour, capital, aiCost, companySavings, consumption, demandGap: consumption - initialConsumption, productiveCapacity: input.labourIncome + Math.max(0, displaced - aiCost) }
  })
}

export function computePath(input: { activityGrowth: number; efficiencyGrowth: number; acceleration: number; rebound: number; horizon: number }) {
  let activity = 1, efficiency = 1
  return Array.from({ length: input.horizon + 1 }, (_, year) => {
    if (year > 0) {
      const efficiencyRate = Math.min(.95, input.efficiencyGrowth / 100 * (1 + input.acceleration / 100) ** (year - 1))
      const activityRate = input.activityGrowth / 100 + input.rebound / 100 * efficiencyRate
      activity *= 1 + activityRate
      efficiency *= 1 + efficiencyRate
    }
    return { year, activity, perTask: 1 / efficiency, total: activity / efficiency }
  })
}

export const executionCosts = { frontier: 100, small: 15, specialist: 3, deterministic: .05 } as const
export type ExecutionKey = keyof typeof executionCosts

export function compilationResult(shares: Record<ExecutionKey, number>) {
  const average = (Object.keys(executionCosts) as ExecutionKey[]).reduce((sum, key) => sum + shares[key] / 100 * executionCosts[key], 0)
  return { average, reduction: (1 - average / 100) * 100, generative: shares.frontier + shares.small }
}

export function buildRuntimePath(input: { projectYears: number; developmentCompute: number; transactionsM: number; runtimeFraction: number; lifetime: number }) {
  const years = Math.max(input.lifetime, input.projectYears)
  let cumulativeA = 0, cumulativeB = 0, breakEven: number | null = null
  const rows = Array.from({ length: years + 1 }, (_, year) => {
    const inDevelopment = year < input.projectYears
    const a = inDevelopment ? input.developmentCompute * .45 / input.projectYears : input.transactionsM * 100
    const b = inDevelopment ? input.developmentCompute / input.projectYears : input.transactionsM * 100 * input.runtimeFraction / 100
    cumulativeA += a; cumulativeB += b
    if (breakEven === null && !inDevelopment && cumulativeB <= cumulativeA) breakEven = year
    return { year, a, b, cumulativeA, cumulativeB }
  })
  return { rows, breakEven }
}

export function envelopePath(input: { activityGrowth: number; efficiencyGrowth: number; architectureShift: number; installedGrowth: number; horizon: number }) {
  let activity = 1, efficiency = 1, installed = 1.15
  return Array.from({ length: input.horizon + 1 }, (_, year) => {
    if (year > 0) {
      activity *= 1 + input.activityGrowth / 100
      efficiency *= 1 + input.efficiencyGrowth / 100
      installed *= 1 + input.installedGrowth / 100
    }
    const compiledShare = Math.min(.9, input.architectureShift / 100 * year / input.horizon)
    const architectureFactor = 1 - compiledShare * .85
    const required = activity / efficiency * architectureFactor
    return { year, installed, required, utilization: required / installed * 100, gap: installed - required }
  })
}
