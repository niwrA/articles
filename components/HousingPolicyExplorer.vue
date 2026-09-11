<script setup lang="ts">
import { createHousingMeasures, type HousingMeasure } from '~/data/housingMeasures'

type PopulationComponent = { id: string; name: string; people: number; note: string }

const startYear = 2026
const endYear = 2040
const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
const initialShortage = ref(396_000)
const initialPopulation = ref(18_200_000)
const annualPopulationGrowth = ref(50_000)
const initialHouseholdSize = ref(2.12)
const finalHouseholdSize = ref(2.05)
const displayMode = ref<'capacity' | 'share'>('capacity')

const measures = reactive(createHousingMeasures())

// Optional decomposition only. The total annual population change remains the
// governing input, so categories cannot accidentally be added on top of it.
const populationComponents = reactive<PopulationComponent[]>([
  { id: 'natural', name: 'Natuurlijke aanwas/krimp', people: 0, note: 'Geboorten minus sterfte' },
  { id: 'labour', name: 'Arbeidsmigratie', people: 0, note: 'Immigratie minus vertrek' },
  { id: 'asylum', name: 'Asielmigratie', people: 0, note: 'Netto verandering van de bevolking' },
  { id: 'study', name: 'Studiemigratie', people: 0, note: 'Immigratie minus relatief hoge uitstroom' },
  { id: 'family', name: 'Gezinsmigratie', people: 0, note: 'Inclusief gezinshereniging' },
  { id: 'other', name: 'Overige migratie', people: 0, note: 'Overige geregistreerde motieven' }
])

const fmt = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 })
const compact = new Intl.NumberFormat('nl-NL', { notation: 'compact', maximumFractionDigits: 1 })
const money = (millions: number) => millions >= 1000 ? `€${(millions / 1000).toLocaleString('nl-NL', { maximumFractionDigits: 1 })} mld` : `€${Math.round(millions)} mln`
const allocatedPopulationGrowth = computed(() => populationComponents.reduce((sum, item) => sum + item.people, 0))
const unallocatedPopulationGrowth = computed(() => annualPopulationGrowth.value - allocatedPopulationGrowth.value)

const productionFor = (measure: HousingMeasure, year: number) => {
  if (!measure.enabled || year < measure.start) return 0
  return measure.annual * Math.min(1, (year - measure.start + 1) / Math.max(1, measure.ramp))
}

const series = computed(() => {
  let remaining = initialShortage.value
  let cumulativeCost = 0
  let cumulativeCapacity = 0
  let previousHouseholds = initialPopulation.value / initialHouseholdSize.value
  return years.map((year, index) => {
    const contributions = measures.map(measure => {
      const capacity = productionFor(measure, year)
      cumulativeCost += capacity * measure.cost / 1_000_000
      return { id: measure.id, name: measure.name, color: measure.color, capacity }
    })
    const capacity = contributions.reduce((sum, item) => sum + item.capacity, 0)
    const population = initialPopulation.value + annualPopulationGrowth.value * (index + 1)
    const progress = (index + 1) / years.length
    const householdSize = initialHouseholdSize.value + (finalHouseholdSize.value - initialHouseholdSize.value) * progress
    const households = population / Math.max(1, householdSize)
    const demand = households - previousHouseholds
    previousHouseholds = households
    remaining = Math.max(0, remaining + demand - capacity)
    cumulativeCapacity += capacity
    return { year, contributions, capacity, demand, remaining, cumulativeCost, cumulativeCapacity, population, householdSize, households }
  })
})

const finalYear = computed(() => series.value.at(-1)!)
const shortageWithoutMeasures = computed(() => initialShortage.value + series.value.reduce((sum, item) => sum + item.demand, 0))
const solvedShare = computed(() => shortageWithoutMeasures.value > 0 ? Math.min(100, finalYear.value.cumulativeCapacity / shortageWithoutMeasures.value * 100) : 0)

const chart = computed(() => {
  const width = 960, height = 390
  const margin = { top: 24, right: 92, bottom: 45, left: 72 }
  const innerWidth = width - margin.left - margin.right, innerHeight = height - margin.top - margin.bottom
  const maxCapacity = Math.max(...series.value.map(item => item.capacity), 1)
  const maxLeft = displayMode.value === 'capacity' ? maxCapacity * 1.12 : Math.max(1, maxCapacity / Math.max(1, shortageWithoutMeasures.value) * 112)
  const maxCost = Math.max(finalYear.value.cumulativeCost, 1) * 1.08
  const groupWidth = innerWidth / years.length, barWidth = Math.max(12, groupWidth * .64)
  const leftY = (value: number) => margin.top + innerHeight - value / maxLeft * innerHeight
  const costY = (value: number) => margin.top + innerHeight - value / maxCost * innerHeight
  const x = (index: number) => margin.left + index * groupWidth + groupWidth / 2
  const bars = series.value.flatMap((item, index) => {
    let accumulated = 0
    return item.contributions.filter(part => part.capacity > 0).map(part => {
      const value = displayMode.value === 'capacity' ? part.capacity : part.capacity / Math.max(1, shortageWithoutMeasures.value) * 100
      const y = leftY(accumulated + value)
      const bottom = leftY(accumulated)
      accumulated += value
      return { ...part, x: x(index) - barWidth / 2, y, width: barWidth, height: Math.max(0, bottom - y), year: item.year }
    })
  })
  const costPath = series.value.map((item, index) => `${index ? 'L' : 'M'} ${x(index)} ${costY(item.cumulativeCost)}`).join(' ')
  const ticks = Array.from({ length: 5 }, (_, index) => {
    const ratio = index / 4, y = margin.top + innerHeight - ratio * innerHeight
    return { y, left: displayMode.value === 'capacity' ? compact.format(maxLeft * ratio) : `${(maxLeft * ratio).toLocaleString('nl-NL', { maximumFractionDigits: 1 })}%`, right: money(maxCost * ratio) }
  })
  return { width, height, margin, innerWidth, innerHeight, bars, costPath, ticks, x, costY }
})

const shortageChart = computed(() => {
  const width = 960, height = 235
  const margin = { top: 20, right: 25, bottom: 42, left: 72 }
  const innerWidth = width - margin.left - margin.right, innerHeight = height - margin.top - margin.bottom
  let baseline = initialShortage.value
  const baselineValues = series.value.map(item => (baseline += item.demand))
  const maxShortage = Math.max(initialShortage.value, ...series.value.map(item => item.remaining), ...baselineValues, 1) * 1.08
  const x = (index: number) => margin.left + index * innerWidth / Math.max(1, years.length - 1)
  const y = (value: number) => margin.top + innerHeight - value / maxShortage * innerHeight
  const path = series.value.map((item, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(item.remaining)}`).join(' ')
  const baselinePath = baselineValues.map((value, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(value)}`).join(' ')
  return { width, height, margin, innerWidth, innerHeight, x, y, path, baselinePath, maxShortage }
})

const reset = () => {
  initialShortage.value = 396_000
  initialPopulation.value = 18_200_000
  annualPopulationGrowth.value = 50_000
  initialHouseholdSize.value = 2.12
  finalHouseholdSize.value = 2.05
  populationComponents.forEach(item => { item.people = 0 })
  const enabled = new Set(['sharing', 'senior', 'splitting', 'transform', 'targeted', 'regular'])
  measures.forEach(measure => { measure.enabled = enabled.has(measure.id) })
}
</script>

<template>
  <section class="scenario-model" aria-labelledby="scenario-title">
    <header class="scenario-intro">
      <p class="eyebrow">Interactieve scenarioverkenner</p>
      <h2 id="scenario-title">Wooncapaciteit, kosten en resterend tekort</h2>
      <p>Pas de aannames aan en vergelijk hoe maatregelen zich door de tijd opbouwen. Alle beginwaarden zijn illustratief en bewerkbaar; het model is geen officiële prognose.</p>
    </header>

    <section class="demand-controls" aria-labelledby="demand-title">
      <div class="control-heading"><span>1</span><div><h3 id="demand-title">Vraagontwikkeling</h3><p>Bevolking en huishoudgrootte bepalen samen hoeveel huishoudens woonruimte vragen.</p></div></div>
      <div class="demand-grid">
        <label>Tekort begin 2026 <span><input v-model.number="initialShortage" type="number" min="0" step="1000"> huishoudens</span></label>
        <label>Bevolking begin 2026 <span><input v-model.number="initialPopulation" type="number" min="1000000" step="10000"> personen</span></label>
        <label>Bevolkingsgroei per jaar <span><input v-model.number="annualPopulationGrowth" type="number" step="1000"> personen</span></label>
        <label>Personen per huishouden in 2026 <span><input v-model.number="initialHouseholdSize" type="number" min="1" max="4" step="0.01"></span></label>
        <label>Personen per huishouden in 2040 <span><input v-model.number="finalHouseholdSize" type="number" min="1" max="4" step="0.01"></span></label>
      </div>
      <details class="population-breakdown">
        <summary>Toon optionele uitsplitsing van de bevolkingsgroei</summary>
        <p>Deze velden verklaren samen de algemene bevolkingsgroei hierboven; ze veranderen de uitkomst niet afzonderlijk. Zo wordt dezelfde groei nooit dubbel geteld.</p>
        <div class="population-grid">
          <label v-for="item in populationComponents" :key="item.id"><strong>{{ item.name }}</strong><input v-model.number="item.people" type="number" step="1000"><small>{{ item.note }}</small></label>
          <div class="unallocated"><strong>Nog niet toegedeeld</strong><output>{{ fmt.format(unallocatedPopulationGrowth) }}</output><small>Verschil met de totale bevolkingsgroei</small></div>
        </div>
      </details>
    </section>

    <section class="measure-controls" aria-labelledby="measures-title">
      <div class="control-heading"><span>2</span><div><h3 id="measures-title">Maatregelen</h3><p>Selecteer welke vormen van extra wooncapaciteit in het scenario worden opgenomen en pas hun jaarlijkse bijdrage aan.</p></div></div>
      <div class="measure-selector">
        <label v-for="measure in measures" :key="measure.id" :class="{ selected: measure.enabled }">
          <input v-model="measure.enabled" type="checkbox">
          <i :style="{ background: measure.color }"></i>
          <strong>{{ measure.name }}</strong>
          <span><input v-model.number="measure.annual" type="number" min="0" step="1000" :disabled="!measure.enabled"> per jaar</span>
        </label>
      </div>
      <details class="measure-editor">
        <summary>Startjaar, opschaling en kosten aanpassen</summary>
        <div class="measure-table-wrap"><table><thead><tr><th>Actief</th><th>Maatregel</th><th>Start</th><th>Opschaling</th><th>Per jaar</th><th>Kosten/eenheid</th></tr></thead><tbody><tr v-for="measure in measures" :key="measure.id"><td><input v-model="measure.enabled" type="checkbox" :aria-label="`${measure.name} opnemen`"></td><th scope="row"><i :style="{ background: measure.color }"></i>{{ measure.name }}</th><td><input v-model.number="measure.start" type="number" :min="startYear" :max="endYear"></td><td><input v-model.number="measure.ramp" type="number" min="1" max="15"> jaar</td><td><input v-model.number="measure.annual" type="number" min="0" step="1000"></td><td>€ <input v-model.number="measure.cost" type="number" min="0" step="1000"></td></tr></tbody></table></div>
      </details>
    </section>

    <div class="scenario-summary" aria-live="polite">
      <div><span>Toegevoegde capaciteit t/m 2040</span><strong>{{ fmt.format(finalYear.cumulativeCapacity) }}</strong></div>
      <div><span>Cumulatieve investering</span><strong>{{ money(finalYear.cumulativeCost) }}</strong></div>
      <div><span>Tekort eind 2040</span><strong>{{ fmt.format(finalYear.remaining) }}</strong></div>
      <div><span>Opgelost van tekort zonder maatregelen</span><strong>{{ solvedShare.toLocaleString('nl-NL', { maximumFractionDigits: 1 }) }}%</strong></div>
    </div>

    <div class="chart-toolbar">
      <h3>Jaarlijkse bijdrage per maatregel en cumulatieve kosten</h3>
      <div role="group" aria-label="Eenheid van de bijdragen">
        <button :class="{ active: displayMode === 'capacity' }" type="button" @click="displayMode = 'capacity'">Wooneenheden</button>
        <button :class="{ active: displayMode === 'share' }" type="button" @click="displayMode = 'share'">% van tekort</button>
      </div>
    </div>

    <div class="scenario-chart-scroll" tabindex="0">
      <svg class="scenario-chart" :viewBox="`0 0 ${chart.width} ${chart.height}`" role="img" aria-labelledby="capacity-chart-title capacity-chart-desc">
        <title id="capacity-chart-title">Jaarlijkse wooncapaciteit en cumulatieve investeringskosten</title>
        <desc id="capacity-chart-desc">Gestapelde balken tonen de bijdrage per geselecteerde maatregel. De donkere lijn toont de cumulatieve investering.</desc>
        <g v-for="tick in chart.ticks" :key="tick.y"><line :x1="chart.margin.left" :x2="chart.margin.left + chart.innerWidth" :y1="tick.y" :y2="tick.y" class="grid-line" /><text :x="chart.margin.left - 10" :y="tick.y + 4" text-anchor="end">{{ tick.left }}</text><text :x="chart.margin.left + chart.innerWidth + 10" :y="tick.y + 4">{{ tick.right }}</text></g>
        <rect v-for="segment in chart.bars" :key="`${segment.year}-${segment.id}`" :x="segment.x" :y="segment.y" :width="segment.width" :height="segment.height" :fill="segment.color"><title>{{ segment.year }} – {{ segment.name }}: {{ fmt.format(segment.capacity) }} wooneenheden</title></rect>
        <path :d="chart.costPath" class="cost-line" />
        <circle v-for="(item, index) in series" :key="item.year" :cx="chart.x(index)" :cy="chart.costY(item.cumulativeCost)" r="3" class="cost-point"><title>{{ item.year }}: {{ money(item.cumulativeCost) }}</title></circle>
        <g v-for="(year, index) in years" :key="year"><text v-if="index % 2 === 0 || index === years.length - 1" :x="chart.x(index)" :y="chart.height - 17" text-anchor="middle">{{ year }}</text></g>
      </svg>
    </div>

    <div class="chart-legend">
      <span v-for="measure in measures.filter(item => item.enabled)" :key="measure.id"><i :style="{ background: measure.color }"></i>{{ measure.name }}</span>
      <span><i class="line-key"></i>Cumulatieve kosten</span>
    </div>

    <div class="shortage-heading"><h3>Ontwikkeling van het resterende tekort</h3><p>De stippellijn toont de ontwikkeling zonder geselecteerde capaciteitsmaatregelen.</p></div>
    <div class="scenario-chart-scroll" tabindex="0">
      <svg class="shortage-chart" :viewBox="`0 0 ${shortageChart.width} ${shortageChart.height}`" role="img" aria-labelledby="shortage-chart-title">
        <title id="shortage-chart-title">Resterend woningtekort tot en met 2040</title>
        <line :x1="shortageChart.margin.left" :x2="shortageChart.margin.left + shortageChart.innerWidth" :y1="shortageChart.y(0)" :y2="shortageChart.y(0)" class="grid-line" />
        <text :x="shortageChart.margin.left - 10" :y="shortageChart.y(0) + 4" text-anchor="end">0</text><text :x="shortageChart.margin.left - 10" :y="shortageChart.y(shortageChart.maxShortage) + 4" text-anchor="end">{{ compact.format(shortageChart.maxShortage) }}</text>
        <path :d="shortageChart.baselinePath" class="baseline-line" /><path :d="shortageChart.path" class="shortage-line" />
        <g v-for="(year, index) in years" :key="year"><text v-if="index % 2 === 0 || index === years.length - 1" :x="shortageChart.x(index)" :y="shortageChart.height - 14" text-anchor="middle">{{ year }}</text></g>
      </svg>
    </div>

    <div class="scenario-notes">
      <p><strong>Rekenwijze.</strong> Voor elk jaar wordt de bevolking gedeeld door de geleidelijk veranderende huishoudgrootte. De groei van het resulterende aantal huishoudens verhoogt het tekort; geselecteerde maatregelen verlagen het. Capaciteit loopt lineair op gedurende de ingestelde opschalingsperiode.</p>
      <p><strong>Belangrijke beperking.</strong> De optionele uitsplitsing van bevolkingsgroei is beschrijvend. Verblijfsduur, vertrek en huishoudensvorming verschillen tussen groepen en kunnen niet betrouwbaar worden afgeleid uit alleen aantallen migranten.</p>
      <button type="button" class="scenario-reset" @click="reset">Herstel beginwaarden</button>
    </div>
  </section>
</template>
