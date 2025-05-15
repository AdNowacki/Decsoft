<template>
  <fieldset
    :class="{ 'question--correct': props.correct, 'question--incorrect': props.incorrect }"
    class="question"
  >
    <label class="question__label">{{ label }}</label>
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  correct: {
    type: Boolean,
    default: false
  },
  incorrect: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
})

</script>

<style scoped lang="scss">
.question {
  --q-form-correct-border: #4caf50;
  --q-form-correct-bg: #b1e0c4;
  --q-form-incorrect-border: #c20f18;
  --q-form-incorrect-bg: #efd1d2;

  text-align: left;
  margin: 0.6rem;
  border-radius: 0.5rem;

  &--correct {
    background-color: var(--q-form-correct-bg);
    border: 1px solid var(--q-form-correct-border);
  }

  &--incorrect {
    background-color: var(--q-form-incorrect-bg);
    border: 1px solid var(--q-form-incorrect-border);
  }

  &__label {
    font-size: 1.2rem;
    font-weight: bold;

    @media print {
      font-size: 0.9rem;
    }
  }
}
</style>