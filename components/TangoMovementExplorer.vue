<script setup lang="ts">
import { centreOfMass, frameAt, sharedCentre, tangoMovements, type DancerId, type DancerState, type FootState, type MovementId } from '~/utils/tangoSimulation'

const props = withDefaults(defineProps<{ locale?: 'nl' | 'en' }>(), { locale: 'nl' })
const nl = computed(() => props.locale === 'nl')
const movementId = ref<MovementId>('side-step')
const progress = ref(0)
const playing = ref(false)
const showContacts = ref(true)
const showCentres = ref(true)
let timer: ReturnType<typeof setInterval> | undefined

const movement = computed(() => tangoMovements.find(item => item.id === movementId.value)!)
const frame = computed(() => frameAt(movement.value, progress.value / 100))
const centreA = computed(() => centreOfMass(frame.value.a))
const centreB = computed(() => centreOfMass(frame.value.b))
const commonCentre = computed(() => sharedCentre(frame.value))
const label = (m: typeof tangoMovements[number]) => nl.value ? m.nameNl : m.nameEn
const phaseName = computed(() => ({
  available: nl.value ? 'mogelijkheden open' : 'possibilities open',
  proposal: nl.value ? 'voorstel' : 'proposal',
  transfer: nl.value ? 'gewichtsverplaatsing' : 'weight transfer',
  arrival: nl.value ? 'aankomst' : 'arrival'
}[frame.value.phase]))

const setMovement = (id: MovementId) => {
  movementId.value = id
  progress.value = 0
  playing.value = false
}

const togglePlay = () => {
  if (progress.value >= 100) progress.value = 0
  playing.value = !playing.value
}

watch(playing, active => {
  if (timer) clearInterval(timer)
  if (!active) return
  timer = setInterval(() => {
    progress.value = Math.min(100, progress.value + 0.75)
    if (progress.value >= 100) playing.value = false
  }, 35)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const transform = (item: { x: number; y: number; angle: number }) => `translate(${item.x} ${item.y}) rotate(${item.angle})`
const loadPct = (foot: FootState) => Math.round(foot.load * 100)
const support = (dancer: DancerState) => {
  if (Math.abs(dancer.left.load - dancer.right.load) < .18) return nl.value ? 'beide voeten' : 'both feet'
  const side = dancer.left.load > dancer.right.load ? (nl.value ? 'links' : 'left') : (nl.value ? 'rechts' : 'right')
  return `${side} (${Math.max(loadPct(dancer.left), loadPct(dancer.right))}%)`
}

const choicesFor = (id: DancerId) => {
  const initiates = movement.value.initiator === id
  const phase = frame.value.phase
  if (phase === 'available') return initiates
    ? (nl.value ? ['Richting voorstellen', 'Wachten en luisteren', 'Omhelzing aanpassen'] : ['Propose a direction', 'Wait and listen', 'Adjust the embrace'])
    : (nl.value ? ['Ruimte beschikbaar houden', 'Intentie waarnemen', 'Zelf een voorstel doen'] : ['Keep space available', 'Perceive intent', 'Make a proposal'])
  if (phase === 'proposal') return initiates
    ? (nl.value ? ['Voorstel voortzetten', 'Verzachten', 'Voorstel intrekken'] : ['Continue the proposal', 'Soften it', 'Withdraw it'])
    : (nl.value ? ['Accepteren', 'Timing vertragen', 'Anders beantwoorden'] : ['Accept', 'Delay the timing', 'Respond differently'])
  if (phase === 'transfer') return initiates
    ? (nl.value ? ['Ruimte bewaken', 'Werkelijke aankomst volgen', 'Energie doseren'] : ['Guard the space', 'Follow the actual arrival', 'Modulate energy'])
    : (nl.value ? ['Stapgrootte kiezen', 'Timing kiezen', 'Vrije voet versieren'] : ['Choose step size', 'Choose timing', 'Embellish with the free foot'])
  return nl.value ? ['Pauzeren', 'Nieuwe richting voorstellen', 'Verbinding herstellen'] : ['Pause', 'Propose a new direction', 'Restore connection']
}

const roleFor = (id: DancerId) => movement.value.initiator === id
  ? (nl.value ? 'doet het eerste voorstel' : 'makes the first proposal')
  : (nl.value ? 'antwoordt en vormt mee' : 'responds and co-shapes')
</script>

<template>
  <section class="tango-explorer" data-analytics-model="tango-movement">
    <header class="model-header">
      <p class="eyebrow">{{ nl ? 'INTERACTIEVE BEWEGINGSVERKENNER' : 'INTERACTIVE MOVEMENT EXPLORER' }}</p>
      <h3>{{ nl ? 'Van gezamenlijke toestand naar volgende mogelijkheid' : 'From shared state to next possibility' }}</h3>
      <p>{{ nl
        ? 'Deze schematische, kinematische simulatie verbindt positie, voetbelasting, zwaartepunt, contact en handelingsruimte. Ze is bedoeld om de logica van het gesprek te onderzoeken — niet als dansinstructie of exact biomechanisch model.'
        : 'This schematic kinematic simulation links position, foot load, centre of mass, contact and agency. It explores the logic of the conversation; it is not dance instruction or an exact biomechanical model.' }}</p>
    </header>

    <div class="movement-picker" role="group" :aria-label="nl ? 'Kies beweging' : 'Choose movement'">
      <button v-for="item in tangoMovements" :key="item.id" :class="{ active: item.id === movementId }" @click="setMovement(item.id)">{{ label(item) }}</button>
    </div>

    <div class="stage-card">
      <div class="stage-toolbar">
        <strong>{{ label(movement) }}</strong>
        <span>{{ nl ? 'Fase' : 'Phase' }}: {{ phaseName }}</span>
        <label><input v-model="showContacts" type="checkbox"> {{ nl ? 'contact' : 'contact' }}</label>
        <label><input v-model="showCentres" type="checkbox"> {{ nl ? 'zwaartepunten' : 'centres' }}</label>
      </div>
      <div class="stage-scroll">
        <svg class="stage" viewBox="80 70 640 360" role="img" :aria-label="nl ? 'Schematisch bovenaanzicht van twee tangodansers' : 'Schematic top view of two tango dancers'">
          <defs>
            <pattern id="tango-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="currentColor" stroke-opacity=".07"/></pattern>
            <filter id="tango-shadow"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity=".14"/></filter>
          </defs>
          <rect x="80" y="70" width="640" height="360" rx="22" class="floor" />
          <rect x="80" y="70" width="640" height="360" rx="22" fill="url(#tango-grid)" />

          <g v-if="showContacts" class="contacts">
            <line v-for="(contact, index) in frame.contacts" :key="index" :x1="contact.a.x" :y1="contact.a.y" :x2="contact.b.x" :y2="contact.b.y" :style="{ opacity: contact.active, strokeWidth: contact.type === 'torso' ? 8 : 4 }" />
          </g>

          <g v-for="id in (['a','b'] as const)" :key="id" :class="['dancer', `dancer-${id}`]">
            <g v-for="side in (['left','right'] as const)" :key="side" :transform="transform(frame[id][side])" class="foot">
              <ellipse rx="10" ry="23" />
              <circle r="28" :style="{ opacity: .08 + frame[id][side].load * .2 }" />
              <text y="4">{{ side === 'left' ? 'L' : 'R' }}</text>
            </g>
            <line :x1="frame[id].left.x" :y1="frame[id].left.y" :x2="frame[id].torso.x" :y2="frame[id].torso.y" />
            <line :x1="frame[id].right.x" :y1="frame[id].right.y" :x2="frame[id].torso.x" :y2="frame[id].torso.y" />
            <g :transform="transform({ ...frame[id].torso, angle: frame[id].angle })" class="body" filter="url(#tango-shadow)">
              <ellipse rx="45" ry="30" />
              <path d="M16 0 34 -8 34 8Z" />
              <text y="5">{{ id.toUpperCase() }}</text>
            </g>
          </g>

          <g v-if="showCentres" class="centres">
            <g :transform="`translate(${centreA.x} ${centreA.y})`"><circle r="7"/><path d="M-11 0H11M0-11V11"/></g>
            <g :transform="`translate(${centreB.x} ${centreB.y})`"><circle r="7"/><path d="M-11 0H11M0-11V11"/></g>
            <g :transform="`translate(${commonCentre.x} ${commonCentre.y})`" class="shared"><circle r="14"/><circle r="4"/></g>
          </g>
        </svg>
      </div>
      <div class="timeline">
        <button class="play" @click="togglePlay">{{ playing ? 'Ⅱ' : '▶' }} <span>{{ playing ? (nl ? 'Pauze' : 'Pause') : (nl ? 'Afspelen' : 'Play') }}</span></button>
        <input v-model.number="progress" type="range" min="0" max="100" step="1" :aria-label="nl ? 'Voortgang door beweging' : 'Movement progress'">
        <output>{{ progress }}%</output>
      </div>
      <div class="phase-track" aria-hidden="true"><span>0</span><span>{{ nl ? 'voorstel' : 'proposal' }}</span><span>{{ nl ? 'overdracht' : 'transfer' }}</span><span>{{ nl ? 'aankomst' : 'arrival' }}</span></div>
    </div>

    <div class="views">
      <section class="balance-card">
        <p class="eyebrow">{{ nl ? 'BALANS' : 'BALANCE' }}</p>
        <h4>{{ nl ? 'Belasting per voet' : 'Load per foot' }}</h4>
        <div v-for="id in (['a','b'] as const)" :key="id" class="load-row">
          <div><strong>{{ nl ? 'Danser' : 'Dancer' }} {{ id.toUpperCase() }}</strong><small>{{ nl ? 'steun' : 'support' }}: {{ support(frame[id]) }}</small></div>
          <div class="load-bars">
            <span class="left" :style="{ width: `${loadPct(frame[id].left)}%` }">L {{ loadPct(frame[id].left) }}%</span>
            <span class="right" :style="{ width: `${loadPct(frame[id].right)}%` }">R {{ loadPct(frame[id].right) }}%</span>
          </div>
        </div>
        <p class="note">{{ nl ? 'Belasting en zwaartepunten zijn vereenvoudigde schattingen. Ze maken overdracht zichtbaar, niet meetbaar.' : 'Loads and centres are simplified estimates. They make transfer visible, not measurable.' }}</p>
      </section>

      <section class="agency-card">
        <p class="eyebrow">{{ nl ? 'HANDELINGSRUIMTE' : 'AGENCY' }}</p>
        <h4>{{ nl ? 'Wie kan nu wat kiezen?' : 'Who can choose what now?' }}</h4>
        <div class="choice-grid">
          <article v-for="id in (['a','b'] as const)" :key="id">
            <div class="choice-head"><strong>{{ nl ? 'Danser' : 'Dancer' }} {{ id.toUpperCase() }}</strong><small>{{ roleFor(id) }}</small></div>
            <ul><li v-for="choice in choicesFor(id)" :key="choice">{{ choice }}</li></ul>
          </article>
        </div>
        <div v-if="progress >= 82" class="next-options">
          <strong>{{ nl ? 'Mogelijke volgende toestand' : 'Possible next state' }}</strong>
          <button v-for="next in movement.next" :key="next" @click="setMovement(next)">→ {{ label(tangoMovements.find(item => item.id === next)!) }}</button>
        </div>
      </section>
    </div>

    <footer>{{ nl ? 'A en B zijn tijdelijke rollen, geen vaste leider/volger- of gendercategorieën. Initiatief kan bij een volgende beweging wisselen.' : 'A and B are temporary roles, not fixed leader/follower or gender categories. Initiative can change in the next movement.' }}</footer>
  </section>
</template>

<style scoped>
.tango-explorer{--a:#c75032;--b:#256d72;margin:4rem calc((780px - min(1180px,calc(100vw - 48px)))/2);width:min(1180px,calc(100vw - 48px));color:#172321}.model-header{max-width:780px}.model-header h3{font-size:clamp(1.7rem,3vw,2.6rem);margin:.25rem 0 .75rem}.eyebrow{font-size:.74rem;letter-spacing:.12em;font-weight:800;color:#a64a34;margin:0 0 .35rem}.movement-picker{display:flex;gap:.5rem;flex-wrap:wrap;margin:1.5rem 0}.movement-picker button,.next-options button{border:1px solid #d2d8d5;background:#fff;border-radius:999px;padding:.65rem .95rem;cursor:pointer;color:inherit}.movement-picker button.active{background:#1d3532;color:#fff;border-color:#1d3532}.stage-card,.balance-card,.agency-card{background:#fff;border:1px solid #dce2de;border-radius:18px;box-shadow:0 10px 34px rgba(22,42,37,.07)}.stage-toolbar{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;padding:1rem 1.25rem;border-bottom:1px solid #e3e7e4}.stage-toolbar span{margin-right:auto;color:#61706b}.stage-toolbar label{font-size:.88rem;display:flex;gap:.35rem;align-items:center}.stage-scroll{overflow-x:auto}.stage{display:block;width:100%;min-width:560px;color:#183632}.floor{fill:#f7f5ef}.contacts line{stroke:#c38a42;stroke-linecap:round}.dancer line{stroke:#adb8b4;stroke-width:3}.foot ellipse{fill:white;stroke:currentColor;stroke-width:3}.foot circle{fill:currentColor}.foot text,.body text{fill:white;text-anchor:middle;font:700 13px system-ui}.body ellipse,.body path{fill:currentColor}.dancer-a{color:var(--a)}.dancer-b{color:var(--b)}.centres circle,.centres path{fill:#fff;stroke:#172321;stroke-width:2}.centres .shared circle:first-child{fill:none;stroke:#c38a42;stroke-width:3}.centres .shared circle:last-child{fill:#c38a42;stroke:none}.timeline{display:grid;grid-template-columns:auto 1fr auto;gap:1rem;align-items:center;padding:.9rem 1.25rem .25rem}.play{border:0;background:#1d3532;color:#fff;padding:.55rem .8rem;border-radius:8px;cursor:pointer}.timeline input{accent-color:#c75032;width:100%}.phase-track{display:grid;grid-template-columns:repeat(4,1fr);font-size:.72rem;color:#77827e;padding:0 1.25rem 1rem;margin-left:92px}.phase-track span:nth-child(n+2){text-align:right}.views{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.35fr);gap:1rem;margin-top:1rem}.balance-card,.agency-card{padding:1.25rem}.views h4{font-size:1.25rem;margin:.15rem 0 1rem}.load-row{display:grid;grid-template-columns:130px 1fr;gap:.75rem;align-items:center;margin:.9rem 0}.load-row small,.choice-head small{display:block;color:#65716d}.load-bars{display:flex;height:34px;border-radius:7px;overflow:hidden;background:#eef1ef}.load-bars span{display:flex;align-items:center;justify-content:center;min-width:44px;color:#fff;font-size:.73rem;white-space:nowrap;transition:width .15s}.load-bars .left{background:#a76855}.load-bars .right{background:#397d80}.note,footer{font-size:.8rem;color:#697570}.choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.choice-grid article{border:1px solid #e1e5e2;background:#fafbf9;border-radius:12px;padding:1rem}.choice-head{border-left:4px solid var(--a);padding-left:.65rem}.choice-grid article:nth-child(2) .choice-head{border-color:var(--b)}.choice-grid ul{margin:.8rem 0 0;padding-left:1.15rem}.choice-grid li{margin:.35rem 0}.next-options{border-top:1px solid #e1e5e2;margin-top:1rem;padding-top:1rem;display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}.next-options button{padding:.45rem .7rem}footer{padding:1rem .25rem 0}
@media(max-width:760px){.tango-explorer{margin:3rem calc(50% - 50vw + 16px);width:calc(100vw - 32px)}.views{grid-template-columns:1fr}.stage-toolbar{gap:.65rem}.stage-toolbar span{width:100%;order:3}.choice-grid{grid-template-columns:1fr}.load-row{grid-template-columns:1fr}.timeline{gap:.55rem;padding-inline:.75rem}.play span{display:none}.phase-track{margin-left:36px;padding-inline:.75rem}.model-header{padding-inline:.15rem}}
</style>
