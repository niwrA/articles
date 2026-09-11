<script setup lang="ts">
const props = withDefaults(defineProps<{ locale?: 'en' | 'nl' }>(), { locale: 'en' })

const translations = {
  en: {
    eyebrow: 'Experimental design',
    title: 'A 4 × 3 matrix',
    introduction: 'The hypothesis can be tested by varying the need for conscious arbitration and the relevance of the information, creating twelve experimental conditions.',
    scrollLabel: 'Scrollable experimental design matrix',
    matrixLabel: 'Experimental design matrix',
    caption: 'Experimental conditions crossing four arbitration requirements with three levels of relevance.',
    arbitration: 'Arbitration requirement ↓',
    relevance: 'Relevance →',
    relevanceLabel: 'relevance',
    condition: 'Test condition',
    conclusion: 'This design examines how conscious experience depends on the interaction between the need for arbitration and the relevance of information to the organism.',
    columns: [
      { label: 'Low', detail: 'Little impact on goals or well-being', className: 'low' },
      { label: 'Medium', detail: 'Some impact; requires consideration', className: 'medium' },
      { label: 'High', detail: 'Major impact, time-sensitive or consequential', className: 'high' }
    ],
    rows: [
      { label: 'Local processing', detail: 'Single, well-learned process; minimal integration' },
      { label: 'Integration', detail: 'Combine information from multiple sources' },
      { label: 'Conflict', detail: 'Competing possibilities require evaluation' },
      { label: 'Flexible arbitration', detail: 'Novel or complex situation requiring informed decision' }
    ]
  },
  nl: {
    eyebrow: 'Experimenteel ontwerp',
    title: 'Een 4 × 3-matrix',
    introduction: 'De hypothese kan worden getoetst door de behoefte aan bewuste arbitrage en de relevantie van informatie over uiteenlopende taken te variëren. Zo ontstaan twaalf experimentele condities.',
    scrollLabel: 'Scrolbare matrix van het experimentele ontwerp',
    matrixLabel: 'Matrix van het experimentele ontwerp',
    caption: 'Experimentele condities waarin vier arbitragevereisten worden gekruist met drie relevantieniveaus.',
    arbitration: 'Arbitragevereiste ↓',
    relevance: 'Relevantie →',
    relevanceLabel: 'relevantie',
    condition: 'Testconditie',
    conclusion: 'Dit ontwerp onderzoekt hoe bewuste ervaring afhangt van de interactie tussen de behoefte aan arbitrage en de relevantie van informatie voor het organisme.',
    columns: [
      { label: 'Laag', detail: 'Weinig invloed op doelen of welzijn', className: 'low' },
      { label: 'Gemiddeld', detail: 'Enige invloed; vereist afweging', className: 'medium' },
      { label: 'Hoog', detail: 'Grote invloed, tijdgevoelig of ingrijpend', className: 'high' }
    ],
    rows: [
      { label: 'Lokale verwerking', detail: 'Eén goed aangeleerd proces; minimale integratie' },
      { label: 'Integratie', detail: 'Informatie uit meerdere bronnen combineren' },
      { label: 'Conflict', detail: 'Concurrerende mogelijkheden vereisen evaluatie' },
      { label: 'Flexibele arbitrage', detail: 'Nieuwe of complexe situatie die een geïnformeerde beslissing vereist' }
    ]
  }
} as const

const copy = computed(() => translations[props.locale])
const columns = computed(() => copy.value.columns)
const rows = computed(() => copy.value.rows)
</script>

<template>
  <figure class="experiment-matrix">
    <div class="matrix-heading">
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h3>{{ copy.title }}</h3>
      <p>{{ copy.introduction }}</p>
    </div>
    <div class="matrix-scroll" tabindex="0" :aria-label="copy.scrollLabel">
      <table>
        <caption>{{ copy.caption }}</caption>
        <thead><tr>
          <th scope="col" class="axis-corner"><span>{{ copy.arbitration }}</span><strong>{{ copy.relevance }}</strong></th>
          <th v-for="column in columns" :key="column.label" scope="col" :class="column.className"><strong>{{ column.label }}</strong><span>{{ column.detail }}</span></th>
        </tr></thead>
        <tbody><tr v-for="row in rows" :key="row.label">
          <th scope="row"><strong>{{ row.label }}</strong><span>{{ row.detail }}</span></th>
          <td v-for="column in columns" :key="column.label" :class="column.className"><span class="condition-dot" aria-hidden="true"></span><span>{{ copy.condition }}</span></td>
        </tr></tbody>
      </table>
    </div>
    <div class="matrix-cards" :aria-label="copy.matrixLabel">
      <section v-for="row in rows" :key="row.label" class="matrix-card">
        <header><strong>{{ row.label }}</strong><span>{{ row.detail }}</span></header>
        <div v-for="column in columns" :key="column.label" :class="column.className">
          <span><strong>{{ column.label }}: {{ copy.relevanceLabel }}</strong><small>{{ column.detail }}</small></span>
          <span class="mobile-condition"><i class="condition-dot" aria-hidden="true"></i>{{ copy.condition }}</span>
        </div>
      </section>
    </div>
    <figcaption>{{ copy.conclusion }}</figcaption>
  </figure>
</template>
