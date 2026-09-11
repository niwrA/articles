<script setup lang="ts">
import { housingMeasures } from '~/data/housingMeasures'

const strength = (value: string) => {
  if (value === 'zeer hoog') return 4
  if (value === 'hoog tot zeer hoog') return 3.5
  if (value === 'hoog') return 3
  if (value === 'middel/hoog') return 2.5
  if (value === 'middel') return 2
  return 1
}

const dots = (value: string) => Math.ceil(strength(value))
</script>

<template>
  <figure class="measures-comparison">
    <div class="comparison-heading">
      <p class="eyebrow">Vergelijking</p>
      <h2>De knoppen om wooncapaciteit te vergroten</h2>
      <p>Voorlopige kwalitatieve vergelijking van impact, eerste effect, kosten, structurele werking en onzekerheid.</p>
    </div>

    <div class="measures-table-wrap" tabindex="0">
      <table>
        <caption>Tien maatregelen voor wooncapaciteit, kwalitatief vergeleken.</caption>
        <thead><tr><th scope="col">Maatregel</th><th scope="col">Impact</th><th scope="col">Eerste effect</th><th scope="col">Kosten</th><th scope="col">Structureel</th><th scope="col">Onzekerheid</th></tr></thead>
        <tbody><tr v-for="measure in housingMeasures" :key="measure.id">
          <th scope="row"><i :style="{ background: measure.color }"></i>{{ measure.name }}</th>
          <td data-label="Impact"><span class="rating" :aria-label="measure.impact"><i v-for="n in dots(measure.impact)" :key="n"></i></span><small>{{ measure.impact }}</small></td>
          <td data-label="Eerste effect">{{ measure.firstEffect }}</td>
          <td data-label="Kosten">{{ measure.costLevel }}</td>
          <td data-label="Structureel"><span class="rating" :aria-label="measure.structural"><i v-for="n in dots(measure.structural)" :key="n"></i></span><small>{{ measure.structural }}</small></td>
          <td data-label="Onzekerheid">{{ measure.uncertainty }}</td>
        </tr></tbody>
      </table>
    </div>
    <figcaption>De tabel en scenarioverkenner gebruiken dezelfde gegevensbron. De kwalitatieve beoordelingen zijn richtinggevend; de kwantitatieve beginwaarden in de verkenner zijn expliciet bewerkbare aannames.</figcaption>
  </figure>
</template>
