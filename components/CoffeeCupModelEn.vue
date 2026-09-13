<script setup lang="ts">
type Metric = 'climate' | 'water'
type Scenario = 'efficient' | 'half-full' | 'handwash' | 'short-life' | 'disposable'

const metric = ref<Metric>('climate')
const horizon = ref(500)
const mugUses = ref(1000)
const drinksPerWash = ref(2)
const washMethod = ref<'dishwasher' | 'hand'>('dishwasher')
const dishwasherEnergy = ref(0.8)
const dishwasherWater = ref(10)
const dishwasherLoad = ref(40)
const handwashEnergy = ref(0.18)
const handwashWater = ref(4)
const gridIntensity = ref(300)
const mugProductionClimate = ref(650)
const mugProductionWater = ref(4)
const paperClimate = ref(14)
const paperWater = ref(0.45)
const paperUses = ref(1)
const paperCollection = ref(20)
const plasticClimate = ref(9)
const plasticWater = ref(0.08)
const plasticUses = ref(1)
const plasticCollection = ref(30)
const recyclingBenefit = ref(25)
const uncertainty = ref(25)
const copied = ref(false)

const fmt = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 })
const whole = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Number(value) || 0))

const washClimate = computed(() => {
  const perWash = washMethod.value === 'dishwasher'
    ? dishwasherEnergy.value * gridIntensity.value / Math.max(1, dishwasherLoad.value)
    : handwashEnergy.value * gridIntensity.value
  return perWash / Math.max(1, drinksPerWash.value)
})
const washWater = computed(() => {
  const perWash = washMethod.value === 'dishwasher'
    ? dishwasherWater.value / Math.max(1, dishwasherLoad.value)
    : handwashWater.value
  return perWash / Math.max(1, drinksPerWash.value)
})
const disposableImpact = (kind: 'paper' | 'plastic', selectedMetric: Metric) => {
  const base = kind === 'paper'
    ? (selectedMetric === 'climate' ? paperClimate.value : paperWater.value)
    : (selectedMetric === 'climate' ? plasticClimate.value : plasticWater.value)
  const collection = kind === 'paper' ? paperCollection.value : plasticCollection.value
  const uses = kind === 'paper' ? paperUses.value : plasticUses.value
  const credit = 1 - clamp(collection, 0, 100) / 100 * clamp(recyclingBenefit.value, 0, 80) / 100
  return base * credit / Math.max(1, uses)
}
const reusableAt = (uses: number, selectedMetric: Metric) => {
  const production = selectedMetric === 'climate' ? mugProductionClimate.value : mugProductionWater.value
  const washing = selectedMetric === 'climate' ? washClimate.value : washWater.value
  const replacements = Math.ceil(uses / Math.max(1, mugUses.value))
  return production * replacements + washing * uses
}
const disposableAt = (kind: 'paper' | 'plastic', uses: number, selectedMetric: Metric) => disposableImpact(kind, selectedMetric) * uses
const perDrink = computed(() => ({
  mug: reusableAt(horizon.value, metric.value) / horizon.value,
  paper: disposableImpact('paper', metric.value),
  plastic: disposableImpact('plastic', metric.value)
}))
const winner = computed(() => Object.entries(perDrink.value).sort((a, b) => a[1] - b[1])[0][0] as 'mug' | 'paper' | 'plastic')
const labels = { mug: 'Reusable mug', paper: 'Paper cup', plastic: 'Plastic cup' }

const breakEven = (kind: 'paper' | 'plastic') => {
  let lastUseWhereMugLoses = 0
  for (let use = 1; use <= 5000; use++) {
    if (reusableAt(use, metric.value) > disposableAt(kind, use, metric.value)) lastUseWhereMugLoses = use
  }
  return lastUseWhereMugLoses < 5000 ? lastUseWhereMugLoses + 1 : null
}
const paperBreakEven = computed(() => breakEven('paper'))
const plasticBreakEven = computed(() => breakEven('plastic'))

const chart = computed(() => {
  const width = 960, height = 410
  const margin = { top: 24, right: 34, bottom: 54, left: 78 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const count = 81
  const xs = Array.from({ length: count }, (_, index) => Math.max(1, Math.round(1 + index * (horizon.value - 1) / (count - 1))))
  const raw = {
    mug: xs.map(x => reusableAt(x, metric.value)),
    paper: xs.map(x => disposableAt('paper', x, metric.value)),
    plastic: xs.map(x => disposableAt('plastic', x, metric.value))
  }
  const factor = 1 + uncertainty.value / 100
  const maxY = Math.max(...Object.values(raw).flat()) * factor * 1.05 || 1
  const x = (value: number) => margin.left + (value - 1) / Math.max(1, horizon.value - 1) * innerWidth
  const y = (value: number) => margin.top + innerHeight - value / maxY * innerHeight
  const path = (values: number[], scale = 1) => values.map((value, index) => `${index ? 'L' : 'M'} ${x(xs[index])} ${y(value * scale)}`).join(' ')
  const band = (values: number[]) => {
    const high = values.map((value, index) => `${index ? 'L' : 'M'} ${x(xs[index])} ${y(value * factor)}`).join(' ')
    const low = [...values].reverse().map((value, reverseIndex) => {
      const index = values.length - 1 - reverseIndex
      return `L ${x(xs[index])} ${y(value / factor)}`
    }).join(' ')
    return `${high} ${low} Z`
  }
  const ticks = Array.from({ length: 5 }, (_, index) => ({
    value: maxY * index / 4,
    y: y(maxY * index / 4)
  }))
  const xTicks = [1, Math.round(horizon.value * .25), Math.round(horizon.value * .5), Math.round(horizon.value * .75), horizon.value]
  return { width, height, margin, innerWidth, innerHeight, raw, path, band, ticks, xTicks, x, y, maxY }
})

const unit = computed(() => metric.value === 'climate' ? 'g CO₂-eq' : 'litres of water')
const resultValue = (value: number) => metric.value === 'climate' ? whole.format(value) : fmt.format(value)

const sensitivity = computed(() => {
  const candidates = [
    { name: 'Mug production impact', effect: (metric.value === 'climate' ? mugProductionClimate.value : mugProductionWater.value) / Math.max(1, horizon.value) },
    { name: 'Washing energy', effect: washMethod.value === 'dishwasher' ? washClimate.value : handwashEnergy.value * gridIntensity.value / Math.max(1, drinksPerWash.value) },
    { name: 'Drinks before washing', effect: (metric.value === 'climate' ? washClimate.value : washWater.value) },
    { name: 'Dishwasher load', effect: washMethod.value === 'dishwasher' ? (metric.value === 'climate' ? washClimate.value : washWater.value) : 0 },
    { name: 'Paper-cup impact', effect: disposableImpact('paper', metric.value) },
    { name: 'Plastic-cup impact', effect: disposableImpact('plastic', metric.value) },
    { name: 'Actual mug lifetime', effect: horizon.value > mugUses.value ? (metric.value === 'climate' ? mugProductionClimate.value : mugProductionWater.value) / mugUses.value : 0 }
  ]
  return candidates.sort((a, b) => b.effect - a.effect).slice(0, 3)
})

function applyScenario(scenario: Scenario) {
  if (scenario === 'efficient') {
    mugUses.value = 1000; drinksPerWash.value = 3; washMethod.value = 'dishwasher'; dishwasherEnergy.value = .8; dishwasherWater.value = 10; dishwasherLoad.value = 50
    paperUses.value = 1; plasticUses.value = 1; paperCollection.value = 20; plasticCollection.value = 30
  } else if (scenario === 'half-full') {
    mugUses.value = 1000; drinksPerWash.value = 1; washMethod.value = 'dishwasher'; dishwasherEnergy.value = .8; dishwasherWater.value = 10; dishwasherLoad.value = 20
  } else if (scenario === 'handwash') {
    mugUses.value = 1000; drinksPerWash.value = 1; washMethod.value = 'hand'; handwashEnergy.value = .25; handwashWater.value = 6
  } else if (scenario === 'short-life') {
    mugUses.value = 25; drinksPerWash.value = 1; washMethod.value = 'dishwasher'; dishwasherLoad.value = 30
  } else {
    paperUses.value = 2; plasticUses.value = 2; paperCollection.value = 85; plasticCollection.value = 85; recyclingBenefit.value = 35
  }
}

async function copyScenario() {
  const summary = `Cup scenario (${metric.value === 'climate' ? 'climate' : 'water'}): ${horizon.value} drinks; mug used ${mugUses.value}×; ${drinksPerWash.value} drinks per wash; ${washMethod.value === 'dishwasher' ? `dishwasher loaded with ${dishwasherLoad.value} items` : 'hand washing'}; outcome: ${labels[winner.value]}.`
  await navigator.clipboard.writeText(summary)
  copied.value = true
  trackAnalytics('model-scenario-copied', { model: 'coffee-cups', metric: metric.value })
  window.setTimeout(() => { copied.value = false }, 2200)
}
</script>

<template>
  <section class="cup-model" data-analytics-model="coffee-cups" aria-labelledby="cup-model-title">
    <header class="cup-intro">
      <p class="eyebrow">Interactive cup model</p>
      <h2 id="cup-model-title">When does reuse become the better choice?</h2>
      <p>Change the practice, not merely the material. The values are transparent, illustrative central estimates rather than a universal LCA dataset.</p>
    </header>

    <div class="cup-presets" aria-label="Example scenarios">
      <span>Try a situation:</span>
      <button type="button" @click="applyScenario('efficient')">Efficient office</button>
      <button type="button" @click="applyScenario('half-full')">Half-full dishwasher</button>
      <button type="button" @click="applyScenario('handwash')">Generous hand wash</button>
      <button type="button" @click="applyScenario('short-life')">Short-lived mug</button>
      <button type="button" @click="applyScenario('disposable')">Well-run disposable chain</button>
    </div>

    <div class="cup-controls">
      <section aria-labelledby="use-title">
        <h3 id="use-title">Use</h3>
        <label>Compare over <output>{{ whole.format(horizon) }} drinks</output><input v-model.number="horizon" type="range" min="10" max="2000" step="10"></label>
        <label>Actual mug lifetime <span><input v-model.number="mugUses" type="number" min="1" max="10000" step="25"> uses</span></label>
        <label>Drinks before washing <span><input v-model.number="drinksPerWash" type="number" min="1" max="10"> drinks</span></label>
      </section>
      <section aria-labelledby="wash-title">
        <h3 id="wash-title">Washing</h3>
        <div class="cup-toggle" role="group" aria-label="Washing method"><button type="button" :class="{ active: washMethod === 'dishwasher' }" @click="washMethod = 'dishwasher'">Dishwasher</button><button type="button" :class="{ active: washMethod === 'hand' }" @click="washMethod = 'hand'">Hand wash</button></div>
        <template v-if="washMethod === 'dishwasher'">
          <label>Energy per cycle <span><input v-model.number="dishwasherEnergy" type="number" min="0" max="5" step="0.05"> kWh</span></label>
          <label>Water per cycle <span><input v-model.number="dishwasherWater" type="number" min="0" max="50" step="0.5"> litres</span></label>
          <label>Load <span><input v-model.number="dishwasherLoad" type="number" min="1" max="200"> items</span></label>
        </template>
        <template v-else>
          <label>Energy per mug <span><input v-model.number="handwashEnergy" type="number" min="0" max="2" step="0.01"> kWh</span></label>
          <label>Water per mug <span><input v-model.number="handwashWater" type="number" min="0" max="30" step="0.5"> litres</span></label>
        </template>
      </section>
      <section aria-labelledby="disposable-title">
        <h3 id="disposable-title">Disposable practice</h3>
        <label>Uses per paper cup <span><input v-model.number="paperUses" type="number" min="1" max="5"> uses</span></label>
        <label>Paper collection <span><input v-model.number="paperCollection" type="number" min="0" max="100" step="5"> %</span></label>
        <label>Uses per plastic cup <span><input v-model.number="plasticUses" type="number" min="1" max="5"> uses</span></label>
        <label>Plastic collection <span><input v-model.number="plasticCollection" type="number" min="0" max="100" step="5"> %</span></label>
      </section>
    </div>

    <details class="cup-advanced">
      <summary>Adjust advanced modelling assumptions</summary>
      <div>
        <label>Mug production <span><input v-model.number="mugProductionClimate" type="number" min="1" step="10"> g CO₂-eq</span></label>
        <label>Mug production water <span><input v-model.number="mugProductionWater" type="number" min="0" step="0.5"> litres</span></label>
        <label>Paper cup <span><input v-model.number="paperClimate" type="number" min="0" step="1"> g CO₂-eq</span></label>
        <label>Paper water <span><input v-model.number="paperWater" type="number" min="0" step="0.05"> litres</span></label>
        <label>Plastic cup <span><input v-model.number="plasticClimate" type="number" min="0" step="1"> g CO₂-eq</span></label>
        <label>Plastic water <span><input v-model.number="plasticWater" type="number" min="0" step="0.01"> litres</span></label>
        <label>Electricity factor <span><input v-model.number="gridIntensity" type="number" min="0" max="1000" step="10"> g CO₂-eq/kWh</span></label>
        <label>Recycling benefit <span><input v-model.number="recyclingBenefit" type="number" min="0" max="80" step="5"> %</span></label>
        <label>Uncertainty margin <span><input v-model.number="uncertainty" type="number" min="0" max="75" step="5"> ±%</span></label>
      </div>
    </details>

    <div class="cup-results" aria-live="polite">
      <div><span>Lowest impact at {{ whole.format(horizon) }} drinks</span><strong>{{ labels[winner] }}</strong></div>
      <div><span>Break-even against paper</span><strong>{{ paperBreakEven ? `${whole.format(paperBreakEven)}×` : 'not within 5,000×' }}</strong></div>
      <div><span>Break-even against plastic</span><strong>{{ plasticBreakEven ? `${whole.format(plasticBreakEven)}×` : 'not within 5,000×' }}</strong></div>
    </div>

    <div class="cup-chart-heading">
      <div><h3>Cumulative impact</h3><p>The translucent bands show the selected uncertainty margin.</p></div>
      <div class="cup-toggle" role="group" aria-label="Environmental category"><button type="button" :class="{ active: metric === 'climate' }" @click="metric = 'climate'">Climate</button><button type="button" :class="{ active: metric === 'water' }" @click="metric = 'water'">Water</button></div>
    </div>
    <div class="cup-chart-scroll" tabindex="0">
      <svg class="cup-chart" :viewBox="`0 0 ${chart.width} ${chart.height}`" role="img" aria-labelledby="cup-chart-title cup-chart-desc">
        <title id="cup-chart-title">Cumulative environmental impact of three cup systems</title>
        <desc id="cup-chart-desc">Lines compare a reusable mug, a paper cup and a plastic cup over the selected number of drinks.</desc>
        <g v-for="tick in chart.ticks" :key="tick.y"><line :x1="chart.margin.left" :x2="chart.margin.left + chart.innerWidth" :y1="tick.y" :y2="tick.y" class="cup-grid"/><text :x="chart.margin.left - 10" :y="tick.y + 4" text-anchor="end">{{ resultValue(tick.value) }}</text></g>
        <path :d="chart.band(chart.raw.mug)" class="cup-band mug"/><path :d="chart.band(chart.raw.paper)" class="cup-band paper"/><path :d="chart.band(chart.raw.plastic)" class="cup-band plastic"/>
        <path :d="chart.path(chart.raw.mug)" class="cup-line mug"/><path :d="chart.path(chart.raw.paper)" class="cup-line paper"/><path :d="chart.path(chart.raw.plastic)" class="cup-line plastic"/>
        <g v-for="tick in chart.xTicks" :key="tick"><text :x="chart.x(tick)" :y="chart.height - 20" :text-anchor="tick === 1 ? 'start' : tick === horizon ? 'end' : 'middle'">{{ whole.format(tick) }}</text></g>
        <text :x="chart.margin.left + chart.innerWidth / 2" :y="chart.height - 2" text-anchor="middle" class="axis-title">Number of drinks</text>
        <text :transform="`translate(16 ${chart.margin.top + chart.innerHeight / 2}) rotate(-90)`" text-anchor="middle" class="axis-title">{{ unit }}</text>
      </svg>
    </div>
    <div class="cup-legend"><span class="mug"><i/>Reusable mug</span><span class="paper"><i/>Paper cup</span><span class="plastic"><i/>Plastic cup</span></div>

    <div class="cup-per-use">
      <h3>Impact per drink at this usage horizon</h3>
      <div v-for="kind in (['mug','paper','plastic'] as const)" :key="kind"><span>{{ labels[kind] }}</span><strong>{{ resultValue(perDrink[kind]) }} {{ unit }}</strong></div>
    </div>
    <div class="cup-sensitivity"><h3>Most influential assumptions in this scenario</h3><ol><li v-for="item in sensitivity" :key="item.name">{{ item.name }}</li></ol><p>This is a local sensitivity indication, not a statistical uncertainty analysis.</p></div>
    <footer class="cup-notes">
      <p><strong>Calculation.</strong> Production is spread across the actual lifetime. Every wash or new disposable cup adds impact again. The recycling benefit applies only to the share that is actually collected.</p>
      <p><strong>Read the outcome conditionally.</strong> The central estimates are illustrative. For decisions, enter data for the chosen cup, dishwasher, electricity mix and waste chain. Climate and water remain separate indicators.</p>
      <button type="button" @click="copyScenario">{{ copied ? 'Scenario copied' : 'Copy scenario summary' }}</button>
    </footer>
  </section>
</template>

<style scoped>
.cup-model{margin:4rem calc((780px - min(1180px,100vw - 48px))/2);width:min(1180px,calc(100vw - 48px));padding:48px;background:#edf0eb;border:1px solid var(--line);border-radius:4px}.cup-intro{max-width:820px}.cup-intro h2{font-size:clamp(2.3rem,4vw,3.8rem)}.cup-intro>p:last-child{color:#4c5a53}.cup-presets{display:flex;flex-wrap:wrap;align-items:center;gap:7px;margin-top:28px}.cup-presets span{margin-right:4px;color:var(--muted);font-size:.72rem}.cup-presets button,.cup-notes button{padding:7px 10px;border:1px solid var(--ink);background:transparent;color:var(--ink);font:inherit;font-size:.69rem;cursor:pointer}.cup-presets button:hover,.cup-presets button:focus,.cup-notes button:hover,.cup-notes button:focus{background:var(--ink);color:var(--white)}.cup-controls{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:24px}.cup-controls>section{padding:19px;background:var(--white);border:1px solid var(--line)}.cup-controls h3,.cup-chart-heading h3,.cup-per-use h3,.cup-sensitivity h3{font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:600}.cup-controls label,.cup-advanced label{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:14px;color:var(--muted);font-size:.68rem}.cup-controls label span,.cup-advanced label span{display:flex;align-items:center;gap:5px;color:var(--ink)}.cup-controls input[type=number],.cup-advanced input{width:77px;padding:6px;border:1px solid #aeb9b1;background:var(--white);font:inherit;font-size:.72rem;font-variant-numeric:tabular-nums}.cup-controls input[type=range]{display:block;width:100%;margin-top:7px;accent-color:var(--accent)}.cup-controls label:has(input[type=range]){display:block}.cup-controls output{float:right;color:var(--accent);font-weight:600}.cup-toggle{display:flex}.cup-toggle button{padding:7px 10px;border:1px solid var(--ink);background:transparent;color:var(--ink);font:inherit;font-size:.68rem;cursor:pointer}.cup-toggle button+button{border-left:0}.cup-toggle button.active{background:var(--ink);color:var(--white)}.cup-controls .cup-toggle{margin:12px 0}.cup-advanced{margin-top:12px;border:1px solid #c9d1ca;background:var(--white)}.cup-advanced summary{padding:14px 18px;cursor:pointer;font-size:.76rem;font-weight:600}.cup-advanced[open] summary{border-bottom:1px solid var(--line)}.cup-advanced>div{display:grid;grid-template-columns:repeat(3,1fr);gap:4px 22px;padding:10px 18px 20px}.cup-results{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:28px;background:#cbd3cc}.cup-results>div{display:flex;flex-direction:column;min-height:104px;padding:16px;background:var(--ink);color:var(--white)}.cup-results span{color:#bdc7c0;font-size:.68rem;line-height:1.4}.cup-results strong{margin-top:auto;font-family:'Newsreader',serif;font-size:1.55rem;font-weight:500}.cup-chart-heading{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-top:42px}.cup-chart-heading p{margin:.2rem 0 0;color:var(--muted);font-size:.68rem}.cup-chart-scroll{overflow-x:auto;margin-top:12px;background:var(--white);border:1px solid var(--line);outline:none}.cup-chart-scroll:focus-visible{box-shadow:0 0 0 3px var(--accent)}.cup-chart{display:block;width:100%;min-width:720px;height:auto}.cup-chart text{font:11px 'DM Sans',sans-serif;fill:#647069}.cup-grid{stroke:#dfe4df;stroke-width:1}.cup-band{stroke:none;opacity:.1}.cup-line{fill:none;stroke-width:3}.cup-band.mug{fill:#f05a36}.cup-line.mug{stroke:#f05a36}.cup-band.paper{fill:#72867a}.cup-line.paper{stroke:#72867a}.cup-band.plastic{fill:#255d78}.cup-line.plastic{stroke:#255d78}.cup-chart .axis-title{fill:#243a32;font-weight:600}.cup-legend{display:flex;flex-wrap:wrap;gap:10px 18px;margin-top:12px;color:var(--muted);font-size:.7rem}.cup-legend span{display:flex;align-items:center;gap:7px}.cup-legend i{display:block;width:20px;height:3px}.cup-legend .mug i{background:#f05a36}.cup-legend .paper i{background:#72867a}.cup-legend .plastic i{background:#255d78}.cup-per-use{margin-top:35px}.cup-per-use>div{display:flex;justify-content:space-between;gap:20px;padding:9px 0;border-bottom:1px solid #cad2cb;font-size:.77rem}.cup-per-use strong{font-variant-numeric:tabular-nums}.cup-sensitivity{margin-top:30px;padding:18px;background:var(--white);border:1px solid var(--line)}.cup-sensitivity ol{display:flex;flex-wrap:wrap;gap:8px 28px;margin:12px 0 0;padding-left:22px;font-size:.75rem}.cup-sensitivity p{margin:.7rem 0 0;color:var(--muted);font-size:.66rem}.cup-notes{margin-top:25px;padding-top:20px;border-top:1px solid #c7d0c8;color:var(--muted);font-size:.72rem;line-height:1.55}.cup-notes p{margin:.7rem 0}.cup-notes button{margin-top:7px}
@media(max-width:750px){.cup-model{margin:3rem 0;width:calc(100vw - 32px);padding:28px 16px}.cup-controls,.cup-advanced>div,.cup-results{grid-template-columns:1fr}.cup-results>div{min-height:88px}.cup-chart-heading{align-items:start;flex-direction:column}.cup-chart{min-width:680px}.cup-per-use>div{align-items:baseline}.cup-sensitivity ol{display:block}.cup-sensitivity li+li{margin-top:6px}}
</style>
