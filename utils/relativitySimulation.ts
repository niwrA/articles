export type JourneyParameters = {
  durationYears: number
  speedFractionC: number
  radiusEarth: number
  stationaryRadiusEarth: number
}

const EARTH_SCHWARZSCHILD_RADIUS = 0.00887005608
const EARTH_RADIUS = 6_371_000

export const velocityFactor = (beta: number) => Math.sqrt(Math.max(0, 1 - beta * beta))
export const gravityFactor = (radiusEarth: number) => {
  const radius = Math.max(1.000001, radiusEarth) * EARTH_RADIUS
  return Math.sqrt(Math.max(0, 1 - EARTH_SCHWARZSCHILD_RADIUS / radius))
}

export const properTime = (coordinateYears: number, beta: number, radiusEarth: number) =>
  coordinateYears * velocityFactor(beta) * gravityFactor(radiusEarth)

export const compareJourneys = (input: JourneyParameters) => {
  const traveller = properTime(input.durationYears, input.speedFractionC, input.radiusEarth)
  const stationary = properTime(input.durationYears, 0, input.stationaryRadiusEarth)
  return {
    traveller,
    stationary,
    differenceDays: (stationary - traveller) * 365.2425,
    velocityFactor: velocityFactor(input.speedFractionC),
    travellerGravityFactor: gravityFactor(input.radiusEarth),
    stationaryGravityFactor: gravityFactor(input.stationaryRadiusEarth)
  }
}

