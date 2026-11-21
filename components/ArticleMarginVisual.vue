<script setup lang="ts">
withDefaults(defineProps<{diagram:string;locale?:string}>(), { locale: "nl" })
</script>
<template>
<figure v-if="diagram === 'arbitration'" class="article-margin-fork">
        <div class="article-margin-inputs">
          <div>{{ locale === 'en' ? 'Fear' : 'Angst' }}<strong>{{ locale === 'en' ? 'Pull away' : 'Trek terug' }}</strong></div>
          <div>{{ locale === 'en' ? 'Memory' : 'Geheugen' }}<strong>{{ locale === 'en' ? 'It’s harmless' : 'Ongevaarlijk' }}</strong></div>
        </div>
        <div class="article-margin-join" aria-hidden="true"></div>
        <figcaption>{{ locale === 'en' ? 'Weigh both signals' : 'Weeg beide signalen' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'learning'" class="article-margin-sequence">
        <ol>
          <li>{{ locale === 'en' ? 'A new situation' : 'Een nieuwe situatie' }}</li>
          <li>{{ locale === 'en' ? 'Weigh the options' : 'Weeg de mogelijkheden' }}</li>
          <li>{{ locale === 'en' ? 'Learn what works' : 'Leer wat werkt' }}</li>
          <li>{{ locale === 'en' ? 'Build a routine' : 'Bouw een routine op' }}</li>
        </ol>
        <figcaption>{{ locale === 'en' ? 'If the routine fails, weigh the options again.' : 'Werkt de routine niet meer, weeg de mogelijkheden dan opnieuw af.' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'vote-entry'" class="article-margin-sequence">
        <ol>
          <li>{{ locale === 'en' ? 'Support spread across districts' : 'Steun verspreid over districten' }}</li>
          <li>{{ locale === 'en' ? 'Often finishes third' : 'Eindigt vaak als derde' }}</li>
          <li>{{ locale === 'en' ? 'May win no seats' : 'Kan zonder zetels blijven' }}</li>
          <li>{{ locale === 'en' ? 'Voters feel spoiler pressure' : 'Kiezers voelen de splijtstemdruk' }}</li>
        </ol>
        <figcaption>{{ locale === 'en' ? 'A tendency under single-member plurality elections, not a certainty in every election.' : 'Een tendens bij districten met één winnaar, geen zekerheid bij elke verkiezing.' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'power-loop'" class="article-margin-sequence article-margin-loop">
        <ol>
          <li>{{ locale === 'en' ? 'Legislative gridlock' : 'Vastgelopen wetgeving' }}</li>
          <li>{{ locale === 'en' ? 'More executive action' : 'Meer uitvoerende actie' }}</li>
          <li>{{ locale === 'en' ? 'Higher stakes for the presidency' : 'Meer staat op het spel bij het presidentschap' }}</li>
          <li>{{ locale === 'en' ? 'Stronger partisan loyalty' : 'Sterkere partijloyaliteit' }}</li>
        </ol>
        <figcaption>{{ locale === 'en' ? 'This proposed feedback loop can deepen gridlock.' : 'Deze voorgestelde terugkoppeling kan de impasse verdiepen.' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'institutional-tests'" class="article-margin-sequence">
        <ol>
          <li>{{ locale === 'en' ? 'Legislature' : 'Parlement' }}</li>
          <li>{{ locale === 'en' ? 'Courts' : 'Rechtbanken' }}</li>
          <li>{{ locale === 'en' ? 'Public officials' : 'Ambtsdragers' }}</li>
          <li>{{ locale === 'en' ? 'Security institutions' : 'Veiligheidsdiensten' }}</li>
        </ol>
        <figcaption>{{ locale === 'en' ? 'Formal checks work only when institutions act.' : 'Formele tegenmacht werkt alleen als instituties handelen.' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'housing-dilution'" class="article-margin-sequence article-margin-quantities">
        <div>
          <span>{{ locale === 'en' ? 'One household of four' : 'Eén huishouden van vier' }}</span>
          <strong>90 m²</strong>
          <span class="quantity-bar quantity-bar--half" aria-hidden="true"></span>
        </div>
        <div>
          <span>{{ locale === 'en' ? 'Four households of one' : 'Vier eenpersoonshuishoudens' }}</span>
          <strong>180 m²</strong>
          <span class="quantity-bar" aria-hidden="true"></span>
        </div>
        <figcaption>{{ locale === 'en' ? 'Illustration: 30 m² per household plus 15 m² per resident.' : 'Rekenvoorbeeld: 30 m² per huishouden plus 15 m² per bewoner.' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'tango-proposal'" class="article-margin-sequence">
        <ol>
          <li>{{ locale === 'en' ? 'One dancer makes a possibility felt' : 'Eén danser maakt een mogelijkheid voelbaar' }}</li>
          <li>{{ locale === 'en' ? 'The other can take up the proposal' : 'De ander kan het voorstel aannemen' }}</li>
          <li>{{ locale === 'en' ? 'Each does their part of the movement' : 'Ieder doet een deel van de beweging' }}</li>
        </ol>
        <figcaption>{{ locale === 'en' ? 'Either dancer can make the next proposal.' : 'Het volgende voorstel kan van beide dansers komen.' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'energy-rebound'" class="article-margin-sequence article-margin-equation">
        <div>{{ locale === 'en' ? '½ the energy per task' : '½ van de energie per taak' }}</div>
        <div>× {{ locale === 'en' ? '3 times as many tasks' : '3 keer zoveel taken' }}</div>
        <div>= {{ locale === 'en' ? '1.5 times the total energy' : '1,5 keer zoveel energie in totaal' }}</div>
        <figcaption>{{ locale === 'en' ? 'An illustrative calculation, not a forecast.' : 'Een rekenvoorbeeld, geen prognose.' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'self'" class="article-margin-sequence">
        <ol>
          <li>{{ locale === 'en' ? 'Body: what am I sensing?' : 'Lichaam: wat voel ik?' }}</li>
          <li>{{ locale === 'en' ? 'Agency: what can I do?' : 'Handelen: wat kan ik doen?' }}</li>
          <li>{{ locale === 'en' ? 'History: what have I learned?' : 'Verleden: wat heb ik geleerd?' }}</li>
        </ol>
        <figcaption>{{ locale === 'en' ? 'Examples of layers in the essay’s self-model' : 'Voorbeelden van lagen in het zelfmodel uit het essay' }}</figcaption>
      </figure>
</template>
<style scoped>
.article-margin-fork { max-inline-size: 14rem; margin: .55rem 0 0; text-align: center; font-size: .73rem; }
.article-margin-inputs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .28rem; }
.article-margin-inputs > div { background: color-mix(in srgb, var(--line) 46%, transparent); padding: .18rem; }
.article-margin-inputs strong { display: block; color: var(--ink); }
.article-margin-join { inline-size: 50%; block-size: .48rem; margin-inline: auto; border: 1px solid var(--line); border-block-start: 0; }
.article-margin-fork figcaption {
  padding: .18rem;
  background: color-mix(in srgb, var(--accent) 9%, var(--paper));
  color: var(--ink);
  font-weight: 600;
}
.article-margin-sequence { max-inline-size: 16rem; margin: .55rem 0 0; font-size: .75rem; }
.article-margin-sequence ol {
  display: grid;
  gap: 3px;
  margin: 0;
  padding: 0;
  list-style-position: inside;
}
.article-margin-sequence li {
  padding: .22rem .45rem;
  background: color-mix(in srgb, var(--line) 40%, transparent);
  color: var(--ink);
}
.article-margin-sequence li::marker { color: var(--accent); font-weight: 600; }
.article-margin-sequence figcaption { margin-block-start: .3rem; }

.article-margin-quantities > div { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: .1rem .4rem; margin-block-end: .32rem; }
.quantity-bar { grid-column: 1 / -1; inline-size: 100%; block-size: .32rem; background: var(--accent); }
.quantity-bar--half { inline-size: 50%; }
.article-margin-equation > div { padding: .14rem .4rem; }
.article-margin-equation > div:nth-child(3) { border-block-start: 1px solid var(--line); font-weight: 650; }
</style>
