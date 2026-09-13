<script setup lang="ts">
const props=withDefaults(defineProps<{locale?:'nl'|'en'}>(),{locale:'nl'})
const nl=computed(()=>props.locale==='nl')
const p=reactive({regular:1150,freeShare:15,flex:650,rampDays:21,staffAbsence:12,lengthOfStay:14,peakAdmissions:120,spread:15})
const days=120
const result=computed(()=>{
  const staffFactor=Math.max(.25,1-p.staffAbsence/100)
  const regularEffective=p.regular*staffFactor
  const spare=regularEffective*p.freeShare/100
  const points=[] as {day:number;demand:number;capacity:number;regular:number;flex:number;unserved:number;displaced:number}[]
  let active=[] as {leave:number;count:number}[]
  for(let day=0;day<=days;day++){
    active=active.filter(x=>x.leave>day)
    const admissions=p.peakAdmissions*Math.exp(-.5*Math.pow((day-58)/18,2))*(1-p.spread/100)
    active.push({leave:day+p.lengthOfStay,count:admissions})
    const demand=active.reduce((sum,x)=>sum+x.count,0)
    const ramp=p.rampDays===0?1:Math.min(1,day/p.rampDays)
    const flex=p.flex*ramp*staffFactor
    const capacity=regularEffective+flex
    points.push({day,demand,capacity,regular:regularEffective,flex,unserved:Math.max(0,demand-capacity),displaced:Math.min(Math.max(0,demand-spare),Math.max(0,regularEffective-spare))})
  }
  const peak=points.reduce((a,b)=>b.demand>a.demand?b:a)
  const firstBreach=points.find(x=>x.unserved>0)?.day
  const maxUnserved=Math.max(...points.map(x=>x.unserved))
  const maxDisplaced=Math.max(...points.map(x=>x.displaced))
  const max=Math.max(...points.flatMap(x=>[x.demand,x.capacity]))*1.08
  return{points,peak,firstBreach,maxUnserved,maxDisplaced,max}
})
const path=(key:'demand'|'capacity'|'regular')=>result.value.points.map(x=>`${24+x.day/days*552},${190-x[key]/result.value.max*150}`).join(' ')
const status=computed(()=>result.value.maxUnserved>0?(nl.value?'capaciteit wordt overschreden':'capacity is exceeded'):result.value.maxDisplaced>0?(nl.value?'haalbaar door reguliere zorg te verdringen':'feasible by displacing regular care'):(nl.value?'binnen vrije en flexibele capaciteit':'within spare and flexible capacity'))
const fmt=(n:number)=>Math.round(n).toLocaleString(nl.value?'nl-NL':'en-GB')
</script>

<template>
  <section class="capacity-model" data-analytics-model="healthcare-capacity">
    <header><p class="eyebrow">{{nl?'ZORGSTRESSTEST':'HEALTHCARE STRESS TEST'}}</p><h2>{{nl?'Een bed is pas capaciteit als het inzetbaar is':'A bed counts only when it can be staffed'}}</h2><p>{{nl?'Verken hoe instroom, ligduur, personeel, opschaling en patiëntenspreiding samen bepalen waar het systeem vastloopt. Alle waarden zijn illustratief.':'Explore how admissions, length of stay, staffing, surge capacity and patient distribution jointly determine where the system fails. All values are illustrative.'}}</p></header>
    <div class="capacity-grid">
      <div class="controls">
        <label><span>{{nl?'Reguliere capaciteit':'Regular capacity'}}</span><input v-model.number="p.regular" type="range" min="300" max="3000" step="50"><output>{{fmt(p.regular)}}</output></label>
        <label><span>{{nl?'Normaal vrij beschikbaar':'Normally available spare share'}}</span><input v-model.number="p.freeShare" type="range" min="0" max="40"><output>{{p.freeShare}}%</output></label>
        <label><span>{{nl?'Flexibele schil':'Flexible surge capacity'}}</span><input v-model.number="p.flex" type="range" min="0" max="2000" step="50"><output>{{fmt(p.flex)}}</output></label>
        <label><span>{{nl?'Opschaaltijd flexibele schil':'Surge ramp-up time'}}</span><input v-model.number="p.rampDays" type="range" min="0" max="60"><output>{{p.rampDays}} d</output></label>
        <label><span>{{nl?'Personeelsuitval':'Staff absence'}}</span><input v-model.number="p.staffAbsence" type="range" min="0" max="40"><output>{{p.staffAbsence}}%</output></label>
        <label><span>{{nl?'Gemiddelde ligduur':'Average length of stay'}}</span><input v-model.number="p.lengthOfStay" type="range" min="2" max="35"><output>{{p.lengthOfStay}} d</output></label>
        <label><span>{{nl?'Piek nieuwe opnamen per dag':'Peak new admissions per day'}}</span><input v-model.number="p.peakAdmissions" type="range" min="10" max="300" step="5"><output>{{p.peakAdmissions}}</output></label>
        <label><span>{{nl?'Extern gespreide patiënten':'Patients distributed elsewhere'}}</span><input v-model.number="p.spread" type="range" min="0" max="50"><output>{{p.spread}}%</output></label>
      </div>
      <div class="results" aria-live="polite">
        <div class="status" :class="{breach:result.maxUnserved>0}"><span>{{nl?'UITKOMST':'OUTCOME'}}</span><strong>{{status}}</strong></div>
        <svg viewBox="0 0 600 220" role="img" :aria-label="nl?'Zorgvraag, reguliere capaciteit en totale opgeschaalde capaciteit over 120 dagen':'Healthcare demand, regular capacity and total surge capacity over 120 days'">
          <line x1="24" y1="190" x2="576" y2="190"/><line x1="24" y1="40" x2="24" y2="190"/>
          <polyline class="regular" :points="path('regular')"/><polyline class="capacity" :points="path('capacity')"/><polyline class="demand" :points="path('demand')"/>
          <text x="24" y="210">0</text><text x="292" y="210">60</text><text x="548" y="210">120 {{nl?'dagen':'days'}}</text>
        </svg>
        <div class="legend"><span class="demand-key">{{nl?'Benodigde plaatsen':'Beds required'}}</span><span class="regular-key">{{nl?'Regulier, na personeelsuitval':'Regular, after staff absence'}}</span><span class="capacity-key">{{nl?'Regulier + opgeschaald':'Regular + surge'}}</span></div>
        <div class="metrics"><article><span>{{nl?'Piekbezetting':'Peak occupancy'}}</span><strong>{{fmt(result.peak.demand)}}</strong><small>{{nl?'op dag':'on day'}} {{result.peak.day}}</small></article><article :class="{breach:result.maxUnserved>0}"><span>{{nl?'Grootste tekort':'Largest shortfall'}}</span><strong>{{fmt(result.maxUnserved)}}</strong><small>{{result.firstBreach===undefined?(nl?'geen overschrijding':'no breach'):(nl?'vanaf dag ':'from day ')+result.firstBreach}}</small></article><article :class="{warning:result.maxDisplaced>0}"><span>{{nl?'Verdrongen reguliere zorg':'Displaced regular care'}}</span><strong>{{fmt(result.maxDisplaced)}}</strong><small>{{nl?'plaatsen op de piek':'beds at peak'}}</small></article></div>
      </div>
    </div>
    <p class="model-note">{{nl?'Didactisch capaciteitsmodel v0.1. De instroom volgt een gestileerde epidemische golf; ligduur is vast en patiëntenspreiding verlaagt alleen de lokale vraag. In werkelijkheid zijn personeelssamenstelling, ziekte-ernst, apparatuur, zuurstof, regionale ontvangstruimte en de tijd die ombouw en opleiding kosten afzonderlijke beperkingen. Het model maakt die datastructuur zichtbaar, maar voorspelt geen Nederlandse crisis.':'Educational capacity model v0.1. Admissions follow a stylised epidemic wave; length of stay is fixed and patient distribution only reduces local demand. In reality, staffing mix, severity, equipment, oxygen, receiving capacity elsewhere, conversion time and training are separate constraints. The model exposes the required structure but does not predict a Dutch crisis.'}}</p>
  </section>
</template>

<style scoped>
.capacity-model{position:relative;left:50%;transform:translateX(-50%);margin:3rem 0;width:min(1180px,calc(100vw - 48px));padding:34px;background:#edf2f0;border:1px solid var(--line)}header{max-width:850px}.eyebrow{font-size:.7rem;letter-spacing:.13em;font-weight:800;color:var(--accent)}h2{font-size:clamp(2rem,3.5vw,3rem);margin:.2rem 0 .6rem}header p:last-child{color:#4f5c58}.capacity-grid{display:grid;grid-template-columns:360px minmax(0,1fr);gap:16px;margin-top:24px}.controls,.results{background:#fff;border:1px solid #d5ded9;padding:18px}.controls label{display:grid;grid-template-columns:1fr 105px 50px;gap:8px;align-items:center;margin:12px 0;font-size:.68rem}.controls input{accent-color:#256d72;min-width:0}.controls output{text-align:right;font-variant-numeric:tabular-nums}.status{display:grid;gap:2px;padding:11px 13px;background:#e5f0eb;border-left:4px solid #3b7d69}.status.breach{background:#f9e8e4;border-color:#c94c34}.status span{font-size:.6rem;color:#596762}.status strong{font-size:.86rem}.results svg{width:100%;margin-top:12px;overflow:visible}.results line{stroke:#aab8b2}.results polyline{fill:none;stroke-width:2}.results .regular{stroke:#a6afab;stroke-dasharray:5 4}.results .capacity{stroke:#256d72}.results .demand{stroke:#d55c3c}.results text{font-size:9px;fill:#64716c}.legend{display:flex;gap:14px;flex-wrap:wrap;font-size:.61rem}.legend span:before{content:'';display:inline-block;width:15px;border-top:2px solid;margin-right:5px;vertical-align:middle}.demand-key:before{border-color:#d55c3c!important}.regular-key:before{border-color:#a6afab!important;border-style:dashed}.capacity-key:before{border-color:#256d72!important}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:15px}.metrics article{display:grid;gap:2px;padding:10px;background:#edf4f1;border-top:3px solid #3b7d69}.metrics article.warning{background:#f8f1df;border-color:#bd8a25}.metrics article.breach{background:#f9e8e4;border-color:#c94c34}.metrics span,.metrics small{font-size:.58rem;color:#596762}.metrics strong{font-size:1rem}.model-note{margin:18px 0 0;padding-top:12px;border-top:1px solid #cbd5d0;color:#64716c;font-size:.65rem}@media(max-width:760px){.capacity-model{width:calc(100vw - 24px);padding:24px 12px}.capacity-grid{grid-template-columns:1fr}.controls label{grid-template-columns:1fr 95px 48px}.metrics{grid-template-columns:1fr}}
</style>
