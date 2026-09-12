<script setup lang="ts">
const population = ref(18.2)
const householdSize = ref(2.12)
const baseSpace = ref(30)
const personalSpace = ref(15)
const households = computed(() => population.value * 1_000_000 / householdSize.value)
const totalSpace = computed(() => households.value * baseSpace.value + population.value * 1_000_000 * personalSpace.value)
const fmt = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 1 })
</script>

<template>
  <section class="model" data-analytics-model="housing-space" aria-labelledby="model-title">
    <div class="model-copy">
      <p class="eyebrow">Interactief model</p>
      <h2 id="model-title">Hoeveel woonruimte vraagt een bevolking?</h2>
      <p>Verander de aannames. De berekening maakt zichtbaar hoeveel invloed huishoudensverdunning heeft.</p>
      <label>Bevolking <strong>{{ fmt.format(population) }} miljoen</strong>
        <input v-model.number="population" type="range" min="15" max="22" step="0.1">
      </label>
      <label>Personen per huishouden <strong>{{ fmt.format(householdSize) }}</strong>
        <input v-model.number="householdSize" type="range" min="1.7" max="2.6" step="0.01">
      </label>
      <label>Basisruimte per huishouden <strong>{{ baseSpace }} m²</strong>
        <input v-model.number="baseSpace" type="range" min="15" max="60" step="1">
      </label>
      <label>Ruimte per persoon <strong>{{ personalSpace }} m²</strong>
        <input v-model.number="personalSpace" type="range" min="8" max="30" step="1">
      </label>
    </div>
    <div class="model-result" aria-live="polite">
      <span>Benodigde huishoudens</span>
      <strong>{{ fmt.format(households / 1_000_000) }} mln</strong>
      <span>Totale woonruimte</span>
      <strong>{{ fmt.format(totalSpace / 1_000_000) }} mln m²</strong>
      <small>Illustratief model; geen prognose. Definities en brondata moeten bij publicatie worden verantwoord.</small>
    </div>
  </section>
</template>
