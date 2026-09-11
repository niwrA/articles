<script setup lang="ts">
const columns = [
  { label: 'Low', detail: 'Little impact on goals or well-being', className: 'low' },
  { label: 'Medium', detail: 'Some impact; requires consideration', className: 'medium' },
  { label: 'High', detail: 'Major impact, time-sensitive or consequential', className: 'high' }
]
const rows = [
  { label: 'Local processing', detail: 'Single, well-learned process; minimal integration' },
  { label: 'Integration', detail: 'Combine information from multiple sources' },
  { label: 'Conflict', detail: 'Competing possibilities require evaluation' },
  { label: 'Flexible arbitration', detail: 'Novel or complex situation requiring informed decision' }
]
</script>

<template>
  <figure class="experiment-matrix">
    <div class="matrix-heading">
      <p class="eyebrow">Experimental design</p>
      <h3>A 4 × 3 matrix</h3>
      <p>The hypothesis can be tested by varying the need for conscious arbitration and the relevance of the information, creating twelve experimental conditions.</p>
    </div>
    <div class="matrix-scroll" tabindex="0" aria-label="Scrollable experimental design matrix">
      <table>
        <caption>Experimental conditions crossing four arbitration requirements with three levels of relevance.</caption>
        <thead><tr>
          <th scope="col" class="axis-corner"><span>Arbitration requirement ↓</span><strong>Relevance →</strong></th>
          <th v-for="column in columns" :key="column.label" scope="col" :class="column.className"><strong>{{ column.label }}</strong><span>{{ column.detail }}</span></th>
        </tr></thead>
        <tbody><tr v-for="row in rows" :key="row.label">
          <th scope="row"><strong>{{ row.label }}</strong><span>{{ row.detail }}</span></th>
          <td v-for="column in columns" :key="column.label" :class="column.className"><span class="condition-dot" aria-hidden="true"></span><span>Test condition</span></td>
        </tr></tbody>
      </table>
    </div>
    <div class="matrix-cards" aria-label="Experimental design matrix">
      <section v-for="row in rows" :key="row.label" class="matrix-card">
        <header><strong>{{ row.label }}</strong><span>{{ row.detail }}</span></header>
        <div v-for="column in columns" :key="column.label" :class="column.className">
          <span><strong>{{ column.label }} relevance</strong><small>{{ column.detail }}</small></span>
          <span class="mobile-condition"><i class="condition-dot" aria-hidden="true"></i>Test condition</span>
        </div>
      </section>
    </div>
    <figcaption>This design examines how conscious experience depends on the interaction between the need for arbitration and the relevance of information to the organism.</figcaption>
  </figure>
</template>
