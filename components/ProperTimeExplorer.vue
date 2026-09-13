<script setup lang="ts">
import { compareJourneys } from '~/utils/relativitySimulation'
const props = withDefaults(defineProps<{ locale?: 'nl'|'en' }>(), { locale: 'nl' })
const nl = computed(() => props.locale === 'nl')
const years = ref(10), beta = ref(.8), radius = ref(1.00001), referenceRadius = ref(1.00001)
const result = computed(() => compareJourneys({ durationYears: years.value, speedFractionC: beta.value, radiusEarth: radius.value, stationaryRadiusEarth: referenceRadius.value }))
const pct = (v:number) => `${(v*100).toFixed(v > .999 ? 6 : 2)}%`
const duration = (days:number) => Math.abs(days) >= 1 ? `${Math.abs(days).toFixed(2)} ${nl.value?'dagen':'days'}` : `${(Math.abs(days)*86400).toFixed(2)} s`
const path = computed(() => {
  const amplitude = 45 + beta.value * 105
  return `M50 150 C210 ${150-amplitude},390 ${150-amplitude},550 150 C390 ${150+amplitude},210 ${150+amplitude},50 150`
})
</script>
<template>
  <section class="proper-time" data-analytics-model="proper-time">
    <header><p class="eyebrow">{{ nl?'INTERACTIEF GEDACHTE-EXPERIMENT':'INTERACTIVE THOUGHT EXPERIMENT' }}</p><h3>{{ nl?'Twee klokken, twee geschiedenissen':'Two clocks, two histories' }}</h3><p>{{ nl?'Geef klok B een andere snelheid en gravitatiepotentiaal. Beide klokken vertrekken samen en worden na dezelfde coördinatentijd herenigd.':'Give clock B a different velocity and gravitational potential. Both clocks leave together and reunite after the same coordinate-time interval.' }}</p></header>
    <div class="layout">
      <div class="controls">
        <label><span>{{ nl?'Duur volgens verre referentie':'Duration in distant reference frame' }} <b>{{ years }} {{ nl?'jaar':'years' }}</b></span><input v-model.number="years" type="range" min="1" max="50"></label>
        <label><span>{{ nl?'Snelheid klok B':'Speed of clock B' }} <b>{{ beta.toFixed(2) }}c</b></span><input v-model.number="beta" type="range" min="0" max="0.99" step="0.01"></label>
        <label><span>{{ nl?'Afstand B tot aardmiddelpunt':'B distance from Earth centre' }} <b>{{ radius.toFixed(3) }} R⊕</b></span><input v-model.number="radius" type="range" min="1.000001" max="12" step="0.001"></label>
        <label><span>{{ nl?'Afstand klok A':'Clock A distance' }} <b>{{ referenceRadius.toFixed(3) }} R⊕</b></span><input v-model.number="referenceRadius" type="range" min="1.000001" max="12" step="0.001"></label>
      </div>
      <div class="journey">
        <svg viewBox="0 0 600 300" role="img" :aria-label="nl?'Twee klokroutes die weer samenkomen':'Two clock paths that reunite'">
          <defs><linearGradient id="space" x2="1" y2="1"><stop stop-color="#081b34"/><stop offset="1" stop-color="#344963"/></linearGradient></defs>
          <rect width="600" height="300" rx="18" fill="url(#space)"/><circle cx="300" cy="150" :r="34+68/radius" fill="#c9873d"/><circle cx="300" cy="150" :r="22+40/radius" fill="#182537"/>
          <path d="M50 150H550" class="route a"/><path :d="path" class="route b"/>
          <circle cx="50" cy="150" r="8" fill="white"/><circle cx="550" cy="150" r="8" fill="white"/>
          <text x="50" y="178">{{ nl?'vertrek':'departure' }}</text><text x="550" y="178" text-anchor="end">{{ nl?'hereniging':'reunion' }}</text>
          <text x="300" y="132" text-anchor="middle" class="clock-label">A</text><text x="300" :y="82-beta*65" text-anchor="middle" class="clock-label">B</text>
        </svg>
      </div>
    </div>
    <div class="outcomes">
      <article><small>{{ nl?'EIGEN TIJD KLOK A':'PROPER TIME CLOCK A' }}</small><strong>{{ result.stationary.toFixed(6) }} {{ nl?'jaar':'years' }}</strong></article>
      <article><small>{{ nl?'EIGEN TIJD KLOK B':'PROPER TIME CLOCK B' }}</small><strong>{{ result.traveller.toFixed(6) }} {{ nl?'jaar':'years' }}</strong></article>
      <article class="difference"><small>{{ nl?'VERSCHIL BIJ HERENIGING':'DIFFERENCE AT REUNION' }}</small><strong>{{ duration(result.differenceDays) }}</strong></article>
    </div>
    <div class="factors"><span>{{ nl?'snelheidsfactor B':'velocity factor B' }}: <b>{{ pct(result.velocityFactor) }}</b></span><span>{{ nl?'zwaartekrachtsfactor B':'gravity factor B' }}: <b>{{ pct(result.travellerGravityFactor) }}</b></span></div>
    <p class="note">{{ nl?'Model: speciale relativiteit gecombineerd met de Schwarzschild-factor voor stilstaande klokken buiten een bolsymmetrische aarde. Versnelling, rotatie van de aarde en het werkelijke traject zijn niet gemodelleerd; dicht bij 1 R⊕ is het gravitatie-effect daardoor slechts illustratief nauwkeurig.':'Model: special relativity combined with the Schwarzschild factor for stationary clocks outside a spherically symmetric Earth. Acceleration, Earth rotation and the actual trajectory are omitted; near 1 R⊕ the gravitational result is therefore illustrative rather than precision metrology.' }}</p>
  </section>
</template>
<style scoped>
.proper-time{margin:4rem calc((780px - min(1120px,calc(100vw - 48px)))/2);width:min(1120px,calc(100vw - 48px));background:#f7f6f1;border:1px solid #d9dedc;border-radius:20px;padding:clamp(1rem,3vw,2rem);color:#172321}.proper-time header{max-width:760px}.eyebrow{font-size:.74rem;letter-spacing:.12em;font-weight:800;color:#a66d25;margin:0}.proper-time h3{font-size:clamp(1.7rem,3vw,2.5rem);margin:.25rem 0 .7rem}.layout{display:grid;grid-template-columns:minmax(250px,.75fr) minmax(420px,1.25fr);gap:1.4rem;margin-top:1.5rem}.controls{display:grid;gap:1.1rem;align-content:center}.controls label span{display:flex;justify-content:space-between;gap:1rem;font-size:.9rem}.controls input{width:100%;accent-color:#c9873d}.journey svg{display:block;width:100%;min-width:420px}.journey{overflow-x:auto}.route{fill:none;stroke-width:5}.route.a{stroke:#71baff}.route.b{stroke:#f0aa43}.journey text{fill:#dfe8ef;font:13px system-ui}.clock-label{font-weight:800;font-size:16px!important}.outcomes{display:grid;grid-template-columns:repeat(3,1fr);gap:.8rem;margin-top:1rem}.outcomes article{background:white;border:1px solid #dde2df;border-radius:12px;padding:1rem}.outcomes small{display:block;font-size:.69rem;letter-spacing:.08em;color:#68736f}.outcomes strong{display:block;font-size:1.15rem;margin-top:.3rem}.difference{border-color:#d7a35d!important}.factors{display:flex;gap:1.2rem;flex-wrap:wrap;margin:1rem 0;font-size:.86rem}.note{font-size:.79rem;color:#66726e;margin-bottom:0}@media(max-width:760px){.proper-time{margin:3rem calc(50% - 50vw + 16px);width:calc(100vw - 32px)}.layout{grid-template-columns:1fr}.outcomes{grid-template-columns:1fr}.journey svg{min-width:390px}}
</style>
