<script setup lang="ts">
const props = withDefaults(defineProps<{locale?:'nl'|'en'}>(),{locale:'nl'})
const en = computed(()=>props.locale==='en')
const tr=(nl:string,english:string)=>en.value?english:nl
const fmt=(n:number)=>new Intl.NumberFormat(en.value?'en-GB':'nl-NL',{maximumFractionDigits:2}).format(n)
const novelty=ref(55), threat=ref(65), goal=ref(45), capacity=ref(4), learning=ref(55), modulation=ref(60), generalization=ref(55)
const stimuli=[.15,.32,.48,.68,.72,.55,.28,.82]
const dangerTrial=3
const simulation=computed(()=>{
  let association=0.08
  return stimuli.map((similarity,index)=>{
    const outcome=index===dangerTrial?1:0
    const surprise=Math.abs(outcome-association)
    const priority=(novelty.value/100)*(1-similarity)+(threat.value/100)*association+(goal.value/100)*similarity
    const attended=priority>.48-(capacity.value-4)*.035
    const effectiveRate=learning.value/100*(.45+.9*modulation.value/100)*(attended?1:.3)
    const spread=Math.exp(-Math.pow(1-similarity,2)/(2*Math.pow(.12+.42*generalization.value/100,2)))
    association=Math.min(1,Math.max(0,association+effectiveRate*(outcome-association)*spread))
    return {trial:index+1,similarity,outcome,surprise,priority,attended,association,action:association>.58?'avoid':priority>.55?'inspect':'continue'}
  })
})
const current=ref(0)
watch([novelty,threat,goal,capacity,learning,modulation,generalization],()=>current.value=0)
const step=computed(()=>simulation.value[current.value]!)
const maxX=computed(()=>Math.max(simulation.value.length-1,1))
const points=computed(()=>simulation.value.map((d,i)=>`${8+i/maxX.value*84},${89-d.association*74}`).join(' '))
</script>

<template>
  <section class="lab" aria-labelledby="adaptation-lab-title">
    <header><div><p class="eyebrow">{{tr('Interactief denkmodel','Interactive thought model')}}</p><h3 id="adaptation-lab-title">{{tr('Georganiseerde adaptatie','Organized adaptation')}}</h3></div><p>{{tr('Bekijk hoe aandacht, tijdelijke toestand en blijvend leren elkaar beïnvloeden. Dit is een conceptueel model, geen simulatie van een echt brein.','Explore how attention, temporary state and persistent learning interact. This is a conceptual model, not a simulation of a real brain.')}}</p></header>
    <div class="layout">
      <fieldset class="controls"><legend>{{tr('Architectuur en toestand','Architecture and state')}}</legend>
        <label>{{tr('Aandacht voor nieuwheid','Attention to novelty')}} <output>{{novelty}}%</output><input v-model.number="novelty" type="range" min="0" max="100"></label>
        <label>{{tr('Aandacht voor dreiging','Attention to threat')}} <output>{{threat}}%</output><input v-model.number="threat" type="range" min="0" max="100"></label>
        <label>{{tr('Doelgerichtheid','Goal bias')}} <output>{{goal}}%</output><input v-model.number="goal" type="range" min="0" max="100"></label>
        <label>{{tr('Werkgeheugencapaciteit','Working-memory capacity')}} <output>{{capacity}}</output><input v-model.number="capacity" type="range" min="1" max="7"></label>
        <label>{{tr('Basale leersnelheid','Baseline learning rate')}} <output>{{learning}}%</output><input v-model.number="learning" type="range" min="5" max="100"></label>
        <label>{{tr('Neuromodulatoire versterking','Neuromodulatory gain')}} <output>{{modulation}}%</output><input v-model.number="modulation" type="range" min="0" max="100"></label>
        <label>{{tr('Generalisatie','Generalization')}} <output>{{generalization}}%</output><input v-model.number="generalization" type="range" min="0" max="100"></label>
      </fieldset>
      <div class="stage">
        <div class="pipeline">
          <div><small>{{tr('Omgeving','Environment')}}</small><strong>{{Math.round(step.similarity*100)}}%</strong><span>{{tr('gelijkenis','similarity')}}</span></div>
          <b>→</b><div :class="{active:step.attended}"><small>{{tr('Aandacht','Attention')}}</small><strong>{{Math.round(step.priority*100)}}%</strong><span>{{step.attended?tr('geselecteerd','selected'):tr('gemist','missed')}}</span></div>
          <b>→</b><div><small>{{tr('Actieve toestand','Active state')}}</small><strong>{{capacity}}</strong><span>{{tr('plaatsen','slots')}}</span></div>
          <b>→</b><div class="memory"><small>{{tr('Geleerde dreiging','Learned threat')}}</small><strong>{{Math.round(step.association*100)}}%</strong><span>{{tr('blijvende structuur','persistent structure')}}</span></div>
        </div>
        <svg viewBox="0 0 100 100" role="img" :aria-label="tr('Ontwikkeling van de geleerde dreigingsassociatie','Development of the learned threat association')" preserveAspectRatio="none"><path d="M8 89H95M8 52H95M8 15H95" class="grid"/><polyline :points="points" class="line"/><circle v-for="(d,i) in simulation" :key="i" :cx="8+i/maxX*84" :cy="89-d.association*74" :r="current===i?2.4:1.5" :class="current===i?'selected':'dot'"/></svg>
        <div class="timeline"><button v-for="(d,i) in simulation" :key="i" type="button" :aria-pressed="current===i" @click="current=i">{{i+1}}<span v-if="d.outcome">!</span></button></div>
        <p class="decision"><strong>{{tr('Gedrag','Action')}}: {{step.action==='avoid'?tr('vermijden','avoid'):step.action==='inspect'?tr('onderzoeken','inspect'):tr('doorgaan','continue')}}</strong> · {{tr('voorspellingsfout','prediction error')}} {{fmt(step.surprise)}}</p>
      </div>
    </div>
    <div class="explain"><p><strong>{{tr('Wat gebeurt hier?','What happens here?')}}</strong> {{tr('In ronde 4 treedt een schadelijke gebeurtenis op. Leersnelheid en neuromodulatie bepalen hoe sterk één ervaring het geheugen verandert; generalisatie bepaalt hoeveel vergelijkbare situaties daarna als bedreigend worden behandeld.','A harmful event occurs on trial 4. Learning rate and neuromodulation determine how strongly one experience changes memory; generalization determines how many similar situations are subsequently treated as threatening.')}}</p><p>{{tr('De simulatie laat het centrale argument zien: dezelfde waarneming leidt bij een andere architectuur, aandachtstoestand of leermodus tot andere blijvende kennis en ander gedrag.','The simulation illustrates the central argument: the same observation produces different persistent knowledge and behaviour under a different architecture, attentional state or learning mode.')}}</p></div>
  </section>
</template>

<style scoped>
.lab{box-sizing:border-box;margin:1.5rem 0;padding:1rem;border:1px solid #cbd8d2;border-radius:16px;background:#f7f8f5;color:#173b34;font:400 .76rem/1.45 system-ui,sans-serif}.lab *{box-sizing:border-box}.lab header{display:grid;grid-template-columns:1.05fr .95fr;gap:1rem;align-items:end}.lab h3{margin:.1rem 0 0;font:750 clamp(1.1rem,2.5vw,1.5rem)/1.2 system-ui}.lab header>p{margin:0!important;color:#5b6d67;font-size:.68rem}.eyebrow{margin:0!important;color:#a75e3e;font-size:.6rem;font-weight:750;letter-spacing:.08em;text-transform:uppercase}.layout{display:grid;grid-template-columns:minmax(220px,.75fr) minmax(0,1.25fr);gap:.8rem;margin-top:1rem}.lab fieldset,.stage{min-width:0;margin:0;padding:.8rem;border:1px solid #d5dfda;border-radius:11px;background:#fff}.lab legend{padding:0 .25rem;font-weight:750}.lab label{display:grid;grid-template-columns:1fr auto;gap:.2rem .5rem;margin:.55rem 0;color:#3f5750;font-size:.67rem}.lab output{font-weight:750;color:#173b34}.lab input{grid-column:1/-1;width:100%;accent-color:#a75e3e}.pipeline{display:grid;grid-template-columns:repeat(7,auto);align-items:center;justify-content:space-between;gap:.25rem}.pipeline div{display:grid;place-items:center;min-width:72px;padding:.55rem .35rem;border-radius:9px;background:#edf2ee;text-align:center}.pipeline div.active{outline:2px solid #ba744f}.pipeline div.memory{background:#e4ede8}.pipeline small,.pipeline span{font-size:.55rem;color:#5d7069}.pipeline strong{font-size:1rem}.stage svg{width:100%;height:150px;margin-top:.5rem}.grid{stroke:#dfe6e2;stroke-width:.6}.line{fill:none;stroke:#a75e3e;stroke-width:2;vector-effect:non-scaling-stroke}.dot{fill:#54776e}.selected{fill:#a75e3e}.timeline{display:flex;justify-content:space-between}.timeline button{position:relative;width:28px;height:28px;border:1px solid #b9c8c1;border-radius:50%;background:#fff;color:#173b34;cursor:pointer}.timeline button[aria-pressed=true]{background:#173b34;color:#fff}.timeline span{position:absolute;top:-7px;right:-4px;color:#b34835;font-weight:900}.decision{margin:.75rem 0 0!important;padding:.55rem .7rem;background:#edf2ee}.explain{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-top:.8rem}.explain p{margin:0!important;color:#52665f;font-size:.65rem}@media(max-width:760px){.lab header,.layout,.explain{grid-template-columns:1fr}.lab header>p{margin-top:.4rem!important}.pipeline{grid-template-columns:1fr auto 1fr}.pipeline b:nth-of-type(2),.pipeline b:nth-of-type(3){display:none}.pipeline div:nth-of-type(3),.pipeline div:nth-of-type(4){margin-top:.4rem}.pipeline div:nth-of-type(3){grid-column:1}.pipeline div:nth-of-type(4){grid-column:3}.stage svg{height:130px}}@media(prefers-color-scheme:dark){.lab{background:#1c2925;border-color:#455b54;color:#edf3ef}.lab fieldset,.stage{background:#263630;border-color:#455b54}.pipeline div,.decision{background:#31463f}.pipeline div.memory{background:#344b43}.lab label,.lab output{color:#d5e1dc}.lab header>p,.pipeline small,.pipeline span,.explain p{color:#afc0ba}.timeline button{background:#263630;color:#edf3ef;border-color:#526a62}}
</style>
