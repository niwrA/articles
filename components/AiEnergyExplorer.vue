<script setup lang="ts">
type View = 'task' | 'scale' | 'leverage'
const props = withDefaults(defineProps<{ view?: View }>(), { view: 'task' })
const active = ref<View>(props.view)
const fmt = (value:number, digits=1) => new Intl.NumberFormat('nl-NL',{maximumFractionDigits:digits}).format(value)
const clamp = (value:number,min:number,max:number) => Math.min(max,Math.max(min,value))

const searches = ref(5), searchWh = ref(.3), pages = ref(8), pageWh = ref(.05)
const aiCalls = ref(1), aiWh = ref(.24), reasoning = ref(4), retrievals = ref(5), retrievalWh = ref(.05)
const searchTask = computed(()=>searches.value*searchWh.value+pages.value*pageWh.value)
const aiTask = computed(()=>aiCalls.value*aiWh.value*reasoning.value+retrievals.value*retrievalWh.value)
const taskRatio = computed(()=>aiTask.value/searchTask.value)

const initialTasks = ref(10), years = ref(6), demandGrowth = ref(65), efficiency = ref(45), rebound = ref(25), taskWh = ref(.24)
const series = computed(()=>Array.from({length:years.value+1},(_,year)=>{
  const activity=initialTasks.value*Math.pow(1+demandGrowth.value/100,year)
  const wh=taskWh.value*Math.pow(1-efficiency.value/100,year)
  const extra=Math.pow(1+rebound.value/100,year)
  return {year,activity,wh,total:activity*1e9*365*wh*extra/1e12}
}))
const maxTotal = computed(()=>Math.max(...series.value.map(point=>point.total),.001))
const points = computed(()=>series.value.map((point,index)=>`${index/(series.value.length-1||1)*100},${92-point.total/maxTotal.value*78}`).join(' '))

const footprint = ref(1000), grossAvoided = ref(10000), causality = ref(70), additionality = ref(60), overlap = ref(15), confidence = ref(70)
const credited = computed(()=>grossAvoided.value*causality.value/100*additionality.value/100*(1-overlap.value/100)*confidence.value/100)
const leverage = computed(()=>credited.value/Math.max(footprint.value,.001))
const leverageClass = computed(()=>leverage.value>=1?'positive':'negative')
</script>

<template>
  <section class="energy-model" aria-labelledby="energy-model-title">
    <header><div><p class="eyebrow">Scenarioverkenner</p><h3 id="energy-model-title">Van energie per taak naar aantoonbare klimaatwinst</h3></div><p>De startwaarden combineren gepubliceerde meetpunten met expliciete rekenaannames. Pas ze aan; het model voorspelt niets.</p></header>
    <nav aria-label="Kies een perspectief">
      <button v-for="item in ([['task','Informatietaak'],['scale','Schaal & rebound'],['leverage','Klimaathefboom']] as const)" :key="item[0]" type="button" :aria-pressed="active===item[0]" @click="active=item[0]">{{item[1]}}</button>
    </nav>

    <div v-if="active==='task'" class="panel">
      <div class="controls two">
        <fieldset><legend>Traditionele zoekroute</legend>
          <label>Aantal zoekopdrachten <output>{{searches}}</output><input v-model.number="searches" type="range" min="1" max="15"></label>
          <label>Wh per zoekopdracht <output>{{fmt(searchWh,2)}}</output><input v-model.number="searchWh" type="range" min=".05" max="1" step=".05"></label>
          <label>Geopende pagina’s <output>{{pages}}</output><input v-model.number="pages" type="range" min="0" max="25"></label>
          <label>Wh per pagina <output>{{fmt(pageWh,2)}}</output><input v-model.number="pageWh" type="range" min="0" max=".3" step=".01"></label>
        </fieldset>
        <fieldset><legend>AI + retrieval</legend>
          <label>Aantal modelaanroepen <output>{{aiCalls}}</output><input v-model.number="aiCalls" type="range" min="1" max="10"></label>
          <label>Wh per eenvoudige tekstprompt <output>{{fmt(aiWh,2)}}</output><input v-model.number="aiWh" type="range" min=".05" max="2" step=".01"></label>
          <label>Complexiteitsfactor <output>{{reasoning}}×</output><input v-model.number="reasoning" type="range" min="1" max="100"></label>
          <label>Retrievalacties <output>{{retrievals}}</output><input v-model.number="retrievals" type="range" min="0" max="25"></label>
        </fieldset>
      </div>
      <div class="result comparison">
        <div><span>Zoekroute</span><strong>{{fmt(searchTask,2)}} Wh</strong></div><div><span>AI-route</span><strong>{{fmt(aiTask,2)}} Wh</strong></div>
        <p :class="taskRatio<=1?'positive':'negative'">De AI-route gebruikt in dit scenario <strong>{{fmt(Math.abs(taskRatio-1)*100,0)}}%</strong> {{taskRatio<=1?'minder':'meer'}} operationele energie.</p>
      </div>
      <p class="note">De standaard van 0,24 Wh is Googles gemeten mediaan voor een Gemini-tekstprompt in mei 2025. De complexiteitsfactor en energie per pagina zijn scenarioaannames; training, apparaten van de gebruiker en embodied emissions ontbreken.</p>
    </div>

    <div v-else-if="active==='scale'" class="panel scale-layout">
      <fieldset class="controls"><legend>Ontwikkeling per jaar</legend>
        <label>Start: miljard taken per dag <output>{{initialTasks}}</output><input v-model.number="initialTasks" type="range" min="1" max="100"></label>
        <label>Groei oorspronkelijk gebruik <output>{{demandGrowth}}%</output><input v-model.number="demandGrowth" type="range" min="0" max="150"></label>
        <label>Efficiëntiewinst per taak <output>{{efficiency}}%</output><input v-model.number="efficiency" type="range" min="0" max="80"></label>
        <label>Extra reboundgroei <output>{{rebound}}%</output><input v-model.number="rebound" type="range" min="0" max="100"></label>
        <label>Periode <output>{{years}} jaar</output><input v-model.number="years" type="range" min="2" max="10"></label>
      </fieldset>
      <div class="chart-card">
        <svg viewBox="0 0 100 100" role="img" :aria-label="`Jaarverbruik stijgt van ${fmt(series[0]!.total,2)} naar ${fmt(series.at(-1)!.total,2)} terawattuur`" preserveAspectRatio="none">
          <path d="M0 92H100M0 53H100M0 14H100" class="grid"/><polyline :points="points" class="line"/><path v-for="(point,index) in series" :key="index" :d="`M${index/(series.length-1)*100-1},${92-point.total/maxTotal*78-1}h2v2h-2z`" class="dot"/>
        </svg>
        <div class="chart-axis"><span>Nu</span><span>Na {{years}} jaar</span></div>
        <strong>{{fmt(series.at(-1)!.total,2)}} TWh/jaar</strong>
        <p :class="series.at(-1)!.total<=series[0]!.total?'positive':'negative'">{{series.at(-1)!.total<=series[0]!.total?'Efficiëntie groeit sneller dan gebruik en rebound.':'Gebruik en rebound groeien samen sneller dan de efficiëntie.'}}</p>
      </div>
      <p class="note wide">Rebound staat hier los van de oorspronkelijke gebruiksgroei: het representeert nieuw gebruik dat juist door lagere kosten ontstaat. Werkelijke groei is niet netjes in beide oorzaken te scheiden; de splitsing maakt de gevoeligheid zichtbaar.</p>
    </div>

    <div v-else class="panel leverage-layout">
      <fieldset class="controls"><legend>Climate Leverage Ratio</legend>
        <label>Volledige AI-voetafdruk <output>{{fmt(footprint,0)}} tCO₂e</output><input v-model.number="footprint" type="range" min="100" max="10000" step="100"></label>
        <label>Bruto geschatte vermijding <output>{{fmt(grossAvoided,0)}} tCO₂e</output><input v-model.number="grossAvoided" type="range" min="0" max="50000" step="500"></label>
        <label>Causaal aan AI toe te rekenen <output>{{causality}}%</output><input v-model.number="causality" type="range" min="0" max="100"></label>
        <label>Werkelijk additioneel <output>{{additionality}}%</output><input v-model.number="additionality" type="range" min="0" max="100"></label>
        <label>Overlap/dubbeltelling <output>{{overlap}}%</output><input v-model.number="overlap" type="range" min="0" max="100"></label>
        <label>Bewijszekerheid <output>{{confidence}}%</output><input v-model.number="confidence" type="range" min="0" max="100"></label>
      </fieldset>
      <div class="gauge-card">
        <div class="gauge" :style="{'--score':clamp(leverage/5,0,1)}"><span>CLR</span><strong>{{fmt(leverage,2)}}</strong></div>
        <p :class="leverageClass"><strong>{{fmt(credited,0)}} tCO₂e</strong> gewogen vermijding tegenover <strong>{{fmt(footprint,0)}} tCO₂e</strong> voetafdruk.</p>
        <small>Bij CLR &gt; 1 is de gewogen vermijding groter dan de ingevoerde voetafdruk. Dat bewijst niet dat de toepassing maatschappelijk optimaal is.</small>
      </div>
      <p class="formula wide">Gewogen vermijding = bruto vermijding × causaliteit × additionaliteit × (1 − overlap) × bewijszekerheid</p>
    </div>
  </section>
</template>

<style scoped>
.energy-model{--ink:#173b34;--muted:#5b6d67;box-sizing:border-box;margin:1.5rem 0;padding:1rem;border:1px solid #cbd8d2;border-radius:16px;background:#f7f8f5;color:var(--ink);font:400 .78rem/1.45 system-ui,sans-serif}.energy-model *{box-sizing:border-box}.energy-model header{display:grid;grid-template-columns:1.1fr .9fr;gap:1rem;align-items:end}.energy-model h3{margin:.1rem 0 0;font:750 clamp(1.05rem,2.5vw,1.45rem)/1.2 system-ui,sans-serif}.energy-model header>p{margin:0!important;color:var(--muted);font-size:.69rem}.eyebrow{margin:0!important;color:#a75e3e;font-size:.61rem;font-weight:750;letter-spacing:.08em;text-transform:uppercase}.energy-model nav{display:flex;gap:.35rem;margin:1rem 0;border-bottom:1px solid #d5dfda;padding-bottom:.65rem}.energy-model button{border:1px solid #bdcbc4;border-radius:999px;background:#fff;color:var(--ink);padding:.42rem .7rem;font:650 .68rem system-ui,sans-serif;cursor:pointer}.energy-model button[aria-pressed=true]{border-color:var(--ink);background:var(--ink);color:#fff}.panel{min-width:0}.controls.two{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}.energy-model fieldset{min-width:0;margin:0;padding:.8rem;border:1px solid #d5dfda;border-radius:11px;background:#fff}.energy-model legend{padding:0 .25rem;font-weight:750}.energy-model label{display:grid;grid-template-columns:1fr auto;gap:.25rem .5rem;align-items:center;margin:.62rem 0;color:#3f5750;font-size:.68rem}.energy-model output{font-weight:750;color:var(--ink)}.energy-model input{grid-column:1/-1;width:100%;accent-color:#a75e3e}.result{margin-top:.7rem;padding:.8rem;border-radius:10px;background:#e9efeb}.comparison{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}.comparison div{display:grid;gap:.1rem}.comparison span{color:var(--muted);font-size:.62rem}.comparison strong{font-size:1.05rem}.comparison p{grid-column:1/-1;margin:.25rem 0 0!important}.positive{color:#296a55}.negative{color:#a25339}.note,.formula{margin:.75rem 0 0!important;color:var(--muted);font-size:.63rem}.scale-layout,.leverage-layout{display:grid;grid-template-columns:minmax(230px,.85fr) minmax(0,1.15fr);gap:.8rem}.chart-card,.gauge-card{display:flex;flex-direction:column;justify-content:center;min-width:0;padding:.8rem;border:1px solid #d5dfda;border-radius:11px;background:#fff}.chart-card svg{width:100%;height:180px;overflow:visible}.grid{stroke:#dce5e0;stroke-width:.5}.line{fill:none;stroke:#a75e3e;stroke-width:2.2;vector-effect:non-scaling-stroke}.dot{fill:#173b34}.chart-axis{display:flex;justify-content:space-between;color:var(--muted);font-size:.6rem}.chart-card>strong{margin-top:.6rem;font-size:1.25rem}.chart-card p,.gauge-card p{margin:.25rem 0!important}.wide{grid-column:1/-1}.gauge{--score:0;display:grid;place-items:center;align-content:center;align-self:center;width:150px;height:150px;border-radius:50%;background:conic-gradient(#2d7460 calc(var(--score)*100%),#e4e9e6 0);position:relative}.gauge:before{content:'';position:absolute;inset:15px;border-radius:50%;background:#fff}.gauge span,.gauge strong{position:relative}.gauge span{color:var(--muted);font-size:.65rem}.gauge strong{font-size:1.55rem}.gauge-card small{color:var(--muted);font-size:.61rem}.formula{padding:.65rem .75rem;border-left:3px solid #a75e3e;background:#fff7f0}@media(max-width:700px){.energy-model{padding:.8rem}.energy-model header,.controls.two,.scale-layout,.leverage-layout{grid-template-columns:1fr}.energy-model header>p{margin-top:.35rem!important}.energy-model nav{overflow-x:auto}.energy-model button{white-space:nowrap}.chart-card svg{height:150px}.wide{grid-column:auto}}@media(prefers-color-scheme:dark){.energy-model{border-color:#455b54;background:#1c2925;color:#edf3ef}.energy-model fieldset,.chart-card,.gauge-card{border-color:#455b54;background:#263630}.energy-model button{border-color:#526a62;background:#263630;color:#edf3ef}.result{background:#293b35}.gauge:before{background:#263630}.formula{background:#312821}.energy-model label,.energy-model output{color:#d5e1dc}.note,.formula,.energy-model header>p,.chart-axis,.gauge-card small{color:#afc0ba}}
</style>
