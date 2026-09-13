<script setup lang="ts">
type CarId = 'compact' | 'medium' | 'large'
interface CarClass { id: CarId; name: string; seats: number; cargo: number; mass: number; length: number; width: number; consumption: number; annualFixed: number; tow: number }

const normalOccupants = ref(2)
const exceptionalOccupants = ref(5)
const passengerDays = ref(12)
const bulkyDays = ref(8)
const requiredCargo = ref(550)
const towingDays = ref(0)
const requiredTow = ref(0)
const annualKm = ref(15_000)
const cityShare = ref(45)
const highEntry = ref(false)
const compareYears = ref(8)
const electricityPrice = ref(.30)
const rentalDay = ref(105)
const rentalKmSurcharge = ref(12)
const selected = ref<CarId>('large')

const classes = reactive<CarClass[]>([
  { id: 'compact', name: 'Compact', seats: 4, cargo: 300, mass: 1250, length: 4.05, width: 1.78, consumption: 15, annualFixed: 6_500, tow: 0 },
  { id: 'medium', name: 'Middelgroot', seats: 5, cargo: 450, mass: 1550, length: 4.45, width: 1.83, consumption: 18, annualFixed: 8_000, tow: 1000 },
  { id: 'large', name: 'Groot', seats: 7, cargo: 650, mass: 2050, length: 4.85, width: 1.95, consumption: 23, annualFixed: 10_500, tow: 1800 }
])

const fmt = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 })
const decimal = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 1 })
const money = (value: number) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
const byId = (id: CarId) => classes.find(item => item.id === id)!
const exceptionalDays = computed(() => Math.min(365, Math.max(0, passengerDays.value) + Math.max(0, bulkyDays.value) + Math.max(0, towingDays.value)))
const routineShare = computed(() => Math.max(0, (365 - exceptionalDays.value) / 365 * 100))

const routineClass = computed<CarClass>(() => {
  if (highEntry.value) return byId('medium')
  return classes.find(item => item.seats >= normalOccupants.value) || byId('large')
})
const exceptionClass = computed<CarClass>(() => {
  const passengerNeed: CarId = (classes.find(item => item.seats >= exceptionalOccupants.value) || byId('large')).id
  const cargoNeed: CarId = bulkyDays.value > 0 ? (classes.find(item => item.cargo >= requiredCargo.value) || byId('large')).id : 'compact'
  const towNeed: CarId = towingDays.value > 0 ? (classes.find(item => item.tow >= requiredTow.value) || byId('large')).id : 'compact'
  const rank: CarId[] = ['compact', 'medium', 'large']
  return byId(rank[Math.max(rank.indexOf(passengerNeed), rank.indexOf(cargoNeed), rank.indexOf(towNeed))])
})

const annualEnergy = (car: CarClass) => annualKm.value * car.consumption / 100
const annualUseCost = (car: CarClass) => annualEnergy(car) * electricityPrice.value
const annualCost = (car: CarClass) => car.annualFixed + annualUseCost(car)
const rentalAnnual = computed(() => exceptionalDays.value * (rentalDay.value + rentalKmSurcharge.value))
const hybridAnnual = computed(() => annualCost(routineClass.value) + (exceptionClass.value.id === routineClass.value.id ? 0 : rentalAnnual.value))
const permanentAnnual = computed(() => annualCost(exceptionClass.value))
const saving = computed(() => permanentAnnual.value - hybridAnnual.value)
const strategy = computed(() => {
  if (exceptionClass.value.id === routineClass.value.id) return 'Eén passende auto dekt zowel dagelijks gebruik als uitzonderingen.'
  return saving.value > 0
    ? `${routineClass.value.name} bezit + incidenteel ${exceptionClass.value.name.toLowerCase()} huren`
    : `${exceptionClass.value.name} bezit is bij deze aannames financieel vergelijkbaar of voordeliger`
})
const selectedCar = computed(() => byId(selected.value))
const parkingArea = (car: CarClass) => car.length * car.width
const extraArea = computed(() => (parkingArea(selectedCar.value) - parkingArea(routineClass.value)) * Math.max(0, cityShare.value) / 100)
const energyDifference = computed(() => annualEnergy(selectedCar.value) - annualEnergy(routineClass.value))
const costDifference = computed(() => annualCost(selectedCar.value) - annualCost(routineClass.value))

const chart = computed(() => {
  const width = 960, height = 360
  const margin = { top: 24, right: 35, bottom: 50, left: 75 }
  const innerWidth = width - margin.left - margin.right, innerHeight = height - margin.top - margin.bottom
  const years = Array.from({ length: compareYears.value + 1 }, (_, i) => i)
  const alternatives = [
    ...classes.map(car => ({ id: car.id, name: `${car.name} bezit`, values: years.map(year => annualCost(car) * year) })),
    { id: 'hybrid', name: `${routineClass.value.name} + huur`, values: years.map(year => hybridAnnual.value * year) }
  ]
  const maxY = Math.max(...alternatives.flatMap(line => line.values), 1) * 1.05
  const x = (year: number) => margin.left + year / Math.max(1, compareYears.value) * innerWidth
  const y = (value: number) => margin.top + innerHeight - value / maxY * innerHeight
  const lines = alternatives.map(line => ({ ...line, path: line.values.map((value, i) => `${i ? 'L' : 'M'} ${x(years[i])} ${y(value)}`).join(' ') }))
  const yTicks = Array.from({ length: 5 }, (_, i) => ({ value: maxY * i / 4, y: y(maxY * i / 4) }))
  return { width, height, margin, innerWidth, innerHeight, years, lines, yTicks, x }
})

const breakEvenRentalDays = computed(() => {
  if (exceptionClass.value.id === routineClass.value.id) return null
  const premium = annualCost(exceptionClass.value) - annualCost(routineClass.value)
  return Math.max(0, Math.floor(premium / Math.max(1, rentalDay.value + rentalKmSurcharge.value)))
})

function preset(kind: 'solo' | 'family' | 'work') {
  if (kind === 'solo') {
    normalOccupants.value = 1; exceptionalOccupants.value = 4; passengerDays.value = 8; bulkyDays.value = 4; requiredCargo.value = 450; towingDays.value = 0; requiredTow.value = 0; annualKm.value = 10_000; cityShare.value = 70; highEntry.value = false
  } else if (kind === 'family') {
    normalOccupants.value = 4; exceptionalOccupants.value = 5; passengerDays.value = 14; bulkyDays.value = 15; requiredCargo.value = 600; towingDays.value = 0; requiredTow.value = 0; annualKm.value = 18_000; cityShare.value = 35; highEntry.value = false
  } else {
    normalOccupants.value = 2; exceptionalOccupants.value = 3; passengerDays.value = 5; bulkyDays.value = 180; requiredCargo.value = 650; towingDays.value = 80; requiredTow.value = 1400; annualKm.value = 28_000; cityShare.value = 15; highEntry.value = true
  }
}
</script>

<template>
  <section class="car-model" data-analytics-model="car-needs" aria-labelledby="car-model-title">
    <header class="car-intro">
      <p class="eyebrow">Interactieve keuzehulp</p>
      <h2 id="car-model-title">Hoeveel auto past bij je werkelijke gebruik?</h2>
      <p>Beschrijf je normale dagen en uitzonderingen afzonderlijk. Het model vergelijkt permanent capaciteit bezitten met extra capaciteit huren wanneer die nodig is.</p>
    </header>

    <div class="car-presets"><span>Voorbeeldprofiel:</span><button type="button" @click="preset('solo')">Stedelijke solorijder</button><button type="button" @click="preset('family')">Gezin</button><button type="button" @click="preset('work')">Intensief werkgebruik</button></div>

    <div class="car-controls">
      <section>
        <h3>Normale dagen</h3>
        <label>Meestal inzittenden <span><input v-model.number="normalOccupants" type="number" min="1" max="7"> personen</span></label>
        <label>Jaarkilometrage <span><input v-model.number="annualKm" type="number" min="0" max="100000" step="1000"> km</span></label>
        <label>Aandeel stad/druk parkeren <span><input v-model.number="cityShare" type="number" min="0" max="100" step="5"> %</span></label>
        <label class="check"><input v-model="highEntry" type="checkbox"> Een hoge instap is functioneel nodig</label>
      </section>
      <section>
        <h3>Uitzonderingen per jaar</h3>
        <label>Maximaal inzittenden <span><input v-model.number="exceptionalOccupants" type="number" min="1" max="7"> personen</span></label>
        <label>Dagen met extra passagiers <span><input v-model.number="passengerDays" type="number" min="0" max="365"> dagen</span></label>
        <label>Dagen met veel bagage <span><input v-model.number="bulkyDays" type="number" min="0" max="365"> dagen</span></label>
        <label>Benodigd bagagevolume <span><input v-model.number="requiredCargo" type="number" min="0" max="1500" step="25"> liter</span></label>
        <label>Dagen met trekbehoefte <span><input v-model.number="towingDays" type="number" min="0" max="365"> dagen</span></label>
        <label>Benodigd trekgewicht <span><input v-model.number="requiredTow" type="number" min="0" max="2500" step="100"> kg</span></label>
      </section>
    </div>

    <div class="car-summary" aria-live="polite">
      <div><span>Voor circa {{ decimal.format(routineShare) }}% van de dagen volstaat</span><strong>{{ routineClass.name }}</strong></div>
      <div><span>Voor de zwaarste uitzondering is nodig</span><strong>{{ exceptionClass.name }}</strong></div>
      <div><span>Modelstrategie</span><strong>{{ strategy }}</strong></div>
    </div>

    <div v-if="breakEvenRentalDays !== null" class="car-insight">
      Bij de ingestelde kosten kan jaarlijks ongeveer <strong>{{ fmt.format(breakEvenRentalDays) }} dagen</strong> extra capaciteit worden gehuurd voordat permanent een {{ exceptionClass.name.toLowerCase() }} auto bezitten goedkoper wordt. Dagen worden hier opgeteld; wanneer uitzonderingen samenvallen overschat het model de huurbehoefte.
    </div>

    <section class="class-compare" aria-labelledby="class-title">
      <div class="class-heading"><div><h3 id="class-title">Vergelijk voertuigklassen</h3><p>Selecteer een klasse om de permanente meerlast tegenover je dagelijkse behoefte te zien.</p></div><div class="class-tabs" role="group" aria-label="Voertuigklasse"><button v-for="car in classes" :key="car.id" type="button" :class="{ active: selected === car.id }" @click="selected = car.id">{{ car.name }}</button></div></div>
      <div class="class-metrics">
        <div><span>Jaarlijks energiegebruik</span><strong>{{ fmt.format(annualEnergy(selectedCar)) }} kWh</strong><small :class="{ positive: energyDifference <= 0 }">{{ energyDifference >= 0 ? '+' : '' }}{{ fmt.format(energyDifference) }} kWh t.o.v. passend</small></div>
        <div><span>Jaarlijkse autokosten</span><strong>{{ money(annualCost(selectedCar)) }}</strong><small :class="{ positive: costDifference <= 0 }">{{ costDifference >= 0 ? '+' : '' }}{{ money(costDifference) }} t.o.v. passend</small></div>
        <div><span>Fysieke voertuigvoetafdruk</span><strong>{{ decimal.format(parkingArea(selectedCar)) }} m²</strong><small>{{ extraArea >= 0 ? '+' : '' }}{{ decimal.format(extraArea) }} m² gewogen naar stadsgebruik</small></div>
        <div><span>Massa en buitenmaten</span><strong>{{ fmt.format(selectedCar.mass) }} kg</strong><small>{{ decimal.format(selectedCar.length) }} × {{ decimal.format(selectedCar.width) }} meter</small></div>
      </div>
    </section>

    <details class="car-assumptions">
      <summary>Kosten- en voertuig­aannames aanpassen</summary>
      <div class="general-assumptions"><label>Elektriciteitsprijs <span>€ <input v-model.number="electricityPrice" type="number" min="0" max="2" step="0.01"> / kWh</span></label><label>Huur per dag <span>€ <input v-model.number="rentalDay" type="number" min="0" max="1000" step="5"></span></label><label>Km/toeslagen huurdag <span>€ <input v-model.number="rentalKmSurcharge" type="number" min="0" max="500" step="5"></span></label><label>Vergelijkingsperiode <span><input v-model.number="compareYears" type="number" min="1" max="15"> jaar</span></label></div>
      <div class="car-table-scroll"><table><thead><tr><th>Klasse</th><th>Vast/jaar</th><th>kWh/100 km</th><th>Massa</th><th>Lengte</th><th>Breedte</th><th>Bagage</th><th>Trekgewicht</th></tr></thead><tbody><tr v-for="car in classes" :key="car.id"><th scope="row">{{ car.name }}</th><td>€ <input v-model.number="car.annualFixed" type="number" min="0" step="100"></td><td><input v-model.number="car.consumption" type="number" min="1" max="50" step="0.5"></td><td><input v-model.number="car.mass" type="number" min="500" step="50"> kg</td><td><input v-model.number="car.length" type="number" min="2" max="7" step="0.05"> m</td><td><input v-model.number="car.width" type="number" min="1" max="3" step="0.01"> m</td><td><input v-model.number="car.cargo" type="number" min="0" step="25"> l</td><td><input v-model.number="car.tow" type="number" min="0" step="100"> kg</td></tr></tbody></table></div>
    </details>

    <div class="car-chart-heading"><h3>Cumulatieve kosten van bezit en huren</h3><p>Illustratief, exclusief inflatie, financiering en restwaardeveranderingen.</p></div>
    <div class="car-chart-scroll" tabindex="0">
      <svg class="car-chart" :viewBox="`0 0 ${chart.width} ${chart.height}`" role="img" aria-labelledby="cost-chart-title cost-chart-desc">
        <title id="cost-chart-title">Cumulatieve mobiliteitskosten per strategie</title><desc id="cost-chart-desc">Vier lijnen vergelijken drie voertuigklassen in eigendom met een passende auto plus huur voor uitzonderingen.</desc>
        <g v-for="tick in chart.yTicks" :key="tick.y"><line :x1="chart.margin.left" :x2="chart.margin.left + chart.innerWidth" :y1="tick.y" :y2="tick.y" class="grid"/><text :x="chart.margin.left - 10" :y="tick.y + 4" text-anchor="end">{{ money(tick.value) }}</text></g>
        <path v-for="line in chart.lines" :key="line.id" :d="line.path" class="cost-path" :class="line.id"/>
        <g v-for="year in chart.years" :key="year"><text :x="chart.x(year)" :y="chart.height - 18" :text-anchor="year === 0 ? 'start' : year === compareYears ? 'end' : 'middle'">{{ year }}</text></g>
        <text :x="chart.margin.left + chart.innerWidth / 2" :y="chart.height - 1" text-anchor="middle" class="axis">Jaren</text>
      </svg>
    </div>
    <div class="car-legend"><span v-for="line in chart.lines" :key="line.id" :class="line.id"><i/>{{ line.name }}</span></div>

    <footer class="car-notes"><p><strong>Wat dit model wel doet.</strong> Het vergelijkt capaciteit, ruimte, elektriciteitsgebruik en illustratieve eigendomskosten. Uitzonderingsdagen worden als afzonderlijke huurdagen behandeld.</p><p><strong>Wat het niet doet.</strong> Het geeft geen individueel aankoopadvies en modelleert geen comfort, beschikbaarheid van huurauto’s, brandstofauto’s, specifieke crashtests, levenscyclusuitstoot of de waarde die iemand persoonlijk aan een voertuig hecht. Pas de aannames aan voordat je een concrete beslissing trekt.</p></footer>
  </section>
</template>

<style scoped>
.car-model{margin:4rem calc((780px - min(1180px,100vw - 48px))/2);width:min(1180px,calc(100vw - 48px));padding:48px;background:#edf0eb;border:1px solid var(--line);border-radius:4px}.car-intro{max-width:850px}.car-intro h2{font-size:clamp(2.3rem,4vw,3.8rem)}.car-intro>p:last-child{color:#4c5a53}.car-presets{display:flex;flex-wrap:wrap;align-items:center;gap:7px;margin-top:28px}.car-presets span{color:var(--muted);font-size:.7rem}.car-presets button,.class-tabs button{padding:7px 10px;border:1px solid var(--ink);background:transparent;color:var(--ink);font:inherit;font-size:.68rem;cursor:pointer}.car-presets button:hover,.car-presets button:focus,.class-tabs button.active{background:var(--ink);color:var(--white)}.car-controls{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px}.car-controls>section{padding:20px;background:var(--white);border:1px solid var(--line)}.car-controls h3,.class-heading h3,.car-chart-heading h3{font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:600}.car-controls label,.general-assumptions label{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-top:13px;color:var(--muted);font-size:.7rem}.car-controls label span,.general-assumptions span{display:flex;align-items:center;gap:5px;color:var(--ink)}.car-controls input[type=number],.general-assumptions input,.car-assumptions td input{width:82px;padding:6px;border:1px solid #aeb9b1;background:var(--white);font:inherit;font-size:.72rem;font-variant-numeric:tabular-nums}.car-controls .check{justify-content:flex-start}.car-controls .check input{width:17px;height:17px;accent-color:var(--accent)}.car-summary{display:grid;grid-template-columns:.8fr .8fr 1.4fr;gap:2px;margin-top:28px;background:#cbd3cc}.car-summary>div{display:flex;flex-direction:column;min-height:112px;padding:17px;background:var(--ink);color:var(--white)}.car-summary span{color:#bdc7c0;font-size:.67rem;line-height:1.4}.car-summary strong{margin-top:auto;font-family:'Newsreader',serif;font-size:1.45rem;font-weight:500;line-height:1.15}.car-insight{margin-top:14px;padding:15px 18px;background:#fff;border-left:3px solid var(--accent);font-size:.76rem}.class-compare{margin-top:38px}.class-heading{display:flex;justify-content:space-between;align-items:end;gap:20px}.class-heading p,.car-chart-heading p{margin:.3rem 0 0;color:var(--muted);font-size:.7rem}.class-tabs{display:flex}.class-tabs button+button{border-left:0}.class-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;margin-top:15px;background:#ccd4cd}.class-metrics>div{display:flex;flex-direction:column;min-height:125px;padding:15px;background:var(--white)}.class-metrics span{color:var(--muted);font-size:.65rem}.class-metrics strong{margin-top:8px;font-family:'Newsreader',serif;font-size:1.35rem;font-weight:500}.class-metrics small{margin-top:auto;color:#a03b25;font-size:.61rem;line-height:1.35}.class-metrics small.positive{color:#3c7456}.car-assumptions{margin-top:25px;background:var(--white);border:1px solid var(--line)}.car-assumptions summary{padding:15px 18px;cursor:pointer;font-size:.76rem;font-weight:600}.car-assumptions[open] summary{border-bottom:1px solid var(--line)}.general-assumptions{display:grid;grid-template-columns:repeat(2,1fr);gap:2px 25px;padding:8px 18px 20px}.car-table-scroll{overflow-x:auto}.car-assumptions table{width:100%;min-width:900px;border-collapse:collapse;font-size:.66rem}.car-assumptions th,.car-assumptions td{padding:8px;border-top:1px solid var(--line);text-align:left}.car-assumptions td input{width:72px}.car-chart-heading{margin-top:40px}.car-chart-scroll{overflow-x:auto;margin-top:12px;background:var(--white);border:1px solid var(--line)}.car-chart{display:block;width:100%;min-width:720px;height:auto}.car-chart text{font:11px 'DM Sans',sans-serif;fill:#647069}.car-chart .grid{stroke:#dfe4df;stroke-width:1}.cost-path{fill:none;stroke-width:2.5}.cost-path.compact{stroke:#557765}.cost-path.medium{stroke:#bc8b2c}.cost-path.large{stroke:#9d4d3b}.cost-path.hybrid{stroke:var(--accent);stroke-width:4}.car-chart .axis{fill:var(--ink);font-weight:600}.car-legend{display:flex;flex-wrap:wrap;gap:9px 18px;margin-top:12px;color:var(--muted);font-size:.67rem}.car-legend span{display:flex;align-items:center;gap:6px}.car-legend i{display:block;width:19px;height:3px}.car-legend .compact i{background:#557765}.car-legend .medium i{background:#bc8b2c}.car-legend .large i{background:#9d4d3b}.car-legend .hybrid i{height:4px;background:var(--accent)}.car-notes{margin-top:27px;padding-top:20px;border-top:1px solid #c7d0c8;color:var(--muted);font-size:.72rem;line-height:1.55}.car-notes p{margin:.7rem 0}
@media(max-width:750px){.car-model{margin:3rem 0;width:calc(100vw - 32px);padding:28px 16px}.car-controls,.car-summary,.class-metrics,.general-assumptions{grid-template-columns:1fr}.car-summary>div{min-height:88px}.class-heading{align-items:start;flex-direction:column}.class-tabs{width:100%}.class-tabs button{flex:1}.class-metrics>div{min-height:95px}.car-chart{min-width:680px}}
</style>
