<script setup lang="ts">
import { assessMovementAt, centreOfMass, frameAt, sharedCentre, tangoMovements, withEmbrace, type DancerId, type DancerState, type Embrace, type FootState, type MovementId } from '~/utils/tangoSimulation'

const props = withDefaults(defineProps<{ locale?: 'nl' | 'en' }>(), { locale: 'nl' })
const nl = computed(() => props.locale === 'nl')
const movementId = ref<MovementId>('side-step')
const progress = ref(0)
const playing = ref(false)
const showContacts = ref(true)
const showCentres = ref(true)
const embrace = ref<Embrace>('open')
const hiddenMovements: MovementId[] = ['forward-ocho', 'backward-ocho']
const availableMovements = computed(() => tangoMovements.filter(item => !hiddenMovements.includes(item.id)))
let timer: ReturnType<typeof setInterval> | undefined

const movement = computed(() => tangoMovements.find(item => item.id === movementId.value)!)
const availableNext = computed(() => movement.value.next.filter(id => !hiddenMovements.includes(id)))
const checkpoints = computed(() => movement.value.checkpoints ?? [])
const checkpointIndex = computed(() => {
  const p = progress.value / 100
  return checkpoints.value.reduce((active, checkpoint, index) => checkpoint.at <= p + .001 ? index : active, 0)
})
const checkpoint = computed(() => checkpoints.value[checkpointIndex.value])
const rawFrame = computed(() => frameAt(movement.value, progress.value / 100))
const frame = computed(() => withEmbrace(rawFrame.value, embrace.value, movementId.value))
const centreA = computed(() => centreOfMass(frame.value.a))
const centreB = computed(() => centreOfMass(frame.value.b))
const commonCentre = computed(() => sharedCentre(frame.value))
const bodyChecks = computed(() => assessMovementAt(movement.value, progress.value / 100))
const bodyValid = computed(() => bodyChecks.value.every(check => check.ok))
const initiative = computed(() => {
  const p=progress.value/100, first=movement.value.initiator
  return {
    a:first==='a'?Math.max(0,1-Math.abs(p-.16)/.2):Math.max(0,1-Math.abs(p-.34)/.22),
    b:first==='b'?Math.max(0,1-Math.abs(p-.16)/.2):Math.max(0,1-Math.abs(p-.34)/.22)
  }
})
const label = (m: typeof tangoMovements[number]) => nl.value ? m.nameNl : m.nameEn
const phaseName = computed(() => ({
  available: nl.value ? 'mogelijkheden open' : 'possibilities open',
  proposal: nl.value ? 'voorstel' : 'proposal',
  projection: nl.value ? 'projectie' : 'projection',
  transfer: nl.value ? 'gewichtsverplaatsing' : 'weight transfer',
  pivot: 'pivot',
  arrival: nl.value ? 'aankomst' : 'arrival'
}[frame.value.phase]))

const setMovement = (id: MovementId) => {
  movementId.value = id
  progress.value = 0
  playing.value = false
}

const goToCheckpoint = (index: number) => {
  const target = checkpoints.value[index]
  if (!target) return
  progress.value = Math.round(target.at * 100)
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
const torsion = (dancer: DancerState) => Math.round(Math.abs(((dancer.angle-dancer.pelvisAngle+540)%360)-180))

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
      <button v-for="item in availableMovements" :key="item.id" :class="{ active: item.id === movementId }" @click="setMovement(item.id)">{{ label(item) }}</button>
    </div>

    <fieldset class="embrace-picker">
      <legend>{{ nl ? 'Omhelzing' : 'Embrace' }}</legend>
      <label v-for="option in (['open','half-open','closed'] as const)" :key="option" :class="{active:embrace===option}">
        <input v-model="embrace" type="radio" :value="option">
        {{ option==='open'?(nl?'Open':'Open'):option==='half-open'?(nl?'Halfopen':'Half-open'):(nl?'Gesloten':'Closed') }}
      </label>
      <small>{{ nl ? 'Open: bovenlijven vrij, met de zijwaartse handverbinding en het contact aan de rechterzijde. Halfopen: rechts bovenlijfcontact, links ruimte en de handen verder om de rug. Gesloten: beide bovenlijven maken contact ter hoogte van borstkas en diafragma.' : 'Open: upper bodies apart, with the lateral hand connection and contact on the right side. Half-open: upper-body contact on the right, space on the left and hands farther around the back. Closed: both upper bodies connect around the chest and diaphragm.' }}</small>
    </fieldset>

    <div class="stage-card">
      <div class="stage-toolbar">
        <strong>{{ label(movement) }}</strong>
        <b class="initiator-key">A · {{ nl ? 'begint het voorstel' : 'starts the proposal' }}</b>
        <span>{{ nl ? 'Fase' : 'Phase' }}: {{ phaseName }}</span>
        <label><input v-model="showContacts" type="checkbox"> {{ nl ? 'contact' : 'contact' }}</label>
        <label><input v-model="showCentres" type="checkbox"> {{ nl ? 'zwaartepunten' : 'centres' }}</label>
      </div>
      <div class="movement-grammar">
        <span class="system-label">{{ nl ? movement.systemNl : movement.systemEn }}</span>
        <ol><li v-for="step in (nl ? movement.sequenceNl : movement.sequenceEn)" :key="step">{{ step }}</li></ol>
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
              <circle class="load-halo" r="28" :style="{ opacity: .06 + frame[id][side].load * .3 }" />
              <circle v-if="frame[id][side].load >= .88" class="support-ring" r="24" />
              <path class="foot-shape" :style="{ opacity: .38 + frame[id][side].load * .62 }" d="M-22 -10H9C18-10 25-6 29 0 25 6 18 10 9 10H-22Q-28 0-22-10Z" />
              <path class="toe-direction" d="M10-6 22 0 10 6" />
              <text x="-7" y="4">{{ side === 'left' ? 'L' : 'R' }}</text>
            </g>
            <g :transform="transform({ ...frame[id].torso, angle: frame[id].pelvisAngle })" class="hips"><path d="M-5-17Q4-25 13-17L13 17Q4 25-5 17Z" /></g>
            <g :transform="transform({ ...frame[id].torso, angle: frame[id].angle })" class="body" filter="url(#tango-shadow)">
              <path class="shoulders" d="M-8-31C8-42 28-38 42-24L42 24C28 38 8 42-8 31Z" />
              <circle class="head" cx="3" cy="0" r="13" />
              <path class="gaze" d="M14 0H34M27-6 34 0 27 6" />
              <text x="5" y="5">{{ id.toUpperCase() }}</text>
            </g>
            <g v-if="initiative[id]>.08" :transform="`translate(${frame[id].torso.x} ${frame[id].torso.y})`" class="initiative" :style="{opacity:initiative[id]}">
              <circle r="54"/><text y="-62">{{ movement.initiator===id?(nl?'initieert':'initiates'):(nl?'reageert':'responds') }}</text>
            </g>
          </g>

          <g v-if="showCentres" class="centres">
            <g :transform="`translate(${centreA.x} ${centreA.y})`"><circle r="7"/><path d="M-11 0H11M0-11V11"/></g>
            <g :transform="`translate(${centreB.x} ${centreB.y})`"><circle r="7"/><path d="M-11 0H11M0-11V11"/></g>
            <g :transform="`translate(${commonCentre.x} ${commonCentre.y})`" class="shared"><circle r="14"/><circle r="4"/></g>
          </g>
        </svg>
      </div>
      <p class="stage-note"><strong>{{ nl ? 'Wat verandert:' : 'What changes:' }}</strong> {{ nl ? frame.noteNl : frame.noteEn }}</p>
      <div class="timeline">
        <button class="play" @click="togglePlay">{{ playing ? 'Ⅱ' : '▶' }} <span>{{ playing ? (nl ? 'Pauze' : 'Pause') : (nl ? 'Afspelen' : 'Play') }}</span></button>
        <input v-model.number="progress" type="range" min="0" max="100" step="1" :aria-label="nl ? 'Voortgang door beweging' : 'Movement progress'">
        <output>{{ progress }}%</output>
      </div>
      <div class="phase-track" aria-hidden="true"><span>{{ nl ? 'begin' : 'start' }}</span><span>{{ nl ? 'projectie' : 'projection' }}</span><span>{{ nl ? 'overdracht' : 'transfer' }}</span><span>{{ nl ? 'vervolg' : 'continuation' }}</span></div>
      <section v-if="checkpoint" class="sequence-explorer">
        <div class="sequence-heading">
          <div><p class="eyebrow">{{ nl ? 'GIRO ALS SEQUENTIE' : 'GIRO AS A SEQUENCE' }}</p><strong>{{ nl ? 'Stabiele toestanden na volledige gewichtsoverdracht' : 'Stable states after completed weight transfer' }}</strong></div>
          <div class="sequence-arrows">
            <button :disabled="checkpointIndex === 0" @click="goToCheckpoint(checkpointIndex - 1)" :aria-label="nl ? 'Vorige toestand' : 'Previous state'">←</button>
            <span>{{ checkpointIndex + 1 }} / {{ checkpoints.length }}</span>
            <button :disabled="checkpointIndex === checkpoints.length - 1" @click="goToCheckpoint(checkpointIndex + 1)" :aria-label="nl ? 'Volgende toestand' : 'Next state'">→</button>
          </div>
        </div>
        <div class="checkpoint-tabs" role="group" :aria-label="nl ? 'Kies stabiele toestand' : 'Choose stable state'">
          <button v-for="(item,index) in checkpoints" :key="item.at" :class="{active:index===checkpointIndex}" @click="goToCheckpoint(index)"><span>{{ index + 1 }}</span>{{ nl ? item.nameNl : item.nameEn }}</button>
        </div>
        <div class="checkpoint-detail">
          <div class="checkpoint-state"><small>{{ nl ? 'HUIDIGE TOESTAND' : 'CURRENT STATE' }}</small><strong>{{ nl ? checkpoint.nameNl : checkpoint.nameEn }}</strong><p>{{ nl ? checkpoint.supportNl : checkpoint.supportEn }}</p></div>
          <div><small>{{ nl ? 'NU BESCHIKBARE TECHNIEKEN' : 'TECHNIQUES AVAILABLE NOW' }}</small><ul><li v-for="item in (nl ? checkpoint.techniquesNl : checkpoint.techniquesEn)" :key="item">{{ item }}</li></ul></div>
          <div><small>{{ nl ? 'MOGELIJKE ROUTES' : 'POSSIBLE ROUTES' }}</small><ul><li v-for="item in (nl ? checkpoint.routesNl : checkpoint.routesEn)" :key="item">{{ item }}</li></ul></div>
        </div>
        <p class="sequence-note">{{ nl ? 'De routes zijn mogelijkheden, geen voorgeschreven vervolg. Iedere stap kan zelfstandig eindigen of het begin van een andere beweging worden.' : 'These routes are possibilities, not prescribed continuations. Every step can end independently or become the start of another movement.' }}</p>
      </section>
    </div>

    <div class="views">
      <section class="balance-card">
        <p class="eyebrow">{{ nl ? 'BALANS' : 'BALANCE' }}</p>
        <h4>{{ nl ? 'Belasting per voet' : 'Load per foot' }}</h4>
        <div v-for="id in (['a','b'] as const)" :key="id" class="load-row">
          <div><strong>{{ nl ? 'Danser' : 'Dancer' }} {{ id.toUpperCase() }}</strong><small>{{ nl ? 'steun' : 'support' }}: {{ support(frame[id]) }}</small><small>{{ nl ? 'torsie bovenlijf–bekken' : 'upper-body–pelvis torsion' }}: {{ torsion(frame[id]) }}°</small></div>
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
          <button v-for="next in availableNext" :key="next" @click="setMovement(next)">→ {{ label(tangoMovements.find(item => item.id === next)!) }}</button>
        </div>
      </section>
    </div>

    <section class="biomechanics-card">
      <div><p class="eyebrow">{{ nl ? 'LICHAAMSMODEL' : 'BODY MODEL' }}</p><h4>{{ nl ? 'Geometrische toets van de bronbeweging' : 'Geometric validation of the source movement' }}</h4><p>{{ nl ? 'De toets beoordeelt de onbegrensde bewegingsbeschrijving. Pas daarna begrenst het model het getoonde frame, zodat een correctie niet als een geldige bronstand wordt meegeteld.' : 'The validation assesses the unconstrained movement description. Only then does the model constrain the displayed frame, so a correction is not counted as a valid source configuration.' }}</p></div>
      <ul><li v-for="check in bodyChecks" :key="check.id" :class="{ok:check.ok}"><span>{{ check.ok ? '✓' : '!' }}</span>{{ nl ? check.labelNl : check.labelEn }}</li></ul>
      <strong :class="['validation-result',{ok:bodyValid}]">{{ bodyValid ? (nl?'Frame fysiek consistent binnen dit 2D-model':'Frame physically consistent within this 2D model') : (nl?'Frame vraagt correctie':'Frame requires correction') }}</strong>
      <small>{{ nl ? 'Dit sluit geometrische onmogelijkheden uit, maar is geen volledig 3D-biomechanisch of medisch model.' : 'This excludes geometric impossibilities but is not a complete 3D biomechanical or medical model.' }}</small>
    </section>

    <footer>{{ nl ? 'A en B zijn tijdelijke rollen, geen vaste leider/volger- of gendercategorieën. Initiatief kan bij een volgende beweging wisselen.' : 'A and B are temporary roles, not fixed leader/follower or gender categories. Initiative can change in the next movement.' }}</footer>
    <details class="model-status">
      <summary>{{ nl ? 'Model in ontwikkeling: inhoud en bronnen' : 'Model in progress: scope and sources' }}</summary>
      <p>{{ nl ? 'De simulatie bevat nu afzonderlijke toestanden voor standbeen, vrije voet, projectie, plaatsing, gewichtsoverdracht, pivot, voetoriëntatie, schouderoriëntatie, contact, omhelzingsafstand, initiatief en vertraagde respons. Het is een onderzoekbare schematisering, geen dansinstructie.' : 'The simulation now represents supporting leg, free foot, projection, placement, weight transfer, pivot, foot orientation, shoulder orientation, contact, embrace distance, initiative and delayed response separately. It is an explorable schematic, not dance instruction.' }}</p>
      <ul>
        <li><a href="https://www.degruyter.com/document/doi/10.1515/cogsem.2012.4.1.76/html" target="_blank" rel="noopener">Kimmel — Intersubjectivity at Close Quarters</a>: {{ nl ? 'basis voor tango als wederzijdse, belichaamde coördinatie.' : 'basis for tango as reciprocal, embodied coordination.' }}</li>
        <li><a href="https://www.researchgate.net/publication/334694663_Tango_Ocho_-_1_Functional_Anatomical_Characteristics_of_Dissociation_and_the_Tango_Pivot" target="_blank" rel="noopener">Noh — Tango Ocho: dissociation and pivot</a>: {{ nl ? 'anatomische beschrijving van dissociatie en pivot; de drie omhelzingen zijn hier modelvarianten, geen uit dit onderzoek overgenomen meetwaarden.' : 'anatomical account of dissociation and pivot; the three embraces here are model variants, not measurements taken from this paper.' }}</li>
        <li><a href="https://tangolife.london/blog/the-molinete-and-giro-circular-movement-in-tango" target="_blank" rel="noopener">TangoLife — The Molinete and Giro</a>: {{ nl ? 'praktijkbron voor de reeks achter–zij–voor–zij en voor het onderscheid tussen molinete en de totale giro. De simulatie kan op een ander punt in die cyclische reeks beginnen.' : 'practice source for the back–side–forward–side cycle and the distinction between molinete and the complete giro. The simulation may enter that cyclic sequence at another point.' }}</li>
        <li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13453143/" target="_blank" rel="noopener">Torres et al. — Energetics, kinematics, and physiologic aspects of tango walking</a>: {{ nl ? '3D-bewegingsonderzoek naar onder meer zwaartepunttrajecten en knieflexie bij tangolopen. Het onderstreept waarom de geometrische toets nuttig is, maar een 2D-model geen volledige biomechanische geldigheid kan bewijzen.' : '3D motion research including centre-of-mass trajectories and knee flexion in tango walking. It supports the value of geometric validation while showing why a 2D model cannot establish complete biomechanical validity.' }}</li>
      </ul>
    </details>
  </section>
</template>

<style scoped>
.tango-explorer{--a:#c75032;--b:#256d72;margin:4rem calc((780px - min(1180px,calc(100vw - 48px)))/2);width:min(1180px,calc(100vw - 48px));color:#172321}.model-header{max-width:780px}.model-header h3{font-size:clamp(1.7rem,3vw,2.6rem);margin:.25rem 0 .75rem}.eyebrow{font-size:.74rem;letter-spacing:.12em;font-weight:800;color:#a64a34;margin:0 0 .35rem}.movement-picker{display:flex;gap:.5rem;flex-wrap:wrap;margin:1.5rem 0}.movement-picker button,.next-options button{border:1px solid #d2d8d5;background:#fff;border-radius:999px;padding:.65rem .95rem;cursor:pointer;color:inherit}.movement-picker button.active{background:#1d3532;color:#fff;border-color:#1d3532}.stage-card,.balance-card,.agency-card{background:#fff;border:1px solid #dce2de;border-radius:18px;box-shadow:0 10px 34px rgba(22,42,37,.07)}.stage-toolbar{display:flex;align-items:center;gap:1rem;flex-wrap:wrap;padding:1rem 1.25rem;border-bottom:1px solid #e3e7e4}.stage-toolbar span{margin-right:auto;color:#61706b}.stage-toolbar label{font-size:.88rem;display:flex;gap:.35rem;align-items:center}.stage-scroll{overflow-x:auto}.stage{display:block;width:100%;min-width:560px;color:#183632}.floor{fill:#f7f5ef}.contacts line{stroke:#c38a42;stroke-linecap:round}.dancer line{stroke:#adb8b4;stroke-width:3}.foot circle,.foot-shape{fill:currentColor}.foot-shape{stroke:#fff;stroke-width:1.5}.toe-direction{fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.foot text,.body text{fill:white;text-anchor:middle;font:700 12px system-ui}.body ellipse,.body path{fill:currentColor}.dancer-a{color:var(--a)}.dancer-b{color:var(--b)}.centres circle,.centres path{fill:#fff;stroke:#172321;stroke-width:2}.centres .shared circle:first-child{fill:none;stroke:#c38a42;stroke-width:3}.centres .shared circle:last-child{fill:#c38a42;stroke:none}.stage-note{min-height:3.1rem;margin:0;padding:.8rem 1.25rem;background:#f5f4ef;border-top:1px solid #e3e7e4;font-size:.88rem;color:#4f5d58}.timeline{display:grid;grid-template-columns:auto 1fr auto;gap:1rem;align-items:center;padding:.9rem 1.25rem .25rem}.play{border:0;background:#1d3532;color:#fff;padding:.55rem .8rem;border-radius:8px;cursor:pointer}.timeline input{accent-color:#c75032;width:100%}.phase-track{display:grid;grid-template-columns:repeat(4,1fr);font-size:.72rem;color:#77827e;padding:0 1.25rem 1rem;margin-left:92px}.phase-track span:nth-child(n+2){text-align:right}.views{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.35fr);gap:1rem;margin-top:1rem}.balance-card,.agency-card{padding:1.25rem}.views h4{font-size:1.25rem;margin:.15rem 0 1rem}.load-row{display:grid;grid-template-columns:130px 1fr;gap:.75rem;align-items:center;margin:.9rem 0}.load-row small,.choice-head small{display:block;color:#65716d}.load-bars{display:flex;height:34px;border-radius:7px;overflow:hidden;background:#eef1ef}.load-bars span{display:flex;align-items:center;justify-content:center;min-width:44px;color:#fff;font-size:.73rem;white-space:nowrap;transition:width .15s}.load-bars .left{background:#a76855}.load-bars .right{background:#397d80}.note,footer{font-size:.8rem;color:#697570}.choice-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.choice-grid article{border:1px solid #e1e5e2;background:#fafbf9;border-radius:12px;padding:1rem}.choice-head{border-left:4px solid var(--a);padding-left:.65rem}.choice-grid article:nth-child(2) .choice-head{border-color:var(--b)}.choice-grid ul{margin:.8rem 0 0;padding-left:1.15rem}.choice-grid li{margin:.35rem 0}.next-options{border-top:1px solid #e1e5e2;margin-top:1rem;padding-top:1rem;display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}.next-options button{padding:.45rem .7rem}footer{padding:1rem .25rem 0}
@media(max-width:760px){.tango-explorer{margin:3rem calc(50% - 50vw + 16px);width:calc(100vw - 32px)}.views{grid-template-columns:1fr}.stage-toolbar{gap:.65rem}.stage-toolbar span{width:100%;order:3}.choice-grid{grid-template-columns:1fr}.load-row{grid-template-columns:1fr}.timeline{gap:.55rem;padding-inline:.75rem}.play span{display:none}.phase-track{margin-left:36px;padding-inline:.75rem}.model-header{padding-inline:.15rem}}
.movement-grammar{display:flex;align-items:center;gap:1rem;padding:.75rem 1.25rem;background:#fbfaf6;border-bottom:1px solid #e3e7e4}.system-label{flex:none;border:1px solid #d8d8cf;border-radius:999px;padding:.3rem .65rem;font-size:.75rem;color:#5f6965}.movement-grammar ol{display:flex;align-items:center;gap:.4rem;list-style:none;padding:0;margin:0;overflow-x:auto}.movement-grammar li{font-size:.76rem;white-space:nowrap;color:#53605c}.movement-grammar li:not(:last-child)::after{content:'→';padding-left:.4rem;color:#b17754}
.initiator-key{border:1px solid #d18b3b;border-radius:999px;padding:.25rem .55rem;color:#87551e;font-size:.72rem;white-space:nowrap}
.embrace-picker{border:0;padding:0;margin:0 0 1.25rem;display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}.embrace-picker legend{font-weight:750;margin-bottom:.55rem}.embrace-picker label{border:1px solid #d2d8d5;background:#fff;border-radius:999px;padding:.5rem .8rem;cursor:pointer}.embrace-picker label.active{background:#ecf2ef;border-color:#315f58;box-shadow:inset 0 0 0 1px #315f58}.embrace-picker input{accent-color:#315f58}.embrace-picker small{width:100%;max-width:760px;color:#697570}.body .shoulders{fill:#c49a50;fill-opacity:.72;stroke:#fff;stroke-width:1.5}.body .head{fill:#243b38;fill-opacity:.38;stroke:#fff;stroke-width:1}.body .gaze{fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.support-ring{fill:none!important;stroke:#142e2a;stroke-width:4;opacity:.9}.initiative{pointer-events:none}.initiative circle{fill:none;stroke:#d18b3b;stroke-width:3;stroke-dasharray:5 6;animation:pulse-ring 1.1s ease-in-out infinite}.initiative text{fill:#87551e;text-anchor:middle;font:700 12px system-ui}.model-status{max-width:780px;margin:1.4rem 0 0;border-top:1px solid #dce2de;padding-top:1rem;color:#56635f}.model-status summary{cursor:pointer;font-weight:750;color:#263c38}.model-status p,.model-status li{font-size:.85rem;line-height:1.55}.model-status a{color:#9f482f}.model-status li+li{margin-top:.6rem}@keyframes pulse-ring{50%{transform:scale(1.08);opacity:.45}}
@media(max-width:760px){.movement-grammar{align-items:flex-start;flex-direction:column;gap:.55rem}.movement-grammar ol{width:100%}}
.sequence-explorer{border-top:1px solid #e3e7e4;padding:1.15rem 1.25rem 1.3rem;background:#fbfaf6}.sequence-heading{display:flex;justify-content:space-between;align-items:center;gap:1rem}.sequence-heading .eyebrow{margin-bottom:.2rem}.sequence-arrows{display:flex;align-items:center;gap:.55rem;white-space:nowrap}.sequence-arrows button{width:34px;height:34px;border:1px solid #ccd5d1;border-radius:50%;background:#fff;cursor:pointer}.sequence-arrows button:disabled{opacity:.35;cursor:default}.checkpoint-tabs{display:grid;grid-template-columns:repeat(5,1fr);gap:.45rem;margin:1rem 0}.checkpoint-tabs button{min-width:0;border:1px solid #d9dfdc;border-radius:10px;background:#fff;color:#4f5d58;padding:.65rem;text-align:left;font-size:.74rem;cursor:pointer}.checkpoint-tabs button span{display:block;width:1.45rem;height:1.45rem;margin-bottom:.35rem;border-radius:50%;background:#edf1ef;text-align:center;line-height:1.45rem;font-weight:800}.checkpoint-tabs button.active{border-color:#315f58;background:#edf3f0;color:#183632;box-shadow:inset 0 0 0 1px #315f58}.checkpoint-tabs button.active span{background:#315f58;color:#fff}.checkpoint-detail{display:grid;grid-template-columns:.9fr 1.2fr 1.2fr;gap:.75rem}.checkpoint-detail>div{border:1px solid #e0e4e1;border-radius:12px;background:#fff;padding:.9rem}.checkpoint-detail small{display:block;color:#8a5c3c;font-size:.67rem;letter-spacing:.07em;font-weight:800}.checkpoint-state strong{display:block;margin:.3rem 0}.checkpoint-detail p,.checkpoint-detail ul{font-size:.82rem;margin:.45rem 0 0}.checkpoint-detail ul{padding-left:1.1rem}.checkpoint-detail li+li{margin-top:.25rem}.sequence-note{font-size:.78rem;color:#697570;margin:.75rem 0 0}.hips path{fill:currentColor;fill-opacity:.58;stroke:#fff;stroke-width:1.2}@media(max-width:760px){.checkpoint-tabs{display:flex;overflow-x:auto}.checkpoint-tabs button{flex:0 0 145px}.checkpoint-detail{grid-template-columns:1fr}.sequence-heading{align-items:flex-end}}
.biomechanics-card{display:grid;grid-template-columns:1.2fr 1fr;gap:1rem;margin-top:1rem;padding:1.25rem;background:#fff;border:1px solid #dce2de;border-radius:18px;box-shadow:0 10px 34px rgba(22,42,37,.07)}.biomechanics-card h4{font-size:1.25rem;margin:.15rem 0 .5rem}.biomechanics-card p{font-size:.84rem;color:#5d6a66;margin:0}.biomechanics-card ul{list-style:none;padding:0;margin:0;display:grid;gap:.35rem}.biomechanics-card li{font-size:.78rem;color:#9b4332}.biomechanics-card li span{display:inline-grid;place-items:center;width:1.25rem;height:1.25rem;margin-right:.45rem;border-radius:50%;background:#f8e8e4;font-weight:800}.biomechanics-card li.ok{color:#286159}.biomechanics-card li.ok span{background:#e3f0eb}.validation-result{grid-column:1/-1;border-radius:9px;padding:.65rem .8rem;background:#f8e8e4;color:#923c2c}.validation-result.ok{background:#e3f0eb;color:#23584f}.biomechanics-card>small{grid-column:1/-1;color:#74807c}@media(max-width:760px){.biomechanics-card{grid-template-columns:1fr}}
</style>
