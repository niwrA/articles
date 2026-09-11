export type HousingMeasure = {
  id: string
  name: string
  color: string
  enabled: boolean
  start: number
  ramp: number
  annual: number
  cost: number
  impact: 'middel' | 'middel/hoog' | 'hoog' | 'hoog tot zeer hoog' | 'zeer hoog'
  firstEffect: string
  costLevel: 'laag' | 'laag/middel' | 'middel' | 'middel/hoog' | 'hoog' | 'zeer hoog' | 'investering'
  structural: 'begrensd' | 'middel' | 'middel/hoog' | 'hoog' | 'zeer hoog'
  uncertainty: 'middel' | 'hoog' | 'zeer hoog'
}

export const housingMeasures: HousingMeasure[] = [
  { id: 'sharing', name: 'Vrijwillig woningdelen', color: '#178ca4', enabled: true, start: 2026, ramp: 2, annual: 15_000, cost: 5_000, impact: 'hoog tot zeer hoog', firstEffect: 'maanden', costLevel: 'laag', structural: 'middel/hoog', uncertainty: 'zeer hoog' },
  { id: 'senior', name: 'Lokale ouderenhuisvesting met gedeelde voorzieningen', color: '#75ad39', enabled: true, start: 2028, ramp: 5, annual: 12_000, cost: 50_000, impact: 'hoog tot zeer hoog', firstEffect: '2–8 jaar', costLevel: 'middel/hoog', structural: 'zeer hoog', uncertainty: 'hoog' },
  { id: 'splitting', name: 'Woningsplitsing', color: '#e0a800', enabled: true, start: 2027, ramp: 4, annual: 10_000, cost: 30_000, impact: 'hoog', firstEffect: '1–4 jaar', costLevel: 'middel', structural: 'zeer hoog', uncertainty: 'hoog' },
  { id: 'transform', name: 'Optoppen en transformatie', color: '#ed7d18', enabled: true, start: 2028, ramp: 5, annual: 8_000, cost: 45_000, impact: 'middel/hoog', firstEffect: '1–5 jaar', costLevel: 'middel', structural: 'hoog', uncertainty: 'hoog' },
  { id: 'targeted', name: 'Gerichte nieuwbouw', color: '#e84b39', enabled: true, start: 2029, ramp: 5, annual: 30_000, cost: 60_000, impact: 'zeer hoog', firstEffect: '3–10 jaar', costLevel: 'hoog', structural: 'zeer hoog', uncertainty: 'middel' },
  { id: 'regular', name: 'Reguliere voorraaduitbreiding', color: '#ca3152', enabled: true, start: 2029, ramp: 6, annual: 55_000, cost: 70_000, impact: 'zeer hoog', firstEffect: '3–10+ jaar', costLevel: 'zeer hoog', structural: 'zeer hoog', uncertainty: 'middel' },
  { id: 'flex', name: 'Flexibele wooncapaciteit', color: '#9a58a6', enabled: false, start: 2027, ramp: 3, annual: 10_000, cost: 40_000, impact: 'middel', firstEffect: '1–3 jaar', costLevel: 'middel', structural: 'middel', uncertainty: 'hoog' },
  { id: 'productivity', name: 'Productiviteitsverhoging', color: '#337eb8', enabled: false, start: 2032, ramp: 7, annual: 10_000, cost: 35_000, impact: 'hoog', firstEffect: '5–20 jaar', costLevel: 'investering', structural: 'zeer hoog', uncertainty: 'zeer hoog' },
  { id: 'migration', name: 'Migratie beïnvloeden', color: '#555ba5', enabled: false, start: 2026, ramp: 1, annual: 0, cost: 0, impact: 'hoog', firstEffect: 'relatief snel', costLevel: 'middel/hoog', structural: 'hoog', uncertainty: 'zeer hoog' },
  { id: 'vacancy', name: 'Leegstand activeren', color: '#727c82', enabled: false, start: 2026, ramp: 2, annual: 5_000, cost: 15_000, impact: 'middel', firstEffect: 'maanden–2 jaar', costLevel: 'laag/middel', structural: 'begrensd', uncertainty: 'hoog' }
]

// Migration changes demand and is therefore configured separately in the
// scenario model rather than treated as newly produced capacity.
export const createHousingMeasures = () => housingMeasures.filter(measure => measure.id !== 'migration').map(measure => ({ ...measure }))
