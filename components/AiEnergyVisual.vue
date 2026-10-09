<script setup lang="ts">
const props = defineProps<{ view: 'task' | 'paradox' }>()
const growth = Math.round((945 / 415 - 1) * 100)
</script>

<template>
  <figure class="energy-visual" :aria-labelledby="`energy-${view}-title`">
    <template v-if="view === 'task'">
      <figcaption>
        <span class="eyebrow">Andere noemer, andere vergelijking</span>
        <strong :id="`energy-${view}-title`">Van zoekopdracht naar beantwoorde informatietaak</strong>
      </figcaption>
      <div class="task-grid">
        <section class="route route--search">
          <h4>Traditionele zoekroute</h4>
          <ol>
            <li><span>1</span>Zoekopdracht</li>
            <li><span>2</span>Resultaten rangschikken</li>
            <li><span>3</span>Meerdere pagina’s openen</li>
            <li><span>4</span>Lezen en combineren</li>
          </ol>
          <p>Meerdere systeem- én mensstappen</p>
        </section>
        <section class="route route--ai">
          <h4>Rechtstreeks AI-antwoord</h4>
          <ol>
            <li><span>1</span>Vraag met context</li>
            <li><span>2</span>Modelinferentie</li>
            <li><span>3</span>Samengesteld antwoord</li>
          </ol>
          <p>Minder handelingen, maar broncontrole kan ontbreken</p>
        </section>
        <section class="route route--hybrid">
          <h4>Hybride AI + retrieval</h4>
          <ol>
            <li><span>1</span>Vraag ontleden</li>
            <li><span>2</span>Gericht ophalen en cachen</li>
            <li><span>3</span>Redeneren met bronnen</li>
            <li><span>4</span>Antwoord met herkomst</li>
          </ol>
          <p>Meer machinewerk; mogelijk een completere taak</p>
        </section>
      </div>
      <p class="visual-note"><strong>De juiste functionele eenheid hangt van de vraag af.</strong> Voor een navigatiezoekopdracht kan één zoekopdracht voldoende zijn. Voor een onderzoeksvraag moet de totale route naar een bruikbaar, gecontroleerd antwoord worden vergeleken.</p>
    </template>

    <template v-else>
      <figcaption>
        <span class="eyebrow">Efficiënter per taak, meer verbruik in totaal</span>
        <strong :id="`energy-${view}-title`">De energieparadox van datacenters</strong>
      </figcaption>
      <div class="bars" role="img" aria-label="Wereldwijd elektriciteitsverbruik van alle datacenters: 415 terawattuur in 2024 en 945 terawattuur in het basisscenario voor 2030.">
        <div class="bar-column">
          <div class="bar-label"><strong>415 TWh</strong><span>2024 · schatting</span></div>
          <div class="bar bar--2024" />
        </div>
        <div class="bar-column">
          <div class="bar-label"><strong>945 TWh</strong><span>2030 · IEA-basisscenario</span></div>
          <div class="bar bar--2030"><span>+{{ growth }}%</span></div>
        </div>
      </div>
      <div class="scope">
        <strong>Dit zijn alle datacenters</strong>
        <span>AI is volgens de IEA de belangrijkste groeimotor, maar de totalen omvatten ook conventionele servers, opslag, netwerken, koeling en andere digitale diensten.</span>
      </div>
      <p class="visual-note">De waarden combineren een raming voor 2024 met een scenario voor 2030. Het tweede getal is dus geen gemeten toekomst en evenmin een raming van uitsluitend AI.</p>
    </template>
  </figure>
</template>

<style scoped>
.energy-visual{box-sizing:border-box;margin:2.4rem 0;padding:1.15rem;border:1px solid #d2ddd7;border-radius:16px;background:#f7f8f5;color:#183b34;font:400 .82rem/1.45 system-ui,sans-serif;overflow:hidden}.energy-visual *{box-sizing:border-box}.energy-visual figcaption{display:grid;gap:.18rem;margin-bottom:1rem}.energy-visual figcaption strong{font:750 clamp(1.05rem,2.5vw,1.5rem)/1.25 system-ui,sans-serif}.eyebrow{color:#a45d3d;font-size:.64rem;font-weight:750;letter-spacing:.08em;text-transform:uppercase}.task-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.65rem}.route{display:flex;flex-direction:column;min-width:0;padding:.8rem;border:1px solid #d5dfda;border-radius:11px;background:#fff}.route h4{min-height:2.4em;margin:0 0 .65rem;font:750 .82rem/1.2 system-ui,sans-serif}.route ol{display:grid;gap:.42rem;margin:0;padding:0;list-style:none}.route li{display:flex;align-items:center;gap:.45rem;min-height:2.3rem;padding:.38rem .45rem;border-radius:7px;background:#edf2ee;font-size:.68rem;line-height:1.25}.route li span{display:grid;place-items:center;flex:0 0 1.3rem;width:1.3rem;height:1.3rem;border-radius:50%;background:#426d62;color:#fff;font-size:.61rem;font-weight:750}.route li+li:before{content:'↓';position:absolute;margin:-2.55rem 0 0 .34rem;color:#789289}.route p{margin:auto 0 0!important;padding-top:.7rem;color:#61716c;font-size:.64rem;line-height:1.35}.route--ai{border-top:4px solid #bc744f}.route--hybrid{border-top:4px solid #315f57}.route--search{border-top:4px solid #81958d}.visual-note{margin:1rem 0 0!important;padding:.75rem .85rem;border-left:3px solid #bd744e;background:#fff7f0;color:#52645e;font-size:.7rem;line-height:1.45}.bars{display:flex;align-items:end;justify-content:center;gap:clamp(1.2rem,8vw,5rem);height:280px;padding:1.2rem 1rem 0;border-bottom:2px solid #8da098;background:repeating-linear-gradient(to top,transparent 0,transparent 66px,#dde5e0 67px)}.bar-column{display:flex;flex-direction:column;justify-content:end;align-items:center;width:min(28%,170px);height:100%}.bar-label{display:grid;justify-items:center;margin-bottom:.45rem;text-align:center}.bar-label strong{font:800 1.35rem/1 system-ui,sans-serif}.bar-label span{margin-top:.25rem;color:#5f706a;font-size:.63rem}.bar{position:relative;width:100%;border-radius:7px 7px 0 0;background:#6b8e83}.bar--2024{height:35%}.bar--2030{height:80%;background:#ba704b}.bar--2030 span{position:absolute;top:50%;left:50%;translate:-50% -50%;color:#fff;font-size:.78rem;font-weight:800}.scope{display:grid;grid-template-columns:minmax(135px,.38fr) 1fr;gap:.8rem;margin-top:1rem;padding:.75rem .85rem;border-radius:9px;background:#e8efeb}.scope strong{font-size:.75rem}.scope span{color:#51645e;font-size:.67rem}.energy-visual :deep(p){max-width:none}@media(max-width:700px){.energy-visual{margin:1.6rem 0;padding:.82rem}.task-grid{grid-template-columns:1fr}.route h4{min-height:0}.bars{gap:1.3rem;height:235px;padding-inline:.3rem}.bar-column{width:38%}.bar-label strong{font-size:1.08rem}.scope{grid-template-columns:1fr;gap:.25rem}}@media(prefers-color-scheme:dark){.energy-visual{border-color:#455b54;background:#1c2925;color:#ecf3ef}.route{border-color:#455b54;background:#263630}.route li{background:#32463f}.route p,.visual-note,.scope span,.bar-label span{color:#b8c9c2}.visual-note{background:#302821}.scope{background:#293c35}.bars{border-color:#71887f;background:repeating-linear-gradient(to top,transparent 0,transparent 66px,#34463f 67px)}}
</style>
